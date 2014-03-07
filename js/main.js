( function ( window ){
	"use strict";

	var textRegex = /\w/g;
	var ReadWord = function ( val ) {
		this.val = val;

		// Center value for alignment
		this.index = 0;

		// ReadWord Status Values
		this.hasLeadingQuote = false;
		this.hasTrailingQuote = false;
		this.hasPeriod = false;
		this.hasOtherPunc = false;
		this.isShort = false;
		this.isLong = false;

		this.process();
	};

	var p = ReadWord.prototype;

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
				break;
			case ":":
			case ";":
			case ",":
			case "-":
				this.hasOtherPunc = true;
				break;
		}

		switch (this.length) {
			case 0:
			case 1:
				this.index = 0;
				this.isShort = true;
				break;
			case 2:
			case 3:
			case 4:
				this.index = 1;
				this.isShort = true;
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
				this.isLong = true;
				break;
			default:
				this.index = 4;
				this.isLong = true;
				break;
		}

		// Adjust index for leading quote
		if (this.hasLeadingQuote) {
			this.index ++;
		}

	};

	window.ReadWord = ReadWord;

}(window) );


( function ( window ){
	"use strict";

	var wordRegex = /([^\s\-\—\/]+[\-\—\/]?|[\r\n]+)/g;
	var presuf = /^(\W*)(anti|auto|ab|an|ax|al|as|bi|bet|be|contra|cat|cath|cir|cum|cog|col|com|con|cor|could|co|desk|de|dis|did|dif|di|eas|every|ever|extra|ex|end|en|em|epi|evi|func|fund|fin|hyst|hy|han|il|in|im|ir|just|jus|loc|lig|lit|li|mech|manu|man|mal|mis|mid|mono|multi|mem|micro|non|nano|ob|oc|of|opt|op|over|para|per|post|pre|peo|pro|retro|rea|re|rhy|should|some|semi|sen|sol|sub|suc|suf|super|sup|sur|sus|syn|sym|syl|tech|trans|tri|typo|type|uni|un|van|vert|with|would|won)?(.*?)(weens?|widths?|icals?|ables?|ings?|tions?|ions?|ies|isms?|ists?|ful|ness|ments?|ly|ify|ize|ise|ity|en|ers?|ences?|tures?|ples?|als?|phy|puts?|phies|ry|ries|cy|cies|mums?|ous|cents?)?(\W*)$/i;
	var vowels = 'aeiouyAEIOUY'+
		'ẚÁáÀàĂăẮắẰằẴẵẲẳÂâẤấẦầẪẫẨẩǍǎÅåǺǻÄäǞǟÃãȦȧǠǡĄąĀāẢảȀȁȂȃẠạẶặẬậḀḁȺⱥ'+
		'ǼǽǢǣÉƏƎǝéÈèĔĕÊêẾếỀềỄễỂểĚěËëẼẽĖėȨȩḜḝĘęĒēḖḗḔḕẺẻȄȅȆȇẸẹỆệḘḙḚḛɆɇɚɝÍíÌìĬĭÎîǏǐÏ'+
		'ïḮḯĨĩİiĮįĪīỈỉȈȉȊȋỊịḬḭIıƗɨÓóÒòŎŏÔôỐốỒồỖỗỔổǑǒÖöȪȫŐőÕõṌṍṎṏȬȭȮȯȰȱØøǾǿǪǫǬǭŌōṒṓ'+
		'ṐṑỎỏȌȍȎȏƠơỚớỜờỠỡỞởỢợỌọỘộƟɵÚúÙùŬŭÛûǓǔŮůÜüǗǘǛǜǙǚǕǖŰűŨũṸṹŲųŪūṺṻỦủȔȕȖȗƯưỨứỪừ'+
		'ỮữỬửỰựỤụṲṳṶṷṴṵɄʉÝýỲỳŶŷY̊ẙŸÿỸỹẎẏȲȳỶỷỴỵʏɎɏƳƴ';
	var c = '[^'+vowels+']';
	var v = '['+vowels+']';
	var vccv = new RegExp('('+v+c+')('+c+v+')', 'g');
	var simple = new RegExp('(.{2,4}'+v+')'+'('+c+')', 'g');

	var ReadBlock = function ( val ) {
		this.val = val;

		this.words = [];
		this.index = 0;

		this.process();
	};

	var p = ReadBlock.prototype;

	p.process = function () {
		// Cleanup
		this.words = [];
		this.index = 0;

		// Build word chain
		var rawWords = this.val.match(wordRegex);
		var i = rawWords.length; while (i--) {
			var w = rawWords[i];

			// Split up long words as best we can
			if (w.length > 13) {
				w = this.break(w);
				var subWords = w.match(wordRegex);
				var j = subWords.length; while (j--) {
					this.words.unshift( new ReadWord(subWords[j]) ) ;
				}
			} else {
				this.words.unshift( new ReadWord(w) ) ;
			}
		}

	};


	p.break = function (word) {
		// punctuation, prefix, center, suffix, punctuation
		var parts = presuf.exec(word);
		var ret = [];
		if (parts[2]) {
			ret.push(parts[2]);
		}
		if (parts[3]) {
			ret.push(parts[3].replace(vccv, '$1-$2'));
		}
		if (parts[4]) {
			ret.push(parts[4]);
		}
		return (parts[1]||'') + ret.join('-') + (parts[5]||'');
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

	p.getProgress = function () {
		return this.index / this.words.length;
	};

	window.ReadBlock = ReadBlock;

}(window) );

( function ( window, $ ){
	"use strict";

	/*jshint multistr: true */
	var ele = '<div class="__read __progrecss">\
			<div class="__read_bar">\
				<div class="__read_position">\
					<div class="__read_indicator"></div>\
					<div class="__read_display"></div>\
					<div class="__read_before"></div>\
					<div class="__read_letter"></div>\
				</div>\
				<div class="__read_config"></div>\
				<div class="__read_restart"></div>\
				<div class="__read_close_read"></div>\
			</div>\
			<div class="__read_settings">\
				<input class="__read_speed" type="text"/>\
				<div class="__read_speed_slider"></div>\
				<div class="__read_close_settings"></div>\
			</div>\
		</div>';

	$.fn.textWidth = function(){
		var self = $(this),
			children = self.contents(),
			calculator = $('<span style="display: inline-block;" />'),
			width;

		children.wrap(calculator);
		width = children.parent().width();
		children.unwrap();
		return width;
	};

	var defaultOptions = {
		element: null,
		wpm: 300,
		slowStartCount: 5,
		sentenceDelay: 2.5,
		otherPuncDelay: 1.5,
		shortWordDelay: 1.3,
		longWordDelay: 1.4
	};


	function Read ( block, options ) { //element, wpm ) {

		// Defaults
		this._parentElement = null;
		this._barElement = null;
		this._settingsElement = null;
		this._closeSettingsElement = null;
		this._configElement = null;
		this._restartElement = null;
		this._displayElement = null;
		this._closeElement = null;
		this._speedElement = null;
		this._readSliderElement = null;
		this._currentWord = null;
		this._delay = 0;
		this._timer = null;
		this._isPlaying = false;
		this._isEnded = false;

		this._options = $.extend( {}, defaultOptions, options );

		Read.enforceSingleton(this);

		// Configured
		this.setWPM(this._options.wpm);
		this.setText(block);
		this.setElement(this._options.element);
	}

	Read.enforceSingleton = function (inst) {
		if (Read.instance) {
			Read.instance.destroy();
			Read.instance = null;
		}
		Read.instance = inst;
	};

	var p = Read.prototype;

	p._display = function () {
		this._currentWord = this._block.getWord();
		if (this._currentWord) {
			this._showWord();

			var time = this._delay;

			if ( this._currentWord.hasPeriod ) time *= this._options.sentenceDelay;
			if ( this._currentWord.hasOtherPunc ) time *= this._options.otherPuncDelay;
			if ( this._currentWord.isShort ) time *= this._options.shortWordDelay;
			if ( this._currentWord.isLong ) time *= this._options.longWordDelay;

			if (this._options.slowStartCount) {
				time = time * this._options.slowStartCount;
				this._options.slowStartCount --;
			}
			this._timer = setTimeout($.proxy(this._next, this),time);
		} else {
			this.clearDisplay();
			this._isPlaying = false;
			this._isEnded = true;
			this._options.element.attr('data-progrecss', 100 );
		}
	};

	p._showWord = function () {
		if (this._displayElement) {
			var word = this._currentWord.val;

			var before = word.substr(0, this._currentWord.index);
			var letter = word.substr(this._currentWord.index, 1);

			// fake elements
			var $before = this._options.element.find('.__read_before').html(before).css("opacity","0");
			var $letter = this._options.element.find('.__read_letter').html(letter).css("opacity","0");

			var calc = $before.textWidth() + Math.round( $letter.textWidth() / 2 );

			this._displayElement.html(this._currentWord.val);
			this._displayElement.css("margin-left", -calc);
		}

		if (this._options.element && this._block) {
			this._options.element.attr('data-progrecss', parseInt(this._block.getProgress() * 100, 10) );
		}
	};

	p._initSettings = function () {
		this._speedSliderElement.noUiSlider({
			range: [300,1200],
			start: 300,
			step: 25,
			handles: 1,
			behaviour: 'extend-tap',
			serialization: {
				to: [ this._speedElement ],
				resolution: 1
			},
			set: $.proxy( function() {
				console.log(this._speedElement.val());
				this.setWPM( this._speedElement.val() );
			},this )
		});
	};

	p.showSettings = function () {
		console.log(open);
		this._options.element.addClass('open');
		this._configElement.addClass('active');
	};

	p.hideSettings = function () {
		this._options.element.removeClass('open');
		this._configElement.removeClass('active');
	};

	p.destroy = function () {
		p.pause();
		this._speedElement.off ( "blur" );
		this._speedElement.off ( "keydown" );
		this._parentElement.find('.__read').remove();
		this._parentElement.css( "padding-top", "-=50" );
	};

	p.setText = function (val) {
		if (val) {
			this.pause();
			this.restart();
			this._block = new ReadBlock(val);

		}
	};

	p._next = function() {
		this._block.next();
		this._display();
	};

	p.setElement = function (val) {
		if (!val) {
			val = 'body';
		}

		this.clearDisplay();

		// unbind old binds
		if (this._parentElement) {
			this._parentElement.find('.__read').remove();
			this._parentElement.css( "padding-top", "-=50" );
		}

		if (val instanceof $) {
			this._parentElement = val;
		} else {
			this._parentElement = $(val);
		}

		// bind new binds
		this._options.element = $(ele);
		this._parentElement.animate( { "padding-top": "+=50" }, 400);
		this._parentElement.prepend(this._options.element);
		this._options.element.slideDown();

		this._barElement = this._options.element.find('.__read_bar');

		this._settingsElement = this._options.element.find('.__read_settings');

		this._closeSettingsElement = this._options.element.find('.__read_close_settings');
		this._closeSettingsElement.on ( "touchend click", $.proxy(this.hideSettings, this) );

		this._configElement = this._options.element.find('.__read_config');
		this._configElement.on ( "touchend click", $.proxy(this.showSettings, this) );

		this._restartElement = this._options.element.find('.__read_restart');
		this._restartElement.on ( "touchend click", $.proxy(this.restart, this) );

		this._displayElement = this._options.element.find('.__read_display');
		this._displayElement.on ( "touchend click", $.proxy(this.playPauseToggle, this) );

		this._closeElement = this._options.element.find('.__read_close_read');
		this._closeElement.on ( "touchend click", $.proxy(this.destroy, this) );

		this._speedElement = this._options.element.find('.__read_speed');
		this._speedElement.on ( "blur", $.proxy(this.updateWPMFromUI, this) );
		this._speedElement.on ( "keydown", function(e) { if (e.keyCode == 13) { $(this).blur(); } });
		this._speedSliderElement = this._options.element.find('.__read_speed_slider');

		this._initSettings();
	};


	p.playPauseToggle = function () {
		if (this._isPlaying) {
			this.pause();
		} else {
			this.play();
		}
	};

	p.play = function () {
		if (this._block) {
			if (this._isEnded) {
				this.restart();
				this._isEnded = false;
			}
			this._options.slowStartCount = 5;
			this._display();
			this._isPlaying = true;
		}
	};

	p.clearDisplay = function () {
		if (this._displayElement) this._displayElement.html("");
	};

	p.pause = function () {
		clearTimeout(this._timer);
		this._isPlaying = false;
	};

	p.restart = function () {
		if (this._block) {
			this._block.restart();
			this._showWord();
		}
	};

	p.setWPM = function ( val ) {
		val = Number(val);
		val = Math.max (1, val);
		val = Math.min (1500, val);
		this._wpm = val;
		this._delay = 1/(val/60)*1000;
	};

	p.setSentenceDelay = function ( val ) {
		val = Number(val);
		val = Math.max (1, val);
		val = Math.min (10, val);
		this._options.sentenceDelay = val;
	};

	p.setOtherPuncDelay = function ( val ) {
		val = Number(val);
		val = Math.max (1, val);
		val = Math.min (10, val);
		this._options.otherPuncDelay = val;
	};

	p.setShortWordDelay = function ( val ) {
		val = Number(val);
		val = Math.max (1, val);
		val = Math.min (10, val);
		this._options.shortWordDelay = val;
	};

	p.setLongWordDelay = function ( val ) {
		val = Number(val);
		val = Math.max (1, val);
		val = Math.min (10, val);
		this._options.longWordDelay = val;
	};

	p.setSlowStartCount = function ( val ) {
		val = Number(val);
		val = Math.max(0,val);
		val = Math.min(10,val);
		this._options.slowStartCount = val;
	};

	p.updateWPMFromUI = function () {
		var newWPM = this._speedElement.val();
		newWPM = newWPM.match(/[\d]+/g);
		newWPM = parseInt(newWPM, 10);
		this.setWPM(newWPM);
	};

	window.Read = Read;

}(window, jQuery) );

//= require ./ReadWord
//= require ./ReadBlock
//= require ./Read

var r;

$(function() {
	r = new Read ( $('#txt').val() );
	r.play();

	$('#txt').on('blur', function () {
		if (this.value) {
			r.setText ( this.value );
			r.play();
		}
	});
});
