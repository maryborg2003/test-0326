$(function(){
 
    $("form").submit(function(){
       
        const data = {
            id: $("#productId").val(),
            name: $("#productName").val(),
            price: $("#productPrice").val()
        }

        $.post( "/api/products/create", data, function( data ) {
            console.log("Done");
        });
 
        return false;
    });
 });
 