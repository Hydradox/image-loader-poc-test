let position = 0;


$('form').on('submit', function(e) {
    e.preventDefault();
    var form = new FormData(this);
    
    fetch('/upload', {
        method: 'POST',
        body: form
    }).then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    });
})



$(document).ready(function() {
    fetch('/get-imgs').then(function(response) {
        return response.json();
    })
    .then(function(data) {
        
        for(let i = 0; i < data.length; i++) {
            let img = $('<div>')
                .attr('class', 'thumbnail')
                .append($('<img>')
                    .attr('data-index', i)
                    .attr('src', '/thumbnail/' + data[i])
                    .on('click', function() {
                        openLightbox($(this).attr('data-index'));
                    }))

            $('#imgs').append(img);
        }
    });


    $('#lightbox')
        .on('click', function() {
            closeLightbox();
        });


    $('body').on('keyup', function(e) {
        // If right arrow
        if(e.keyCode == 39 && position < $('.thumbnail').length - 1) {
            return openLightbox(position + 1);
        }


        // If left arrow
        if(e.keyCode == 37  && position > 0) {
            return openLightbox(position - 1);
        }
    })
})



function openLightbox(index) {
    position = parseInt(index);
    console.log('Index: ' + index);
    $('#lightbox-img').attr('src', '/img/' + $(`.thumbnail img[data-index=${index}]`).attr('src').split('/').pop());
    $('#lightbox').addClass('active');

}

function closeLightbox() {
    position = 0;
    $('#lightbox').removeClass('active');
    $('#lightbox-img').attr('src', '');
}