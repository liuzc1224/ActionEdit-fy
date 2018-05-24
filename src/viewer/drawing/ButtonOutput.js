import Path from "../core/Path.js";
import Vector2 from "../math/Vector2.js";

class ButtonOutput extends Path{
    constructor(){
        super();
        this.scale=new Vector2(3,3);
        this.position=new Vector2();
    }
    draw(ctx){
        ctx.setTransform(this.scale.x, 0, 0, this.scale.y, this.position.x, this.position.y);

        // ctx.strokeStyle="#999999";
        // ctx.strokeRect(38,5,6,6);

        ctx.beginPath();
        ctx.moveTo(41,6);
        ctx.lineTo(41,10);
        ctx.lineTo(43,8);
        ctx.fillStyle="#000000";
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle="#999999";
        ctx.moveTo(38,5);
        ctx.lineTo(44,5);
        ctx.lineTo(44,11);
        ctx.lineTo(38,11);
        ctx.closePath()
        ctx.fillStyle="#000000";
        ctx.fillRect(44.5,6,1.5,4);
        ctx.fillRect(39,6,1,4);
        if(this.isStroke){
            ctx.stroke();
        }
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}
export default ButtonOutput;