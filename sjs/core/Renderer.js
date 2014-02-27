( function ( window, $ ){
	"use strict";

	var Renderer = function ( block, element ) {
		this.block = block;
		this.element = element;
		this.currentWord = null;
		this.delay = 0;
		this.setWPM(300);
		this.timer = null;
		this.slowStartCount = 5;
	};

	var p = Renderer.prototype;

	p.play = function () {
		this.slowStartCount = 5;
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
			if (this.slowStartCount) {
				this.slowStartCount --;
				time = time * this.slowStartCount;
			}
			this.timer = setTimeout($.proxy(this.next, this),time);
		} else {
			showWord();
		}
	};

	p.showWord = function () {
		if (this.currentWord) {
			this.element.html(this.currentWord.val);
			this.element.removeClass('index1 index2 index3 index4 index5').addClass('index' + this.currentWord.index);
		} else {
			this.element.removeClass('index1 index2 index3 index4 index5').html("");
		}
	};

	p.pause = function () {
		clearTimeout(this.timer);
	};

	p.restart = function () {
		this.block.restart();
	};

	p.setWPM = function ( val ) {
		this.delay = 1/(val/60)*1000;
	};

	window.Renderer = Renderer;

}(window, jQuery) );
