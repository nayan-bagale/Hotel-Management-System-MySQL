
function loadPage(href) {
    $('.dynamic-content').remove()
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", href, false);
    xmlhttp.send();
    try {
        let _ = JSON.parse(xmlhttp.responseText)
        alert(_.message)
        if(_.error){
            window.location.replace("/");
            return
        }
    } catch (error) {
        console.log(error)
    }
    
    return xmlhttp.responseText;
}

$(window).on('load', function(){
    let dash = $('.options').find('div')[0]
    let _ = loadPage(`/data/${dash.id}`)
    $(dash).addClass('active')
    $('section').append(_);
})

$('.options').find('div').click( function (e) {
    let _ = loadPage(`/data/${this.id}`)
    $('.active').removeClass('active')
    $(this).addClass('active')
    $('section').append(_)
})


$('body').on('click', '#payment-edit', function(e) {
    $('#alert').show()
})

$('#alert-close').click( function (e) {
    $('#alert').hide()
})

$('.sign-out-btn').click(async function (e) {
    e.preventDefault();
    let responce = await fetch('/sign-out')
    let result = await responce.json()
    if(!result.error){
        window.location.replace("/");
    }
})

$('body').on('change', '#room-form', function (e) {

    let check_in = $('#check-in').val()
    let check_out = $('#check-out').val()
    if (check_in && check_out){
        var date1 = new Date(check_in)
        var date2 = new Date(check_out)

        // To calculate the time difference of two dates
        var Difference_In_Time = date2.getTime() - date1.getTime();

        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        // console.log(Difference_In_Days)
        $('#total_days').text(Difference_In_Days)

    }
    
    let price = $('#price').text()

    if (price && Difference_In_Days ){
        $('#total_amount').text( parseInt(price) * Difference_In_Days )
    }

})

$('body').on('change', '#room-type', async function(e) {



    let options = (value) => {
        $('#room-no').empty();
        let template;
        switch (value) {
            case 1:
                template = `<option selected value="default">None</option>
                        <option value="100">100</option>
                        <option value="101">101</option>
                        <option value="102">102</option>
                        <option value="103">103</option>
                        <option value="104">104</option>
                        <option value="105">105</option>
                        <option value="106">106</option>`
                break;
            case 2:
                template = `<option selected value="default">None</option>
                        <option value="200">200</option>
                        <option value="201">201</option>
                        <option value="202">202</option>
                        <option value="203">203</option>
                        <option value="204">204</option>
                        <option value="205">205</option>
                        <option value="206">206</option>`
                break;
            case 3:
                template = `<option selected value="default">None</option>
                        <option value="300">300</option>
                        <option value="301">301</option>
                        <option value="302">302</option>
                        <option value="303">303</option>
                        <option value="304">304</option>`
                break;
            case 4:
                template = `<option selected value="default">None</option>
                        <option value="400">400</option>
                        <option value="401">401</option>
                        <option value="402">402</option>`
                break;
            default:
                template = `<option selected value="default">None</option>`
                break;
        }
        $('#room-no').append(template)

    }

    let value = $('#room-type').val()
    let price = 0
    switch (value) {
        case '1':
            price = 800;
            options(1)
            break;
        case '2':
            price = 1200;
            options(2)
            break;
        case '3':
            price = 1600;
            options(3)
            break;
        case '4':
            price = 3000;
            options(4)
            break;
        default:
            price = 0;
            options()
    }
    $('#price').text(price)

    const responce = await fetch('', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: value})
    })

    const data = await responce.json()
    console.log(data)

})

// Reservation Section

$('body').on('click', '#reservation-submit-btn', async function(e) {
    // let room_type = $('#room-type').val()
    // let room_no = $('#room-no').val()
    // let check_in = $('#check-in').val()
    // let check_out = $('#check-out').val()
    // let fname = $('#fname').val()
    // let lname = $('#lname').val()
    // let email = $('#email').val()
    // let contact_number = $('#number').val()
    // let id_card_type = $('#id-card-type').val()
    // let id_card_number = $('#id-card-no').val()
    // let address = $('#address').val()
    // let city = $('#city').val()
    // let total_days = $('#total_days').text()
    // let total_amount = $('#total_amount').text()

    let obj = {
        reservation: {
            room_type: parseInt($('#room-type').val()),
            room_no: parseInt($('#room-no').val()),
            check_in: $('#check-in').val(),
            check_out: $('#check-out').val(),
            total_days: parseInt($('#total_days').text())
        },
        guest: {

            fname: $('#fname').val(),
            lname: $('#lname').val(),
            email: $('#email').val(),
            contact_number: parseInt($('#number').val()),
            id_card_type: $('#id-card-type').val(),
            id_card_number: $('#id-card-no').val(),
            address: $('#address').val(),
            city: $('#city').val()
        },
        payment: {
            total_amount: parseInt($('#total_amount').text())
        }
    }

    console.log(obj)

    const responce = await fetch('/data/booking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    const data = await responce.json()
    console.log(data)

})