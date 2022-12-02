class Rectangle{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;

        this.w = w;
        this.h = h;
    }

    in(x,y){
        return (this.x <= x && x <= this.x+this.w) && (this.y <= y && y <= this.y+this.h);
    }
}

class Player {

    constructor(speed, isPlayer, sprite, w, h, x, y){
        this.speed = speed;
        this.isPlayer = isPlayer;
        
        this.X = x;
        this.Y = y;
        this.orientation = 0; //0-bas 1-droite 2-haut 3-gauche
        
        this.sprite = new Image();
        this.sprite.src = sprite;
        this.sprite.alt = "JavaScriptImage";

        this.width = w;
        this.height = h;

        this.collideBox = new Rectangle(x, y, w, h);
    }  

    setOrientation(orientation){
        this.orientation = orientation;
    }

    draw(ctx,X,Y){
        let id = 0

        ctx.drawImage(this.sprite, this.width*id, this.orientation*this.height, this.width, this.height, this.X-this.width/2-X, this.Y-this.height/2-Y, this.width, this.height);
		
        //ctx.fillStyle = 'rgb(255, 0, 255)';
		//ctx.fillRect(this.X-this.width/2, this.Y-this.height/2, this.width, this.height);
        //console.log(this.X-this.width/2, this.Y-this.height/2, this.width, this.height);
        //return [this.X-this.width/2, this.Y-this.height/2, this.width, this.height];

        //return [this.sprite, this.w*id, this.action*this.h, this.w, this.h, this.X-this.w/2, this.Y-this.h/2, this.w, this.h];
    }

    move(dx, dy){
        var w = 1200;
        var h = 1200;

        this.X = Math.max(0, Math.min(this.X+dx*this.speed, w))
        this.Y = Math.max(0, Math.min(this.Y+dy*this.speed, h))
    }

}

export default Player;