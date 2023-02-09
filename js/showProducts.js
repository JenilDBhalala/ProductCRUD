const addBtnElement = document.querySelector('.add-product-btn');
const sortByNameIdPriceElement = document.getElementById('sortby');
const selectedSortingOrderElement = document.getElementById('sort-order');

let sortOrderFlag = 0;
let sortByFlag = 'id';

const sortProductByIdAscendingOrder = () => {
    console.log(product)
    productList.sort((a, b) => {
        return a.productId - b.productId;
    });
}


sortByNameIdPriceElement.addEventListener('change', ()=>{
    if(sortByNameIdPriceElement.value == "sort-by-product-id"){
        console.log("another")
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
        console.log("hello")
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



// else if(selectedSortingOrderElement.value == "descending" && sortByNameOrIdElement.value == "sort-by-product-id"){
//     sortProductByIdDescendingOrder();
// }
// else if(selectedSortingOrderElement.value == "ascending" && sortByNameOrIdElement.value == "sort-by-product-name"){
//     sortProductByNameAscendingOrder();
// }
// else if(selectedSortingOrderElement.value == "descending" && sortByNameOrIdElement.value == "sort-by-product-name"){
//     sortProductByNameDescendingOrder();
// }

const showData = () => {    
    if (localStorage.getItem('productArr') == null) {
        productList = [];
    }
    else {
        productList = JSON.parse(localStorage.getItem('productArr'))
    }

    if(sortOrderFlag === 1 && sortByFlag === 'id'){
        sortProductByIdAscendingOrder();
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
