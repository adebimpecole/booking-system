import React from "react";

import "./TheSlide.sass";

const Photos = () => {
  return (
    <div className="gallery">
        <div className="column">
        <div className="image-item">
          <img src='https://res.cloudinary.com/dddotdmjo/image/upload/v1704905605/14_jrzmjk.jpg' alt="image" className="gallery__img" />
          </div>
          <div className="image-item">
          <img src='https://res.cloudinary.com/dddotdmjo/image/upload/v1704905600/13_u9agz9.jpg' alt="image" className="gallery__img" />
          </div>
          <div className="image-item">
          <img src='https://res.cloudinary.com/dddotdmjo/image/upload/v1704905604/2_dx1jyy.jpg' alt="image" className="gallery__img" />
          </div>
        </div>
        <div className="column">
          <div className="image-item">
          <img src='https://res.cloudinary.com/dddotdmjo/image/upload/v1704905608/4_lgjukq.jpg' alt="image" className="gallery__img" />
          </div>
          <div className="image-item">
          <img src='https://res.cloudinary.com/dddotdmjo/image/upload/v1704905599/22_ylrxlz.jpg' alt="image" className="gallery__img" />
          </div>
          <div className="image-item">
          <img src='https://res.cloudinary.com/dddotdmjo/image/upload/v1704905602/6_dzobfh.jpg' alt="image" className="gallery__img" />
          </div>
        </div>
        <div className="column">
          <div className="image-item">
          <img src='https://res.cloudinary.com/dddotdmjo/image/upload/v1704905597/7_q23dnl.jpg' alt="image" className="gallery__img" />
          </div>
          <div className="image-item">
          <img src='https://res.cloudinary.com/dddotdmjo/image/upload/v1704905607/8_crsweg.jpg' alt="image" className="gallery__img" />
          </div>
          <div className="image-item">
          <img src='https://res.cloudinary.com/dddotdmjo/image/upload/v1704905610/9_wkn9ij.jpg' alt="image" className="gallery__img" />
          </div>
        </div>
        <div className="column">
          <div className="image-item">
          <img src='https://res.cloudinary.com/dddotdmjo/image/upload/v1704905597/10_agqlsf.jpg' alt="image" className="gallery__img" />
          </div>
          <div className="image-item">
          <img src='https://res.cloudinary.com/dddotdmjo/image/upload/v1704905667/15_cdad3r.jpg' alt="image" className="gallery__img" />
          </div>
        </div>
    </div>
  );
};

export default Photos;
