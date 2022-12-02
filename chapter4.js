import VisualChar from "./VisualChar.js";


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



class Chapter4{
    constructor(){
        this.bg = new Image();
        this.bg.src = "IMG/appartBleu.png";
        this.bg.alt = "JavaScriptImage";

        this.bleu = new VisualChar("IMG/sprites.png","Bleu", 2, 249, 331, 450, 250);
        this.bleu.action = 1;
        this.rouge = new VisualChar("IMG/sprites.png","Rouge", 1, 249, 331, 150, 250);

        this.characters = [this.rouge, this.bleu];

        var _this = this
        this.data = null;
        this.SlideNb = 0;

        this.ready = false;
        this.finished = false;

        this.pause = false;

        this.choosing = false;
        this.choice = -1;

        $.getJSON('chap4.json', function(values) {
            
            _this.SlideNb = values.num;
            _this.data = values.slide;

        }).done(function(data){

            _this.ready = true;

        });

        this.slide = -1;
    }
    
    update(e) {
        if(!this.choosing){
            if(!(this.slide == 12 || this.slide == 19) && !this.pause){
                this.pause = false;
                this.slide = Math.min(this.slide+1, this.SlideNb-1);
                this.choice = -1;
                if (this.slide == this.SlideNb-1) {
                    this.finished = true;
                }
            } else {
                this.pause = !this.pause;
                if(!this.pause){
                    this.slide = Math.min(this.slide+1, this.SlideNb-1);
                }
            }
        } else {
            console.log(e.which);
            switch (e.which) {
                case 113 :
                    this.choice = 0;
                    break;
                case 100:
                    this.choice = 1;
                    break;
            }
        }
    }
    
    draw(ctx) {
        
        if(!this.ready){
            ctx.fillStyle = "rgb(0, 0, 0)"; 
            ctx.fillRect(0, 0, 600, 600);
        } else {
        
            if (this.slide == -1){
                ctx.fillStyle = "rgb(0, 0, 0)"; 
                ctx.fillRect(0, 0, 600, 600);
        
                ctx.fillStyle = "rgb(255, 106, 0)"; 
                ctx.font = "50px Arial";
                ctx.textAlign = "center";
                ctx.fillText("Après être montés...",300,300);
            } else if(this.pause){
                ctx.fillStyle = "rgb(0, 0, 0)"; 
                ctx.fillRect(0, 0, 600, 600);
        
                ctx.fillStyle = "rgb(255, 106, 0)"; 
                ctx.font = "40px Arial";
                ctx.textAlign = "center";
                if(this.slide == 12){
                    ctx.fillText("Une longue discussion plus tard",300,300);
                } else if(this.slide == 19){
                    ctx.fillText("Après une nuit 'agitée'...",300,300);
                }

            } else {

                var s = this.data[this.slide];
                var values = [s.id, s.idChar, s.action, s.legend, s.content, s.choice, s.answer];
        
                if (values[1] == -1){
                    ctx.fillStyle = "rgb(0, 0, 0)"; 
                    ctx.fillRect(0, 0, 600, 600);
        
                } else if (true) {
        
                    ctx.drawImage(this.bg, 0, 0);
                    
                    this.characters[values[1]%2].draw(ctx);
            
                    var r_a = 0.2; 
                    ctx.fillStyle = "rgba(0, 0, 0, " + r_a + ")"; 
                    ctx.fillRect(0, 0, 600, 600);
                    
                    this.characters[values[1] -1].action = values[2];
                    this.characters[values[1] -1].draw(ctx)
            
                    if(s.choice.length == 0){
                        var r_a = 0.8; 
                        ctx.fillStyle = "rgba(0, 0, 0, " + r_a + ")"; 
                        ctx.fillRect(0, 400, 600, 200);
    
    
                        var r_a = 0.8; 
                        ctx.fillStyle = "rgba(0, 0, 0, " + r_a + ")"; 
                        ctx.fillRect(0, 350, 200, 50);

                        ctx.fillStyle = "rgb(255, 106, 0)"; 
                        ctx.font = "30px Arial";
                        ctx.textAlign = "center";
                        if (values[3] == "" && values[1] != -1){
                            ctx.fillText(this.characters[values[1] -1].pseudo,100,390);
                        } else {
                            ctx.fillText(values[3],100,390);
                        }
        
                        ctx.fillStyle = "rgb(255, 157, 20)"; 
                        ctx.font = "25px Arial";
                        ctx.textAlign = "center";
                        if (true){
                            
                            let wrappedText = wrapText(ctx, values[4], 300, 450, 500, 28);
                            
                            wrappedText.forEach(function(item) {
                                // item[0] is the text
                                // item[1] is the x coordinate to fill the text at
                                // item[2] is the y coordinate to fill the text at
                                ctx.fillText(item[0], item[1], item[2]); 
                            })
        
                        }

                    } else {

                        this.choosing = true;
                        
                        if (this.choice == -1){

                            var r_a = 0.6; 
                            ctx.fillStyle = "rgba(0, 0, 0, " + r_a + ")"; 
                            ctx.fillRect(30, 350, 540, 100);
                            ctx.fillRect(30, 475, 540, 100);
            
                            ctx.fillStyle = "rgb(255, 157, 20)"; 
                            ctx.font = "25px Arial";
                            ctx.textAlign = "center";

                            if (true){
                                var table = ["(Q) -> ", "(D) -> "]
                                for(var i = 0; i < s.choice.length; i++) {
                                
                                    let wrappedText = wrapText(ctx, table[i] + s.choice[i], 300, 400+125*i, 500, 30);
                                    
                                    wrappedText.forEach(function(item) {
                                        // item[0] is the text
                                        // item[1] is the x coordinate to fill the text at
                                        // item[2] is the y coordinate to fill the text at
                                        ctx.fillText(item[0], item[1], item[2]); 
                                    });

                                }
            
                            }
                        } else {
                            if(s.answer[this.choice] != ""){
                                var s = this.data[this.slide];
                                var values = [s.id, s.idChar, s.action, s.legend, s.content, s.choice, s.answer];

                                ctx.fillStyle = "rgb(0, 0, 0)"; 
                                ctx.fillRect(0, 0, 600, 600);
                                
                                this.characters[values[1]%2].draw(ctx);
    
                                var r_a = 0.8; 
                                ctx.fillStyle = "rgba(0, 0, 0, " + r_a + ")"; 
                                ctx.fillRect(0, 0, 600, 600);
                        
                                ctx.fillStyle = "rgb(255, 106, 0)"; 
                                ctx.font = "25px Arial";
                                ctx.textAlign = "center";
                                
                                let wrappedText = wrapText(ctx, s.answer[this.choice], 300, 400, 500, 40);
                                
                                wrappedText.forEach(function(item) {
                                    // item[0] is the text
                                    // item[1] is the x coordinate to fill the text at
                                    // item[2] is the y coordinate to fill the text at
                                    ctx.fillText(item[0], item[1], item[2]); 
                                });
                            } else {
                                this.slide += 1;
                            }
                            this.choosing = false;
                        }

                    }
        
                }

            }
        }

    }
}

export default Chapter4;