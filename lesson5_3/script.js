let catalogList = []

function Item(product, image, description, price, discount=0) {
    this.product = product;
    this.image = `img/${image}.png`;
    this.description = description;
    this.price = price;
    this.discount = discount;
    this.finalPrice = function() {
        if (this.discount != 0) {
            return this.price - this.price*this.discount/100;
        } else {
            return this.price;
        }
    }
}

catalogList.push(
    new Item('Материнская плата', 'mb', 'Материнская плата', 9500, 5)
);
catalogList.push(
    new Item('Процессор', 'proc', 'Процессор', 35000, 10)
);
catalogList.push(
    new Item('Оперативная память', 'mem', 'Оперативная память', 1750, 6)
);
catalogList.push(
    new Item('Видеокарта', 'video', 'Видеокарта', 32000, 1)
);
catalogList.push(
    new Item('Жесткий диск', 'hdd', 'Жесткий диск', 6500, 25)
);


const catalog = document.querySelector('#catalog');

function drowItem(catalogList) {
    for (const iterator of catalogList) {
        catalog.insertAdjacentHTML('beforeend', 
        `<div class="prod_item">
            <div class="item">
                <div class="image"><img src="${iterator.image}"></div>
                <div class="description"><h4>${iterator.product}</h4>${iterator.description}
                    <div class="price">Цена: 
                        <span>${iterator.price}</span>
                    </div>
                </div>
            </div>
            <div class="sale">
                <span class='offer ${iterator.discount > 0 ? 'show' : ''}'>Скидка: ${iterator.discount}%</span>
                <a href="#">В корзину</a>
            </div>
        </div>`);
    };
}
drowItem(catalogList);