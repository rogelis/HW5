//Storage of the local text stored in the browser. And when Refreshed keeps text intact
function getLocalStorage(key) {
    let value = localStorage.getItem(key);
    if (value) {
        $(`#text${key}`).text(value);
    }
}

//once the page is loaded run and create time intervals
$(document).ready(function () {
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
    for (let i = 9; i < 18; i++) {

        // create a row within ea. time ineteval
        var row = $(`<div data-time=${i} id='${i}' class="row">`);

        // create 1st column
        var col1 = $('<div class="col-sm-2"> <p class="hour">' + changeAMPM(i) + '</p>');

        //create 2nd column
        var col2 = $(`<div class="col-sm-8 past"><textarea id=text${i} class="description" placeholder="Type your event here..."></textarea>`);

        //create 3rd column
        var col3 = $(`<div class="col-sm-2"><button class="saveBtn" id=${i}><i class="fas fa-plus"></i></button>`)

        // append each of the times column to row
        row.append(col1);
        row.append(col2);
        row.append(col3);

        // last step add rows to container
        $(".container").append(row);

        getLocalStorage(i);
    }
    //format hours to reflect 12 hour
    function changeAMPM(hours) {
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ampm;
    }
    changeAMPM();

    //Based on the currentTime certain time intervals will represent past, present and future (btwn 9am to 5pm)
    function changeColors() {
        var currentTime = new Date().getHours();
        for (var i = 9; i < 18; i++) {
            //check in browswer how current time is logged and changing
            console.log(currentTime, $(`#${i}`).data("time"));
            if ($(`#${i}`).data("time") == currentTime) {
                $(`#text${i}`).addClass("present");
            } else if (currentTime < $(`#${i}`).data("time")) {
                $(`#text${i}`).addClass("future");
            }
        }
    }

    setInterval(function () {
        changeColors();
    }, 1000);
    
    //when the saveBtn is clicked initate localstorage on the description of text enterd
    var saveBtn = $('.saveBtn');
    saveBtn.on('click', function () {
        let eventId = $(this).attr('id');
        let eventText = $(this).parent().siblings().children('.description').val();
        localStorage.setItem(eventId, eventText);
    });
});