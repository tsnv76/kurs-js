const main = document.querySelector('#main');

let shoppingCart = []
let emptyBasket = '<p>Ваша корзина пуста</p>'

function Item(product, image, price, quantity, discount=0) {
    this.product = product;
    this.image = `img/${image}.png`;
    this.price = price;
    this.quantity = quantity;
    this.discount = discount;
    this.finalPrice = function() {
        if (this.discount != 0) {
            return this.price - this.price*this.discount/100;
        } else {
            return this.price;
        }
    }
    this.showMyChart = function() {
        return `${this.product} (количество: ${this.quantity})`;
    }
}

shoppingCart.push(
    new Item('Материнская плата', 'mb', 9500, 2, 5)
);
shoppingCart.push(
    new Item('Процессор', 'proc', 35000, 5, 10)
);
shoppingCart.push(
    new Item('Оперативная память', 'mem', 1750, 6)
);
shoppingCart.push(
    new Item('Видеокарта', 'video', 32000, 1)
);
shoppingCart.push(
    new Item('Жесткий диск', 'hdd', 6500, 6, 25)
);


// выводим перечень товаров в корзине, если корзина не пуста
if (shoppingCart == 0) {
	main.insertAdjacentHTML('beforeend', `<div class="prod_item total">${emptyBasket}</div>`);
} else {
	for (const iterator of shoppingCart) {
        main.insertAdjacentHTML('beforeend', 
        `<div class="prod_item">
        <span>Товар - ${iterator.product}</span> 
        <span>Цена товара - ${iterator.price} руб</span>
        <span>Количество - ${iterator.quantity}</span>
        <span><img src="${iterator.image}"></span>
        </div>`);
    }
}

// возвращает итоговую сумму
function finalChart(shoppingCart) {
	return shoppingCart.reduce( function (acc, shoppingCart){
        return acc + shoppingCart.quantity
    }, 0)
};

// возвращает итоговое количество
function finalCost(shoppingCart) {
    return shoppingCart.reduce( function (acc, shoppingCart){
        return acc + (shoppingCart.price * shoppingCart.quantity)
    }, 0)
};

// выводим итоговое количество и сумму
if (shoppingCart != 0) {
    const totalPrice = main.insertAdjacentHTML('beforeend', 
    `<hr><div class="prod_item total">В корзине: ${finalChart(shoppingCart)} товаров на сумму 
    ${finalCost(shoppingCart)} рублей</div>`);
}