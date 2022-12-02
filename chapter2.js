import Player from "./player.js";

const wrapText = function(ctx, text, x, y, maxWidth, lineHeight) { // FROM JFOLT.com
    // First, start by splitting all of our text into words, but splitting it into an array split by spaces
    let words = text.split(' ');
    let line = ''; // This will store the text of the current line
    let testLine = ''; // This will store the text when we add a word, to test if it's too long
    let lineArray = []; // This is an array of lines, which the function will return

    // Lets iterate over each word
    for(var n = 0; n < words.length; n++) {
        // Create a test line, and measure it..
        testLine += `${words[n]} `;
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        // If the width of this test line is more than the max width
        if (testWidth > maxWidth && n > 0) {
            // Then the line is finished, push the current line into "lineArray"
            lineArray.push([line, x, y]);
            // Increase the line height, so a new line is started
            y += lineHeight;
            // Update line and test line to use this word as the first word on the next line
            line = `${words[n]} `;
            testLine = `${words[n]} `;
        }
        else {
            // If the test line is still less than the max width, then add the word to the current line
            line += `${words[n]} `;
        }
        // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
        if(n === words.length - 1) {
            lineArray.push([line, x, y]);
        }
    }
    // Return the line array
    return lineArray;
}

class Rectangle{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;

        this.w = w;
        this.h = h;
    }

    in(x,y){
        console.log(this.x <= x,x <= this.x+this.w,this.y <= y,y <= this.y+this.h);
        return (this.x <= x && x <= this.x+this.w) && (this.y <= y && y <= this.y+this.h);
    }
}

function tileCoord(index, tm, ts){ //x, y
    return [index % (tm.width / ts), Math.floor(index / (tm.height / ts))];
}

class Chapter2{
    constructor(){
        this.mapWidth = 1200;
        this.mapHeight = 1200;

        this.x = 0;
        this.y = 0;

        this.finished = false;

        this.player = new Player(5, true, "IMG/violet.png", 80, 80, 460, 1200);

        this.pnj1 = new Player(0, false, "IMG/pnj1.png", 60, 60, 225, 744);
        this.pnj1.setOrientation(2);

        this.pnj2 = new Player(0, false, "IMG/pnj2.png", 60, 60, 773, 278);
        this.pnj2.setOrientation(0);

        this.pnj3 = new Player(0, false, "IMG/pnj3.png", 60, 60, 657, 959);
        this.pnj3.setOrientation(2);

        this.dialogue = -1;

        this.Map = new Image();
        this.Map.src = "IMG/map.png";
        this.Map.alt = "JavaScriptImage";

        this.endPortal = new Rectangle(0,630,80,230);
    }
    
    update(e) {
		switch (e.which) {
			case 122 :
				this.player.setOrientation(0)
				this.player.move(0,-1);
				break;
			case 115:
				this.player.setOrientation(2)
				this.player.move(0,1);
				break;
			case 113 :
				this.player.setOrientation(3)
				this.player.move(-1,0);
				break;
			case 100:
				this.player.setOrientation(1)
				this.player.move(1,0);
				break;
			default:
				//player.stop();
		}

        if(this.pnj1.collideBox.in(this.player.X,this.player.Y)){
            this.dialogue = 1;
        } else if(this.pnj2.collideBox.in(this.player.X,this.player.Y)){
            this.dialogue = 2;
        } else if(this.pnj3.collideBox.in(this.player.X,this.player.Y)){
            this.dialogue = 3;
        } else if(this.endPortal.in(this.player.X,this.player.Y)){
            this.dialogue = 4;
        } else if(this.dialogue != 4) {
            this.dialogue = -1;
        }
    }
    
    draw(ctx) {

        if(this.dialogue == 4){
            
            ctx.fillStyle = "rgb(0, 0, 0)"; 
            ctx.fillRect(0, 0, 600, 600);

            this.finished = true;

        } else {

            var X = Math.max(0, Math.min(this.player.X-300, 600));
            var Y = Math.max(0, Math.min(this.player.Y-300, 600));

            ctx.drawImage(this.Map, X, Y, 600, 600, 0, 0, 600, 600);

            // DRAW PLAYER
            this.pnj1.draw(ctx, X, Y);
            this.pnj2.draw(ctx, X, Y);
            this.pnj3.draw(ctx, X, Y);

            this.player.draw(ctx, X, Y);

            if(this.dialogue != -1){
            
                var r_a = 0.8; 
                ctx.fillStyle = "rgba(0, 0, 0, " + r_a + ")"; 
                ctx.fillRect(0, 400, 600, 200);


                var r_a = 0.8; 
                ctx.fillStyle = "rgba(0, 0, 0, " + r_a + ")"; 
                ctx.fillRect(0, 350, 200, 50);

                ctx.fillStyle = "rgb(255, 106, 0)"; 
                ctx.font = "30px Arial";
                ctx.textAlign = "center";
                ctx.fillText("PNJ "+this.dialogue,100,390);

                ctx.fillStyle = "rgb(255, 157, 20)"; 
                ctx.font = "25px Arial";
                ctx.textAlign = "center";
                if (true){
                    let txt = "";
                    switch(this.dialogue) {
                        case 1:
                            txt = "Bonjour, savais-tu qu’il n'y a quasiment que l’Herpes qui est transmissible oralement ?";
                            break;
                        case 2:
                            txt = "Mince, je ne me suis pas protégé avec ma partenaire, je vais aller me faire dépister car je ne sais pas si elle a une Maladie Sexuellement Transmissible. ( MST ) ";
                            break;
                        case 3:
                            txt = "VIH qui devient Sida, hépatites B et C, herpès, blennorragie gonococcique, chlamydioses, syphilis, papillomavirus, tels sont les noms des principales IST";
                            break;
                    }
                    
                    let wrappedText = wrapText(ctx, txt, 300, 450, 500, 40);
                    
                    wrappedText.forEach(function(item) {
                        // item[0] is the text
                        // item[1] is the x coordinate to fill the text at
                        // item[2] is the y coordinate to fill the text at
                        ctx.fillText(item[0], item[1], item[2]); 
                    })

                }

            }
        }
        
    }

}

export default Chapter2;
