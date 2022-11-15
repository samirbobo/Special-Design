/* check of lockal storge  color*/
let colorOption = localStorage.getItem("color-option");
if (colorOption !== null) {
  // console.log("the local Storge is not Empty");
  // console.log(colorOption);
  document.documentElement.style.setProperty("--main-color", colorOption);

  document
    .querySelectorAll(".setting-box .option-box .color-option li")
    .forEach((element) => {
      element.classList.remove("active");

      if (element.dataset.color === colorOption) {
        element.classList.add("active");
      }
    });
}

/* change Background */
let randomback = true;
/* clear itrval to function */
let intervalBack;
/* check of lockal storge background*/
let backgroundOption = localStorage.getItem("background-option");
if (backgroundOption !== null) {
  document.querySelectorAll(".setting-box .span-box span").forEach((e) => {
    e.classList.remove("active");
  });

  if (backgroundOption === "true") {
    randomback = true;
    document.querySelector(".setting-box .span-box .yes").classList.add("active");
  } else {
    randomback = false;
    document.querySelector(".setting-box .span-box .no").classList.add("active");
  }
}

/* open or close setting */
let icon = document.querySelector(".setting-box .fa-gear");
let setts = document.querySelector(".setting-box");
icon.addEventListener("click", () => {
  icon.classList.toggle("fa-spin");
  setts.classList.toggle("open");
});

/* change color li in setting */
let liColor = document.querySelectorAll(".color-option li");
liColor.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    ); // خزنت اللون الي هيرجعلي بعد الضغط ع القائمه الخاصه بالالوان وهضها في خواص ال سي اس اس علي شكل متغير واي عنصر ف الصفحه يحمل نفس اسم المتغير سوف يتغير للونه

    // عند الضغط ع اللون سوف يخزن قيمته ف الوكل استورتج
    localStorage.setItem("color-option", e.target.dataset.color);

    /* Handle Active Element */
    handelActive(e);
  });
});

/* change Active span in setting */
let backgroundEl = document
  .querySelectorAll(".setting-box .option-box span")
  .forEach((span) => {
    span.addEventListener("click", (e) => {
    /* Handle Active Element */
    handelActive(e);

      if (e.target.dataset.background === "yes") {
        randomback = true;
        randombackground();
        localStorage.setItem("background-option", true); 
      } else {
        randomback = false;
        clearInterval(intervalBack);
        localStorage.setItem("background-option", false);
      }
    });
  });

/* change Bulluts in setting */
let removeBullets = document.querySelectorAll(".setting-box .option-box .Bullets-box span");

let NavigationLocal = document.querySelector(".Navigation-Bullets");

let bulletLocal = localStorage.getItem("bullet-option");
if (bulletLocal !== null) {
  removeBullets.forEach(bullet => {
    bullet.classList.remove("active");
  });
  if(bulletLocal === "block") {
    NavigationLocal.style.display = "block";
    document.querySelector(".setting-box .option-box .Bullets-box .yes").classList.add("active");
  } else {
    NavigationLocal.style.display = "none";
    document.querySelector(".setting-box .option-box .Bullets-box .no").classList.add("active");
  }
}

removeBullets.forEach((Bullet) => {
  Bullet.addEventListener("click", (e) => {
    handelActive(e);
    if(e.target.dataset.bullets === "block") {
      NavigationLocal.style.display = "block";
      localStorage.setItem("bullet-option", e.target.dataset.bullets);
    }else {
      NavigationLocal.style.display = "none";
      localStorage.setItem("bullet-option", e.target.dataset.bullets);
    }
  })
})

/* change background of landing */
let landing = document.querySelector(".landing");
let arr = [
  "imgs/7d98840fdff1b2e7cd508cc7f3a17403.jpg",
  "imgs/download (3).jpg",
  "imgs/images (1).jpg",
  "imgs/download.jpg",
  "imgs/download (1).jpg",
  "imgs/download (4).jpg",
];

function randombackground() {
  if (randomback === true) {
    intervalBack = setInterval(() => {
      landing.style.backgroundImage =
        'url("' + arr[Math.floor(Math.random() * arr.length)] + '")';
    }, 1000);
  }
}
randombackground();

/* scroll to our skills */ 
let ourSkill = document.querySelector(".our-skills");
window.onscroll = function () {
  if (window.scrollY >= ourSkill.offsetTop - 100) {
    let spanSkill = document.querySelectorAll(".our-skills .box-skills .progrees-skills span");
    spanSkill.forEach(span => {
      span.style.width = span.dataset.prog;
    })
  }
}

