# READ [![Build Status](https://travis-ci.org/jamestomasino/read.png?branch=develop)](https://travis-ci.org/jamestomasino/read)

## Overview ##

Speed reading via [RSVP](http://en.wikipedia.org/wiki/Rapid_serial_visual_presentation).

A recent plethora of speed reading apps and tool-kits inspired this open-source implementation.

## Features ##

This tool handles all of the parsing and display logic on the client-side. There is no dictionary look-up or database of words referenced. Everything is parsed by regular expressions. Even with these limitations, `read` offers some unique features.

### RSVP ###

Rapid serial visual presentation allows for readers to keep their eyes focused on a single point on the page, saving a massive amount of time normally lost in reading. As the speed of this serial presentation increases, sub-vocalization also decreases and astounding speeds can be reached with great comprehension.

### Alignment ###

When the eyes read a word, there is an optimal focal point placement around 30% into the word to support easiest understanding. We handle this shift in the alignment of the words for you based on the word length.

### Timing ###

Speed reading via RSVP is all about the timing. How long we display any given word can have a massive impact on the reading experience. Here's a few ways we optimize that experience.

#### Word Length ####

Contrary to expectations, reading small words can actually be more difficult than reading words of medium length. Long words also take a longer time to process. These extra delays are built into our rendering code.

#### Punctuation ####

When you encounter a period, question mark, exclamation point or other punctuation, additional time is provided to process the sentence or fragment. This helps avoid the feeling of a run-on sentence.

#### Paragraphs ####

The tool also gives an additional pause between paragraphs to help contextualize and process information as you read it.

## TODO ##
- Unit test Word class

## COMMIT LOG ##

####2014-03-12####

 * __added more css specificity to labels and inputs__ (`Eric Emmons`)
 * __maxed out z-index__ (`Eric Emmons`)
 * __maxed out z-index__ (`Eric Emmons`)

####2014-03-11####

 * __tweaked css of slider handle__ (`Eric Emmons`)
 * __options are responsive__ (`Eric Emmons`)
 * __restyling options__ (`Eric Emmons`)
 * __added other puctuation, short word, and long word delay options.__ (`Eric Emmons`)
 * __Read supports storing data in chrome sync__ (`James Tomasino`)
 * __triggering blur events for all UI inputs for plugin binding__ (`James Tomasino`)
 * __enforcing left alignment__ (`James Tomasino`)
 * added color to options sliders and fixed slider handle range issue (`Eric Emmons`)

####2014-03-10####

 * __adding fonts for hardcoding__ (`James Tomasino`)
 * __using all google fonts and properly aligning__ (`James Tomasino`)
 * __changing fonts to css imports__ (`James Tomasino`)
 * moving text math out of the way to enable pause/play (`James Tomasino`)
 * added compass back in (`James Tomasino`)
 * split css files for easier porting (`James Tomasino`)
 * using dataurls for images (`James Tomasino`)
 * rebuilding Read on change (`James Tomasino`)
 * updating fonts and fixing styles (`James Tomasino`)

####2014-03-09####

 * __added left:0__ (`James Tomasino`)
 * __fixing some binding for default vals in menu__ (`James Tomasino`)
 * __removed images and replaced with unicode characters__ (`James Tomasino`)
 * __removed close button on settings - made gear toggle__ (`James Tomasino`)
 * __removing todo and changelog from repo__ (`James Tomasino`)
 * __removing console log__ (`James Tomasino`)
 * __removing console log__ (`James Tomasino`)
 * __removing changelog and todo. Cant make up my mind__ (`James Tomasino`)
 * __better restart and display__ (`James Tomasino`)

####2014-03-07####

 * __removed forced set of slow read speed on play__ (`Eric Emmons`)
 * __restructured setting markup. added slow start speed slider__ (`Eric Emmons`)
 * __added close button. added slide down setting container. speed can be adjusted by slider on the fly. added restart button.__ (`Eric Emmons`)
 * added sentence delay slider to settings (`Eric Emmons`)

####2014-03-06####

 * __typo fix__ (`James Tomasino`)
 * __removed whitespace__ (`James Tomasino`)
 * __fixed alignment of focal letter__ (`Eric Emmons`)
 * __split library into seperate files for easier dev__ (`James Tomasino`)
 * __refactor to privatize vars and funcs with ___ (`James Tomasino`)
 * __added new options object in Read creation__ (`James Tomasino`)

####2014-03-04####

 * updating gitignore to avoid all these damn collisions (`James Tomasino`)
 * updated css and js (`James Tomasino`)
 * moved speed change box to left for better display on small screens (`James Tomasino`)
 * matching styles to dom change (`James Tomasino`)
 * updated Read.js to use new dom (`James Tomasino`)
 * updated Read.js to use new dom (`James Tomasino`)

####2014-02-28####

 * __adding progress indicator back in__ (`James Tomasino`)
 * __splitting up styles__ (`James Tomasino`)
 * __merged classes into 1 file and named better__ (`James Tomasino`)
 * better positioning, one instance, color fix (`James Tomasino`)
 * better positioning, one instance, color fix (`James Tomasino`)

####2014-02-27####

 * __better regex for word parsing__ (`James Tomasino`)
 * __better regex for word seperation__ (`James Tomasino`)
 * __adding favicon__ (`James Tomasino`)
 * __added speed indicator on side__ (`James Tomasino`)
 * __dom is built by class__ (`James Tomasino`)
 * __updated styles__ (`James Tomasino`)
 * __ignoring md files in gh-pages__ (`James Tomasino`)
 * __tap when completed restarts__ (`James Tomasino`)
 * __styled .read block for portability__ (`James Tomasino`)
 * __centered styles__ (`James Tomasino`)
 * __adding readme content__ (`James Tomasino`)
 * __add rendered files to ghpages__ (`James Tomasino`)
 * __demo autoplays__ (`James Tomasino`)
 * __added Pride and Prejudice demo__ (`James Tomasino`)
 * __fixed word regex to support blank lines and extra punc."__ (`James Tomasino`)
 * __changed pre-commit hook to bullet todo items__ (`James Tomasino`)
 * __bound pause/play to element__ (`James Tomasino`)
 * __text pulls from textarea on page on blur__ (`James Tomasino`)
 * added progress bar (`James Tomasino`)
 * progress bar added (`James Tomasino`)
 * closing textarea (`James Tomasino`)
 * Changing demo text to give a brief how-to (`James Tomasino`)
 * hyphenating long words (`James Tomasino`)

####2014-02-26####

 * __Initial commit__ (`James Tomasino`)
 * warm-up speed on play (`James Tomasino`)
 * adding width to prevent word-wrap (`James Tomasino`)
 * basic styling to set up eric (`James Tomasino`)
 * maintaining other styles on display element when animating (`James Tomasino`)
 * tweaked time multipliers and tested restart and pause methods (`James Tomasino`)
 * added travis build status to readme (`James Tomasino`)
 * added renderer and block classes (`James Tomasino`)
 * stubbed out unit test (`James Tomasino`)
 * renaming index (`James Tomasino`)
 * adding console.log (`James Tomasino`)
 * removing test code (`James Tomasino`)
 * fixing linting errors (`James Tomasino`)
 * adding gitignore (`James Tomasino`)
 * added grunt boilerplate (`James Tomasino`)
 * handling fancyquotes, length, and index (`James Tomasino`)
 * added basic javascript for parsing word objects (`James Tomasino`)
