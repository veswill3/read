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

		this.length = this.val.match(textRegex).length;

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
				this.hasPeriod = true;
				this.timeMultiplier = 2;
				break;
			case "?":
			case ":":
			case ";":
			case "-":
				this.hasOtherPunc = true;
				this.timeMultiplier = 1.5;
				break;
		}

		switch (this.length) {
			case 0:
			case 1:
				this.index = 0;
				break;
			case 2:
			case 3:
			case 4:
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
				break;
			default:
				this.index = 4;
				break;
		}

	};

	window.Word = Word;

}(window) );
