import Path from "../core/Path.js";
import Vector2 from "../math/Vector2.js";

class ButtonInput extends Path{
    constructor(){
        super();
        this.scale=new Vector2(3,3);
        this.position=new Vector2();
    }
    draw(ctx){
        ctx.setTransform(this.scale.x, 0, 0, this.scale.y, this.position.x, this.position.y);

        ctx.beginPath();
        ctx.moveTo(3,14);
        ctx.lineTo(3,18);
        ctx.lineTo(6,16);
        ctx.fillStyle="#000000";
        ctx.fill();
        ctx.beginPath();
        ctx.closePath();
        ctx.fillStyle="#000000";
        ctx.fillRect(0,14,2,4);
        ctx.strokeStyle="#999999";
        ctx.moveTo(2,13);
        ctx.lineTo(7,13);
        ctx.lineTo(7,19);
        ctx.lineTo(2,19);
        ctx.strokeRect(2,13,5,6);
        if(this.isStroke){
            ctx.stroke();
        }
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}
export default ButtonInput;