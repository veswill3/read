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

	p.next = function (num) {
		if (typeof num === 'undefined') num = 1;
		this.index = Math.min( this.index + num, this.words.length );
	};

	p.prev = function (num) {
		if (typeof num === 'undefined') num = 1;
		this.index = Math.max( this.index - num, 0 );
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
	var ele = '<div class="__read">\
			<div class="__read_bar progrecss">\
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
				<div class="__read_setting __read_wpm">\
					<label class="__read_label">Words Per Minute</label>\
					<input class="__read_input __read_speed" type="text"/>\
					<div class="__read_slider __read_speed_slider"></div>\
				</div>\
				<div class="__read_setting __read_slowstart">\
					<label class="__read_label">Slow Start Speed</label>\
					<input class="__read_input __read_slow_start" type="text"/>\
					<div class="__read_slider __read_slow_start_slider"></div>\
				</div>\
				<div class="__read_setting __read_sentencedelay">\
					<label class="__read_label">Sentence Delay</label>\
					<input class="__read_input __read_sentence_delay" type="text"/>\
					<div class="__read_slider __read_sentence_delay_slider"></div>\
				</div>\
				<div class="__read_setting __read_puncdelay">\
					<label class="__read_label">Other Punctuation Delay</label>\
					<input class="__read_input __read_punc_delay" type="text"/>\
					<div class="__read_slider __read_punc_delay_slider"></div>\
				</div>\
				<div class="__read_setting __read_shortworddelay">\
					<label class="__read_label">Short Word Delay</label>\
					<input class="__read_input __read_short_word_delay" type="text"/>\
					<div class="__read_slider __read_short_word_delay_slider"></div>\
				</div>\
				<div class="__read_setting __read_longworddelay">\
					<label class="__read_label">Long Word Delay</label>\
					<input class="__read_input __read_long_word_delay" type="text"/>\
					<div class="__read_slider __read_long_word_delay_slider"></div>\
				</div>\
			</div>\
		</div>';

	var tagTypesToSkip = ['INPUT', 'TEXTAREA', 'SELECT' ];

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
		wpmMin: 300,
		wpmMax: 1200,
		wpm: 300,
		slowStartCount: 5,
		sentenceDelay: 2.5,
		otherPuncDelay: 1.5,
		shortWordDelay: 1.3,
		longWordDelay: 1.4,
		jumpWordCount: 10,
		useKeyBindings: false
	};

	var whiteSpace = /[\n\r\s]/;

	function Read ( block, options ) { //element, wpm ) {

		// Defaults
		this._parentElement = null;
		this._barElement = null;
		this._settingsElement = null;
		this._configElement = null;
		this._restartElement = null;
		this._displayElement = null;
		this._closeElement = null;

		this._speedElement = null;
		this._speedSliderElement = null;

		this._slowStartElement = null;
		this._slowStartCount = null;
		this._slowStartSliderElement = null;

		this._sentenceDelayElement = null;
		this._sentenceDelaySliderElement = null;

		this._puncDelayElement = null;
		this._puncDelaySliderElement = null;

		this._shortWordDelayElement = null;
		this._shortWordDelaySliderElement = null;

		this._longWordDelayElement = null;
		this._longWordDelaySliderElement = null;

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
		this.setElement();
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

			this._slowStartCount = (this._slowStartCount - 1 ) || 1;
			time = time * this._slowStartCount;

			this._timer = setTimeout($.proxy(this._next, this),time);
		} else {
			this.clearDisplay();
			this._isPlaying = false;
			this._isEnded = true;
			this._barElement.attr('data-progrecss', 100 );
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

			if (!this._currentWord.val.match(whiteSpace)){
				this._displayElement.html(this._currentWord.val);
				this._displayElement.css("margin-left", -calc);
			}
		}

		if (this._options.element && this._block) {
			this._barElement.attr('data-progrecss', parseInt(this._block.getProgress() * 100, 10) );
		}
	};

	p._initSettings = function () {
		// WPM
		this._speedSliderElement.noUiSlider({
			range: [this._options.wpmMin,this._options.wpmMax],
			start: this._options.wpm,
			step: 25,
			connect: 'lower',
			handles: 1,
			behaviour: 'extend-tap',
			serialization: {
				to: [ this._speedElement ],
				resolution: 1
			},
			set: $.proxy( function() {
				this.setWPM( this._speedElement.val() );
				this._speedElement.blur();
			}, this )
		});

		// Slow Start
		this._slowStartSliderElement.noUiSlider({
			range: [0,5],
			start: this._options.slowStartCount,
			step: 1,
			connect: 'lower',
			handles: 1,
			behaviour: 'extend-tap',
			serialization: {
				to: [ this._slowStartElement ],
				resolution: 1
			},
			set: $.proxy( function() {
				this.setSlowStartCount( this._slowStartElement.val() );
				this._slowStartElement.blur();
			},this )
		});

		// Sentence Delay
		this._sentenceDelaySliderElement.noUiSlider({
			range: [0,5],
			start: this._options.sentenceDelay,
			step: 0.1,
			connect: 'lower',
			handles: 1,
			behaviour: 'extend-tap',
			serialization: {
				to: [ this._sentenceDelayElement ],
				resolution: 0.1
			},
			set: $.proxy( function() {
				this.setSentenceDelay( this._sentenceDelayElement.val() );
				this._sentenceDelayElement.blur();
			},this )
		});

		// Other Punctuation Delay
		this._puncDelaySliderElement.noUiSlider({
			range: [0,5],
			start: this._options.otherPuncDelay,
			step: 0.1,
			connect: 'lower',
			handles: 1,
			behaviour: 'extend-tap',
			serialization: {
				to: [ this._puncDelayElement ],
				resolution: 0.1
			},
			set: $.proxy( function() {
				this.setOtherPuncDelay( this._puncDelayElement.val() );
				this._puncDelayElement.blur();
			},this )
		});

		// Short Word Delay
		this._shortWordDelaySliderElement.noUiSlider({
			range: [0,5],
			start: this._options.shortWordDelay,
			step: 0.1,
			connect: 'lower',
			handles: 1,
			behaviour: 'extend-tap',
			serialization: {
				to: [ this._shortWordDelayElement ],
				resolution: 0.1
			},
			set: $.proxy( function() {
				this.setShortWordDelay( this._shortWordDelayElement.val() );
				this._shortWordDelayElement.blur();
			},this )
		});

		// Long word Delay
		this._longWordDelaySliderElement.noUiSlider({
			range: [0,5],
			start: this._options.longWordDelay,
			step: 0.1,
			connect: 'lower',
			handles: 1,
			behaviour: 'extend-tap',
			serialization: {
				to: [ this._longWordDelayElement ],
				resolution: 0.1
			},
			set: $.proxy( function() {
				this.setLongWordDelay( this._longWordDelayElement.val() );
				this._longWordDelayElement.blur();
			},this )
		});


	};

	p.toggleSettings = function () {
		if (this._configElement.hasClass('active')) {
			this.hideSettings();
		} else {
			this.showSettings();
		}
	};

	p.showSettings = function () {
		this._options.element.addClass('open');
		this._configElement.addClass('active');
	};

	p.hideSettings = function () {
		this._options.element.removeClass('open');
		this._configElement.removeClass('active');
	};

	p.destroy = function () {
		p.pause();
		this.removeKeyBindings();
		this._speedElement.off ( "blur" );
		this._speedElement.off ( "keydown" );
		this._parentElement.find('.__read').remove();
		this._parentElement.css( "padding-top", "-=50" );
		this._configElement.off();
		this._restartElement.off();
		this._displayElement.off();
		this._closeElement.off();
		this._speedElement.off();
	};

	p.setText = function (val) {
		if (val) {
			this.pause();
			this.restart();
			this._block = new ReadBlock(val);
			this._currentWord = this._block.getWord();
		}
	};

	p._next = function() {
		this._block.next();
		this._display();
	};

	p._prev = function() {
		this._block.prev();
		this._display();
	};

	p.addKeyBindings = function () {
		this._parentElement.on ( "keydown", $.proxy(this._handleKeys, this) );
	};

	p.removeKeyBindings = function () {
		this._parentElement.off ( "keydown", $.proxy(this._handleKeys, this) );
	};


	p._handleKeys = function(e) {

		// Don't handle keypresses inside certain dom elements
		var tagType = e.target.tagName;
		if (tagTypesToSkip.indexOf(tagType) != -1) return;

		switch ( e.keyCode ) {
			case 32: // space  bar
				this.playPauseToggle();
				break;
			case 37: // left arrow
				this._block.prev(this._options.jumpWordCount);
				break;
			case 38: // up arrow
				var speedUp = this._wpm + 25;
				if ( this._wpm < this._options.wpmMax ) {
					this._speedSliderElement.val(speedUp);
					this._speedElement.blur();
				}
				break;
			case 39: // right arrow
				this._block.next(this._options.jumpWordCount);
				break;
			case 40: // down arrow
				var speedDown = this._wpm - 25;
				if ( this._wpm > this._options.wpmMin ) {
					this._speedSliderElement.val(speedDown);
					this._speedElement.blur();
				}
				break;
			case 82: // R key
				this.restart();
				break;
			case 83: // S key
				this.toggleSettings();
				break;
			case 88: // X key
				this.destroy();
				break;
			case 107:
			case 187: // + keys
				// TODO: increase font size?
				break;
			case 109:
			case 189: // - keys
				// TODO: decrease font size?
				break;
			default:
				break;
		}
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

		this._configElement = this._options.element.find('.__read_config');
		this._configElement.on ( "touchend click", $.proxy(this.toggleSettings, this) );

		this._restartElement = this._options.element.find('.__read_restart');
		this._restartElement.on ( "touchend click", $.proxy(this.restart, this) );

		this._displayElement = this._options.element.find('.__read_display');
		this._displayElement.on ( "touchend click", $.proxy(this.playPauseToggle, this) );

		this._closeElement = this._options.element.find('.__read_close_read');
		this._closeElement.on ( "touchend click", $.proxy(this.destroy, this) );

		this._slowStartElement = this._options.element.find('.__read_slow_start');
		this._slowStartSliderElement = this._options.element.find('.__read_slow_start_slider');

		this._sentenceDelayElement = this._options.element.find('.__read_sentence_delay');
		this._sentenceDelaySliderElement = this._options.element.find('.__read_sentence_delay_slider');

		this._puncDelayElement = this._options.element.find('.__read_punc_delay');
		this._puncDelaySliderElement = this._options.element.find('.__read_punc_delay_slider');

		this._shortWordDelayElement = this._options.element.find('.__read_short_word_delay');
		this._shortWordDelaySliderElement = this._options.element.find('.__read_short_word_delay_slider');

		this._longWordDelayElement = this._options.element.find('.__read_long_word_delay');
		this._longWordDelaySliderElement = this._options.element.find('.__read_long_word_delay_slider');

		this._speedElement = this._options.element.find('.__read_speed');
		this._speedElement.on ( "blur", $.proxy(this.updateWPMFromUI, this) );
		this._speedElement.on ( "keydown", function(e) { if (e.keyCode == 13) { $(this).blur(); } });
		this._speedSliderElement = this._options.element.find('.__read_speed_slider');

		if (this._options.useKeyBindings) {
			this.addKeyBindings();
		}

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
				return;
			}
			if (this._options.slowStartCount) {
				this._slowStartCount = this._options.slowStartCount;
			}
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
			if (!this._isEnded) {
				this.pause();
			}
			if (this._options.slowStartCount) {
				this._slowStartCount = this._options.slowStartCount;
			}
			this._block.restart();
			this._currentWord = this._block.getWord();
			this._isEnded = false;
			this.play();
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
			r.destroy();
			r = new Read ( this.value );
			r.play();
		}
	});
});
