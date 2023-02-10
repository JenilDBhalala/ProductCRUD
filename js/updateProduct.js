const productNameElement = document.getElementById('product-name');
const productURLElement = document.getElementById('product-url');
const productPriceElement = document.getElementById('product-price');
const productDescriptionElement = document.getElementById('product-descr');

var objWithIdIndex, product, productList;

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


//helper function which fetch particular product data by using id of that product 
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

//function which displays particular product data in the form when we click on edit product button
const updateData = () => {
    const url = window.location.href;

    if (localStorage.getItem('productArr') == null) {
        productList = [];
    }
    else {
        productList = JSON.parse(localStorage.getItem('productArr'))
    }

    const [, id] = url.split('=');

    //helper function
    fetchOldData(Number(id), productList)
}

updateData();


const updateBtnElement = document.querySelector('.update-product-btn');

//event-listener : whenever update-product-button will be clicked new updated form data will be stored into local-storage
updateBtnElement.addEventListener('click', (e) => {
    e.preventDefault();
    let updatedProductName = productNameElement.value;
    let updatedProductURL = productURLElement.value;
    let updatedProductPrice = productPriceElement.value;
    let updatedProductDescription = productDescriptionElement.value;

    const valid = checkvalidity();
    if(!valid) return;

    productList.splice(objWithIdIndex, 1, { productId: product.productId, productName: updatedProductName, productURL: updatedProductURL, productPrice: updatedProductPrice, productDescription: updatedProductDescription });
    localStorage.setItem('productArr', JSON.stringify(productList))
    window.location.replace('/showProducts.html')
})



const backBtnElement = document.querySelector('.back-btn');


//back-button event listener
backBtnElement.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.replace('showProducts.html')
});
