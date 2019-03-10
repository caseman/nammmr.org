if (typeof documentReady === 'function') {
    documentReady();
}

$(document).ready(function () {
    var pinned = $('#pin-to-top');
    if (pinned) {
        var top = pinned.offset().top - parseFloat(pinned.css('marginTop'));

        $(window).scroll(function (event) {
            var ypos = $(this).scrollTop();
            console.log(ypos, top, pinned.offset());
            if (ypos >= top) {
                pinned.addClass('pinned');
            } else {
                pinned.removeClass('pinned');
            }
        });
    }
});

