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
            text: "กรุณาเลือกวันที่เพื่อจองคิว",
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
                let cl = 'btn-success';
                for(let i = 8; i <= 20; i++){

                    status = 'ว่าง';
                    cl = 'btn-success';
                    dateCalendar.forEach(element => {
                        let date_split = element['start'].split(' ');
                        // console.log(date_split)
                        let time_date = date_split[1].split(':');
                        let t = parseInt(time_date[0]);
                        // console.log(date_split[0], dateClient)
                        // if(element['customer'] === sessionStorage.getItem('username') && date_split[0] === dateClient && i === t){                
                        if(date_split[0] === dateClient && i === t){
                            status = 'ไม่ว่าง';
                            cl = 'btn-unavailable';
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
                        '<td><button class="btnCheck ' + cl + '" onclick="booking(`' + time + '`, `' + status + '`)">จอง</button></td>'+
                        '<td>' + time + '</td>'+
                        '<td style="b">' + status + '</td>'+
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

function booking(time, status) {
    
    if(status === 'ว่าง'){
        let d = dateClient + ' ' + time + ':00.000 +00:00';
        console.log(d);
        // console.log(strReplaceTimezone.replace('GMT+0700', 'UTC+0000'))
        let invdate = new Date(d)
        console.log(invdate)
        // invdate.setHours(t);
        // invdate.setMinutes(0);
        // console.log(invdate)
        let strDate = invdate.getDate() + "-" + (invdate.getMonth()+1) + "-" + invdate.getFullYear();
        let title = "เวลา " + time + " น. ถูกจองแล้ว";
        let data = {
            start: invdate,
            end: invdate,
            title: title,
            customer: sessionStorage.getItem('username'),
            doctor: "หมอปรีชา สุขใจ"
        };
        console.log(data)

        ajax("/booking", data,
        function(result){
        
            Swal.fire({
                icon: 'success',
                title: "จองเวลา " + time + " ของวันที่ " + dateClient + ' สำเร็จ.',
                showConfirmButton: false,
                timer: 3000
            }).then(e => {
                // location.reload();
                loadTimeTable()
            })
        }, 
        function(err){
        


        });
    }


}