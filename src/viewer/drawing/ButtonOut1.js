import BaseObject from "../core/BaseObject";
import RectBoundPath from "../path/RectBoundPath";
import Vector2 from "../math/Vector2";
import ImgMatrial from "../materials/ImgMaterial";
import inpng from "../../images/out.png";
import Bezier from "../math/Bezier";
class ButtonOut1 extends BaseObject{
    constructor(position){
        super();
        this.type="output1";
        this.position=position?position:new Vector2();
        this.nexts=[];

        this.path=new RectBoundPath();
        this.path.radius=3;
        this.path.width=15;
        this.path.height=15;
        // this.isShowBounds=true;
        this.tempbez;
        this.beziers=[];
        let img=new Image();
        img.onload = ()=>{

            this.addMaterial(new ImgMatrial(new Vector2(-10,-10),img));
        };

        img.src=inpng;
        this.addEventListener("drag",this.onDrag.bind(this));
        this.addEventListener("drop",this.onDrop.bind(this));
        this.addEventListener("mousedown",this.onMouseDown.bind(this));
        // this.addMaterial(new ImgMatrial(new Vector2(),""))
    }
    getInPoint(){
        let pos=this.computerRealPosition();
        pos.x+=this.width/2;
        return pos;
    }
    drawCurve(ctx){
        ctx.lineWidth=2;
        for(let i=0; i< this.nexts.length;i++){
            let next=this.nexts[i];
            let begin=this.getInPoint();
            let end;

            if(next.nextput){
                end=next.nextput.getInPoint();
            }else{

                end=next.bez.end;
            }
            let bezier=new Bezier(begin,end);

            ctx.beginPath();
            ctx.strokeStyle=next.strokeStyle;
            ctx.moveTo(begin.x,begin.y);
            ctx.bezierCurveTo(bezier.c1.x, bezier.c1.y, bezier.c2.x, bezier.c2.y,bezier.end.x, bezier.end.y);
            ctx.stroke();

        }
        ctx.lineWidth=1;
        ctx.strokeStyle="#000000";
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
        this.nexts[this.nexts.length-1].bez.end=p;
    }
    onMouseDown(e){

        let bez={
            start:this.getInPoint(),
            end:this.getInPoint(),
        };
        let next= {
            bez: bez,
            strokeStyle: "#000000",
            nextput: null
        }
        this.nexts.push(next);

    }
    onDrop(e){
        let p=new Vector2().copy(e.drag.end);
        let inpus=scene.inputMouseTest(p);
        if(inpus.length>0){
            this.nexts[this.nexts.length-1].nextput=inpus[inpus.length-1];
            inpus[inpus.length-1].lasts.push(this);
            actionManager.actionLine(this,inpus[inpus.length-1],this.nexts[this.nexts.length-1]);
        }else{
            let inpus1=scene.inputMouseTest1(p);
            if(inpus1.length>0){
                this.nexts[this.nexts.length-1].nextput=inpus1[inpus1.length-1];
                inpus1[inpus1.length-1].lasts.push(this);
                actionManager.actionLine(this,inpus1[inpus1.length-1],this.nexts[this.nexts.length-1]);
            }else{
                this.nexts.pop();
            }
        }
    }
    isOnCurveStroke(ctx,point){
        ctx.lineWidth=3;
        let chose;
        for(let next of this.nexts){
            let begin=this.getInPoint();
            let end;
            end=next.nextput.getInPoint();

            let bezier=new Bezier(begin,end);
            ctx.beginPath();
            ctx.strokeStyle=next.strokeStyle;
            ctx.moveTo(begin.x,begin.y);
            ctx.bezierCurveTo(bezier.c1.x, bezier.c1.y, bezier.c2.x, bezier.c2.y,bezier.end.x, bezier.end.y);
            ctx.stroke();
            if(ctx.isPointInStroke(point.x, point.y)){
                chose=next;
                break;
            }
        }
        ctx.lineWidth=1;
        ctx.strokeStyle="#000000";
        return chose;
    }
    removeNext(next){
        next.nextput.removeLast(this);
        return this.nexts.splice(this.nexts.indexOf(next),1);
    }
    removeNextByInput(next){

        for(let i=this.nexts.length-1;i>-1;i--){
            if(this.nexts[i].nextput===next){
                this.removeNext(this.nexts[i]);
            }
        }
    }
    removeAllNext(){
        for(let next of this.nexts){
            next.nextput.removeLast(this);
        }
        let cnexts=this.nexts.slice(0);
        this.nexts.length=0;
        return cnexts;
    }
}
export default ButtonOut1;