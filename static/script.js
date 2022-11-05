function loadPage(href) {
    $('.dynamic-content').remove()
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", href, false);
    xmlhttp.send();
    return xmlhttp.responseText;

}

$(window).on('load', function(){
    let dash = $('.options').find('div')[0]
    let _ = loadPage(`/static/snippets/${dash.id}.html`)
    $(dash).addClass('active')
    $('section').append(_);
})

$('.options').find('div').click( function (e) {
    let _ = loadPage(`/static/snippets/${this.id}.html`)
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

$('body').on('change', '#room-type', function(e){
    let value = $(this).val()
    let price = 0
    switch (value) {
        case '1':
            price = 800;
            break;
        case '2':
            price = 1200;
            break;
        case '3':
            price = 1600;
            break;
        case '4':
            price = 3000;
            break;
        default:
            price = 0;
    }
    $('#price').text(price)
})

// Reservation Section

$('body').on('click', '#reservation-submit-btn', function(e) {
    let room_type = $('#room-type').val()
    let room_no = $('#room-no').val()
    let check_in = $('#check-in').val()
    let check_out = $('#check-out').val()
    // let id_card_type = $('#id-card-type').val()
    // let id_card_type = $('#id-card-type').val()

    console.log(room_type, room_no, check_in, check_out)
})