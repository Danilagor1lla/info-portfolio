const navbar = document.getElementById("navbar");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
  themeIcon.textContent = "☀️";
}

window.addEventListener("scroll", () => {
  const heroHeight = window.innerHeight * 0.45;

  if (window.scrollY > heroHeight) {
    navbar.classList.add("nav-visible");
  } else {
    navbar.classList.remove("nav-visible");
  }

  updateActiveLink();
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const isLight = document.body.classList.contains("light-theme");

  themeIcon.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

function updateActiveLink() {
  let currentSectionId = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 180;

    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
}

// === Typewriter для заголовка h1 ===
const typedTitleSpan = document.querySelector(".typed-title");
const cursorTitle = document.querySelector(".cursor-title");

const titles = ["Web Developer", "Business Analyst"];
let titleIndex = 0;
let charTitleIndex = 0;
let isDeletingTitle = false;

function typeTitleEffect() {
  const currentTitle = titles[titleIndex];

  if (isDeletingTitle) {
    if (charTitleIndex <= 1) {
      titleIndex = (titleIndex + 1) % titles.length;
      charTitleIndex = 1;
      isDeletingTitle = false;

      typedTitleSpan.textContent = titles[titleIndex].substring(0, charTitleIndex);

      setTimeout(typeTitleEffect, 120);
      return;
    }

    typedTitleSpan.textContent = currentTitle.substring(0, charTitleIndex - 1);
    charTitleIndex--;
  } else {
    typedTitleSpan.textContent = currentTitle.substring(0, charTitleIndex + 1);
    charTitleIndex++;
  }

  if (!isDeletingTitle && charTitleIndex === currentTitle.length) {
    isDeletingTitle = true;
    setTimeout(typeTitleEffect, 1500);
    return;
  }

  const speed = isDeletingTitle ? 50 : 100;
  setTimeout(typeTitleEffect, speed);
}

typeTitleEffect();