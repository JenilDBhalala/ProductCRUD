const addBtnElement = document.querySelector('.add-product-btn');
const sortByNameIdPriceElement = document.getElementById('sortby');
const selectedSortingOrderElement = document.getElementById('sort-order');
const searchElement = document.querySelector('.search');

let sortOrderFlag = 0;
let sortByFlag = 'id';
let searchFlag = false;

const debouncing = function (fn, delay=500){
    let timer;
    return function() {
        clearTimeout(timer);

        timer = setTimeout(()=>{
            fn();
        }, delay);
    }
}

searchElement.addEventListener('keyup', () => {
    searchFlag = true;
    debouncing(showData, 600)();
})

const sortProductByIdAscendingOrder = () => {
    productList.sort((a, b) => {
        return a.productId - b.productId;
    });
}

const sortProductByIdDescendingOrder = () => {
    productList.sort((a, b) => {
        return b.productId - a.productId;
    });
}

const sortProductByNameAscendingOrder = () => {
    productList.sort((a, b) => a.productName.localeCompare(b.productName))
}

const sortProductByNameDescendingOrder = () => {
    productList.sort((a, b) => b.productName.localeCompare(a.productName))
}

const sortProductByPriceAscendingOrder = () => {
    productList.sort((a, b) => {
        return a.productPrice - b.productPrice;
    });
}

const sortProductByPriceDescendingOrder = () => {
    productList.sort((a, b) => {
        return b.productPrice - a.productPrice;
    });
}


sortByNameIdPriceElement.addEventListener('change', ()=>{
    if(sortByNameIdPriceElement.value == "sort-by-product-id"){
        sortByFlag = 'id';
    }
    else if(sortByNameIdPriceElement.value == "sort-by-product-name"){
        sortByFlag = 'name';
    }
    else if(sortByNameIdPriceElement.value == "sort-by-product-price"){
        sortByFlag = 'price';
    }
    else{
        sortByFlag = 'nofilter';
    }
   
    showData()
})


selectedSortingOrderElement.addEventListener('change', ()=>{
    if(selectedSortingOrderElement.value === "ascending"){
        sortOrderFlag = 1;
    }
    else if(selectedSortingOrderElement.value === "descending"){
        sortOrderFlag = -1;
    }
    else{
        sortOrderFlag = 0;
    }

    showData()
})


const showData = () => {    
    if (localStorage.getItem('productArr') == null) {
        productList = [];
    }
    else {
        productList = JSON.parse(localStorage.getItem('productArr'))
    }


    if(searchFlag == true){
        productList = productList.filter(obj => obj.productName.includes(searchElement.value));
        
    }


    if(sortOrderFlag === 1 && sortByFlag === 'id'){
        console.log(1)
        sortProductByIdAscendingOrder();
    }
    else if(sortOrderFlag === -1 && sortByFlag === 'id'){
        console.log(2)
        sortProductByIdDescendingOrder();
    }
    else if(sortOrderFlag === 1 && sortByFlag === 'name'){
        console.log(3)
        sortProductByNameAscendingOrder();
    }
    else if(sortOrderFlag === -1 && sortByFlag === 'name'){
        console.log(4)
        sortProductByNameDescendingOrder();
    }
    else if(sortOrderFlag === 1 && sortByFlag === 'price'){
        console.log(5)
        sortProductByPriceAscendingOrder();
    }
    else if(sortOrderFlag === -1 && sortByFlag === 'price'){
        console.log(6)
        sortProductByPriceDescendingOrder();
    }


    var html = '';

    productList.forEach((element, index) => {
        html += '<tr>';
        html += '<td>' + element.productId + '</td>';
        html += '<td>' + element.productName + '</td>';
        html += '<td>' + element.productURL + '</td>';
        html += '<td>' + element.productPrice + '</td>';
        html += '<td>' + element.productDescription + '</td>';
        html += '<td>';
        html += `<button onclick = '{window.location.replace("/updateProduct.html?=" + ${element.productId})}' class = 'edit-btn'>Edit</button>`;
        html += `<button onclick = 'deleteData( ${element.productId} )' class = 'delete-btn'>Delete</button>`;
        html += `<button onclick = '{window.location.replace("/viewProduct.html?=" + ${element.productId})}' class = 'view-btn'>View</button>`;
        html += '</td>';
        html += '</tr>';
    })
    
    document.querySelector('tbody').innerHTML = html;
}

showData();

addBtnElement.addEventListener('click', (e) => {
    window.location.replace('index.html')
});
