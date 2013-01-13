// Generated by CoffeeScript 1.3.3
(function() {
  var $,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  $ = jQuery;

  $.fn.extend({
    presenter: function(options) {
      var $slides, bindListeners, currentSlide, init, nextSlide, prevSlide, recalculateSlideSize, settings, setupHint, windowHeight,
        _this = this;
      settings = {
        selector: '.slide',
        contentSelector: '.slide-content',
        showHint: true,
        hintSource: 'images/keyboard-image.png'
      };
      settings = $.extend(settings, options);
      $slides = $(settings.selector);
      currentSlide = 0;
      windowHeight = $(window).height();
      if (!$slides.length) {
        return console.warn('Presenter: No slides found.');
      }
      init = function() {
        window.scrollTo(0, 0);
        window.addEventListener('resizeend', function(e) {
          return recalculateSlideSize();
        }, false);
        if (settings.showHint) {
          setupHint();
        }
        recalculateSlideSize();
        return bindListeners();
      };
      setupHint = function() {
        var $el, template;
        template = "<img src=\"" + settings.hintSource + "\" class=\"presenter-hint\">";
        return $el = $(template).prependTo($('body'));
      };
      recalculateSlideSize = function() {
        var content, height, selector, width;
        windowHeight = $(window).height();
        selector = settings.selector;
        content = settings.contentSelector;
        height = windowHeight;
        width = $(window).width();
        $(selector).each(function(i, el) {
          var $el;
          $el = $(el);
          $el.css({
            display: 'block',
            height: windowHeight,
            width: width,
            top: windowHeight * i
          });
          return $el.addClass("slide-" + (i + 1));
        });
        $(content).each(function(i, el) {
          return $(el).css({
            marginTop: -parseInt($(this).outerHeight() / 2) + 'px'
          });
        });
        return setTimeout(function() {
          return $('html, body').animate({
            scrollTop: windowHeight * currentSlide
          }, 150);
        }, 300);
      };
      bindListeners = function() {
        return $(document).on('keydown', function(e) {
          var $el, downs, key, keys, ups;
          key = e.which;
          keys = [40, 38, 34, 33];
          ups = [38, 33];
          downs = [40, 34];
          if (__indexOf.call(keys, key) < 0) {
            return;
          }
          e.preventDefault();
          if (settings.showHint) {
            if (currentSlide === 0 && __indexOf.call(ups, key) >= 0) {
              return;
            }
            $el = $('.presenter-hint');
            if (!$el.hasClass('active')) {
              $el.animate({
                left: '10%',
                opacity: '0.5',
                width: '75px'
              }, 250);
              $el.addClass('active');
            }
            if (currentSlide === $slides.length - 2) {
              $el.hide();
            }
            if (currentSlide === 1 && __indexOf.call(ups, key) >= 0) {
              $el.animate({
                left: '50%',
                opacity: '1',
                width: '126px'
              }, 250);
              $el.removeClass('active');
            }
          }
          switch (key) {
            case 40:
            case 34:
              nextSlide();
              break;
            case 38:
            case 33:
              prevSlide();
          }
          $slides.removeClass('active');
          return $slides.eq(currentSlide).addClass('active').trigger('presenter.active');
        });
      };
      nextSlide = function() {
        if (currentSlide === $slides.length - 1) {
          return;
        }
        $('html, body').animate({
          scrollTop: windowHeight * (currentSlide + 1)
        }, 250);
        return currentSlide += 1;
      };
      prevSlide = function() {
        if (currentSlide === 0) {
          return;
        }
        $('html, body').animate({
          scrollTop: windowHeight * (currentSlide - 1)
        }, 250);
        return currentSlide -= 1;
      };
      return this.each(function() {
        return init();
      });
    }
  });

}).call(this);

// Generated by CoffeeScript 1.3.3
(function() {

  (function(window, document) {
    var currentOrientation, debounce, dispatchResizeEndEvent, event, getCurrentOrientation, initialOrientation, resizeDebounceTimeout;
    if (!(window.addEventListener && document.createEvent)) {
      return;
    }
    event = null;
    dispatchResizeEndEvent = function() {
      if (!event) {
        event = document.createEvent('Event');
        event.initEvent('resizeend', false, false);
      }
      return window.dispatchEvent(event);
    };
    getCurrentOrientation = function() {
      return Math.abs(+window.orientation || 0) % 180;
    };
    initialOrientation = getCurrentOrientation();
    currentOrientation = null;
    resizeDebounceTimeout = null;
    debounce = function() {
      currentOrientation = getCurrentOrientation();
      if (currentOrientation !== initialOrientation) {
        dispatchResizeEndEvent();
        return initialOrientation = currentOrientation;
      } else {
        clearTimeout(resizeDebounceTimeout);
        return resizeDebounceTimeout = setTimeout(dispatchResizeEndEvent, 100);
      }
    };
    return window.addEventListener('resize', debounce, false);
  })(window, document);

}).call(this);
