var productList = [];

function selectedProduct (index, id) {
    $('#' + index).toggleClass("selected");
    let position = productList.indexOf(id);
    if (position != -1) { //already exist in array
        productList.splice(position, 1);
    } else {
        productList.push(id);
    }
}

function approveList() {
    if (productList.length) {
        $.post("/admin/approve", {productList: JSON.stringify(productList)}, function(result){
            location.reload();
        });
    }
}

function ignoreList() {
    if (productList.length) {
        $.post("/admin/ignore", {productList: JSON.stringify(productList)}, function(result){
            location.reload();
        });
    }
}