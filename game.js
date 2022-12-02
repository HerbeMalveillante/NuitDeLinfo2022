import Chapter1 from "./chapter1.js";
import Chapter2 from "./chapter2.js";
import Chapter3 from "./chapter3.js";
import Chapter4 from "./chapter4.js";
import Chapter5 from "./chapter5.js";
import Chapter6 from "./chapter6.js";
import Chapter7 from "./chapter7.js";

var canvas = document.getElementById("PanelJeu");
var width = canvas.width;
var height = canvas.height;

let chap1 = new Chapter1();
let chap2 = new Chapter2();
let chap3 = new Chapter3();
let chap4 = new Chapter4();
let chap5 = new Chapter5();
let chap6 = new Chapter6();
let chap7 = new Chapter7();

var chapters = [chap1, chap2, chap3, chap4, chap5, chap6, chap7];
let ChapIndex = 0;

function update() {
	if (chapters[ChapIndex].finished) {
		ChapIndex += 1;
	}
}

function draw() {
	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");

		ctx.clearRect(0, 0, width, height);

		chapters[ChapIndex].draw(ctx);
	}
}

function loop(timestamp) {
	var progress = timestamp - lastRender;

	update(progress);
	draw();

	lastRender = timestamp;
	window.requestAnimationFrame(loop);
}
var lastRender = 0;
window.requestAnimationFrame(loop);

var unpressed = true;

$( "body" ).keypress(function(e) {
	if(ChapIndex == 1 || ChapIndex == 4 || unpressed){
		chapters[ChapIndex].update(e);
		unpressed = false;
	}
});

$( "body" ).keyup(function(e) {
	unpressed = true;
});
