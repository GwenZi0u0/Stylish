const cards = document.querySelectorAll("card-content")[0];
const logo = document.getElementById("logo");
const searchInputFrame = document.getElementById("search-input");
const searchIcon = document.querySelectorAll(".search-icon")[0];

let url = "https://api.appworks-school.tw/api/1.0/products/";
// preset
let cancelInput = false;
let nextPage = 0;
let stillHavaData = true;
let isLoading = false;

function getParameter(keys) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(keys);
}

function updataParameter(key, keyValue) {
  const params = new URLSearchParams();
  params.set(key, keyValue);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, "", newUrl);
}

function clearParameter() {
  const newUrl = `${window.location.pathname}`;
  window.history.pushState({}, "", newUrl);
}

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

function timeout(time) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("request time out")), time)
  );
}

function removeLoading() {
  let loadingEl = document.querySelectorAll(".loading");
  loadingEl.forEach((element) => {
    element.remove();
  });
}
console.log(removeLoading())

function render(product) {
  if (product) {
    product.forEach((item) => {
      let colorsHtml = "";
      item.colors.forEach((color) => {
        colorsHtml += `
        <div class="color" style="background-color: #${color.code};"></div>
        `;
      });

      cards.insertAdjacentHTML(
        "beforeend",
        `
        <a href="./product.html?id=${item.id}" class="card-product">
            <img class="loading" src="./image/loading.gif" alt="loading...">
            <img class="product-img" src="${item.main_image}" onload="removeLoading(this)" alt="card">
            <div class="color-choose">
            ${colorsHtml}
            </div>
            <div class="product-name">
                ${item.title}
                <span>TWD.${item.price}</span>
            </div>
        </a>
        `
      );
    });
  } else {
    cards.insertAdjacentHTML(
      "beforebegin",
      `
      <h3 id="remind">暫時沒有商品上架</h3>
      `
    );
  }
}

async function loadProducts(category, searchKeyword = "") {
  let urlProducts;
  if (searchKeyword) {
    urlProducts = url + searchKeyword;
  } else {
    urlProducts = url + category + "?paging=" + nextPage;
  }
  isLoading = true;
  Promise.race([getData(urlProducts), timeout(3000)])
    .then((product) => {
      isLoading = false;
      let dataLength = product.data.length;
      if (dataLength > 0) {
        render(product.data);
        if (product.next_paging) {
          nextPage = product.next_paging;
        } else {
          nextPage = undefined;
          stillHavaData = false;
        }
      }
    })
    .catch((err) => {
      console.error("Error", err.message);
    });
}

function init() {
  nextPage = 0;
  cards.innerHTML = "";
  let getKeyword = getParameter("keyword");
  if (getKeyword) {
    let param = "search?keyword=";
    loadProducts("", param + getKeyword);
  } else {
    loadProducts(getParameter("category") || "all");
  }
}

init();

function handleCategoryClick(category) {
  if (category) {
    updataParameter("category", category);
  } else {
    const newUrl = window.location.pathname;
    window.history.pushState({}, "", newUrl);
  }
  init();
  window.location.reload();
}

const categories = {
  logo: null,
  tabWomen: "women",
  tabMen: "men",
  tabAccessories: "accessories",
};

Object.keys(categories).forEach((tabId) => {
  const category = document.querySelector(`#${tabId}`);
  if (category) {
    category.addEventListener("click", () => {
      handleCategoryClick(categories[tabId]);
    });
  }
});

window.onpopstate = function () {
  init();
};

function searchInput(input) {
  input.addEventListener("compositionstart", function () {
    cancelInput = false;
  });

  input.addEventListener("compositionend", function () {
    cancelInput = true;
  });
  input.addEventListener("keydown", async (e) => {
    let inputValue = input.value;
    let urlProducts = url + "search" + "?keyword=" + inputValue;
    const remind = document.getElementById("remind");
    if (e.key === "Enter") {
      e.preventDefault();
      if (!cancelInput) {
        return;
      }
      input.blur();
      cards.innerHTML = "";
      if (inputValue === "") {
        if (remind) {
          remind.remove();
        }
        clearParameter();
        init();
        return;
      }
      const data = await getData(urlProducts);
      try {
        const filteredData = data.data.filter((product) =>
          product.title.includes(inputValue)
        );
        if (filteredData.length > 0) {
          if (remind) {
            remind.remove();
          }
          updataParameter("keyword", inputValue);
          render(filteredData);
        } else {
          if (remind) {
            remind.innerHTML = "";
            remind.insertAdjacentText(
              "beforeend",
              `
                找不到"${inputValue}"有關的商品
                `
            );
          } else {
            cards.insertAdjacentHTML(
              "beforebegin",
              `
                <h3 id="remind">找不到"${inputValue}"有關的商品</h3>
                `
            );
          }
        }
      } catch (err) {
        console.error("Error filteredData", err);
      }
    }
  });
}

searchInput(searchInputFrame);

function showSearch(e) {
  e.stopPropagation();
  logo.style.display = "none";
  searchInputFrame.style.display = "flex";
}

function hideSearch(e) {
  e.stopPropagation();
  logo.style.display = "block";
  searchInputFrame.style.display = "none";
}

function searchClick(e) {
  e.stopPropagation();
}

function handleMobileSearch() {
  const mobileSearch = window.innerWidth <= 1279.9;

  if (mobileSearch) {
    searchIcon.addEventListener("click", showSearch);
    window.addEventListener("click", hideSearch);
    searchInputFrame.addEventListener("click", searchClick);
  } else if (!mobileSearch) {
    searchIcon.removeEventListener("click", showSearch);
    window.removeEventListener("click", hideSearch);
    searchInputFrame.removeEventListener("click", searchClick);
  }
}

handleMobileSearch();
window.addEventListener("resize", handleMobileSearch);

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    stillHavaData &&
    !isLoading
  ) {
    let getKeyword = getParameter("keyword");
    if (getKeyword) {
      let param = "search?keyword=";
      loadProducts("", param + getKeyword);
    } else {
      loadProducts(getParameter("category") || "all");
    }
  }
});


