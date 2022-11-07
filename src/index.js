import getProducts from "./api/ProductApi.js";
import ProductList from "./component/ProductList.js";

const $productListGrid = document.getElementById('product-card-grid');

const productList = new ProductList($productListGrid, []);

const fetchProductDatas = async () => {
  const products = await getProducts();
  productList.setState(products);
}


fetchProductDatas();