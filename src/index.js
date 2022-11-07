import getProducts from "./api/ProductApi.js";
import CartList from "./component/CartList.js";
import ProductList from "./component/ProductList.js";

const $productListGrid = document.getElementById('product-card-grid');
const $shoppingCartSection = document.getElementById('shopping-cart');
const $openCartButton = document.getElementById('open-cart-btn');
const $closeCartButton = document.getElementById('close-cart-btn');
const $backdrop = document.getElementById('backdrop');
const $cartList = document.getElementById('cart-list');
const $cartTotalCount = document.getElementById('total-count');

let productData = [];

const productList = new ProductList($productListGrid, productData);
const cartList = new CartList($cartList, []);

const fetchProductDatas = async () => {
  productData = await getProducts();
  productList.setState(productData);
}
fetchProductDatas();

const toggleCart = () => {
  $shoppingCartSection.classList.toggle('translate-x-full');
  $shoppingCartSection.classList.toggle('translate-x-0');
  $backdrop.hidden = !$backdrop.hidden;
};

const calcTotalPrice = () => {
  $cartTotalCount.innerText = `${cartList.totalPrice().toLocaleString()}원`;
}

const addCartItem = (e) => {
  const clickedProductId = parseInt(e.target.dataset.productid);
  if (!clickedProductId) {
    return;
  }
  const product = productData.find((product) => product.id === clickedProductId);
  if (!product) {
    return;
  }
  cartList.addCartItem(product);
  calcTotalPrice();
  toggleCart();
}

const removeCart = (e) => {
  if (e.target.className === 'remove-btn') {
    const currentProductId = parseInt(e.target.closest('li').id);
    cartList.removeCartItem(currentProductId);
    calcTotalPrice();
  }
}

$openCartButton.addEventListener('click', toggleCart);
$closeCartButton.addEventListener('click', toggleCart);
$backdrop.addEventListener('click', toggleCart);
$productListGrid.addEventListener('click',  addCartItem);
$cartList.addEventListener('click', removeCart);
