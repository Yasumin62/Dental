let dateClient;
let dateCalendar;

window.onload = function () {
    setting();
	load();
}

function setting() {
    // $("#sign-out").click(function(){
    //     sessionStorage.clear();
    //     window.location = "/";
    // });

    $("#btn-check-date").click(function(){
        loadTimeTable();
        
    });

}

function loadTimeTable(){
    let date = $("#date_calendar").val();
    // console.log(date)
    if(date === ""){
        Swal.fire({
            icon: 'error',
            text: "กรุณาเลือกวันที่ก่อนยกเลิกการจองคิว",
            timer: 2000
        })
        $("#bodyIndex").removeClass("swal2-shown swal2-height-auto");
    }else{
        let dateFormat = new Date(date);
        let xT = '';
        if((dateFormat.getMonth()+1) < 10){
            xT = 0;
        }
        console.log(dateFormat.getFullYear() + '-' + xT + (dateFormat.getMonth()+1) + '-' + dateFormat.getDate() );
        dateClient = dateFormat.getFullYear() + '-'+ xT + (dateFormat.getMonth()+1) + '-' + dateFormat.getDate();

        let data = {
            start : dateFormat,
            end : dateFormat,
        };
        
        ajax("/getDateTimeBooking", data,
            function(result){

                console.log(result);
                dateCalendar = result;

                let list = "";
                let status = '';
                let cl = '';
                let customer_name = '-';
                let id = -1;
                for(let i = 8; i <= 20; i++){

                    status = 'ว่าง';
                    cl = 'btn-unavailable';
                    customer_name = '-';
                    id = -1;
                    dateCalendar.forEach(element => {
                        let date_split = element['start'].split(' ');
                        // console.log(date_split)
                        let time_date = date_split[1].split(':');
                        let t = parseInt(time_date[0]);
                        // console.log(date_split[0], dateClient)
                        // if(element['customer'] === sessionStorage.getItem('username') && date_split[0] === dateClient && i === t){                
                        if(date_split[0] === dateClient && i === t){
                            status = 'ไม่ว่าง';
                            cl = 'btn-danger';
                            customer_name = element['customer'];
                            id = element['id'];
                        }
                    });



                    let time = "";
                    if(i < 10){
                        time = time + "0";
                    }
                    time = time + i + ":00";
                    // console.log(time)
                    list += 
                    '<tr>'+
                        '<td><button class="btnCheck ' + cl + '" onclick="booking(`' + id + '`, `' + status + '`)">ยกเลิกคิวนี้</button></td>'+
                        '<td>' + time + '</td>'+
                        '<td style="b">' + customer_name + '</td>'+
                    '</tr>';
                }
                $("#list-time").html(list);
                
            }, 
            function(err){
                console.log(err);
                
            });

    }
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

// function convertTZ(date, tzString) {
//     return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
// }

function booking(id, status) {

    let data = {
        id: id
    };

    if(status === 'ไม่ว่าง'){
        ajax("/cancle_booking", data,
        function(result){
        
            Swal.fire({
                icon: 'success',
                title: 'ยกเลิกสำเร็จ.',
                showConfirmButton: false,
                timer: 3000
            })
            loadTimeTable();
        }, 
        function(err){
        


        });
    }


}