// Core Javascript and jquery used here

// Modal toggle

$(".modal-toggle").on("click", function (e) {
  e.preventDefault();
  $(".modal").toggleClass("is-visible");
});

// Start: Fireabase database interaction

//Display all the reviews

document.addEventListener("DOMContentLoaded", (event) => {
  const app = firebase.app();
  console.log("app");
  const db = firebase.firestore();

  const createThing = document.getElementById("createThing");
  const thingsList = document.getElementById("thingsList");

  let thingsRef;
  let unsubscribe;

  // unsbscribe is to stop memory leaking in certain cases.

  let rt = document.querySelector("#reviewtext");

  thingsRef = db.collection("reviews");

  createThing.onclick = () => {
    const { serverTimestamp } = firebase.firestore.FieldValue;
    let rtin = rt.value;
    var ratingValue = parseInt(
      $("#stars li.selected").last().data("value"),
      10
    );

    thingsRef.add({
      reviewtext: rtin,
      stars: ratingValue,
      createdAt: serverTimestamp(),
    });
  };

  unsubscribe = thingsRef.orderBy("createdAt").onSnapshot((querySnapshot) => {
    // Map results to an array of li elements

    const items = querySnapshot.docs.map((doc) => {
      var x = doc.data().stars;

      const starPercentage = (x / 5) * 100;

      // Round to nearest 10
      const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

      return `<li>
        <div class="stars-outer">
        <div class="stars-inner" style="width: ${starPercentageRounded}">
        </div>
      </div>
      <span class="number-rating">${doc.data().stars}</span>

        ${doc.data().reviewtext}</li>`;
    });

    thingsList.innerHTML = items.join("");
  });
});

// Star selctions

$(document).ready(function () {
  $("#stars li")
    .on("mouseover", function () {
      var onStar = parseInt($(this).data("value"), 10); // The star currently mouse on

      $(this)
        .parent()
        .children("li.star")
        .each(function (e) {
          if (e < onStar) {
            $(this).addClass("hover");
          } else {
            $(this).removeClass("hover");
          }
        });
    })
    .on("mouseout", function () {
      $(this)
        .parent()
        .children("li.star")
        .each(function (e) {
          $(this).removeClass("hover");
        });
    });

  /* 2. Action to perform on click */
  $("#stars li").on("click", function () {
    var onStar = parseInt($(this).data("value"), 10); // The star currently selected
    var stars = $(this).parent().children("li.star");

    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass("selected");
    }

    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass("selected");
    }
  });
});
