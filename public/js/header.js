function ajax(url, data, success, error){

	let temp = JSON.stringify(data);

	$.ajax({
		url: url,
		data: temp,
		type: 'POST',
		contentType: "application/json; charset=utf-8",
		success: function(res) {
			if(!!success){
				success(res);
			}
		},
		error: function(res) {
			if(!!error){
				error(res.responseText);
			}
		}
	});

}


var Days = [31,28,31,30,31,30,31,31,30,31,30,31];// index => month [0-11]
$(document).ready(function(){
    var option = '<option value="day">วันเกิด</option>';
    var selectedDay="day";
    for (var i=1;i <= Days[0];i++){ //add option days
        option += '<option value="'+ i + '">' + i + '</option>';
    }
    $('#day').append(option);
    $('#day').val(selectedDay);

    var option = '<option value="month">เดือนเกิด</option>';
    var selectedMon ="month";
    for (var i=1;i <= 12;i++){
        option += '<option value="'+ i + '">' + i + '</option>';
    }
    $('#month').append(option);
    $('#month').val(selectedMon);

    var option = '<option value="month">เดือนเกิด</option>';
    var selectedMon ="month";
    for (var i=1;i <= 12;i++){
        option += '<option value="'+ i + '">' + i + '</option>';
    }
    $('#month2').append(option);
    $('#month2').val(selectedMon);
  
    var d = new Date();
    var option = '<option value="year">ปีเกิด</option>';
    selectedYear ="year";
    for (var i=1930;i <= d.getFullYear();i++){// years start i
        option += '<option value="'+ i + '">' + i + '</option>';
    }
    $('#year').append(option);
    $('#year').val(selectedYear);
});
function isLeapYear(year) {
    year = parseInt(year);
    if (year % 4 != 0) {
	      return false;
	  } else if (year % 400 == 0) {
	      return true;
	  } else if (year % 100 == 0) {
	      return false;
	  } else {
	      return true;
	  }
}

function change_year(select)
{
    if( isLeapYear( $(select).val() ) )
	  {
		    Days[1] = 29;
		    
    }
    else {
        Days[1] = 28;
    }
    if( $("#month").val() == 2)
		    {
			       var day = $('#day');
			       var val = $(day).val();
			       $(day).empty();
			       var option = '<option value="day">วันเกิด</option>';
			       for (var i=1;i <= Days[1];i++){ //add option days
				         option += '<option value="'+ i + '">' + i + '</option>';
             }
			       $(day).append(option);
			       if( val > Days[ month ] )
			       {
				          val = 1;
			       }
			       $(day).val(val);
		     }
  }

function change_month(select) {
    var day = $('#day');
    var val = $(day).val();
    $(day).empty();
    var option = '<option value="day">วันเกิด</option>';
    var month = parseInt( $(select).val() ) - 1;
    for (var i=1;i <= Days[ month ];i++){ //add option days
        option += '<option value="'+ i + '">' + i + '</option>';
    }
    $(day).append(option);
    if( val > Days[ month ] )
    {
        val = 1;
    }
    $(day).val(val);
}

function menu(){
    let role = sessionStorage.getItem('role');
    let list =    '<a href="/home" class="w3-bar-item w3-button w3-padding"><i class="fa fa-home fa-fw"></i>  หน้าหลัก</a>'+
                    '<a href="/calendar" class="w3-bar-item w3-button w3-padding"><i class="fa fa-calendar fa-fw"></i>  ปฎิทินคิวทำฟัน</a>'+
                    '<a href="/booking" class="w3-bar-item w3-button w3-padding"><i class="fa fa-users fa-fw"></i>  จองคิวทำฟัน</a>';
    
    if(role === "admin"){
        list += '<a href="/edit_booking" class="w3-bar-item w3-button w3-padding"><i class="fa fa-edit fa-fw"></i>  แก้ไขตารางนัดทำฟัน</a>'+
        '<a href="/cancle_booking" class="w3-bar-item w3-button w3-padding"><i class="fa fa-close fa-fw" style="color: red;"></i>  ยกเลิกคิวทำฟัน</a>';        
    }

    list += '<a href="/contact" class="w3-bar-item w3-button w3-padding"><i class="fa fa-phone fa-fw"></i>  ติดต่อ/สอบถาม</a>'+
    '<a id="sign-out" class="w3-bar-item w3-button w3-padding"><i class="fa fa-sign-out fa-fw" ></i>  ออกจากระบบ</a>';

    $('#menu_user').html(list);
}