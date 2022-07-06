function handleEdit(name, id, max, min, calib1, calib2, calib3, timeUpdate) {
   

    $(".modal-footer").css("display", "flex");
    $('#modalEditRelay #mac_relay').val(id);
    $('#modalEditRelay #name_relay').attr("placeholder", name);
    $('#modalEditRelay #min').val(min);
    $('#modalEditRelay #timeUpdate').val(timeUpdate);
    $('#modalEditRelay #max').val(max);
    $('#modalEditRelay #calib1').val(calib1);
    $('#modalEditRelay #calib2').val(calib2);
    $('#modalEditRelay #calib3').val(calib3);
    $('#modalEditRelay').modal("show");
    
}