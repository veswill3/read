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

####2014-02-27####

 * __demo autoplays__ (`James Tomasino`)
 * __added Pride and Prejudice demo__ (`James Tomasino`)
 * __fixed word regex to support blank lines and extra punc."__ (`James Tomasino`)
 * __changed pre-commit hook to bullet todo items__ (`James Tomasino`)
 * __bound pause/play to element__ (`James Tomasino`)
 * __text pulls from textarea on page on blur__ (`James Tomasino`)

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
