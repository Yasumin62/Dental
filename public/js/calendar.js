window.onload = function () {
    setting();
	load();
}

function setting() {
}

function load() {
    let username = sessionStorage.getItem('username');
    let role = sessionStorage.getItem('role');
    if(!!username && !!role){
        menu();
        $("#sign-out").click(function(){
            sessionStorage.clear();
            window.location = "/";
        });
        $("#role-user").html(role);
        loadCalendar();
    }else{
        window.location = "/";
    }
}

function loadCalendar(){
    let data = {
        start : "",
        end : "",
    };

    ajax("/getDateTimeBooking", data,
    function(result){
    let re_format_date = [];
    let order = 1;
    let s = '';
    let x;
    let date = {};
    let id = 0;

    let v1, b1, v2, b2;
    for(let i = 0; i < result.length; i++){
        for(let j = 0; j < result.length; j++){
            if(i != j){
                v1 = result[i]['start'].split(' ');
                b1 = v1[1].split(':');

                v2 = result[j]['start'].split(' ');
                b2 = v2[1].split(':');
                if(parseInt(b1[0]) <= parseInt(b2[0])){
                    let swap = {...result[i]};
                    result[i] = result[j];
                    result[j] = swap;
                }
            }
        }
    }

    result.forEach(element => {
            x = element['start'].split(' ');
            s = x[0] + 'T' + x[1] + 'Z';

            if(!!date[x[0]]){
                id = date[x[0]].length + 1;
                date[x[0]].push({
                    color: "#ff6d42",
                    end: s,
                    id: "mbsc_" + order,
                    start: s,
                    title: "คิวที่ "+ id + " "+ element['title'],
                    _days: []
                })
            }else{
                date[x[0]] = [];
                date[x[0]].push({
                    color: "#ff6d42",
                    end: s,
                    id: "mbsc_" + order,
                    start: s,
                    title: "คิวที่ 1 " + element['title'],
                    _days: []
                })
            }
            order++;

    });

    for(let key in date){
        if(date[key].length >= 10){
            let s = date[key][0]["start"];
            date[key] = [];
            date[x[0]].push({
                color: "#e90000",
                end: s,
                id: "mbsc_" + order,
                start: s,
                title: "คิวเต็มแล้ว",
                _days: []
            })
        }
    }

    for(let key in date){
        date[key].forEach(element => {
            re_format_date.push(element);
        });
    }

    mobiscroll.util.http.getJson('https://trial.mobiscroll.com/events/?vers=5', function (events) {
        // console.log(events)
        let calendarData = re_format_date;
        console.log(calendarData);
        calendar.setEvents(calendarData);
      }, 'jsonp');


    }, 
    function(err){
    console.log(err);
    });

}
