class VisualChar {

    constructor(sprite, pseudo, ligne, w, h, x, y){
        this.action = 0; //0-standing 1-crying
        
        this.sprite = new Image();
        this.sprite.src = sprite;
        this.sprite.alt = "JavaScriptImage";

        this.pseudo = pseudo;

        this.ligne = ligne;
        this.width = w;
        this.height = h;

        this.x = x;
        this.y = y;
    }  

    setOrientation(orientation){
        this.orientation = orientation;
    }

    draw(ctx){

        ctx.drawImage(this.sprite, this.width*this.action, this.ligne*this.height, this.width, this.height, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
		
        
        //return [this.X-this.width/2, this.Y-this.height/2, this.width, this.height];

        //return [this.sprite, this.w*id, this.action*this.h, this.w, this.h, this.X-this.w/2, this.Y-this.h/2, this.w, this.h];
    }
    
    stop(){
        this.action = 0 + this.orientation
    }

}

export default VisualChar;