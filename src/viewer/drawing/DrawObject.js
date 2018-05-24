import BaseObject from "../core/BaseObject";
import TextMaterial from "../materials/TextMaterial";
import Vector2 from "../math/Vector2.js";
import HookedPath from "../path/HookedPath";
import ImgMatrial from "../materials/ImgMaterial";
import RectBoundPath from "../path/RectBoundPath.js";
import ButtonOut from "../drawing/ButtonOut.js";
import ButtonIn from "../drawing/ButtonIn.js";

class DrawObject extends BaseObject{
    constructor(pos,node,id){
        super(pos);
        this.addEventListener("drag",(e)=>{
            let p=new Vector2().copy(e.drag.end).sub(e.drag.offset);
            // p.x-=this.domElement.clientWidth/2;
            // p.y-=this.domElement.clientHeight/2;
            this.position.set(p.x,p.y);
        });
        function randomString(len) {
            len = len || 32;
            var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            var maxPos = $chars.length;
            var pwd = '';
            for (let j = 0; j < len; j++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        }
        function getlen(str,ch){
            var ret=0;
            for(let i=0;i<str.length;i++){if(str.charAt(i)==ch)   ret++;}
            return ret;
        }
        this.path=new HookedPath();

        this.boundsPath=new RectBoundPath();
        this.init(node);
        this.width=120;
        this.height=90;
        let inb=new ButtonIn(new Vector2(-45,-25));
        let outb=new ButtonOut(new Vector2(60,-25));
        this.type="container";
        this.add(inb);
        this.add(outb);
        this.btnin=inb;
        this.btnout=outb;
        if(node.jckj){
            this.jckj=node.jckj;
        }else{
            this.jckj=node.zldm;
        }
        if(node.uid){
            this.sjid=node.uid;
        }else{
            let uid=randomString(5);
            this.sjid=uid;
        }

        this.kjid=id;
        // if(node.jcbl){
        //     this.jcbl=node.jcbl;
        // }else{
        //     this.jcbl="";
        // }
        // if(localStorage.getItem("sx")){
        //     localStorage.setItem("sx",parseInt(localStorage.getItem("sx"))+1);
        // }else{
        //     localStorage.setItem("sx",1);
        // }
        let zl=node.zldm;
        // zl=zl.substring(0,zl.indexOf("(")).replace(/\d+$/,'')+localStorage.getItem("sx")+zl.substring(zl.indexOf("("),zl.length);
        // let count = getlen(zl.toString(),'$');
        // if(count!=0){
        //     zl=zl.replace(/\$/g,"10")
        // }
        this.command=node.command;
        this.zldm=zl;
        this.name=node.name;
    }
    init(node){
        let re = /[\u4E00-\u9FA5]/g;
        if(node.name.match(re)){
            if (node.name.match(re).length ===4) {
                this.addMaterial(new TextMaterial(new Vector2(-15,-25),node.name,"12px SimSun"));
            }else{
                this.addMaterial(new TextMaterial(new Vector2(-10,-25),node.name,"12px SimSun"));
            }
        }else{
            this.addMaterial(new TextMaterial(new Vector2(-10,-25),node.name,"12px SimSun"));
        }


        //创建image对象
        var imgObj = new Image();
        var obj=this;
        imgObj.onload = function(){

            obj.addMaterial(new ImgMatrial(new Vector2(-10,-10),this));
            
        };
        imgObj.src = node.url;
    }
    clearConnect(){
        let nexts,lasts;
        lasts=this.btnin.removeAllLast();
        nexts=this.btnout.removeAllNext();
        return [nexts,lasts];
    }
}

export default DrawObject;