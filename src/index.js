import getProducts from "./api/ProductApi.js";
import CartList from "./component/CartList.js";
import ProductList from "./component/ProductList.js";

const $productListGrid = document.getElementById('product-card-grid');
const $shoppingCartSection = document.getElementById('shopping-cart');
const $openCartButton = document.getElementById('open-cart-btn');
const $closeCartButton = document.getElementById('close-cart-btn');
const $backdrop = document.getElementById('backdrop');
const $cartList = document.getElementById('cart-list');
const $payButton = document.getElementById('payment-btn');

let productData = [];
let cartItems = [];

const initCartItems = () => {
  const savedCartState = localStorage.getItem('cartState');
  if (savedCartState) {
    cartItems = JSON.parse(savedCartState);
    cartList.setState(cartItems);
  }
};

const initProductData = async () => {
  productData = await getProducts();
  productList.setState(productData);
}

const productList = new ProductList($productListGrid, productData);
const cartList = new CartList($cartList, []);

const toggleCart = () => {
  $shoppingCartSection.classList.toggle('translate-x-full');
  $shoppingCartSection.classList.toggle('translate-x-0');
  $backdrop.hidden = !$backdrop.hidden;
};

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
  toggleCart();
}

const modifyCartItem = (e) => {
  const currentProductId = parseInt(e.target.closest('li').id);
  if (e.target.className === 'remove-btn') {
    return cartList.removeCartItem(currentProductId);
  }
  if (e.target.className === 'increase-btn') {
    return cartList.increaseItemCount(currentProductId);
  }
  if (e.target.className === 'decrease-btn') {
    return cartList.decreaseItemCount(currentProductId);
  }
}

const saveCartToLocal = () => {
  return cartList.saveCartToStorage();
}

$openCartButton.addEventListener('click', toggleCart);
$closeCartButton.addEventListener('click', toggleCart);
$backdrop.addEventListener('click', toggleCart);
$productListGrid.addEventListener('click',  addCartItem);
$cartList.addEventListener('click', modifyCartItem);
$payButton.addEventListener('click', saveCartToLocal);

initProductData();
initCartItems();
