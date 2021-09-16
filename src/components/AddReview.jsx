import { useEffect, useRef, useState } from "react";

import React from "react";
import ReactStars from "./stars/react-star";
import db from "./../db/firebase";
import firebase from "firebase";

export const AddReview = ({ onRequestClose }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [currentTextValue, setCurrentTextValue] = useState("0");
  const { serverTimestamp } = firebase.firestore.FieldValue;

  const submitValues = () => {
    db.collection("reviews")
      .add({
        star: currentValue,
        reviewtext: currentTextValue,
        createdAt: serverTimestamp(),
      })
      .then((docRef) => {
        onRequestClose();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const starBlocks = {
    size: 21,
    isHalf: true,
    currentValue: 4,

    char: "★",
    onChange: (newValue) => {
      setCurrentValue(newValue);
      console.log(`Example 4: new value is ${newValue}`);

      // Add data to the store
    },
  };
  const ref = useRef();

  const clicked = () => {
    onRequestClose();
  };
  // Use useEffect to add an event listener to the document
  useEffect(() => {
    function onKeyDown(event) {
      if (event.keyCode === 27) {
        // Close the modal when the Escape key is pressed
        onRequestClose();
      }
    }

    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (ref.current && !ref.current.contains(e.target)) {
        onRequestClose();
      }
    };

    // Prevent scolling
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", checkIfClickedOutside);

    // Clear things up when unmounting this component
    return () => {
      document.body.style.overflow = "visible";
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  });

  return (
    <div className="modal__backdrop">
      <div className="modal__container">
        <div class="">
          <div class="modal-overlay modal-toggle"></div>
          <div class="modal-wrapper modal-transition">
            <div class="modal-layout">
              <div class="flex just">
                <div class="header">What's your rating?</div>
                <div className="close" onClick={clicked}>
                  Close
                </div>
              </div>

              <div class="margin-top-2">Rating</div>

              <div class="flex margin-top-1">
                <ReactStars {...starBlocks} style={{ fontsize: "21px" }} />
              </div>

              <div class="" style={{ marginTop: "1.5rem" }}>
                Review
              </div>
              <div class="margin-top-2">
                <input
                  class=""
                  id="reviewtext"
                  placeholder="Start typing..."
                  onChange={(e) => {
                    setCurrentTextValue(e.target.value);
                  }}
                />
              </div>
              <div class="margin-top-2 button-2">
                <div class="box-layout-small wrapper">
                  <button
                    id="createThing"
                    class="modal-toggle button wrapper button-lay-2"
                    onClick={submitValues}
                  >
                    Submit review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
