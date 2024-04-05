$(function(){
 
    $("form").submit(function(){
       
        const data = {
            id: $("#productId").val(),
            productname: $("#productName").val(),
            price: $("#productPrice").val()
        }

        $.post( "/api/product/create", data, function( data ) {
            console.log("Done");
        });
 
        return false;
    });
 });
 