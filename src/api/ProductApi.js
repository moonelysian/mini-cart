const request = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const error = await response.json();
      throw error; 
    }
    const data = await response.json();
    return data
  } catch(e) {
    console.log(e);
  }
} 

const getProducts = async () => {
  const products = await request('./api/productData.json');
  return products;
}

export default getProducts;