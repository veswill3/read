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
		this.isEnded = false;
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

( function ( window ){
	"use strict";

	var textRegex = /\w/g;

	var Word = function ( val ) {
		this.val = val;

		this.index = 0;
		this.timeMultiplier = 1;
		this.hasLeadingQuote = false;
		this.hasTrailingQuote = false;
		this.hasPeriod = false;
		this.hasOtherPunc = false;

		this.process();
	};

	var p = Word.prototype;

	p.process = function () {

		var match = this.val.match(textRegex);
		this.length = (match) ? match.length : 0;

		var lastChar = this.val.substr(-1);
		var firstChar = this.val[0];

		if (lastChar == "\"" || lastChar == "'" || lastChar == ")" || lastChar =="”" || lastChar == "’" ) {
			this.hasTrailingQuote = true;
		}

		if (firstChar == "\"" || firstChar == "'" || firstChar == "(" || firstChar =="“" || firstChar == "‘" ) {
			this.hasLeadingQuote = true;
		}

		if (this.hasTrailingQuote) {
			lastChar = this.val.substr(-2,1);
		}

		switch (lastChar) {
			case ".":
			case "!":
			case "?":
				this.hasPeriod = true;
				this.timeMultiplier = 2.5;
				break;
			case ":":
			case ";":
			case ",":
			case "-":
				this.hasOtherPunc = true;
				this.timeMultiplier = 1.5;
				break;
		}

		switch (this.length) {
			case 0:
			case 1:
				this.index = 0;
				this.timeMultiplier += 0.1;
				break;
			case 2:
			case 3:
			case 4:
				this.timeMultiplier += 0.2;
				this.index = 1;
				break;
			case 5:
			case 6:
			case 7:
			case 8:
				this.index = 2;
				break;
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
				this.index = 3;
				this.timeMultiplier += 0.2;
				break;
			default:
				this.index = 4;
				this.timeMultiplier += 0.4;
				break;
		}

		// Adjust index for leading quote
		if (this.hasLeadingQuote) {
			this.index ++;
		}

	};

	window.Word = Word;

}(window) );

//= require ./Word

( function ( window ){
	"use strict";

	var wordRegex = /([\w\'\"\,\.\;\:\?\!\-\(\)\“\’\‘\”]+|[\r\n]+)/g;

	var Block = function ( val ) {
		this.val = val;

		this.words = [];
		this.index = 0;

		this.process();
	};

	var p = Block.prototype;

	p.process = function () {
		// Cleanup
		this.words = [];
		this.index = 0;

		// Build word chain
		var rawWords = this.val.match(wordRegex);
		var i = rawWords.length; while (i--) {
			this.words.unshift( new Word( rawWords[i] ) ) ;
		}

	};

	p.getWord = function () {
		if (this.words.length && this.index < this.words.length)
			return this.words[this.index];
		else
			return null;
	};

	p.next = function () {
		this.index = Math.min( this.index + 1, this.words.length );
	};

	p.prev = function () {
		this.index = Math.max( this.index - 1, 0 );
	};

	p.restart = function () {
		this.index = 0;
	};

	window.Block = Block;

}(window) );

//= require ./Renderer
//= require ./Block

var b;
var r;


$(function() {
	b = new Block ( $('#txt').val() );
	r = new Renderer ( b, $('.display') );
	r.play();

	$('#txt').on('blur', function () {
		if (this.value) {
			b = new Block ( this.value );
			r.setBlock (b);
			r.play();
		}
	});
});
