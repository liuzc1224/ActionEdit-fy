import Path from "../core/Path.js";
import Vector2 from "../math/Vector2.js";
class RectBoundPath extends Path{
    constructor(){
        super();
        this.scale=new Vector2(1.3,1.1);
        this.position=new Vector2();
        this.radius=2;
    }
    draw(ctx){
        let r=this.radius;
        let width=this.width;
        let height=this.height;
        ctx.setTransform(this.scale.x, 0, 0, this.scale.y, this.position.x, this.position.y);
        ctx.beginPath();
        ctx.moveTo(0,r);
        ctx.arcTo(0,0,r,0,r);
        ctx.lineTo(width-r,0);
        ctx.arcTo(width,0,width,r,r);
        ctx.lineTo(width,height-r);
        ctx.arcTo(width,height,width-r,height,r);
        ctx.lineTo(r,height);
        ctx.arcTo(0,height,0,height-r,r);
     
        ctx.closePath();
        if(this.isStroke){
            ctx.stroke();
        }
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}
export default RectBoundPath;