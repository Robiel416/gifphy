
$(function() {
    newButton(preloaded, 'searchButton', '#buttons');
})

var topics = ['ball', 'hat','chair','plane','shark','cartoon','water']

function newButton(preloaded, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();
    for(var i=0; i<preloaded.length; i++){
        var g  = $('<button>');
        g.addClass(classToAdd);
        g.attr('data-type', preloaded[i]);
        g.text(preloaded[i]);
        $(areaToAddTo).append(g);
    }
}


$(document).on('click','#search-input',function(){
    var type = $(this).data('type');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + type +'&api_key=UrbJp6lpDIYtrprxGed4fAoO7qnRyrp4&limit=10';
    //API call
    $.ajax({url:queryURL, method: 'GET'})
    .done(function(response){
        for(var i=0; i<response.data.length; i++) {
            var search = $('<div class="search-item">');
            var rating = response.data[i].rating;
            var p = $('<p>').text('Rating: '+ rating);
            var image = $('<img>');
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed-height_still.url;
            image.attr('src', still);
            image.attr('data-still', still);
            image.attr('data-animated', animated);
            image.attr('data-state', 'still');
            image.addClass(searchImage);
            search.append(p);
            serach.append(image);
            $('#favorites').append(search);
        }
    })
})

$()