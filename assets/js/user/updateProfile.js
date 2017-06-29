function validateUpdateProfile() {
    var password = $('#pwd').val();
    var confirmPassword = $('#cfpwd').val();

    console.log(password, confirmPassword);
    if (password != confirmPassword) {
        $('#isMatch').show();
        return false;
    }
    $('#isMatch').hide();
    return true;
}