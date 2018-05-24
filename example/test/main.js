


import "../../src/dom/js/domindex";


import ButtonInput from "../../src/viewer/drawing/ButtonInput";
import ButtonOutput from "../../src/viewer/drawing/ButtonOutput";
import Scene from "../../src/viewer/core/Scene";
import BaseObject from "../../src/viewer/core/BaseObject";
import TextMaterial from "../../src/viewer/materials/TextMaterial";
import Vector2 from "../../src/viewer/math/Vector2";
import HookedPath from "../../src/viewer/path/HookedPath";
import ImgMatrial from "../../src/viewer/materials/ImgMaterial";

import img from "./img/text.png";




let canvas=document.getElementById("test");
let scene=new Scene(canvas);
scene.isShowBounds=false;
let object=new BaseObject(new Vector2(0,0));
object.addEventListener("drag",function(e){
    let p=new Vector2().copy(e.drag.end).sub(e.drag.offset)
    object.position.set(p.x,p.y);
})
object.addMaterial(new TextMaterial(new Vector2(),"测试","20px SimSun"));

  //创建image对象
  var imgObj = new Image();
   
   imgObj.onload = function(){

    object.addMaterial(new ImgMatrial(new Vector2(-10,5),this));
    
}
  imgObj.src = img;

object.path=new HookedPath();
object.btnin=new ButtonInput();
object.btnout=new ButtonOutput();
object.width=120;
object.height=120;
scene.add(object);
