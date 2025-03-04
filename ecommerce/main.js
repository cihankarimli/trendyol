let basketButton = document.querySelectorAll('.basket-button');
let basket = document.querySelector('.nav-card');
let basketLine = document.querySelector('.basket-line');
let img = document.querySelectorAll('.card img');
let dollor = document.querySelector('h4');
let cardPrices = document.querySelectorAll('h5');
let cardTitles = document.querySelectorAll('h3');

let isBasketOpen = false;
localStorage.setItem("isBasketOpen", JSON.stringify(isBasketOpen));
let products = JSON.parse(localStorage.getItem('products')) || [];

basketLine.style.opacity = isBasketOpen ? '100%' : '0%';

basket.addEventListener('click', function () {
    isBasketOpen = !isBasketOpen;
    basketLine.style.opacity = isBasketOpen ? '100%' : '0%';
    localStorage.setItem('isBasketOpen', JSON.stringify(isBasketOpen));
});

function loadBasketItems() {
    basketLine.innerHTML = '';
    products.forEach(product => {
        createBasketItem(product);
    });
}

function createBasketItem(product) {
    let li = document.createElement('li');
    let liImg = document.createElement('img');
    let p = document.createElement('p');
    let priceLine = document.createElement('p');
    let dollorLine = document.createElement('p');
    let top = document.createElement('button');
    let itemNumber = document.createElement('p');
    let bottom = document.createElement('button');

    liImg.src = product.imgSrc;
    p.textContent = product.cardTitle;
    priceLine.textContent = product.cardPrice;
    dollorLine.textContent = dollor.textContent;
    bottom.innerHTML = '&lt;';
    top.innerHTML = '&gt;';
    itemNumber.textContent = product.quantity || 1;

    li.append(liImg, p, dollorLine, priceLine, bottom, itemNumber, top);
    basketLine.appendChild(li);

    liImg.style.width = '50px';
    liImg.style.height = '50px';

    top.addEventListener('click', function () {
        let newItemNumber = Number(itemNumber.textContent) + 1;
        itemNumber.textContent = newItemNumber;
        updateProductQuantity(product, newItemNumber);
    });

    bottom.addEventListener('click', function () {
        let newItemNumber = Number(itemNumber.textContent) - 1;
        if (newItemNumber >= 1) {
            itemNumber.textContent = newItemNumber;
            updateProductQuantity(product, newItemNumber);
        } else if (newItemNumber == 0) {
            li.remove();
            removeProduct(product);
        }
    });
}

function updateProductQuantity(product, quantity) {
    let index = products.findIndex(p => p.imgSrc === product.imgSrc && p.cardTitle === product.cardTitle);
    if (index !== -1) {
        products[index].quantity = quantity;
        localStorage.setItem('products', JSON.stringify(products));
    }
}

function removeProduct(product) {
    products = products.filter(p => p.imgSrc !== product.imgSrc || p.cardTitle !== product.cardTitle);
    localStorage.setItem('products', JSON.stringify(products));
}

window.addEventListener('load', loadBasketItems);

for (let i = 0; i < basketButton.length; i++) {
    basketButton[i].addEventListener('click', function () {
        let cardPrice = cardPrices[i].textContent;
        let cardTitle = cardTitles[i].textContent;
        let imgSrc = img[i].src;

        let existingProduct = products.find(p => p.imgSrc === imgSrc && p.cardTitle === cardTitle);

        if (existingProduct) {
            existingProduct.quantity += 1;
            updateProductQuantity(existingProduct, existingProduct.quantity);
            loadBasketItems();
        } else {
            let newProduct = { imgSrc, cardTitle, cardPrice, quantity: 1 };
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));
            createBasketItem(newProduct);
        }
    });
}