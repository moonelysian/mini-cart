import getProducts from "./api/ProductApi.js";
import ProductList from "./component/ProductList.js";

const $productListGrid = document.getElementById('product-card-grid');
const $shoppingCartSection = document.getElementById('shopping-cart');
const $openCartButton = document.getElementById('open-cart-btn');
const $closeCartButton = document.getElementById('close-cart-btn');
const $backdrop = document.getElementById('backdrop');

const productList = new ProductList($productListGrid, []);
const fetchProductDatas = async () => {
  const products = await getProducts();
  productList.setState(products);
}
fetchProductDatas();


const toggleCart = () => {
  $shoppingCartSection.classList.toggle('translate-x-full');
  $shoppingCartSection.classList.toggle('translate-x-0');
  $backdrop.hidden = !$backdrop.hidden;
};

$openCartButton.addEventListener('click', toggleCart);
$closeCartButton.addEventListener('click', toggleCart);
$backdrop.addEventListener('click', toggleCart);
$productListGrid.addEventListener('click', toggleCart);
