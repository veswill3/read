//= require ./Word

( function ( window ){
	"use strict";

	var wordRegex = /[\w\'\"\,\.\;\:\-\(\)\“\’\‘\”]+/g;

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
