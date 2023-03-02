function getTimeRemaining(endtime) {
    var t = Date.parse("May 15 2024") - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  
  function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');
  
    function updateClock() {
      var t = getTimeRemaining(endtime);
  
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
  
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }
  
  var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
  initializeClock('clockdiv', deadline);s

  var Gallery = (function() {
    var colors = ['#34495E', '#2E4053', '#283747', '#212F3C', '#1B2631', '#2C3E50', '#273746'];
    var scrollTimeId;
    var posLeft = 0;

    function Gallery(config) {
        this.list = $(config.list);
        this.items = this.list.find('li');
        this.itemWidth = this.items.outerWidth();
    };

    Gallery.prototype = {
        constructor: Gallery,

        init: function() {
            this.setGalleryWidth();
            this.setItemsColor();
            this.eventManager();

            return this;
        },

        eventManager: function() {
            var _this = this;

            $("html, body").on('mousewheel', function(event) {
                clearTimeout(scrollTimeId);
                scrollTimeId = setTimeout(onScrollEventHandler.bind(this, event, _this.itemWidth), 0);
            });
        },

        getRandomColor: function() {
            return colors[Math.floor(Math.random() * colors.length)];
        },

        setItemsColor: function() {
            var _this = this;

            $.each(this.items, function(index, item) {
                 item.style.backgroundColor = _this.getRandomColor();
            });
        },

        setGalleryWidth: function() {
            this.list.css('width', this.getGalleryWidth());
        },

        getGalleryWidth: function() {
            var width = 0;

            this.items.each(function(index, item) {
                width += $(this).outerWidth();
            });

            return width;
        }
    };

    function onScrollEventHandler(event, width) {
      if (event.deltaY > 0) {
        this.scrollLeft -= width / 2;
      } else {
        this.scrollLeft += width / 2;
      }
 
        // Firefox, please, stop it
         // if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
         //    if (event.originalEvent.detail > 0) {
         //        posLeft += width / 2;
         //        $('html').scrollLeft(posLeft);
         //    } else {
         //        posLeft -= width / 2;
         //        $('html').scrollLeft(posLeft);
         //    }
         // } else {
         //    if (event.originalEvent.wheelDelta > 0)  {
         //        this.body.scrollLeft -= width / 2;
         //    } else {
         //        this.body.scrollLeft += width / 2;
         //    }
         // }
        event.preventDefault();
    };

    return Gallery;
})();


$(document).ready(function() {
    var gallery = new Gallery({
        list: '.gallery'
    }).init();
});
