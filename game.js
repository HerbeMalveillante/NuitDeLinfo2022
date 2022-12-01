import * as me from "https://esm.run/melonjs";

me.device.onReady(function () {
	// initialize the display canvas once the device/browser is ready
	me.video.init(800, 800, {
		parent: "gamecontainer",
		renderer: me.video.AUTO,
		scale: "flex",
		scaleMethod: "fit",
	});

	// add a gray background to the default Stage
	me.game.world.addChild(new me.ColorLayer("background", "#202020"));

	// add a font text display object
	me.game.world.addChild(
		new me.Text(50, 50, {
			font: "Arial",
			size: 20,
			fillStyle: "#FFFFFF",
			textBaseline: "middle",
			textAlign: "center",
			text: "Hello World !",
		})
	);
});
