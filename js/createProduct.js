const addBtnElement = document.querySelector('.add-product-btn');
const viewAllProductsBtnElement = document.querySelector('.view-allproduct-btn');

const storeData = () => {
    const productName = document.getElementById('product-name').value;
    const productURL = document.getElementById('product-url').value;
    const productPrice = document.getElementById('product-price').value;
    const productDescription = document.getElementById('product-descr').value;
    const productId = Math.ceil(Math.random() * Math.pow(10,12));
    
    let productList;

    if (localStorage.getItem('productArr') == null) {
        productList = [];
    }
    else {
        productList = JSON.parse(localStorage.getItem('productArr'))
    }
    productList.push({ productId, productName, productURL, productPrice, productDescription });
    localStorage.setItem('productArr', JSON.stringify(productList));

    document.getElementById('product-name').value = '';
    document.getElementById('product-url').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-descr').value = '';

    window.location.replace('showProducts.html');
}   


addBtnElement.addEventListener('click', (e) => {
    e.preventDefault()
    storeData()
});


viewAllProductsBtnElement.addEventListener('click', (e) => {
    window.location.replace('showProducts.html')
});



