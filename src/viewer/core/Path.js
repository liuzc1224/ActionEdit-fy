class Path{
    constructor(){
        this.isStroke=true;
    }
    draw(ctx){
        if(this.isStroke){
            ctx.stroke();
        }
    }
    isContainPoint(ctx,point){
        let temp=this.isStroke;
        this.isStroke=false;
        this.draw(ctx);
        this.isStroke=temp;
        return ctx.isPointInPath(point.x, point.y);
    }
}
export default Path;