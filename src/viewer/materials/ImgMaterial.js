import BaseMaterial from "../core/BaseMaterial.js";
class ImgMatrial extends BaseMaterial{
    constructor(position,sources,width,height){
        super(position,sources);
        this.type="image";
        this.width=width;
        this.height=height;
    }
    draw(ctx){
        if(!this.parent)return;
        let position=this.computerRealPosition();
        if(this.width&&this.height){
            ctx.drawImage(this.sources,position.x,position.y,width,height);
        }else{
            ctx.drawImage(this.sources,position.x,position.y);
        }
    }
}
export default ImgMatrial;