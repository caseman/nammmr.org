/* World's stupidest image carousel by Casey D 
 * Loads one image at a time so as not to upset the
 * delicate sensibilities of some *ahem* devices
 */
function Carousel(element, itemArray, bindAndShow) {
    this.element = element;
    this.itemArray = itemArray;
    this.items = {};
    for (var i = 0; i < itemArray.length; i++) {
        var c = itemArray[i];
        c.index = i;
        this.items[c.id] = c;
    }
    if (bindAndShow) {
        window.onhashchange = this.showCurrentPhoto.bind(this);
        this.showCurrentPhoto();
    }
}

Carousel.prototype.showPhoto = function(id) {
    var item = this.items[id];
    if (!item) return;
    var findEl = this.element.find.bind(this.element);
    var element = this.element;
    var img = findEl('img');
    var caption = findEl('.caption');
    function imgLoaded() {
        caption && caption.html(item.caption);
        element.show(200);
    }
    if (img.length) {
        img.on('load', imgLoaded);
        img.attr('src', item.img);
    } else {
        img = $('<img src="' + item.img + '" alt="">');
        img.on('load', imgLoaded);
        img.appendTo(findEl('.element'));
        detectSwipe(img[0], function(_, dir) {
            if (dir === 'left') {
                window.location.href = findEl('a.next').attr('href');
            } else if (dir === 'right') {
                window.location.href = findEl('a.prev').attr('href');
            }
        });
    }
    findEl('a.next').attr('href', 
        window.location.pathname + (this.itemArray[item.index + 1] || item).id);
    findEl('a.prev').attr('href', 
        window.location.pathname + (this.itemArray[item.index - 1] || item).id);
}

Carousel.prototype.showCurrentPhoto = function(bind) {
    this.showPhoto(window.location.hash);
}

/* Simple swipe gesture detection */
function detectSwipe(element, f) {
    var detect = {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        minX: 30,   // min X swipe for horizontal swipe
        maxX: 30,   // max X difference for vertical swipe
        minY: 50,   // min Y swipe for vertial swipe
        maxY: 60    // max Y difference for horizontal swipe
    };

    element.addEventListener('touchstart', function (event) {
        var touch = event.touches[0];
        detect.startX = touch.screenX;
        detect.startY = touch.screenY;
    });

    element.addEventListener('touchmove', function (event) {
        event.preventDefault();
        var touch = event.touches[0];
        detect.endX = touch.screenX;
        detect.endY = touch.screenY;
    });

    element.addEventListener('touchend', function (event) {
        if (
            // Horizontal move.
            (Math.abs(detect.endX - detect.startX) > detect.minX)
                && (Math.abs(detect.endY - detect.startY) < detect.maxY)
        ) {
            f(element, detect.endX > detect.startX ? 'right' : 'left');
        } else if (
            // Vertical move.
            (Math.abs(detect.endY - detect.startY) > detect.minY)
                && (Math.abs(detect.endX - detect.startX) < detect.maxX)
        ) {
            f(element, detect.endY > detect.startY ? 'down' : 'up');
        }
    });
}

if (typeof documentReady === 'function') {
    documentReady();
}

$(document).ready(function () {
    var pinned = $('#pin-to-top');
    if (pinned.length) {
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

