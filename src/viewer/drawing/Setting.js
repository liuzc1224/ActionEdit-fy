import RectBoundPath from "../path/RectBoundPath";
import Vector2 from "../math/Vector2";
import ImgMatrial from "../materials/ImgMaterial";
import setting from "../../images/设置.png";
import BaseObject from "../core/BaseObject";

class Setting extends BaseObject{
    constructor(position){
        super();
        this.type="Setting";
        this.position=position?position:new Vector2();
        this.path=new RectBoundPath();
        this.path.width=18;
        this.path.height=18;
        // this.isShowBounds=true;
        this.lasts=[];
        let img=new Image();
        img.onload = ()=>{

            this.addMaterial(new ImgMatrial(new Vector2(-8,-8),img));
        };

        img.src=setting;
    }
    draw(ctx){
        if(this.path){
            let pos=this.computerRealPosition();
            pos.x-=this.width/2;
            pos.y-=this.height/2;
            this.path.position=pos;
            //this.path.draw(ctx);
            this.drawMaterials(ctx);
            // this.drawCurve(ctx);
        }
    }

}
export default Setting;