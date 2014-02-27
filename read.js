( function ( window ){
	"use strict";

	var textRegex = /\w/g

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

		if (lastChar == "\"" || lastChar == "'" || lastChar == ")" || lastChar =="\”" || lastChar == "\’" ) {
			this.hasTrailingQuote = true;
		}

		if (firstChar == "\"" || firstChar == "'" || firstChar == "(" || firstChar =="\“" || firstChar == "\‘" ) {
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

var sampleText = "Toward the end of the year 1920 the Government of the United States had practically completed the programme, adopted during the last months of President Winthrop's administration. The country was apparently tranquil. Everybody knows how the Tariff and Labour questions were settled. The war with Germany, incident on that country's seizure of the Samoan Islands, had left no visible scars upon the republic, and the temporary occupation of Norfolk by the invading army had been forgotten in the joy over repeated naval victories, and the subsequent ridiculous plight of General Von Gartenlaube's forces in the State of New Jersey. The Cuban and Hawaiian investments had paid one hundred per cent and the territory of Samoa was well worth its cost as a coaling station. The country was in a superb state of defence. Every coast city had been well supplied with land fortifications; the army under the parental eye of the General Staff, organized according to the Prussian system, had been increased to 300,000 men, with a territorial reserve of a million; and six magnificent squadrons of cruisers and battle-ships patrolled the six stations of the navigable seas, leaving a steam reserve amply fitted to control home waters. The gentlemen from the West had at last been constrained to acknowledge that a college for the training of diplomats was as necessary as law schools are for the training of barristers; consequently we were no longer represented abroad by incompetent patriots. The nation was prosperous; Chicago, for a moment paralyzed after a second great fire, had risen from its ruins, white and imperial, and more beautiful than the white city which had been built for its plaything in 1893. Everywhere good architecture was replacing bad, and even in New York, a sudden craving for decency had swept away a great portion of the existing horrors. Streets had been widened, properly paved and lighted, trees had been planted, squares laid out, elevated structures demolished and underground roads built to replace them. The new government buildings and barracks were fine bits of architecture, and the long system of stone quays which completely surrounded the island had been turned into parks which proved a god-send to the population. The subsidizing of the state theatre and state opera brought its own reward. The United States National Academy of Design was much like European institutions of the same kind. Nobody envied the Secretary of Fine Arts, either his cabinet position or his portfolio. The Secretary of Forestry and Game Preservation had a much easier time, thanks to the new system of National Mounted Police. We had profited well by the latest treaties with France and England; the exclusion of foreign-born Jews as a measure of self-preservation, the settlement of the new independent negro state of Suanee, the checking of immigration, the new laws concerning naturalization, and the gradual centralization of power in the executive all contributed to national calm and prosperity. When the Government solved the Indian problem and squadrons of Indian cavalry scouts in native costume were substituted for the pitiable organizations tacked on to the tail of skeletonized regiments by a former Secretary of War, the nation drew a long sigh of relief. When, after the colossal Congress of Religions, bigotry and intolerance were laid in their graves and kindness and charity began to draw warring sects together, many thought the millennium had arrived, at least in the new world which after all is a world by itself. But self-preservation is the first law, and the United States had to look on in helpless sorrow as Germany, Italy, Spain and Belgium writhed in the throes of Anarchy, while Russia, watching from the Caucasus, stooped and bound them one by one. In the city of New York the summer of 1899 was signalized by the dismantling of the Elevated Railroads. The summer of 1900 will live in the memories of New York people for many a cycle; the Dodge Statue was removed in that year. In the following winter began that agitation for the repeal of the laws prohibiting suicide which bore its final fruit in the month of April, 1920, when the first Government Lethal Chamber was opened on Washington Square. I had walked down that day from Dr. Archer's house on Madison Avenue, where I had been as a mere formality. Ever since that fall from my horse, four years before, I had been troubled at times with pains in the back of my head and neck, but now for months they had been absent, and the doctor sent me away that day saying there was nothing more to be cured in me. It was hardly worth his fee to be told that; I knew it myself. Still I did not grudge him the money. What I minded was the mistake which he made at first. When they picked me up from the pavement where I lay unconscious, and somebody had mercifully sent a bullet through my horse's head, I was carried to Dr. Archer, and he, pronouncing my brain affected, placed me in his private asylum where I was obliged to endure treatment for insanity. At last he decided that I was well, and I, knowing that my mind had always been as sound as his, if not sounder, \"paid my tuition\" as he jokingly called it, and left. I told him, smiling, that I would get even with him for his mistake, and he laughed heartily, and asked me to call once in a while. I did so, hoping for a chance to even up accounts, but he gave me none, and I told him I would wait. The fall from my horse had fortunately left no evil results; on the contrary it had changed my whole character for the better. From a lazy young man about town, I had become active, energetic, temperate, and above all—oh, above all else—ambitious. There was only one thing which troubled me, I laughed at my own uneasiness, and yet it troubled me. During my convalescence I had bought and read for the first time, The King in Yellow. I remember after finishing the first act that it occurred to me that I had better stop. I started up and flung the book into the fireplace; the volume struck the barred grate and fell open on the hearth in the firelight. If I had not caught a glimpse of the opening words in the second act I should never have finished it, but as I stooped to pick it up, my eyes became riveted to the open page, and with a cry of terror, or perhaps it was of joy so poignant that I suffered in every nerve, I snatched the thing out of the coals and crept shaking to my bedroom, where I read it and reread it, and wept and laughed and trembled with a horror which at times assails me yet. This is the thing that troubles me, for I cannot forget Carcosa where black stars hang in the heavens; where the shadows of men's thoughts lengthen in the afternoon, when the twin suns sink into the lake of Hali; and my mind will bear for ever the memory of the Pallid Mask. I pray God will curse the writer, as the writer has cursed the world with this beautiful, stupendous creation, terrible in its simplicity, irresistible in its truth—a world which now trembles before the King in Yellow. When the French Government seized the translated copies which had just arrived in Paris, London, of course, became eager to read it. It is well known how the book spread like an infectious disease, from city to city, from continent to continent, barred out here, confiscated there, denounced by Press and pulpit, censured even by the most advanced of literary anarchists. No definite principles had been violated in those wicked pages, no doctrine promulgated, no convictions outraged. It could not be judged by any known standard, yet, although it was acknowledged that the supreme note of art had been struck in The King in Yellow, all felt that human nature could not bear the strain, nor thrive on words in which the essence of purest poison lurked. The very banality and innocence of the first act only allowed the blow to fall afterward with more awful effect."
var wordRegex = /[\w\'\"\,\.\;\:\-\(\)\“\’\‘\”]+/g
var rawWords = sampleText.match(wordRegex);
var words = [];

var i = rawWords.length; while (i--) {
	words.unshift( new Word( rawWords[i] ) ) ;
}

