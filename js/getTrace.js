
function remplir(){
   $.ajax({                                      
        url: 'js/db_to_trace.php',
        dataType: 'json',
        success: function(data)     //on recieve of reply
        {   
           console.log(data);
        } 
    });
}