//function for delete particular product from local-storage using id of that product
const deleteData = (id) => {
    let productList;

    var result = confirm("Want to delete?");

    if(result){
        if (localStorage.getItem('productArr') == null) {
            productList = [];
        }
        else {
            productList = JSON.parse(localStorage.getItem('productArr'))
        }
    
        const objWithIdIndex = productList.findIndex((obj) => obj.productId === id);
     
        if (objWithIdIndex > -1) {
            productList.splice(objWithIdIndex, 1);
        }
    
        localStorage.setItem('productArr', JSON.stringify(productList));
        showData();
    }
}

