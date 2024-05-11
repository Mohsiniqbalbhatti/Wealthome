let likedElements = document.querySelectorAll(".liked");
let unlikedElements = document.querySelectorAll(".unliked");

function toggleVisibility(liked, unliked) {
  if (unliked.style.display === "block" || unliked.style.display === "") {
    unliked.style.display = "none";
    liked.style.display = "block";
  } else {
    unliked.style.display = "block";
    liked.style.display = "none";
  }
}

unlikedElements.forEach(function (unliked) {
  unliked.addEventListener("click", function () {
    let liked = unliked.nextElementSibling;
    toggleVisibility(liked, unliked);
  });
});

likedElements.forEach(function (liked) {
  liked.addEventListener("click", function () {
    let unliked = liked.previousElementSibling;
    toggleVisibility(liked, unliked);
  });
});
//
//
// close nav bar with click  on document
//
//
let nav = document.querySelector(".navbar-collapse");

document.addEventListener("click", function (event) {
  // Check if the click is outside the nav element
  if (nav.classList.contains("show")) {
    // Use the Bootstrap classes to toggle the display
    console.log(nav.classList);
    nav.classList.remove("show");
  }
});

document.addEventListener("scroll", function (event) {
  if (window.scrollY >= 200) {
    // Check if the click is outside the nav element
    if (nav.classList.contains("show")) {
      // Use the Bootstrap classes to toggle the display
      console.log(nav.classList);
      nav.classList.remove("show");
    }
  }
});
// whatsapp box

let whatsapp = document.querySelector(".whatsappbox");
document.addEventListener("scroll", () => {
  let scrollpercentage =
    ((window.scrollY + window.innerHeight) / document.body.clientHeight) * 100;
  if (scrollpercentage < 20) {
    whatsapp.style.display = "none";
  } else if (scrollpercentage >= 90) {
    whatsapp.style.display = "none";
  } else {
    whatsapp.style.display = "flex";
  }
});

// scroll to top
let backtotop = document.querySelector(".backtotop");
document.addEventListener("scroll", () => {
  let scrollpercentage =
    ((window.scrollY + window.innerHeight) / document.body.clientHeight) * 100;
  if (scrollpercentage >= 90) {
    backtotop.style.display = "flex";
  } else {
    backtotop.style.display = "none";
  }
});
