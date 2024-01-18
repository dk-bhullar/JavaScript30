function revealToSpan() {
  document.querySelectorAll(".reveal").forEach((elem) => {
    let spanParent = document.createElement("span");
    let spanChild = document.createElement("span");

    spanParent.classList.add("parent");
    spanChild.classList.add("child");

    spanChild.innerHTML = elem.innerHTML;
    spanParent.appendChild(spanChild);

    elem.innerHTML = "";
    elem.appendChild(spanParent);
  });
}

function loaderAnimation() {
  let tl = gsap.timeline();

  tl.from(" .parent span", {
    x: "100%",
    stagger: 0.3,
    duration: 2,
    delay: 1,
    ease: Power3.easeInOut,
  })
    .to(".parent .child", {
      y: "-100%",
      duration: 1,
      delay: 5,
      ease: Circ.easeInOut,
    })

    .to("#loader", {
      height: 0,
      duration: 0.8,
      ease: Circ.easeInOut,
    })
    .to("#green", {
      height: "100%",
      top: 0,
      duration: 1,
      delay: -0.5,
      ease: Circ.easeInOut,
    })
    .to("#green", {
      height: "0%",
      duration: 1,
      delay: -0.5,
      ease: Circ.easeInOut,
      onComplete: function () {
        animateHomepage();
      },
    });
}
function valueSetters() {
  gsap.set(".carousel", { y: "200%", opacity: 0 });
}

function animateHomepage() {
  let tl = gsap.timeline();
  tl.to(".carousel", {
    y: 0,
    opacity: 1,
    duration: 1.5,
    delay: -0.8,
    ease: Circ.easeInOut,
  });
  let nextDom = document.getElementById("next");
  let prevDom = document.getElementById("prev");

  let carouselDom = document.querySelector(".carousel");
  let SliderDom = carouselDom.querySelector(".carousel .list");
  let thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
  let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");
  let timeDom = document.querySelector(".carousel .time");

  thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
  let timeRunning = 3000;
  let timeAutoNext = 7000;

  nextDom.onclick = function () {
    showSlider("next");
  };

  prevDom.onclick = function () {
    showSlider("prev");
  };
  let runTimeOut;
  let runNextAuto = setTimeout(() => {
    next.click();
  }, timeAutoNext);

  function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll(".carousel .list .item");
    let thumbnailItemsDom = document.querySelectorAll(
      ".carousel .thumbnail .item"
    );

    if (type === "next") {
      SliderDom.appendChild(SliderItemsDom[0]);
      thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
      carouselDom.classList.add("next");
    } else {
      SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
      thumbnailBorderDom.prepend(
        thumbnailItemsDom[thumbnailItemsDom.length - 1]
      );
      carouselDom.classList.add("prev");
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
      carouselDom.classList.remove("next");
      carouselDom.classList.remove("prev");
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
      next.click();
    }, timeAutoNext);
  }
}

revealToSpan();
valueSetters();
loaderAnimation();
