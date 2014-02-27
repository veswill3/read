( function ( window, $ ){
	"use strict";

	var Renderer = function ( block, element ) {
		this.block = block;
		this.element = element;
		this.currentWord = null;
		this.delay = 0;
		this.setWPM(300);
	};

	var p = Renderer.prototype;

	p.play = function () {
		this.display();
	};

	p.next = function() {
		this.block.next();
		this.display();
	};

	p.display = function () {
		this.currentWord = this.block.getWord();
		if (this.currentWord) {
			this.showWord();
			var time = this.delay * this.currentWord.timeMultiplier;
			setTimeout($.proxy(this.next, this),time);
		}
	};

	p.showWord = function () {
		this.element.html(this.currentWord.val);
	};

	p.pause = function () {

	};

	p.restart = function () {

	};

	p.setWPM = function ( val ) {
		this.delay = 1/(val/60)*1000;
	};

	window.Renderer = Renderer;

}(window, jQuery) );
