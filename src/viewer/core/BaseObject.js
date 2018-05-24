import Vector2 from "../math/Vector2.js";
import EventDispatcher from "../event/EventDispatcher.js";

class BaseObject extends EventDispatcher{
    constructor(position){

        super();
        this.position=position?position:new Vector2();

        this.parent;
        //bounds 
        this.width=20;
        this.height=20;
        this.radius=10;
        this.boundsColor="rgba(209,238,238,0.4)";
        this.boundsType="square";
        this.isShowBounds=false;
        this.renderIndex=0;
        this.path;
        this.boundsPath;
        this.btnin;
        this.btnout;
        this.materials=[];
        this.children=[];
    }
    drawBounds(ctx){
        let pos=this.computerRealPosition();
       
        ctx.beginPath();  
        ctx.fillStyle=this.boundsColor;
        if(!this.boundsPath){
            if(this.boundsType==="square"){
                ctx.fillRect(pos.x-this.width/2, pos.y-this.height/2, this.width+15, this.height);
            }else if(this.boundsType==="circle"){
                ctx.arc(pos.x,pos.y,this.radius,0,Math.PI*2,false); 
            }
        }else{
            this.boundsPath.position=new Vector2().copy(pos).sub(new Vector2(this.width/2+10,this.height/2+10));
            this.boundsPath.radius=10;
            this.boundsPath.width=this.width;
            this.boundsPath.height=this.height;
            this.boundsPath.draw(ctx);
        }
        ctx.fill();
    }
    computerRealPosition(){
        let parent=this.parent;
        let position=new Vector2().copy(this.position);
        
        if(parent){
            position.add(parent.computerRealPosition());
            
        }
      
        return position;
    }
    addMaterial(material){
        material.parent=this;
        this.materials.push(material);
    }
    removeMaterial(material){
        material.parent=undefined;
        return this.materials.splice(this.materials.indexOf(material),1);
    }
    add(object){
        object.parent=this;
        this.children.push(object);
    }
    remove(object){
        object.parent=undefined;
        return this.children.splice(this.children.indexOf(object),1);
    }
    drawChildren(ctx){
        for(let obj of this.children){
            obj.draw(ctx);
        }
    }
    drawMaterials(ctx){
        for(let material of this.materials){
         
            material.draw(ctx);
        }
    }
    draw(ctx){
        if(this.isShowBounds){
            this.drawBounds(ctx);
        }
        if(this.path){
            let pos=this.computerRealPosition();
            pos.x-=this.width/2;
            pos.y-=this.height/2;
            this.path.position=pos;
            this.path.draw(ctx);
            this.drawMaterials(ctx);
        }
        // if(this.btnin){
        //     let pos=this.computerRealPosition();
        //     pos.x-=this.width/2;
        //     pos.y-=this.height/2;
        //     this.btnin.position=pos;
        //     this.btnin.draw(ctx);
        
        // }
        // if(this.btnout){
        //     let pos=this.computerRealPosition();
        //     pos.x-=this.width/2;
        //     pos.y-=this.height/2;
        //     this.btnout.position=pos;
        //     this.btnout.draw(ctx);
          
        // }
        this.drawChildren(ctx);
    }
    
}
export default BaseObject;