 class ProductList {
  constructor($target, initData) {
    this.$target = $target;
    this.state = initData;
  }

  setState(newState) {
    this.state = newState;
    this.render(); 
  }

  render() {
    if (this.state.length === 0) {
      return this.$target.innerHTML = '<h3>상품이 없습니다.</h3> '
    }
    const productCards = this.state.map(product => {
      return `    
        <article id="product-card">
        <div class="rounded-lg overflow-hidden border-2 relative">
          <img
            src="${product.imgSrc}"
            class="object-center object-cover"
          />
          <div
            class="hover:bg-sky-500 w-full h-full absolute top-0 left-0 opacity-90 transition-colors ease-linear duration-75"
          >
            <div
              data-productid="${product.id}"
              class="hover:opacity-100 opacity-0 w-full h-full flex justify-center items-center text-xl text-white font-bold cursor-pointer"
            >
              장바구니에 담기
            </div>
          </div>
        </div>
        <h3 class="mt-4 text-gray-700">${product.name}</h3>
        <p class="mt-1 text-lg font-semibold text-gray-900">${product.price.toLocaleString()}원</p>
      </article>`
    }).join('');
  
   return this.$target.innerHTML = productCards;
  }
 }

 export default ProductList;