$(document).ready(function() {


    var userFeed = new Instafeed({
        get: 'user',
        userId: '7348359702',
        limit: 12,
        resolution: 'standard_resolution',
        accessToken: '7348359702.1677ed0.5a71e1b7ec014bca8fb5611bee678c8d',
        sortBy: 'most-recent',
        template: '<div class="p-b-3 p-t-5 p-r-3 p-l-3 instaPhoto col-3 col-sm-3 col-md-3 instaimg"><a href="{{link}}" title="{{caption}}" target="_blank"><img src="{{image}}" alt="{{caption}}" class="img-fluid"/></a></div>',
    });


    userFeed.run();

    
    // This will create a single gallery from all elements that have class "gallery-item"
    $('.gallery').magnificPopup({
        type: 'image',
        delegate: 'a',
        gallery: {
            enabled: true
        }
    });


});