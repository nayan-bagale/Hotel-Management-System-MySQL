function loadPage(href) {
    $('.dynamic-content').remove()
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", href, false);
    xmlhttp.send();
    return xmlhttp.responseText;

}

$(window).on('load', function(){
    let a = loadPage('/static/snippets/dashboard.html')
    $('section').append(a);
})


$('#reservation').click(function (e) { 
    e.preventDefault();
    let a = loadPage('/static/snippets/reservation.html')

    $('section').append(a);
});

$('#rooms').click(function (e) {
    e.preventDefault();
    let a = loadPage('/static/snippets/rooms.html')

    $('section').append(a);
});

$('#payment').click(function (e) {
    e.preventDefault();
    let a = loadPage('/static/snippets/payment.html')

    $('section').append(a);
});



$('#guest').click(function (e) {
    e.preventDefault();
    let a = loadPage('/static/snippets/guest.html')

    $('section').append(a);
});



$('#dashboard').click(function (e) {
    e.preventDefault();
    let a = loadPage('/static/snippets/dashboard.html')
    $('section').append(a);
});