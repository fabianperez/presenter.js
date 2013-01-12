# Presenter.js
Simple jQuery plugin for presenting a basic vertical slideshow. The slideshow can be controlled with up / down arrow keys or page up / down keys. [Check out the demo](http://fabianperez.github.com/presenter.js/).

## Installation
You'll want to grab these files:

* presenter.min.js
* styles/presenter.css
* images/keyboard-image.png

Add the presenter.css stylesheet to your ```<head>```
```html
<link rel="stylesheet" media="screen" href="styles/presenter.css">
```

If you require the keyboard hint image, place it in your ```images``` folder. If you'd like to customize the location, you can pass a string with the file location as an option. See usage for more info.

Include jQuery 1.7+ and then ```presenter.min.js``` at the bottom of your document.

```html
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script type="text/javascript" src="presenter.min.js"></script>
```

### Presenter.css
Provides styling for the slides, really basic responsive styles and styles for the keyboard hint. You can replace ```keyboard-image.png``` with whatever you like or disable the feature altogether. See usage for more info.

## Usage
The most basic usage is calling presenter like so:

```javascript
$('body').presenter()
```

You can customize several options. These are the defaults:

```javascript
$('body').presenter({
  selector: '.slide',                      // The container element for your slides
  contentSelector: '.slide-content',       // The element wrapping your content
  showHint: true,                          // Whether or not to show the keyboard image hint
  hintSource: 'images/keyboard-image.png', // The location of the hint image
})
```

## License
Distributed under [MIT License](http://fabianperez.mit-license.org/)

**Note** This project makes use of [resizeend](http://github.com/porada/resizeend) written by [Dominik Porada](http://porada.mit-license.org) which is also distributed under the MIT License.

[@fabrahamlincoln](http://twitter.com/fabrahamlincoln)