/* popup skills */ 
let ourImg = document.querySelectorAll(".gallery .imges img");
ourImg.forEach(img => {
  img.addEventListener("click", e => {
    /* انشا الوفر لاي لجعل الشاشه اغمق */
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    /* انشا الصوره التي سوفه تظهر عند الضغط ع الجزء المصغر منها */ 
    let creatDivImg = document.createElement("div");
    creatDivImg.className = ("popup-img");
    /* انشا عنوان للصوره التي ستظهر */
    if(img.alt !== null) {
      let imgHeading = document.createElement("h3");
      imgHeading.className = "img-Heading";
      imgHeading.textContent = img.alt;
      creatDivImg.appendChild(imgHeading);
    }
    /* انشا زر لالغاء الصوره والعوده الي الصفحه */
    let clearButton = document.createElement("div");
    clearButton.className = "clear"; 
    clearButton.textContent = "x";
    creatDivImg.appendChild(clearButton);
    clearButton.onclick = function () {
      clearButton.parentElement.remove();
      overlay.remove();
    }

    let creatImg = document.createElement("img");
    creatImg.src = img.src;
    creatDivImg.appendChild(creatImg);
    document.body.appendChild(creatDivImg);

    /* remove the imge by overlay */
    overlay.addEventListener("click", e => {
      if(e.target !== clearButton && e.target !== creatDivImg) {
        creatDivImg.remove();
        overlay.remove();
      }
    })
  })
})

/* Navigation-Bullets scroll */
let Bullets = document.querySelectorAll(".Navigation-Bullets .Bullets");

Bullets.forEach(bu => {
  bu.addEventListener("click", e => {
    document.querySelector(e.target.dataset.bullet).scrollIntoView({
      behavior: 'smooth'
    });
  })
})

/* Handle Active Element */
function handelActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((x) => {
    x.classList.remove("active");
  });
  // add class active for li
  ev.target.classList.add("active");
}

/* reset all option of local storge */
let resetOption = document.querySelector(".reset-option");
resetOption.onclick = function () {
  // First Method
  // localStorage.clear() // خاصيه بتخلني احذف كل الي في الوكل ولكن مش محببه لو بتخزن بيانات للاشخاص ع الموقع لانها هتتمسح

  // Second Method
  // خاصيه بتخلني احذف العنصر الي انا عايزه من الوكل مش الكل ودا المفضل
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullet-option");

  window.location.reload(); // تعيد تحميل الصفحه
}

/* Show Links in small screen */

let toggle = document.querySelector(".landing .count-links .toggle");
let links = document.querySelector(".landing .count-links .links");
toggle.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("meun-active");
  links.classList.toggle("show");
}
links.onclick = function (e) {
  e.stopPropagation();
}
document.addEventListener("click", e => {
  if(e.target !== toggle && e.target !== links) {

    if(links.classList.contains("show")) {
      toggle.classList.toggle("meun-active");
      links.classList.toggle("show");
    }
  }
})

/* make header fixed in page */
/* طريقه لتثبيت الهيد في الصفحه */
// window.addEventListener("scroll", function () {
  //   let head = this.document.querySelector(".landing header");
  //   head.classList.toggle("down", window.scrollY > 0);
  // })

let fixed = document.querySelectorAll(".setting-box .option-box .fixed-box span");
let head = this.document.querySelector(".landing header");

let fixedlocal = localStorage.getItem("fixed-option");
if (fixedlocal !== null) {
  fixed.forEach(fix => {
    fix.classList.remove("active");
  });
  if(fixedlocal === "scrolling") {
    head.classList.add("down");
    document.querySelector(".setting-box .option-box .fixed-box .yes").classList.add("active");
  }else {
    head.classList.remove("down");
    document.querySelector(".setting-box .option-box .fixed-box .no").classList.add("active");
  }
}

fixed.forEach(fix => {
  fix.addEventListener("click", e => {
    if(e.target.dataset.fixed === "scrolling") {
      head.classList.add("down");
      localStorage.setItem("fixed-option", e.target.dataset.fixed);
    } else {
      head.classList.remove("down");
      localStorage.setItem("fixed-option", e.target.dataset.fixed);
    }
  })
})