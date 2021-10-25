
let index = 0;

window.onload = function () {
    setting();
	load();
}

function setting() {
	$("#signIn_index").click(function(){
		index = 0;
		loadFormPage();
		// console.log(index)

		$("#signIn_index").removeClass("inactive underlineHover");
		$("#signIn_index").addClass("active");
		
		$("#signUp_index").removeClass("active");
		$("#signUp_index").addClass("inactive underlineHover");
		$("#submit-btn").attr("value", "เข้าสู่ระบบ");

		$("#username").val("");
		$("#password").val("");

	});
	$("#signUp_index").click(function(){
		index = 1;
		loadFormPage();
		// console.log(index)
		$("#signUp_index").removeClass("inactive underlineHover");
		$("#signUp_index").addClass("active");
		
		$("#signIn_index").removeClass("active");
		$("#signIn_index").addClass("inactive underlineHover");
		$("#submit-btn").attr("value", "สมัครสมาชิก");

		$("#username").val("");
		$("#password").val("");
	});

	$("#submit-btn").click(function(){

		let data = {};
		let url = "";
		let text = "";
		let errArr = [];

		if(index === 0){
			url = "/login";
			text = "Login successful.";
			data = {
				username : $("#username").val(),
				password : $("#password").val()
			};
		}else{
			let birthdate_val = $("#year").val() + "-" + $("#month").val() + "-" + $("#day").val();
			url = "/register";
			text = "Register successful.";
			data = {
				username : $("#username-reg").val(),
				password : $("#password-reg").val(),
				phone: $("#phone").val(),
				id_card: $("#id_card").val(),
				birthdate: birthdate_val,
			};
			console.log(data)

			if(data.username === "" || data.password === "" || data.phone === "" || data.id_card === "" || $("#year").val() === "year" 
			|| $("#month").val() === "month" || $("#day").val() === "day" || $("#con-password").val() === ""){
				errArr.push('กรุณากรอกข้อมูลให้ครบถ้วน');
			}
			if(data.password !== $("#con-password").val()){
				errArr.push('รหัสผ่านไม่ตรงกัน');
			}
			if(errArr.length !== 0){
				Swal.fire({
					icon: 'error',
					text: errArr[0],
					timer: 1500
				})
				$("#bodyIndex").removeClass("swal2-shown swal2-height-auto");
			}

		}
		
		if(errArr.length === 0){
			ajax(url, data,
			function(result){
				let user = result["data"];
				console.log(result);
				Swal.fire({
					icon: 'success',
					title: text,
					showConfirmButton: false,
					timer: 1500
				}).then((result) => {
					sessionStorage.setItem('username', user["username"]);
					sessionStorage.setItem('role', user["role"]);
					window.location = "/home";
				})
				$("#bodyIndex").removeClass("swal2-shown swal2-height-auto");
				
			}, 
			function(err){
				Swal.fire({
					icon: 'error',
					text: err
				}).then((result) => {
				})
				$("#bodyIndex").removeClass("swal2-shown swal2-height-auto");
			});
		}




	});
}

function load() {
	loadFormPage();
}

function loadFormPage(){
	if(index === 0){
		$("#login-form").attr("style", "display: block;");
		$("#register-form").attr("style", "display: none;");
	}else{
		$("#login-form").attr("style", "display: none;");
		$("#register-form").attr("style", "display: block;");
	}	
}
