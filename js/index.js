$(document).ready(function () {

    $("#selectTypeDonnee").multiselect({
        header: false,
        selectedList: 2,
        click: function(event, ui){
            var nbrSelected = $(this).multiselect("widget").find("input:checked").length;

            if (nbrSelected > 2 || nbrSelected < 1){
                return false;
            }
            else {
                if (ui.checked) {
                    optionsArray.push(ui.value);
                    optionsArray = $.unique(optionsArray);
                }
                else {
                    optionsArray.splice( $.inArray(ui.value, optionsArray) ,1 );
                }

                updateGraphe();
            }


        }
    });

});
