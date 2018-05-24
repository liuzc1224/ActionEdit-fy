import Path from "../core/Path.js";
import Vector2 from "../math/Vector2.js";
class HookedPath extends Path{
    constructor(){
        super();
        this.scale=new Vector2(3,3);
        this.position=new Vector2();
    }
    draw(ctx){
        ctx.setTransform(this.scale.x, 0, 0, this.scale.y, this.position.x, this.position.y);
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        // ctx.moveTo(0,5);
        // ctx.arcTo(30,0,30,5,5);
        // ctx.lineTo(30,0);
        // ctx.arcTo(35,0,35,5,5);
        // ctx.lineTo(35,30);
        // ctx.arcTo(35,35,30,35,5);
        // ctx.lineTo(30,35);
        // ctx.arcTo(10,35,10,30,5);
        // ctx.lineTo(10,10);
        // ctx.lineTo(0,10);
        ctx.moveTo(0,5);
        ctx.arcTo(0,0,10,0,5);
        ctx.lineTo(10,0);
        ctx.lineTo(10,25);
        ctx.lineTo(5,25);
        ctx.arcTo(0,25,0,20,5);
        ctx.lineTo(0,5);

        ctx.moveTo(12.5,0);
        ctx.lineTo(12.5,25);
        ctx.lineTo(32.5,25);
        ctx.lineTo(32.5,0);
        ctx.closePath();

        ctx.moveTo(35,0);
        ctx.lineTo(35,25);
        ctx.lineTo(40,25);
        ctx.arcTo(45,25,45,20,5);
        ctx.lineTo(45,5);
        ctx.arcTo(45,0,40,0,5);
        // ctx.moveTo(10,5)
        // ctx.arcTo(10,0,15,0,5);
        // ctx.lineTo(30,0);
        // ctx.arcTo(35,0,35,5,5);
        // ctx.lineTo(35,20);
        // ctx.arcTo(35,25,30,25,5);
        // ctx.lineTo(30,25);
        // ctx.arcTo(10,25,10,20,5);
        // ctx.lineTo(10,5)
        ctx.closePath();
        if(this.isStroke){
            ctx.stroke();
        }
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}
export default HookedPath;