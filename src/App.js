import React from 'react';
//import ReactDOM from 'react-dom';

//import logo from './logo.svg';
import './App.css';

//var seednum = Date.now();
var score = 0;
var answered = 0;
var wordStartTime = 0;
var gameOver = false;
var gameStarted = false;

const url = new URL(window.location.href);
var time = 60;
let t = url.searchParams.get('time');
if(t)
{
	time = t;
}

var wordlist = {
	"Colours": [
		'MAGENTA', 'PINK', 'RED', 'SCARLET', 'CRIMSON', 'VERMILION', 'ORANGE', 'AMBER', 'YELLOW', 'LIME', 'CHARTREUSE', 'GREEN', 'MINT', 'TEAL', 'CYAN', 'AQUA', 'TURQUOISE', 'BLUE', 'NAVY', 'INDIGO', 'LAVENDER', 'LILAC', 'PURPLE', 'VIOLET', 'WHITE', 'GREY', 'BLACK', 'BROWN', 'GOLD', 'SILVER', 'CERULEAN', 'AZURE', 'BEIGE', 'CARMINE', 'CERISE', 'FUCHSIA', 'CORAL', 'KHAKI', 'OLIVE', 'IVORY', 'BURGUNDY', 'MAROON', 'MAUVE', 'PERIWINKLE', 'OCHRE', 'SAGE', 'SEPIA', 'SIENNA', 'TAN', 'VIRIDIAN', 'VERDIGRIS', 'ULTRAMARINE', 'SEAFOAM', 'CORNFLOWER', 'PEACH', 'CHARCOAL'
	],
	"Fruits": [
		'APPLE', 'ORANGE', 'PEAR', 'PEACH', 'CHERRY', 'BLUEBERRY', 'STRAWBERRY', 'BLACKBERRY', 'GRAPE', 'LIME', 'COCONUT', 'DURIAN', 'LYCHEE', 'MANGO', 'PERSIMMON', 'BANANA', 'PASSIONFRUIT', 'DRAGONFRUIT', 'KIWI', 'KUMQUAT', 'PINEAPPLE', 'RASPBERRY', 'TANGERINE', 'MANDARIN', 'CLEMENTINE', 'APRICOT', 'NECTARINE', 'PLUM', 'JACKFRUIT', 'POMEGRANATE', 'AVOCADO', 'BLACKCURRANT', 'GUAVA', 'CRANBERRY', 'FIG', 'GRAPEFRUIT', 'HUCKLEBERRY', 'WATERMELON', 'BLOOD ORANGE', 'PAPAYA', 'YUZU', 'TOMATO', 'MULBERRY', 'QUINCE', 'CANTALOUPE'
	],
	"Things in Space": [
		'SUN', 'MERCURY', 'VENUS', 'MARS', 'JUPITER', 'SATURN', 'URANUS', 'NEPTUNE', 'PLUTO', 'PLANETS', 'STARS', 'NEBULA', 'ASTEROID', 'BLACK HOLE', 'COMET', 'ROCKET', 'GALAXY', 'CONSTELLATION', 'MOON', 'SUPERNOVA', 'GAMMA RAY', 'PULSAR', 'QUASAR', 'NEUTRON STAR', 'KUIPER BELT', 'ARIES', 'TAURUS', 'GEMINI', 'CANCER', 'LEO', 'VIRGO', 'LIBRA', 'SCORPIUS', 'SAGITTARIUS', 'CAPRICORNUS', 'AQUARIUS', 'PISCES', 'ANDROMEDA', 'CRUX', 'CYGNUS', 'LYRA', 'ORION', 'PEGASUS', 'TRIANGULUM', 'URSA MAJOR', 'URSA MINOR', 'SIRIUS', 'ARCTURUS', 'VEGA', 'RIGEL', 'BETELGEUSE', 'ALTAIR', 'ANTARES', 'SPICA', 'DENEB', 'POLARIS'
	],
	"Musical Instruments": [
		'ACCORDION', 'BAGPIPES', 'BANJO', 'BASSOON', 'BONGO', 'CLARINET', 'CLAVICHORD', 'CORNET', 'CYMBAL', 'DRUM', 'FIDDLE', 'FLUTE', 'GLOCKENSPIEL', 'GONG', 'GUITAR', 'HARMONICA', 'HARP', 'HARPSICHORD', 'LUTE', 'LYRE', 'MANDOLIN', 'MARIMBA', 'OBOE', 'ORGAN', 'PIANO', 'PICCOLO', 'RECORDER', 'SAXOPHONE', 'SITAR', 'TAMBOURINE', 'TRIANGLE', 'TROMBONE', 'TRUMPET', 'TUBA', 'UKULELE', 'VIBRAPHONE', 'VIOLA', 'VIOLIN', 'XYLOPHONE'
	],
	"Elements of the Periodic Table": [
		'HYDROGEN', 'HELIUM', 'LITHIUM', 'BERYLLIUM', 'BORON', 'CARBON', 'NITROGEN', 'OXYGEN', 'FLUORINE', 'NEON', 'SODIUM', 'MAGNESIUM', 'ALUMINUM', 'SILICON', 'PHOSPHORUS', 'SULFUR', 'CHLORINE', 'ARGON', 'POTASSIUM', 'CALCIUM', 'SCANDIUM', 'TITANIUM', 'VANADIUM', 'CHROMIUM', 'MANGANESE', 'IRON', 'COBALT', 'NICKEL', 'COPPER', 'ZINC', 'GALLIUM', 'GERMANIUM', 'ARSENIC', 'SELENIUM', 'BROMINE', 'KRYPTON', 'RUBIDIUM', 'YTTRIUM', 'RHODIUM', 'PALLADIUM', 'SILVER', 'CADMIUM', 'INDIUM', 'TIN', 'ANTIMONY', 'TELLURIUM', 'IODINE', 'XENON', 'CESIUM', 'BARIUM', 'TUNGSTEN', 'RHENIUM', 'OSMIUM', 'IRIDIUM', 'PLATINUM', 'GOLD', 'MERCURY', 'THALLIUM', 'LEAD', 'BISMUTH', 'RADIUM', 'URANIUM', 'NEPTUNIUM', 'PLUTONIUM'
	],
	"Flowers": [
		'ROSE', 'TULIP', 'PANSY', 'COSMOS', 'LILY', 'VIOLET', 'CARNATION', 'DANDELION', 'VIOLA', 'ASTER', 'PHLOX', 'PERIWINKLE', 'HIBISCUS', 'PLUMERIA', 'HYDRANGEA', 'AZALEA', 'RHODODENDRON', 'CAMELLIA', 'CLEMATIS', 'BLEEDING HEART', 'IRIS', 'BUTTERCUP', 'JASMINE', 'WISTERIA', 'DAISY', 'GERBERA', 'PEONY', 'HELLEBORE', 'POPPY', 'CHRYSANTHEMUM', 'PETUNIA', 'CROCUS', 'MARIGOLD', 'MORNING GLORY', 'POINSETTIA', 'ANEMONE', 'HYACINTH', 'ZINNIA', 'SUNFLOWER', 'DAHLIA', 'ORCHID', 'LILAC', 'LAVENDER', 'DAFFODIL', 'BEGONIA', 'GARDENIA', 'GERANIUM'
	],
	"Gemstones/Precious Stones": [
		'AGATE', 'AMBER', 'AMETHYST', 'AQUAMARINE', 'BERYL', 'CITRINE', 'DIAMOND', 'EMERALD', 'FLUORITE', 'GARNET', 'HEMATITE', 'JADE', 'JASPER', 'LAPIS LAZULI', 'MOONSTONE', 'OBSIDIAN', 'ONYX', 'OPAL', 'PEARL', 'PERIDOT', 'PYRITE', 'QUARTZ', 'RUBY', 'SAPPHIRE', 'SODALITE', 'TOPAZ', 'TOURMALINE', 'TURQUOISE', 'ZIRCON'
	],
}
//'HYDROGEN', 'HELIUM', 'LITHIUM', 'BERYLLIUM', 'BORON', 'CARBON', 'NITROGEN', 'OXYGEN', 'FLUORINE', 'NEON', 'SODIUM', 'MAGNESIUM', 'ALUMINUM', 'SILICON', 'PHOSPHORUS', 'SULFUR', 'CHLORINE', 'ARGON', 'POTASSIUM', 'CALCIUM', 'SCANDIUM', 'TITANIUM', 'VANADIUM', 'CHROMIUM', 'MANGANESE', 'IRON', 'COBALT', 'NICKEL', 'COPPER', 'ZINC', 'GALLIUM', 'GERMANIUM', 'ARSENIC', 'SELENIUM', 'BROMINE', 'KRYPTON', 'RUBIDIUM', 'STRONTIUM', 'YTTRIUM', 'ZIRCONIUM', 'NIOBIUM', 'MOLYBDENUM', 'TECHNETIUM', 'RUTHENIUM', 'RHODIUM', 'PALLADIUM', 'SILVER', 'CADMIUM', 'INDIUM', 'TIN', 'ANTIMONY', 'TELLURIUM', 'IODINE', 'XENON', 'CESIUM', 'BARIUM', 'LANTHANUM', 'CERIUM', 'PRASEODYMIUM', 'NEODYMIUM', 'PROMETHIUM', 'SAMARIUM', 'EUROPIUM', 'GADOLINIUM', 'TERBIUM', 'DYSPROSIUM', 'HOLMIUM', 'ERBIUM', 'THULIUM', 'YTTERBIUM', 'LUTETIUM', 'HAFNIUM', 'TANTALUM', 'TUNGSTEN', 'RHENIUM', 'OSMIUM', 'IRIDIUM', 'PLATINUM', 'GOLD', 'MERCURY', 'THALLIUM', 'LEAD', 'BISMUTH', 'POLONIUM', 'ASTATINE', 'RADON', 'FRANCIUM', 'RADIUM', 'ACTINIUM', 'PROTACTINIUM', 'URANIUM', 'NEPTUNIUM', 'PLUTONIUM', 'AMERICIUM', 'CURIUM', 'BERKELIUM', 'CALIFORNIUM', 'FERMIUM', 'MENDELEVIUM', 'NOBELIUM', 'LAWRENCIUM', 'RUTHERFORDIUM', 'DUBNIUM', 'SEABORGIUM', 'BOHRIUM', 'HASSIUM', 'MEITNERIUM', 'DARMSTADTIUM', 'ROENTGENIUM', 'COPERNICIUM', 'NIHONIUM', 'FLEROVIUM', 'MOSCOVIUM', 'LIVERMORIUM', 'TENNESSINE', 'OGANESSON'
const wordlistbackup = JSON.parse(JSON.stringify(wordlist));
console.log(wordlistbackup);

