const btn = document.querySelector("#toggleBtn");
const text = document.querySelector("#output");
const pageBody = document.body;
const container = document.querySelector(".container");

btn.addEventListener("click", () => {
  pageBody.classList.toggle("darkmode");
  container.classList.toggle("darkmode");

  if (pageBody.classList.contains("darkmode")) {
    btn.textContent = "Lightmode";
    text.textContent = "Hi, I am cutie anne";
  } else {
    btn.textContent = "Darkmode";
    text.textContent = "Welcome";
  }
});

