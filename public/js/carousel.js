const carouselDot = document.querySelectorAll(".carousel-dot")[0];
const carouselImage = document.querySelectorAll(".carousel-image")[0];
const homeStory = document.querySelectorAll(".home-story")[0];

let urlCarousel = "https://api.appworks-school.tw/api/1.0/marketing/campaigns";
let currentSlide = 0;
let carouselData = [];
let slides;
let timer;

async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`"ERROR ,"${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("fetch error", err);
  }
}

function splitStory(story) {
  const splitArray = story.split(/\r\n|\n|\r/);
  const splitBr = splitArray.slice(0, -1).join("<br>");
  const storyTop = `<span>${splitBr}</span>`;
  const storyBottom = `<p>${splitArray[splitArray.length - 1]}</p>`;
  story = storyTop + storyBottom;
  return story;
}

function renderCarousel(carousel) {
  if (carousel) {
    let splitStories = splitStory(carousel[currentSlide].story);
    carouselImage.src = carousel[currentSlide].picture;
    homeStory.innerHTML = "";
    homeStory.insertAdjacentHTML("beforeend", `${splitStories}`);
  }
}

function renderCarouselDot(dots) {
  for (let i = 0; i < dots.length; i++) {
    const li = `<li onclick=clickSlide(${i})></li>`;
    carouselDot.insertAdjacentHTML("beforeend", li);
  }
}

function showSlide() {
  slides[currentSlide].classList.add("active");
  renderCarousel(carouselData);
}

function nextSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide();
}

function clickSlide(index) {
  slides[currentSlide].classList.remove("active");
  currentSlide = index;
  showSlide();
  clearInterval(timer);
  timer = setInterval(nextSlide, 3000);
}

function timeout(time) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("request time out")), time) 
  );
}

async function loadCarousel() {
  Promise.race([getData(urlCarousel), timeout(3000)])
    .then((carousel) => {
      carouselData = carousel.data;
      renderCarousel(carousel.data);
      renderCarouselDot(carousel.data);
      slides = carouselDot.querySelectorAll("li");
      slides[currentSlide].classList.add("active");
      timer = setInterval(nextSlide, 3000);
    })
    .catch((err) => {
      console.error("Error", err.message);
    });
}

loadCarousel();
