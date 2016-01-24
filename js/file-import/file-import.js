$('#chooseFile').bind('change', function () {
    var filename = $("#chooseFile").val();
    if (/^\s*$/.test(filename)) {
        $(".file-upload").removeClass('active');
        $("#Send-file").addClass('hidden');
        $("#noFile").text("Aucun fichier choisi.");
    }

    else {
        $("#traceModalName").addClass('in');
        $("#traceModalName").css('display','block');
        $("body").addClass('modal-open');
        $(".file-upload").addClass('active');
        $("#Send-file").removeClass('hidden');
        $("#noFile").text(filename.replace("C:\\fakepath\\", ""));
    }
});

$(document).ready(function(){
    $("#modalAction #dismissFileModal").on('click', function(){
        $("#traceModalName").removeClass('in');
        $("#traceModalName").css('display','none');
        $("body").removeClass('modal-open');
        $(".file-upload").removeClass('active');
        $("#Send-file").addClass('hidden');
        $("#noFile").text("Aucun fichier choisi.");
    });
});


