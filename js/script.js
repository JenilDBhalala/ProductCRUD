const addBtn = document.querySelector('.add-product-btn');

addBtn.addEventListener('click', (e) => {
    e.preventDefault(), 
    storeData()
});

storeData = () => {
    const productName = document.getElementById('product-name').value;
    const productImage = document.getElementById('product-image').value;
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
    productList.push({ productId, productName, productImage, productPrice, productDescription });
    localStorage.setItem('productArr', JSON.stringify(productList));
    showData();
    document.getElementById('product-name').value = '';
    document.getElementById('product-image').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-descr').value = '';
}   


showData = () => {
    let productList;

    if (localStorage.getItem('productArr') == null) {
        productList = [];
    }
    else {
        productList = JSON.parse(localStorage.getItem('productArr'))
    }

    var html = '';

    productList.forEach((element, index) => {
        html += '<tr>';
        html += '<td>' + element.productId + '</td>';
        html += '<td>' + element.productName + '</td>';
        html += '<td>' + element.productImage + '</td>';
        html += '<td>' + element.productPrice + '</td>';
        html += '<td>' + element.productDescription + '</td>';
        html += '<td>';
        html += '<button onclick = "deleteData(" + index + ") class = delete-btn">Delete</button>';
        html += '<button onclick = "updateData()" class = "edit-btn">Edit</button>';
        html += '</td>';
        html += '</tr>';
    })
    
    document.querySelector('.table-class tbody').innerHTML = html;
}


document.onload = showData();