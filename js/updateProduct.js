var objWithIdIndex, product, productList;

const fetchOldData = (id, productList) => {
    objWithIdIndex = productList.findIndex((obj) => obj.productId === id);
    product = productList[objWithIdIndex];

    if (objWithIdIndex > -1) {
        document.getElementById('product-name').value = product.productName;
        document.getElementById('product-url').value = product.productURL;
        document.getElementById('product-price').value = product.productPrice;
        document.getElementById('product-descr').value = product.productDescription;
    }

    localStorage.setItem('productArr', JSON.stringify(productList));
}


const updateData = () => {
    const url = window.location.href;

    if (localStorage.getItem('productArr') == null) {
        productList = [];
    }
    else {
        productList = JSON.parse(localStorage.getItem('productArr'))
    }

    const [, id] = url.split('=');
    fetchOldData(Number(id), productList)
}

updateData();



const updateBtnElement = document.querySelector('.update-product-btn');
updateBtnElement.addEventListener('click', (e) => {
    e.preventDefault();
    let updatedProductName = document.getElementById('product-name').value;
    let updatedProductURL = document.getElementById('product-url').value;
    let updatedProductPrice = document.getElementById('product-price').value;
    let updatedProductDescription = document.getElementById('product-descr').value;

    productList.splice(objWithIdIndex, 1, { productId: product.productId, productName: updatedProductName, productURL: updatedProductURL, productPrice: updatedProductPrice, productDescription: updatedProductDescription });
    localStorage.setItem('productArr', JSON.stringify(productList))
    window.location.replace('/showProducts.html')
})



const backBtnElement = document.querySelector('.back-btn');

backBtnElement.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.replace('showProducts.html')
});
