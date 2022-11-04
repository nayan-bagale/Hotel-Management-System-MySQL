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