class Square extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			index: this.props.index,
			letter: this.props.letter,
			complete: this.props.complete,
		}
	}
	
	render()
	{
		const { letter, complete } = this.props; // allows updating squares when wordbox state is changed!
		
		let completeClass = '';
		if(complete)
		{
			completeClass = ' completesquare';
		}
		
		if(letter === "" || letter === "*")
		{
			return (
				<div className={"lettersquare" + completeClass} onClick={() => {this.props.onClick()}}>
					<span>&nbsp;</span>
				</div>
			);
		}
		else if([" ", "'", "-", ".", "&"].includes(letter))
		{
			return (
				<div className="lettersquare spacesquare">
					<span>{letter}</span>
				</div>
			);
		}
		else
		{
			return (
				<div className={"lettersquare" + completeClass} onClick={() => {this.props.onClick()}}>
					<span>{letter}</span>
				</div>
			);
		}
	}
}

function shuffle(arr)
{
	return arr.map(value => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);
}

class WordBox extends React.Component
{
	constructor(props)
	{
		super(props);
		var letters = this.props.word.replace(/( |'|-|\.|&)/g, "").split("");
		//letters.sort(() => rng() - 0.5);
		letters = shuffle(letters);
		let entered = this.props.word.replaceAll(/\w/g, '*'); //''.padStart(letters.length, '*');
		
		this.state = {
			word: this.props.word,
			scrambled: letters.join(""),
			entered: entered,
			active: this.props.active,
			complete: this.props.complete,
			updatefunc: this.props.updatefunc,
			roundnum: this.props.roundnum,
		}
	}
	
	componentDidUpdate(prevProps, prevState)
	{
		if(this.props.complete !== this.state.complete)
		{
			this.setState({complete: this.props.complete});
		}
		if(this.props.active !== this.state.active)
		{
			this.setState({active: this.props.active});
		}
		if(this.props.roundnum !== this.state.roundnum)
		{
			let letters = this.props.word.replace(/( |'|-|\.|&)/g, "").split("");
			//letters.sort(() => rng() - 0.5);
			letters = shuffle(letters);
			let entered = this.props.word.replaceAll(/\w/g, '*');//''.padStart(letters.length, '*')
			this.setState({word: this.props.word, scrambled: letters.join(""), entered: entered, roundnum: this.props.roundnum});
		}
	}
	
	handleClick(line, index)
	{
		if(!this.state.complete && this.state.active && !gameOver)
		{
			// if clicking on bottom line, update input on top
			if(line === 2)
			{
				let letter = this.state.scrambled.charAt(index);
				if(letter !== " ")
				{
					let i = this.state.entered.indexOf('*');
					if(i !== -1)
					{
						// force state to update to complete after setting
						this.setState({entered: this.state.entered.slice(0,i)+letter+this.state.entered.slice(i+1)}, () => {
							this.forceUpdate();
							if(this.state.entered === this.state.word)
							{
								console.log("complete!");
								answered++;
								this.setState({complete: true});
								this.state.updatefunc();
							}
						});
					
						this.setState({scrambled: this.state.scrambled.slice(0,index)+"*"+this.state.scrambled.slice(index+1)});
					}
				}
			}
			// otherwise put the selected letter back on the bottom row
			else
			{
				let letter = this.state.entered.charAt(index);
				if(letter !== " ")
				{
					let i = this.state.scrambled.indexOf('*');
					if(i !== -1)
					{
						this.setState({scrambled: this.state.scrambled.slice(0,i)+letter+this.state.scrambled.slice(i+1)});
					
						this.setState({entered: this.state.entered.slice(0,index)+"*"+this.state.entered.slice(index+1)});
					}
				}
			}
		}
	}
	
	render()
	{
		return (
			<div className={this.state.active ? "wordbox" : "wordbox inactive"}>
				<div className="boxline">
					{this.state.entered.split("").map((letter, i) => 
						<Square key={i} letter={letter} index={i} line="1" complete={this.props.complete} onClick={() => {this.handleClick(1, i)}} />
					)}
				</div>
				<div className="boxline">
					{this.state.scrambled.split("").map((letter, i) =>
						<Square key={i} letter={letter} index={i} line="2" complete={this.props.complete} onClick={() => {this.handleClick(2, i)}} />
					)}
				</div>
			</div>
		);
	}
}

function randomWords(num)
{
	let keys = Object.keys(wordlist);
	let rand = Math.floor(Math.random() * keys.length);
	let category = keys[rand];
	let catwords = wordlist[category];
	let words = [];
	
	while(words.length < Math.min(num, catwords.length))
	{
		let i = Math.floor(Math.random() * catwords.length);
		let word = catwords[i];
		if(words.indexOf(word) === -1)
		{
			words.push(word);
		}
	}
	
	for(let i = 0; i < words.length; i++)
	{
		wordlist[category].splice(wordlist[category].indexOf(words[i]), 1);
	}
	if(wordlist[category].length < num)
	{
		delete wordlist[category];
		if(Object.keys(wordlist).length === 0)
		{
			wordlist = JSON.parse(JSON.stringify(wordlistbackup));
		}
	}
	
	return [category, words];
}

class WordSet extends React.Component
{
	constructor(props)
	{
		super(props);
		
		let numwords = 3;
		
		let worddata = randomWords(numwords);
		
		this.state = {
			wordindex: 0,
			numwords: numwords,
			category: worddata[0],
			words: worddata[1],
			roundnum: 1,
			addTime: this.props.addtime,
			intermission: this.props.intermission,
		};
		
		wordStartTime = Date.now();
	}
	
	nextWord()
	{
		console.log(Date.now() - wordStartTime);
		let wordlength = this.state.words[this.state.wordindex].replace(/( |'|-|\.|&)/g, "").length;
		let timeclamped = Math.min(60000, Math.max(1000, Date.now() - wordStartTime));
		let wordScore = 100*(-1.114*Math.log(timeclamped) + 12.533) * 1.1**wordlength;
		score += wordScore;
		this.state.addTime(wordlength);
		
		if(this.state.wordindex === this.state.numwords - 1)
		{
			let worddata = randomWords(this.state.numwords);
			this.setState({wordindex: 0, category: worddata[0], words: worddata[1], roundnum: this.state.roundnum+1});
		}
		else
		{
			this.setState({wordindex: this.state.wordindex+1});
		}
		
		wordStartTime = Date.now();
	}
	
	render()
	{
		const { words, wordindex } = this.state;
		
		return (
			<div>
				<p className="categoryname">CATEGORY:<br />{this.state.category}</p>
				{new Array(this.state.numwords).fill('').map((_, index) => 
					<WordBox key={index} word={words[index]} active={wordindex === index ? true : false} complete={index < wordindex ? true : false} roundnum={this.state.roundnum} updatefunc={() => {this.nextWord()}} />
				)}
			</div>
		);
	}
}

class Game extends React.Component
{
	constructor(props)
	{
		super(props);
		
		let maxtime = time;
		
		let timer = setInterval(() => {
			this.countdown();
		}, 1000);
		this.state = {
			timeLeft: maxtime,
			maxTime: maxtime,
			timerId: timer,
		};
	}
	
	countdown()
	{
		if(gameStarted)
		{
			let timeLeft = this.state.timeLeft;
			if(timeLeft === 0)
			{
				clearTimeout(this.state.timerId);
			}
			else
			{
				let newTimeLeft = this.state.timeLeft-1;
				this.setState({timeLeft: newTimeLeft});
			}
		}
	}
	
	addTime(t)
	{
		this.setState({timeLeft: Math.min(this.state.timeLeft + t, this.state.maxTime)});
	}
	
	gameOver()
	{
		gameOver = true;
	}
	
	render()
	{
		return (
			<div id="game">
			{
				gameStarted ?
					(this.state.timeLeft === 0 ? 
						<div className="endscreen">
							<p className="instructions">
								GAME OVER!<br /><br />
								<table className="stattable"><tbody>
									<tr>
										<td>Final Score</td>
										<td>{Math.floor(score)}</td>
									</tr>
									<tr>
										<td>Words Unscrambled</td>
										<td>{answered}</td>
									</tr>
								</tbody></table>
							</p>
						</div>
					:
						<div>
							<p className="score">Score: {Math.round(score)}</p>
							<div id="gameover">{this.state.timeLeft === 0 ? <span>{this.gameOver()}GAME OVER</span> : "\u00A0"}</div>
							<div className="timer" id="timer">
								{String(Math.floor(this.state.timeLeft/60)).padStart(1, '0') + ":" + String(this.state.timeLeft%60).padStart(2, '0')}
							</div>
							<WordSet addtime={(t) => {this.addTime(t)}} />
						</div>
					)
				:
					<div className="startscreen">
						<h1 className="m-3">Word Scramble Game</h1>
						<p className="instructions">
							Unscramble each set of words as fast as you can! The faster you go, the more points you'll get. You have one minute, but with each word you unscramble, some extra time will be added to the clock.
						</p>
						<button className="startbutton" onClick={() => {gameStarted = true; this.setState({timeLeft: this.state.maxTime});}}>START</button>
					</div>
			}
			</div>
		);
	}
}

function App() {
	return (
		<div className="App">
			<Game />
		</div>
	);
}

export default App;