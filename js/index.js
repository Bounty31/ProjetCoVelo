var tabsFn = (function() {
  
  function init() {
    setHeight();
  }
  
  function setHeight() {
    var $tabPane = $('.tab-pane'),
        tabsHeight = $('.nav-tabs').height();
    
/*    $tabPane.css({
      height: tabsHeight
    });*/
  }
  $(init);
})();

//Build of action you can select while watching the graphs
var expanded = false;
function showDataType() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}

function showSelectSections() {
    var checkboxes = document.getElementById("checkboxes2");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}

$(document).ready(function() {
    var arrDataTypes = [];
    var arrSections = [];

    var case_altitude = $('#checkboxes input:checkbox#checkboxe-1-a');
    var case_vitesse = $('#checkboxes input:checkbox#checkboxe-2-a');
    var case_frecCar = $('#checkboxes input:checkbox#checkboxe-3-a');
    var case_frecPed = $('#checkboxes input:checkbox#checkboxe-4-a');
    var case_pente = $('#checkboxes input:checkbox#checkboxe-5-a');

    var case_section1 = $('#checkboxes2 input:checkbox#checkboxe-1-b');
    var case_section2 = $('#checkboxes2 input:checkbox#checkboxe-2-b');
    var case_section3 = $('#checkboxes2 input:checkbox#checkboxe-3-b');
    var case_section4 = $('#checkboxes2 input:checkbox#checkboxe-4-b');

    //Maj de arrDataTypes[]
    $('#checkboxes input:checkbox').on('click', function () {
        if (case_altitude.is(':checked')) arrDataTypes[0] = 1; else arrDataTypes[0] = 0;
        if (case_vitesse.is(':checked'))  arrDataTypes[1] = 1; else arrDataTypes[1] = 0;
        if (case_frecCar.is(':checked'))  arrDataTypes[2] = 1; else arrDataTypes[2] = 0;
        if (case_frecPed.is(':checked'))  arrDataTypes[3] = 1; else arrDataTypes[3] = 0;
        if (case_pente.is(':checked'))    arrDataTypes[4] = 1; else arrDataTypes[4] = 0;
        console.log('Types de données : ' + arrDataTypes);
    });

    //Maj de arrSections[]
    $('#checkboxes2 input:checkbox').on('click', function () {
        if (case_section1.is(':checked')) arrSections[0] = 1; else arrSections[0] = 0;
        if (case_section2.is(':checked')) arrSections[1] = 1; else arrSections[1] = 0;
        if (case_section3.is(':checked')) arrSections[2] = 1; else arrSections[2] = 0;
        if (case_section4.is(':checked')) arrSections[3] = 1; else arrSections[3] = 0;
        console.log('Sections choisies : ' + arrSections);
    });
});
