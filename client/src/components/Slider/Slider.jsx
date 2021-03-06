import React, { useState } from "react";
import styles from "./Slider.module.css";
import img404 from "../../assets/loading.gif";

export default function Slider({ images }) {
  const [stateIndex, setStateIndex] = useState(0);

  function nextSlide(e) {
    e.preventDefault();
    setStateIndex(stateIndex + 1);
  }
  function prevSlide(e) {
    e.preventDefault();
    setStateIndex(stateIndex - 1);
  }

  if (!images || images.length === 0) {
    images = [{ id: 1, image: img404 }];
  } else if (typeof images === "string") {
    images = [{ id: 1, image: images }];
  } else if (typeof images[0] === "string") {
    images = images.map((i) => {
      return { id: i, image: i };
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.prev}>
        <button
          className={styles.button_slider}
          onClick={(e) => prevSlide(e)}
          disabled={stateIndex === 0 ? true : false}
        >
          <i className="bx bx-chevron-left"></i>
        </button>
      </div>

      <div className={styles.imageContainer}>
        {images?.map((image, index) => {
          return (
            <div
              key={image?.id}
              className={
                stateIndex === index ? styles.slide_active : styles.slide
              }
            >
              <img src={image?.image} alt="" />
            </div>
          );
        })}
      </div>

      <div className={styles.next}>
        <button
          className={styles.button_slider}
          onClick={(e) => nextSlide(e)}
          disabled={stateIndex === images?.length - 1 ? true : false}
        >
          <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
