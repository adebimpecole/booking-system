import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getFirestore, collection, query, where, getDocs, doc, addDoc, getDoc } from 'firebase/firestore';

import "./Auth.sass"

const Login = () => {
  const db = getFirestore();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      alert("Please fill in required fields");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;

          // Reference to the user's document in Firestore
          const restaurantDocRef = collection(db, 'restaurant');

          const query2 = query(restaurantDocRef, where("userId", "==", user.uid));

          getDocs(query2).then((querySnapshot1) => {
            if (!querySnapshot1.empty) {
              // Retrieve the first document that matches the query from the 'users' collection
              const docSnapshot1 = querySnapshot1.docs[0];
              const restaurantData = docSnapshot1.data();

              navigate("/dash");
            } else {
              alert('No user found.')
            }
          }).catch((error) => {
            console.error('Error getting company data:', error);
          });
        })
        .catch((error) => {
          const errorCode = error.code;

          if (errorCode === "auth/invalid-login-credentials") {
            console.error("Invalid Email or Password");
          }
          if (errorCode === "auth/network-request-failed") {
            console.error("Network error");
          }
        });
    }
  }
  return (
    <div className='Signup'>
      <div className='the_image2'>
        <div className='img_container'></div>
      </div>
      <div className='form_container'>
        <h2 className='form_name'>Welcome back!</h2>
        <form>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Restaurant Email'
            className='logged'
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className='logged'
          />
          <input type="submit" value="LOGIN" className='button' onClick={onLogin} />
          <div className='account'>
            Don't have an account?   <Link to='*' className='login_link'> SIGN UP</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
