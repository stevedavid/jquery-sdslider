# jQuery.sdSlider
A simple light-weight jQuery plugin that makes a slider out of a `<ul>` list.

## Releases
* **v0.1** - 02/08/2015

## Requirements
`jQuery.sdSlider` requires the latest version of [`jQuery`](https://jquery.com/download/) and of [`FontAwesome`](https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css).

## Demo
Follow [this JSFiddle link](http://jsfiddle.net/D4V1D/cwct670q/) to see a demo of this plugin.

## Features
* supports an unlimited number of images
* displays dots to control each slide
* displays controlling left and right arrows
* images border configurable

## Usage
* **HTML**

First of all, you would need to make a `<ul>` list populated with `<li>` items each containing an `<img>`, like so:
```html
<ul id="slider">
	<li><img src="http://lorempixel.com/800/350/food/1" alt="slider_1"/></li>
	<li><img src="http://lorempixel.com/800/350/food/2" alt="slider_2"/></li>
	<li><img src="http://lorempixel.com/800/350/food/3" alt="slider_3"/></li>
	<li><img src="http://lorempixel.com/800/350/food/4" alt="slider_4"/></li>
	<li><img src="http://lorempixel.com/800/350/food/5" alt="slider_4"/></li>
</ul>
```

* **jQuery**

The syntax of `jQuery.sdSlider`'s initialization is the following:
```javascript
jQuery(function($) {

	$('#slider').sdSlider({
		autoStart: { // an object containing:
			active: false, // a boolean indicating whether to start the slider automatically
			delay: 1000 // and a integer specifying the delay between each slide
		},
		border: { // an object containing:
			color: '#f00', // the color of each image border as a string 
			width: 0 // the width in px of each image border as an integer
		},
		controls: true, // a boolean to specify whether to display the dots controlling each slide
		arrows: true, // a boolean to specify whether to display the left and right arrows
		duration: 500 // the duration in ms of each animation as a integer
	});

});
```

## Options
Name | Type | Default | Description
------------ | ------------- | ------------- | -------------
autoStart | object | `{active: false, delay: 1000}` | An object to configure the slider autostarting
border | object | `{color: '#000', width: 0}` | An object to configure the border of each image
controls | boolean | `true` | Set it to true to display one dot per image at the bottom of the slider
arrows | boolean | `true` | Set it to true to display the left and right arrows
duration | integer | `1000` | The duration in `ms` of the sliding animation between images

## Licence
Copyright (c) 2015 Steve David

Licensed under the MIT license.
