$ = jQuery

$.fn.extend

  presenter: ( options ) ->
    # Defaults
    settings =
      selector:             '.slide'
      contentSelector:      '.slide-content'
      showHint:             true
      hintSource:           'images/keyboard-image.png'

    settings     =          $.extend settings, options
    $slides      =          $( settings.selector )
    currentSlide =          0
    windowHeight =          $( window ).height()

    if !$slides.length
      return console.warn 'Presenter: No slides found.'

    init = ->
      window.scrollTo 0, 0

      window.addEventListener 'resizeend', ( e ) ->
        recalculateSlideSize()
      , false

      setupHint() if settings.showHint

      recalculateSlideSize()
      bindListeners()

    setupHint = ->
      template = """
        <img src="#{ settings.hintSource }" class="presenter-hint">
      """

      $el = $( template ).prependTo $('body')

    recalculateSlideSize = =>
      windowHeight = $( window ).height()

      selector =            settings.selector
      content  =            settings.contentSelector
      height   =            windowHeight
      width    =            $( window ).width()

      $( selector ).each ( i, el ) ->
        $el = $( el )

        $el.css
          display:          'block'
          height:           windowHeight
          width:            width
          top:              windowHeight * i

        $el.addClass "slide-#{ i + 1 }"

      $( content ).each ( i, el ) ->
        $( el ).css
          marginTop: -parseInt( $(@).outerHeight() / 2 ) + 'px'

      setTimeout ->
        $('html, body').animate {
          scrollTop: windowHeight * currentSlide
        }, 150
      , 300

    bindListeners = ->
      $( document ).on 'keydown', ( e ) ->
        key   =             e.which
        keys  =             [40, 38, 34, 33]
        ups   =             [38, 33]
        downs =             [40, 34]

        return if key not in keys

        e.preventDefault()

        if settings.showHint
          return if currentSlide is 0 && key in ups

          $el = $('.presenter-hint')

          unless $el.hasClass('active')
            $el.animate {
              left:         '10%'
              opacity:      '0.5'
              width:        '75px'
            }, 250

            $el.addClass 'active'

          $el.hide() if currentSlide is $slides.length - 2

          if currentSlide is 1 && key in ups
            $el.animate {
              left:         '50%'
              opacity:      '1'
              width:        '126px'
            }, 250

            $el.removeClass 'active'

        switch key
          when 40, 34 then do nextSlide
          when 38, 33 then do prevSlide

        $slides.removeClass 'active'

        $slides.eq( currentSlide )
          .addClass('active')
          .trigger('presenter.active')

    nextSlide = ->
      return if currentSlide is $slides.length - 1

      $('html, body').animate {
        scrollTop: windowHeight * ( currentSlide + 1 )
      }, 250

      currentSlide += 1

    prevSlide = ->
      return if currentSlide is 0

      $('html, body').animate {
        scrollTop: windowHeight * ( currentSlide - 1 )
      }, 250

      currentSlide -= 1

    @each ->
      init()
