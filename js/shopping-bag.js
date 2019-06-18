const orderNow = document.querySelector(".order__container .button--accent");
const basketText = document.querySelector(".basket p");
const table = document.querySelector("table");

generateProductBag();
recalculatePrice();
updateBasket();

orderNow.addEventListener("click", order);
table.addEventListener("click", tableDeleteItem);
table.addEventListener("change", tableChangeAmount);

function order() {
  localStorage.removeItem("cart");
  let link = document.createElement("a");
  link.setAttribute("type", "hidden");
  link.href = "5_thank-you.html";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function tableDeleteItem(e) {
  let row = e.target.parentNode.parentNode;
  if (row.nodeName !== "TR") {
    row = row.parentNode;
  }
  let model = row.querySelector(".productname h3").innerText;
  let size = row.querySelector(".size").innerText;
  if (e.target.nodeName === "IMG") {
    row.parentNode.removeChild(row);
    if (localStorage.getItem("cart")) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      cart.forEach(function(value, index, array) {
        if (value.model === model && value.size === size) {
          array.splice(index, 1);
          return;
        }
      });
      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    updateBasket();
    recalculatePrice();
  }
}

function updateBasket() {
  let count = [].reduce.call(
    document.querySelectorAll("tr input"),
    function(prev, cur) {
      return prev + parseInt(cur.value);
    },
    0
  );

  basketText.innerText = "Basket (" + count + ")";
}

function tableChangeAmount(e) {
  if (e.target.nodeName === "INPUT") {
    let row = e.target.parentNode.parentNode;
    let rowPrice = row.querySelector(".product__price").innerText;
    let size = row.querySelector(".size");
    let model = row.querySelector(".productname h3").innerText;
    if (parseInt(size) !== NaN && localStorage.getItem("cart")) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      cart.forEach(function(value) {
        if (value.model === model && value.size === size) {
          value.count = parseInt(e.target.value);
          return;
        }
      });
    }
    recalculatePrice();
    updateBasket();
  }
}

function recalculatePrice() {
  let newprice = [].reduce.call(
    document.querySelectorAll(".product"),
    function(previous, current) {
      return (
        previous +
        parseFloat(
          current.querySelector(".product__price").innerText.slice(2)
        ) *
          parseInt(current.querySelector("input").value)
      );
    },
    0
  );
  newprice = newprice.toFixed(2);
  document.querySelector(".price").innerText = newprice + " €";
}
function generateProductBag() {
  let cart = localStorage.getItem("cart");
  if (cart) {
    let tbody = document.querySelector("tbody");
    cart = JSON.parse(cart);
    cart.forEach(function(value, index) {
      let img;
      let ref;
      let price;
      if (value.model === "FLORAL PLIMSOLL") {
        img = "img/product_images/thumbnail1.jpg";
        ref = "Ref. 2514/302";
        price = "€ 99.95";
      } else {
        img = "img/product_images/thumbnail6.jpg";
        ref = "Ref. 1828/666";

        price = "€ 149.95";
      }
      let productRow = document.createElement("tr");
      productRow.className = "product";
      let productImageCell = document.createElement("td");
      let productImage = document.createElement("img");
      productImage.src = img;
      productImage.width = 100;
      productImage.height = 100;
      productImage.alt = "product" + (index + 3);
      productImage.name = "product" + (index + 3);
      productImageCell.appendChild(productImage);
      let productDescCell = document.createElement("td");
      let productDescCellCont = document.createElement("div");
      productDescCellCont.className = "productname";
      let productDescCellName = document.createElement("h3");
      productDescCellName.innerText = value.model;
      let productDescCellRef = document.createElement("p");
      productDescCellRef.innerText = ref;
      productDescCellCont.appendChild(productDescCellName);
      productDescCellCont.appendChild(productDescCellRef);
      productDescCell.appendChild(productDescCellCont);
      let productColorCell = document.createElement("td");
      productColorCell.innerText = "One Color";
      productColorCell.className = "color";
      let productSizeCell = document.createElement("td");
      productSizeCell.className = "size";
      productSizeCell.innerText = value.size;
      let productQtyCell = document.createElement("td");
      let productQtyInput = document.createElement("input");
      productQtyInput.type = "number";
      productQtyInput.value = value.count;
      productQtyInput.min = "1";
      productQtyCell.appendChild(productQtyInput);
      let productAmountCell = document.createElement("td");
      productAmountCell.className = "product__price";
      productAmountCell.innerText = price;
      let productDeleteCell = document.createElement("td");
      let productDeleteImage = document.createElement("img");
      productDeleteImage.src = "img/icons/x.png";
      productDeleteImage.alt = "delete";
      productDeleteImage.name = "delete";
      productDeleteCell.appendChild(productDeleteImage);
      productRow.appendChild(productImageCell);
      productRow.appendChild(productDescCell);
      productRow.appendChild(productColorCell);
      productRow.appendChild(productSizeCell);
      productRow.appendChild(productQtyCell);
      productRow.appendChild(productAmountCell);
      productRow.appendChild(productDeleteCell);
      tbody.appendChild(productRow);
      //TODO: GENERATE CART
    });
  }
}
