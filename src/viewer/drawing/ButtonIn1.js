import BaseObject from "../core/BaseObject";
import RectBoundPath from "../path/RectBoundPath";
import Vector2 from "../math/Vector2";
import ImgMatrial from "../materials/ImgMaterial";
import inpng from "../../images/in.png";
import Bezier from "../math/Bezier";
class ButtonIn1 extends BaseObject{
    constructor(position){
        super();
        this.type="input1";
        this.position=position?position:new Vector2();
        this.path=new RectBoundPath();
        this.path.radius=3;
        this.path.width=15;
        this.path.height=15;
        // this.isShowBounds=true;
        this.lasts=[];
        this.tempbez;
        this.beziers=[];
        let img=new Image();
        img.onload = ()=>{

            this.addMaterial(new ImgMatrial(new Vector2(-8,-10),img));
        }

        img.src=inpng;
        // this.addMaterial(new ImgMatrial(new Vector2(),""))
        this.addEventListener("drag",this.onDrag.bind(this));
        this.addEventListener("drop",this.onDrop.bind(this));
        this.addEventListener("mousedown",this.onMouseDown.bind(this));
    }
    getInPoint(){
        let pos=this.computerRealPosition();
        pos.x-=this.width/2;
        return pos;
    }
    drawCurve(ctx){
        ctx.lineWidth=2;
        for(let i=0; i< this.beziers.length;i++){
            let bez=this.beziers[i];
            let begin=this.getInPoint();
            let end;



            end=bez.end;

            let bezier=new Bezier(begin,end);

            ctx.beginPath();

            ctx.moveTo(begin.x,begin.y);
            ctx.bezierCurveTo(bezier.c1.x, bezier.c1.y, bezier.c2.x, bezier.c2.y,bezier.end.x, bezier.end.y);
            ctx.stroke();

        }
        ctx.lineWidth=1;
    }
    draw(ctx){
        if(this.path){
            let pos=this.computerRealPosition();
            pos.x-=this.width/2;
            pos.y-=this.height/2;
            this.path.position=pos;
            this.path.draw(ctx);
            this.drawMaterials(ctx);
            this.drawCurve(ctx);
        }
    }
    onDrag(e){
        let p=new Vector2().copy(e.drag.end);
        this.beziers[this.beziers.length-1].end=p;
    }
    onMouseDown(e){
        let bez={
            start:this.getInPoint(),
            end:this.getInPoint(),
        };
        this.beziers.push(bez);
    }

    onDrop(e){
        let p=new Vector2().copy(e.drag.end);
        let inpus=scene.outputMouseTest(p);
        this.beziers.pop();
        if(inpus.length>0){

            this.lasts.push(inpus[inpus.length-1]);
            inpus[inpus.length-1].nexts.push({
                bez:{start:new Vector2(),end:new Vector2()},
                nextput:this
            });

        }
        let inpus1=scene.outputMouseTest1(p);
        this.beziers.pop();
        if(inpus1.length>0){

            this.lasts.push(inpus1[inpus1.length-1]);
            inpus1[inpus1.length-1].nexts.push({
                bez:{start:new Vector2(),end:new Vector2()},
                nextput:this
            });

        }
    }
    removeLast(last){

        return this.lasts.splice(this.lasts.indexOf(last),1);
    }
    removeAllLast(){
        let clasts;
        clasts=this.lasts.slice(0);
        for(let i=this.lasts.length-1; i>-1;i--){
            this.lasts[i].removeNextByInput(this);
        }
        return clasts;
        // this.lasts.length=0;
    }
}
export default ButtonIn1;