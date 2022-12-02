import Chapter1 from "./chapter1.js";
import Chapter2 from "./chapter2.js";
import Chapter3 from "./chapter3.js";

var canvas = document.getElementById("PanelJeu");
var width = canvas.width;
var height = canvas.height;

let chap1 = new Chapter1();
let chap2 = new Chapter2();
let chap3 = new Chapter3();

var chapters = [chap1, chap2, chap3];
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

$("body").keypress(function (e) {
	chapters[ChapIndex].update(e);
});
