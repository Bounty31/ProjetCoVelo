		$.ajax({                                      
			url: 'js/db_to_trace.php',
			dataType: 'json',
        success: function(data)     //on recieve of reply
        {   
            //creation du tableau
            var chart_data = [];
            var distance = 0;
            //distance en delta donc on somme
            for (var i = 0; i < data["altitude"].length; i++) {
            	distance +=data["distance"][i];
            	chart_data.push([distance,parseInt(data["altitude"][i])]);
            }
            console.log(chart_data);
} 