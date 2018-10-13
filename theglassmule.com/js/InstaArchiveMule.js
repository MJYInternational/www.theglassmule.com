$(document).ready(function() {
    var userFeed = new Instafeed({
        get: 'user',
        userId: '1943310506',
        limit: 32,
        resolution: 'standard_resolution',
        accessToken: '1943310506.1677ed0.24baa43560e34b0dac19e20aeb4c6d76',
        sortBy: 'most-recent',
        template: '<div class="p-b-10 instaPhoto col-6 col-sm-4 col-md-3 instaimg"><a href="{{link}}" title="{{caption}}" target="_blank"><img src="{{image}}" alt="{{caption}}" class="img-fluid"/><p class="likeP"><img src="images/icons/like.png" height="20px">&nbsp;{{likes}}</p></a></div>',
    });
    userFeed.run();

    // var feed = new Instafeed({
    //     get: 'user',
    //     userId: '1943310506',
    //     filter: function(image) {
    //         return image.tags.indexOf('glassart') >= 0;
    //     }
    //     template: '<div class="p-b-10 instaPhoto col-6 col-sm-4 col-md-3 instaimg"><a href="{{link}}" title="{{caption}}" target="_blank"><img src="{{image}}" alt="{{caption}}" class="img-fluid"/><p class="likeP"><img src="images/icons/like.png" height="20px">&nbsp;{{likes}}</p></a></div>',
    // });
    // feed.run();

    
    // This will create a single gallery from all elements that have class "gallery-item"
    $('.gallery').magnificPopup({
        type: 'image',
        delegate: 'a',
        gallery: {
            enabled: true
        }
    });


});