const addBtnElement = document.querySelector('.add-product-btn');
const viewAllProductsBtnElement = document.querySelector('.view-allproduct-btn');

const productNameElement = document.getElementById('product-name');
const productURLElement = document.getElementById('product-url');
const productPriceElement = document.getElementById('product-price');
const productDescriptionElement = document.getElementById('product-descr');

//checking form input fields validations
function checkvalidity() {
    if (!productNameElement.checkValidity()) {
        productNameElement.reportValidity();
    }
    else if (!productURLElement.checkValidity()) {
        productURLElement.reportValidity();
    }
    else if (!productPriceElement.checkValidity()) {
        productPriceElement.reportValidity();
    }
    else if (!productDescriptionElement.checkValidity()) {
        productDescriptionElement.reportValidity();
    }
    else {
        return true;
    }
    return false;
}


//funtion for add product data to local-storage
const storeData = () => {
    const productName = productNameElement.value;
    const productURL = productURLElement.value;
    const productPrice = productPriceElement.value;
    const productDescription = productDescriptionElement.value;
    const productId = Math.ceil(Math.random() * Math.pow(10, 12));

    const valid = checkvalidity();

    if (!valid) return;

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


//add-button event-listener
addBtnElement.addEventListener('click', (e) => {
    e.preventDefault()
    storeData()
});


//view-all-products button event-listener
viewAllProductsBtnElement.addEventListener('click', (e) => {
    e.preventDefault()
    window.location.replace('showProducts.html')
});



