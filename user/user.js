function handleDelete(id){
    $('#user_id_delete').val(id);
}
function handleEdit(id){
    $.ajax({
        url: "/manager/edituser/",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(id),
        dataType: 'json',
        success: function(response) {
            user = response['data'];
            $('#name_account_edit').val(user['name']);
            $('#username_account_edit').val(user['username']);
            $('#sel_type_account_edit').val(user['role']);
            $('#password_edit').val("");
            $('#sel_type_greenhouse_edit').val(user['greenhouseId']);
            $('#user_id_edit').val(id);
        }
    });
}
$('#create_user_edit').click(function(){
    $("#editAccount").modal("hide");
    if ($('#password_edit').val() != $('#re_password_edit').val()) {
       
        $('#model-alert2 .modal-body p').text("Nhập mật khẩu không khớp vui lòng thử lại.");
        $('#model-alert2').modal('show');
        $('#update-change2').val('2');
    }   
    else if($('#name_account_edit').val() == ''){
        $('#model-alert2 .modal-body p').text("Tên người dùng không được bỏ trống.");
        $('#model-alert2').modal('show');
        $('#update-change2').val('2');
    }
    else if ($('#username_account_edit').val() == ''){
        $('#model-alert2 .modal-body p').text("Tên đăng nhập không được bỏ trống.");
        $('#model-alert2').modal('show');
        $('#update-change2').val('2');
    }
    else if($('#sel_type_account_edit').val() > 0 && $('#sel_type_greenhouse_edit').val() == ""){
        $('#model-alert2 .modal-body p').text("Với tài khoản admin và user vui lòng chọn một nhà kính thích hợp.");
        $('#model-alert2').modal('show');
        $('#update-change2').val('2');
    }
    else {
        var user = {};
        user['_id'] = $('#user_id_edit').val();        
    
        user['name'] = $('#name_account_edit').val();

        user['username'] = $('#username_account_edit').val();
 
        if( $('#password_edit').val() != '')
            user['password'] = $('#password_edit').val();
            
        user['role'] = $('#sel_type_account_edit').val();
        if ($('#sel_type_greenhouse_edit').val() != ""){
            user['greenhouseId'] = $('#sel_type_greenhouse_edit').val();
        }
        $("#wait-load").modal("show", {backdrop: 'static', keyboard: false});
        $.ajax({
            url: "/manager/editusercomfirm/",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(user),
            dataType: 'json',
            success: function(response) {
                $("#wait-load").modal("hide");
              
                if(response['status']){
                    $('#model-alert2 .modal-body p').text(response['msg']);
                    $('#model-alert2').modal('show');
                    $('#update-change2').val('0');
                }
                else{
                    $('#model-alert2 .modal-body p').text(response['msg']);
                    $('#model-alert2').modal('show');
                    $('#update-change2').val('2');
                }
            },
            error: function(error) {
                $("#wait-load").modal("hide");
                console.log(error);
            }
        });
    } 
});
function comfirmDelete() {
   
    var id = $('#user_id_delete').val();
    $.ajax({
        url: "/manager/deleteuser/",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(id),
        dataType: 'json',
        success: function(response) {
           
            $('#deleteAccount').modal('hide');
            $('#model-alert2 .modal-body p').text("Đã xóa thành công tài khoản");
            $('#model-alert2').modal('show');
            $('#update-change2').val('0');
        }
    });
}
$('#create_user').click(function(){
    if ($('#password').val() == ''){
        $("#addAccount").modal("hide");
        $('#model-alert2 .modal-body p').text("Mật khẩu không được bỏ trống.");
        $('#model-alert2').modal('show');
        $('#update-change2').val('1');
    }
    else if ($('#password').val() != $('#re_password').val()) {
        $("#addAccount").modal("hide");
        $('#model-alert2 .modal-body p').text("Nhập mật khẩu không khớp vui lòng thử lại.");
        $('#model-alert2').modal('show');
        $('#update-change2').val('1');
    }
    else if($('#name_account').val() == ''){
        $("#addAccount").modal("hide");
        $('#model-alert2 .modal-body p').text("Không thể bỏ trống tên người dùng");
        $('#model-alert2').modal('show');
        $('#update-change2').val('1');
    }
    else if($('#username_account').val() == ''){
        $("#addAccount").modal("hide");
        $('#model-alert2 .modal-body p').text("Tên đăng nhập người dùng không được bỏ trống");
        $('#model-alert2').modal('show');
        $('#update-change2').val('1');
    }
    else if($('#sel_type_account').val() > 0 && $('#sel_type_greenhouse').val() == ""){
        $("#addAccount").modal("hide");
        $('#model-alert2 .modal-body p').text("Với tài khoản user và admin vui lòng chọn một nhà kính tương ứng.");
        $('#model-alert2').modal('show');
        $('#update-change2').val('1');
    }
    else {
        $("#addAccount").modal("hide");
        $("#wait-load").modal("show", {backdrop: 'static', keyboard: false});
        var user = {};
        user['name'] = $('#name_account').val();
        user['username'] = $('#username_account').val();
        user['password'] = $('#password').val();
        user['role'] = $('#sel_type_account').val();
        user['avatar'] = 'public/avatars/default.jpg'
        if ($('#sel_type_greenhouse').val() != ""){
            user['greenhouseId'] = $('#sel_type_greenhouse').val();
        }
        $.ajax({
            url: "/manager/createuser/",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(user),
            dataType: 'json',
            success: function(response) {
                $("#wait-load").modal("hide");
                
                if(response['status']){
                    $('#model-alert2 .modal-body p').text(response['msg']);
                    $('#model-alert2').modal('show');
                    $('#update-change2').val('0');
                }
                else{
                    $('#model-alert2 .modal-body p').text(response['msg']);
                    $('#model-alert2').modal('show');
                    $('#update-change2').val('1');
                }
            },
            error: function(error) {
                $('#model-alert2 .modal-body p').text("Hệ thống gặp lỗi. Vui lòng thử lại sau!");
                $('#model-alert2').modal('show');
                $('#update-change2').val('0');
            }
        });
    } 
});
$('#update-change2').click(function() {

    $('#model-alert2').modal('hide');
    if ($(this).val() == '0'){
        $("#wait-load").modal("show", {backdrop: 'static', keyboard: false});
        window.location.reload();
    }
    else if($(this).val() == '1'){
        $("#addAccount").modal("show");
    }
    else{
        $('#editAccount').modal("show");
    }
});