let API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'

// let getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true)
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 console.log('2')
//                 if (xhr.status !== 200) {
//                     reject('Error');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         }
//     });
// };

class ProductList {
    constructor(container = '.products') {
        this.container = document.querySelector(container);
        this.goods = [];
        this.productObjects = [];

        this.getProducts().then((data) => {
            this.goods = data;
            this.render();
            this.totalCost();
        });
    }

    getProducts() {
        return fetch(`${API}catalogData.json`).then(response => response.json()).catch(err => console.log(err));
    }

    render() {
        for (const good of this.goods) {
            const productObject = new ProductItem(good);
            console.log(productObject);
            this.productObjects.push(productObject);
            this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }

    totalCost() {
        let sum = 0;
        for (const cost of this.productObjects) {
            sum += cost.price
        }
        console.log(sum)
        return sum;
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.img = img;
    }

    getHTMLString() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
    }
}

class Basket extends ProductList {
    constructor(container = '.basket', goods, productObjects) {
        super(container, goods, productObjects)
    }

    delete(productItem) {
        for (const product of this.productObjects) {
            if (productItem.id === product.id) {
                let index = this.productObjects.indexOf(product);
                this.productObjects.splice(index, 1);
            }
        }
    }
}

new ProductList();

// const products = [
//   {id: 1, title: 'Notebook', price: 20000},
//   {id: 2, title: 'Mouse', price: 1500},
//   {id: 3, title: 'Keyboard', price: 5000},
//   {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = (item, img='https://via.placeholder.com/200x150') => `<div class="product-item">
//               <img src="${img}" alt="Some img">
//               <div class="desc">
//                   <h3>${item.title}</h3>
//                   <p>${item.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//
// const renderProducts = list => {
//   document
//       .querySelector('.products')
//       .insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
// };
//
// renderProducts(products);
//
