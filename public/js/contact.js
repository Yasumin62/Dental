window.onload = function () {
    setting();
	load();
}

function setting() {
    // $("#sign-out").click(function(){
    //     sessionStorage.clear();
    //     window.location = "/";
    // });

}

function load() {
    let username = sessionStorage.getItem('username');
    let role = sessionStorage.getItem('role');
    if(!!username && !!role){
        // $("#role-user").val(role);
        menu();
        $("#sign-out").click(function(){
            sessionStorage.clear();
            window.location = "/";
        });
        $("#role-user").html(role);
    }else{
        window.location = "/";
    }
}