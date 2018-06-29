//unable to access api with public key or my own api key

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
//unable to load my api - I don't know what happened. Maybe my key?
$('#buttons').on('click', 'searchButton', function () {
    var type = $(this).attr('data-type');
    var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=dc6zaTOxFJmzC&limit=10';

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        .done(function(response){
            console.log(response);
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


//pushing searched buttons to list of buttons
$('#search-button').on('click',function(){
    var newSearch = $('input').val().trim();
    //not allowed to enter blank
    if (newSearch == "") {
        return false;  
    }
    topics.push(newSearch);
    
    showButtons(topics,'searchButton','#buttons');
    return false;
    
})


//animations tested on hw file - unable to load api
$(document).on('click', '.searchImage', function(){
    var state = $(this).attr('state-state');
    if (state == 'still') {
        $('this').attr('src',$(this).data('animated'));
        $('this').attr('data-state','animated');
    } else {
        $('this').attr('src',$(this).data('still'));
        $('this').attr('data-state','still');
    }
    
})