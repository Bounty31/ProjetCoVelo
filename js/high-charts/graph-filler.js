function displayGraphs(){


    $.ajax({                     
        type :"POST",
        url: 'PHP/functions.php',
        data: {query:"download"},

        dataType: 'json',
        success: function(data)     //on recieve of reply
        {   
            //creation du tableau
            var chart_data = [];
            var hidden_chart = [];
            var distance = 0;
            //distance en delta donc on somme
            for (var i = 0; i < data["altitude"].length; i++) {
            	distance += parseFloat(data["distance"][i]);
                if(data["cacher"][i] == '0'){
                   chart_data.push([distance,parseInt(data["altitude"][i])]);
                   hidden_chart.push([distance,300000]);
               }
               else{
                chart_data.push([distance,300000]);
                hidden_chart.push([distance,parseInt(data["altitude"][i])]);
            }
        }
        var graphTest = {};

        graphTest["data"] = data;

        graphTest["graph1"] = chart_data;

        graphTest["graph1_hidden"] = hidden_chart;

        graphTest["graph1_2"] =[[1, 65],[2, 72],[3, 80],[4, 82],[5,79],[6,50],[7,37],[8, 38],[9,39],[10,43],[11,44],[12,60],[13,64],[14,65]];

        graphTest["graph2"] =[[1, 65],[2, 72],[3, 80],[4, 82],[5,79],[6,50],[7,37],[8, 38],[9,39],[10,43],[11,44],[12,60],[13,64],[14,65]];

        graphTest["graph3"] =[[1, 65],[2, 72],[3, 80],[4, 82],[5,79],[6,50],[7,37],[8, 38],[9,39],[10,43],[11,44],[12,60],[13,64],[14,65]];

        graphTest["graph4"] =[[1, 65],[2, 72],[3, 80],[4, 82],[5,79],[6,50],[7,37],[8, 38],[9,39],[10,43],[11,44],[12,60],[13,64],[14,65]];

        graphTest["graph5"] =[[1, 65],[2, 72],[3, 80],[4, 82],[5,79],[6,50],[7,37],[8, 38],[9,39],[10,43],[11,44],[12,60],[13,64],[14,65]];

        createGraphs(graphTest);
    } 
});
}