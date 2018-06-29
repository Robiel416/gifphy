
$(function () {
    showButtons(topics, 'searchButton', '#buttons');
})
//store preloaded buttons into an array
var topics = ['ball', 'hat', 'chair', 'plane', 'shark', 'cartoon', 'water']

//create function to load buttons
function showButtons(topics, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i = 0; i < topics.length; i++) {
        var newGif = $('<button>');
        newGif.addClass(classToAdd);
        newGif.attr('data-type', topics[i]);
        newGif.text(topics[i]);
        $(areaToAddTo).append(newGif);
    }
};
//unable to load my api
$('#buttons').on('click', 'searchButton', function () {
    var type = $(this).data('type');
    var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=UrbJp6lpDIYtrprxGed4fAoO7qnRyrp4&limit=10';

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        .then(function(response){

            var results = response.data;


            for(var i=0; i<response.data.lenth;i++){
                var divSearch = $('<div class="search-item">');
                var rating = response[i].rating;
                var p = $('<p>').text('Rating: '+rating);
                var animated = response[i].images.fixed_height.url;
                var still = response[i].images.fixed_height_still.url;
                var image = $('<img>');
                
                image.attr('src', still);
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');
                image.addClass('searchImage')

                divSearch.append(p);
                divSearch.append(image);
                $('#favorites').append(divSearch);
            }
        })
})



$('#search-button').on('click',function(){
    var newSearch = $('input').val().trim();
    topics.push(newSearch);
    showButtons(topics,'searchButton','#buttons');
    return false;
    
})