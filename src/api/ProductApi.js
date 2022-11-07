const getProducts = async () => {
  const response = await fetch('./api/productData.json');
  const products = await response.json();
  return products;
}

export default getProducts;