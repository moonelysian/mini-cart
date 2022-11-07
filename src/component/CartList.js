class CartList {
  constructor($target, state) {
    this.state = state;
    this.$section = document.createElement('ul');
    this.$section.className = 'divide-y divide-gray-200';
    $target.appendChild(this.$section);
    this.render();
  }

  setState(newState) {
    this.state = newState;
    this.render(); 
  } 

  addCartItem(product) {
    const newState = [...this.state, {...product, count: 1}];
    this.setState(newState);
  }

  render() {
    this.$section.innerHTML = this.state
      .map(({ id, imgSrc, name, price, count }) =>`
        <li class="flex py-6" id=${id}>
          <div class="h-24 w-24 overflow-hidden rounded-md border border-gray-200">
            <img
              src="${imgSrc}"
              class="h-full w-full object-cover object-center"
            />
          </div>
          <div class="ml-4 flex flex-1 flex-col">
            <div>
              <div class="flex justify-between text-base font-medium text-gray-900">
                <h3>${name}</h3>
                <p class="ml-4">${(price * count).toLocaleString()}원</p>
              </div>
            </div>
            <div class="flex flex-1 items-end justify-between">
              <div class="flex text-gray-500">
                <button class="decrease-btn">-</button>
                <div class="mx-2 font-bold">${count}개</div>
                <button class="increase-btn">+</button>
              </div>
              <button type="button" class="font-medium text-sky-400 hover:text-sky-500">
                <p class="remove-btn">삭제하기</p>
              </button>
            </div>
          </div>
        </li>
      `).join('');
  }
 }

 export default CartList;