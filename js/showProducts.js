const addBtnElement = document.querySelector('.add-product-btn');
const sortByNameIdPriceElement = document.getElementById('sortby');
const selectedSortingOrderElement = document.getElementById('sort-order');
const searchElement = document.querySelector('.search');

let sortOrderFlag = 0; //flag which helps to check ascending/descending order 
let sortByFlag = 'id';  //flag which helps to check filter by id/price/name 
let searchFlag = false; //flag which helps to check whether search-box event is called or not


//function which helps to achieve debouncing
//this debouncing function helps to decrease show-product-data function calls at every keyup-event
const debouncing = function (fn, delay=500){
    let timer;
    return function() {
        clearTimeout(timer);

        timer = setTimeout(()=>{
            fn();
        }, delay);
    }
}

//key-up event-listener : whenever searching is used then debouncing function will be called.
searchElement.addEventListener('keyup', () => {
    searchFlag = true;
    debouncing(showData, 600)();
})


//function which sorts products by id and in ascending order
const sortProductByIdAscendingOrder = () => {
    productList.sort((a, b) => {
        return a.productId - b.productId;
    });
}

//function which sorts products by id and in descending order
const sortProductByIdDescendingOrder = () => {
    productList.sort((a, b) => {
        return b.productId - a.productId;
    });
}

//function which sorts products by name and in ascending order
const sortProductByNameAscendingOrder = () => {
    productList.sort((a, b) => a.productName.localeCompare(b.productName))
}

//function which sorts products by name and in descending order
const sortProductByNameDescendingOrder = () => {
    productList.sort((a, b) => b.productName.localeCompare(a.productName))
}

//function which sorts products by price and in ascending order
const sortProductByPriceAscendingOrder = () => {
    productList.sort((a, b) => {
        return a.productPrice - b.productPrice;
    });
}

//function which sorts products by price and in descending order
const sortProductByPriceDescendingOrder = () => {
    productList.sort((a, b) => {
        return b.productPrice - a.productPrice;
    });
}


//change-event-listener : will check which filtering is enabled whether it is by id/name/price/no-filter
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



//change-event-listener : will check which filtering is enabled whether it is by ascending/descending order/no-filter
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



//function for showing all products from local-storage 
const showData = () => {    
    if (localStorage.getItem('productArr') == null) {
        productList = [];
    }
    else {
        productList = JSON.parse(localStorage.getItem('productArr'))
    }


    //filtering products by search query
    if(searchFlag == true){
        productList = productList.filter(obj => obj.productName.includes(searchElement.value));
    }


    //checking which filtering is currently enabled using different flags
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


    //adding all products to table by forming necessary html tags
    var html = '';

    productList.forEach((element, index) => {
        html += '<tr>';
        html += '<td>' + element.productId + '</td>';
        html += '<td>' + element.productName + '</td>';
        html += `<td> <img src = '${element.productURL}' alt='Product-Image' class = 'product-img'/> </td>`;
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


//click-event-listener : will redirect to add-products-page
addBtnElement.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.replace('index.html')
});
