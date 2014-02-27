( function ( window, $ ){
	"use strict";

	var Renderer = function ( block, element ) {
		this.setBlock(block);
		this.setElement(element);
		this.currentWord = null;
		this.delay = 0;
		this.setWPM(300);
		this.timer = null;
		this.slowStartCount = 5;
		this.isPlaying = false;
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
		if (val) {
			this.clearDisplay();

			// unbind old binds

			if (val instanceof $) {
				this.element = val;
			} else {
				this.element = $(val);
			}

			// bind new binds
			this.element.on ( "touchend click", $.proxy(this.playPauseToggle, this) );

		}
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
		}
	};

	p.showWord = function () {
		this.element.html(this.currentWord.val);
		this.element.removeClass('index0 index1 index2 index3 index4 index5').addClass('index' + this.currentWord.index);
	};

	p.clearDisplay = function () {
		if (this.element) this.element.removeClass('index0 index1 index2 index3 index4 index5').html("");
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
