"use strict";
// после просмотра разбора дз, все функции названы как и в видео, для удобства проверки
const numOfProducts = document.querySelector(".cartIconWrap>span");
const buttonsEL = document.querySelectorAll("button");
const basketIconEl = document.querySelector(".cartIcon");
const basketEl = document.querySelector(".basket");
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelector('.basketTotalValue');

numOfProducts.textContent = 0;
let basket = {};

basketIconEl.addEventListener("mouseover", 
  () => basketEl.classList.remove("hidden"));
basketIconEl.addEventListener("mouseout",
  () => basketEl.classList.add("hidden"));
buttonsEL.forEach(buttunEL => buttunEL.addEventListener("click", event => {
  const id = buttunEL.closest(".featuredItem").dataset.id;
  const name = buttunEL.closest(".featuredItem").dataset.name;
  const price = buttunEL.closest(".featuredItem").dataset.price;
 addCardToBasket(id, name, price);
 numOfProducts.textContent++;
 
}));

function addCardToBasket(id, name, price) {
  if (id in basket) {
    basket[id].count++;
  } else {
    basket[id] = {
        name: name,
        price: price,
        count: 1, 
      };
    }
    renderProductInBasket(id);
    basketTotalValueEl.textContent = (Number.parseFloat(basketTotalValueEl.textContent) 
      + Number.parseFloat(basket[id].price)).toFixed(2);
}
// К сожалению, функции отображения не смог написать сам, они полностью переписаны из видео...
function renderProductInBasket(productId) {
    const basketRowEl = basketEl
      .querySelector(`.basketRow[data-id="${productId}"]`);
    if (!basketRowEl) {
      renderNewProductInBasket(productId);
      return;
    }
  const product = basket[productId];
  basketRowEl.querySelector('.productCount').textContent = product.count;
  basketRowEl
    .querySelector('.productTotalRow')
    .textContent = (product.price * product.count).toFixed(2);
}


function renderNewProductInBasket(productId) {
    const productRow = `
      <div class="basketRow" data-id="${productId}">
        <div>${basket[productId].name}</div>
        <div>
          <span class="productCount">${basket[productId].count}</span> шт.
        </div>
        <div>$${basket[productId].price}</div>
        <div>
          $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
        </div>
      </div>
      `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
  }
  