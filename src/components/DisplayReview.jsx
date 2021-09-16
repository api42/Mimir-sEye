import { useEffect, useState } from "react";

import db from "./../db/firebase";

export const DisplayReview = () => {
  const [info, setInfo] = useState([]);

  // Start the fetch operation as soon as
  // the page loads

  useEffect(() => {
    const unsubscribe = db
      .collection("reviews")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setInfo(snapshot.docs.map((doc) => doc.data()));
      });
    return () => {
      //Unsub to stop memory leak and data duplications
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <div class="divider"></div>
      <div class="section-scroll">
        <div class="subheader">Reviews</div>
      </div>

      <div style={{ marginTop: "20px" }}>
        {info.map((data) => (
          <Frame
            star={data.star}
            reviewtext={data.reviewtext}
            time={data.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

const Frame = ({ star, reviewtext, time }) => {
  const starPercentage = (star / 5) * 100;

  // Round to nearest 10
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

  return (
    <div className="div" key={time}>
      <li className="flex">
        <div class="stars-outer">
          <div
            class="stars-inner"
            style={{ width: starPercentageRounded }}
          ></div>
        </div>
        <div class="number-rating">{star}</div>
        <div className="reviewtext"> {reviewtext}</div>
      </li>
    </div>
  );
};
