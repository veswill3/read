( function ( window, $ ){
	"use strict";

	var ele = '<div class="read"><div class="read_position"><div class="indicator"></div><div class="display"></div></div></div>';

	var Renderer = function ( block, element ) {

		// Defaults
		this.parentElement = null;
		this.element = null;
		this.displayElement = null;
		this.currentWord = null;
		this.delay = 0;
		this.timer = null;
		this.slowStartCount = 5;
		this.isPlaying = false;
		this.isEnded = false;

		// Configured
		this.setWPM(300);
		this.setBlock(block);
		this.setElement(element);
	};

	var p = Renderer.prototype;

	p.setBlock = function (val) {
		if (val) {
			this.pause();
			this.restart();
			this.block = val;
			this.clearDisplay();
		}
	};

	p.setElement = function (val) {
		if (!val) {
			val = 'body';
		}

		this.clearDisplay();

		// unbind old binds
		if (this.parentElement) {
			this.parentElement.find('.read').remove();
			this.parentElement.css( "padding-top", "-=50" );
		}

		if (val instanceof $) {
			this.parentElement = val;
		} else {
			this.parentElement = $(val);
		}

		// bind new binds
		this.element = $(ele);
		this.parentElement.animate( { "padding-top": "+=50" }, 400);
		this.parentElement.prepend(this.element);
		this.element.slideDown();
		this.displayElement = this.element.find('.display');
		this.element.on ( "touchend click", $.proxy(this.playPauseToggle, this) );
	};

	p.playPauseToggle = function () {
		if (this.isPlaying) {
			this.pause();
		} else {
			this.play();
		}
	};

	p.play = function () {
		if (this.block) {
			if (this.isEnded) {
				this.restart();
				this.isEnded = false;
			}
			this.slowStartCount = 5;
			this.display();
			this.isPlaying = true;
		}
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
				time = time * this.slowStartCount;
				this.slowStartCount --;
			}
			this.timer = setTimeout($.proxy(this.next, this),time);
		} else {
			this.clearDisplay();
			this.isPlaying = false;
			this.isEnded = true;
		}
	};

	p.showWord = function () {
		if (this.displayElement) {
			this.displayElement.html(this.currentWord.val);
			this.displayElement.removeClass('index0 index1 index2 index3 index4 index5').addClass('index' + this.currentWord.index);
		}
	};

	p.clearDisplay = function () {
		if (this.displayElement) this.displayElement.removeClass('index0 index1 index2 index3 index4 index5').html("");
	};

	p.pause = function () {
		clearTimeout(this.timer);
		this.isPlaying = false;
	};

	p.restart = function () {
		if (this.block) this.block.restart();
	};

	p.setWPM = function ( val ) {
		this.delay = 1/(val/60)*1000;
	};

	window.Renderer = Renderer;

}(window, jQuery) );
