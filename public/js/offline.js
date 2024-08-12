function showOffline() {
  const cardProductEl = document.querySelectorAll(".card-product");

  cards.insertAdjacentHTML("afterend", `<div id="network" ></div>`);

  document.getElementById("network").innerHTML = `網路連接失敗，請重新載入...`;

  cardProductEl.forEach((cardProduct) => {
    cardProduct.style.filter = "grayscale(75%)";
    cardProduct.style.cursor = "no-drop";
  });
}

function recoverOnline() {
  const cardProductEl = document.querySelectorAll(".card-product");
  document.getElementById("network").remove();
  cardProductEl.forEach((cardProduct) => {
    cardProduct.style.filter = "none";
    cardProduct.style.cursor = "pointer";
  });
}

window.addEventListener("offline", () => {
  showOffline();
});

window.addEventListener("online", () => {
  recoverOnline();
});
