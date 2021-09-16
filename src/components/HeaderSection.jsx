import { AddReview } from "./AddReview";
import React from "react";
import db from "./../db/firebase";
import { useState } from "react";

export const HeaderSection = () => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [stars, setStars] = useState(0);

  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  db.collection("reviews")
    .get()
    .then((querySnapshot) => {
      var totalstars = 0;
      querySnapshot.forEach((element) => {
        var data = element.data();
        if (data.star) {
          totalstars += data.star;
        }
      });
      // Count the avg stars (Avg rating)
      var avgstars = parseFloat(totalstars / querySnapshot.size).toFixed(1);
      setStars(avgstars);
    });

  return (
    <div>
      {isModalOpen && <AddReview onRequestClose={toggleModal} />}
      <div>
        <div>
          <span class="header"> The Minimalist Entrepreneur</span>
        </div>
        <div class="flex margin-top-2 just visibility">
          <div class="flex">
            <div class="font-size-1"> {stars} </div>
            <section class="rating-widget">
              <div class="rating-stars text-center">
                <ul id="stars1">
                  <div class="stars-outer">
                    <div class="stars-inner" style={{ width: "80%" }}></div>
                  </div>
                </ul>
              </div>
            </section>
          </div>
          <div class="box-layout-small wrapper ">
            <button class="modal-toggle button wrapper " onClick={toggleModal}>
              Add Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
