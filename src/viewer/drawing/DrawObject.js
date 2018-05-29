import BaseObject from "../core/BaseObject";
import TextMaterial from "../materials/TextMaterial";
import Vector2 from "../math/Vector2.js";
import HookedPath from "../path/HookedPath";
import ImgMatrial from "../materials/ImgMaterial";
import RectBoundPath from "../path/RectBoundPath.js";
import ButtonOut from "../drawing/ButtonOut.js";
import ButtonIn from "../drawing/ButtonIn.js";
import ButtonOut1 from "../drawing/ButtonOut1.js";
import ButtonIn1 from "../drawing/ButtonIn1.js";
import tpurl from "../../images/加.png";
import Setting from "./Setting";

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
        var obj=this;
        if(node.variable){
            this.variable=node.variable;
            let setting=new Setting(new Vector2(-13,16));
            this.add(setting);
            this.setting=setting;
            var imgObj = new Image();
            imgObj.onload = function(){

                obj.addMaterial(new ImgMatrial(new Vector2(-8,-18),this));

            };
            imgObj.src = node.url;
            this.img=node.url;
        }else{
            var imgObj = new Image();
            imgObj.onload = function(){

                obj.addMaterial(new ImgMatrial(new Vector2(-10,-10),this));

            };
            imgObj.src = node.url;
            this.img=node.url;
        }
        if(node.style==="if"){
            let outb1=new ButtonOut1(new Vector2(60,-5));
            this.add(outb1);
            this.btnout1=outb1;
            this.style=node.style;
        }else{
            var imgObj4 = new Image();
            imgObj4.onload = function(){

                obj.addMaterial(new ImgMatrial(new Vector2(50,-15),this));

            };
            imgObj4.src = tpurl;
        }
        if(node.style==="while"){
            let inb1=new ButtonIn1(new Vector2(-45,-5));
            this.add(inb1);
            this.btnin1=inb1;
            this.style=node.style;
        }else{
            var imgObj2 = new Image();
            imgObj2.onload = function(){

                obj.addMaterial(new ImgMatrial(new Vector2(-55,-15),this));

            };
            imgObj2.src = tpurl;
        }
        if(node.uid){
            this.sjid=node.uid;
        }else{
            let uid=randomString(5);
            this.sjid=uid;
        }

        this.kjid=id;
        let zl=node.zldm;
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

        var obj=this;
        //创建image对象
        var imgObj1 = new Image();
        imgObj1.onload = function(){

            obj.addMaterial(new ImgMatrial(new Vector2(-55,5),this));

        };
        imgObj1.src = tpurl;

        var imgObj3 = new Image();
        imgObj3.onload = function(){

            obj.addMaterial(new ImgMatrial(new Vector2(50,5),this));

        };
        imgObj3.src = tpurl;

    }
    clearConnect(){
        let nexts,lasts;
        lasts=this.btnin.removeAllLast();
        nexts=this.btnout.removeAllNext();
        return [nexts,lasts];
    }
}

export default DrawObject;