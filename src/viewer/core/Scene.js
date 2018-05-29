import BaseObject from "./BaseObject.js";
import Vector2 from "../math/Vector2.js";
import InputHandler from "../event/InputHandler.js";
import util from "../util/util.js";
import DrawObject from "../drawing/DrawObject.js";
import ButtonOut from "../drawing/ButtonOut";
import ButtonIn from "../drawing/ButtonIn.js";
// import ButtonOut1 from "../drawing/ButtonOut1";
// import ButtonIn from "../drawing/ButtonIn.js";
class Scene extends BaseObject{
    constructor(canvas){
        super();
        this.domElement=canvas;
        this.ctx=this.domElement.getContext("2d");
        this.init();
        this.type="scene";
        this.boundsColor="#FBFBFB";
        // this.boundsColor="#FFFFFF";
        let outb=new ButtonOut(new Vector2(-this.domElement.clientWidth/2+10,-this.domElement.clientHeight/2)+10);
        let inb=new ButtonIn(new Vector2(this.domElement.clientWidth/2-10,-this.domElement.clientHeight/2)+10);
        //    let inb=new ButtonIn(new Vector2());
        //     let outb=new ButtonOut(new Vector2());
        this.add(inb);
        this.add(outb);
        inb.renderIndex=1000;
        outb.renderIndex=1000;
        this.btnin=inb;
        this.btnout=outb;
        requestAnimationFrame(this.render.bind(this));
        localStorage.removeItem("sx");
    }
    resetSize(){
        let width=this.domElement.clientWidth;
        let height=this.domElement.clientHeight;
        this.width=width;
        this.height=height;
        this.position=new Vector2(width/2,height/2);
        this.btnin.position=new Vector2(this.domElement.clientWidth/2-10,-this.domElement.clientHeight/2+10);
        this.btnout.position=new Vector2(-this.domElement.clientWidth/2+10,-this.domElement.clientHeight/2+10);
    }
    init(){
        this.inputHandler=new InputHandler(this.domElement);
        this.inputHandler.addInputListener(this);
        this.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.addEventListener('domdrop', this.domDrop.bind(this));
        this.addEventListener('keydown', this.onKeyDown.bind(this));
        this.addEventListener('dblclick', this.onDblClick.bind(this));
        this.addEventListener('contextmenu', this.onDContextMenu.bind(this));
    }
    removeDrawO(o){
        let nl;
        nl=o.clearConnect();
        this.remove(o);
        actionManager.deleteObject(o,nl[0],nl[1]);
    }
    onKeyDown(e){
        switch(e.e.keyCode){
            case 8:this.deleteSelect();break;
            case 46:this.deleteSelect();break;
        }
    }
    domDrop(e){
        let data=e.source.dataTransfer.getData("id");
        let o=null;
        if(data){
            let nodetype=e.source.dataTransfer.getData("data-node");
            // console.log(e);
            if(nodetype!=="leaf"){
                return;
            }
            let root=JSON.parse(localStorage.getItem("baseAssembly"));
            let ex=new RegExp('^'+data+'$');
            let node=util.searchInTree(root,"_id",ex);
            let pos=new Vector2().copy(e.mouse);
            o=this.addByNode(node,pos,data);
        }else{
            if(localStorage.getItem('zdykjid')){
                let arr = JSON.parse(localStorage.getItem("kjxx"));
                let node=arr[localStorage.getItem('zdykjid')];
                let pos=new Vector2().copy(e.mouse);
                localStorage.removeItem('zdykjid');
                o=this.addByNode(node,pos,node.id);
            }
            if(localStorage.getItem('sskjid')){
                let arr = JSON.parse(localStorage.getItem("ssxx"));
                let node=arr[localStorage.getItem('sskjid')];
                let pos=new Vector2().copy(e.mouse);
                localStorage.removeItem('sskjid');
                localStorage.removeItem('ssxx');
                if(node.id){
                    o=this.addByNode(node,pos,node.id);
                }
                if(node._id){
                    o=this.addByNode(node,pos,node._id);
                }
            }
        }
        o&&actionManager.actionDrop(o);
    }
    getConnectCommand(){
        let commands={};
        let back=false;
        let arr=[];
        if(this.btnin.lasts.length===0||this.btnout.nexts.length===0)return arr;
        for(let n of this.btnout.nexts){
            back=this.backtrack(n.nextput.parent,arr);
            if(back){
                break;
            }
        }
        return arr;
    }
    backtrack(node,arr){
        let back=false;
        if(node.type=="scene"){
            // arr.push(node.zldm);
            return true;
        }
        for(let n of node.btnout.nexts){
            back=this.backtrack(n.nextput.parent,arr);
            if(back)break;
        }
        if(back){
            let dm={
                "command":node.command,
                "zldm":node.zldm
            }
            arr.push(dm);
            return true;
        }else{
            return false;
        }

    }
    // backid(node,arr){
    //     let back=false;
    //     if(node.type=="scene"){
    //         // arr.push(node.zldm);
    //         return true;
    //     }
    //     for(let n of node.btnout.nexts){
    //         back=this.backid(n.nextput.parent,arr);
    //         if(back)break;
    //     }
    //     if(back){
    //         arr.push(node.sjid);
    //         return true;
    //     }else{
    //         return false;
    //     }
    //
    // }
    // getSjid(){
    //     let back=false;
    //     let arr=[];
    //     if(this.btnout.nexts) {
    //         for (let n of this.btnout.nexts) {
    //             back = this.backid(n.nextput.parent, arr);
    //             if (back) {
    //                 break;
    //             }
    //         }
    //     }
    //     return arr;
    // }
    addByNode(node,pos,id){
        let object=new DrawObject(pos,node,id);
        this.add(object);
        return object;
    }
    deleteSelect(){
        if(this.lineSelect){
            this.lineSelect.o.removeNext(this.lineSelect.line);
            actionManager.deleteLine(this.lineSelect.o,this.lineSelect.line);
            this.lineSelect.line.strokeStyle="#000000";
            this.lineSelect=undefined;
        }
        if(this.select){
            this.select.isShowBounds=false;
            this.select.renderIndex=0;

            this.removeDrawO(this.select);
            this.select=null;
        }
    }
    onDContextMenu(e){
        let canvasPoint=e.mouse.clone();
        let i=0;
        let obj=this;
        let object="";
        $('#wrapper1').css('display','none');
        for(let o of this.children){
            if(o.path.isContainPoint(this.ctx, canvasPoint) && o.type == "container") {
                if(o){
                    localStorage.setItem("object",this.children.indexOf(o));
                    $('#wrapper1').css('display','block');
                    $('#wrapper1').css('left',canvasPoint.x +310+'px');
                    $('#wrapper1').css('top',canvasPoint.y+85+'px');
                    s("#edit1");
                    if(o.variable){
                        s("#blset");
                    }else{
                        f('#blset');
                    }
                }
            }
            let line=this.bezlineMouseTest(canvasPoint);
            if(line){
                $('#wrapper1').css('display','block');
                $('#wrapper1').css('left',canvasPoint.x +310+'px');
                $('#wrapper1').css('top',canvasPoint.y+85+'px');
                f('#edit1');
                f('#blset');
            }
            function f(a) {
                $(a).attr("disabled",true);
                $(a).css("pointer-events","none");
                $(a).css("opacity","0.2");
            }
            function s(a) {
                $(a).attr("disabled",false);
                $(a).css("pointer-events","block");
                $(a).css("opacity","");
            }
        }
    }
    onMouseDown(e){
        let objects=[];
        let canvasPoint=e.mouse.clone();
        // canvasPoint.x+=this.domElement.clientWidth/2;
        // canvasPoint.y+=this.domElement.clientHeight/2;
        if(this.select){
            this.select.isShowBounds=false;
            this.select.renderIndex=0;
            this.select=null;
        }
        if(this.lineSelect){
            this.lineSelect.line.strokeStyle="#000000";
            this.lineSelect=undefined;
        }
        for(let o of this.children){
            if(o.type=="container"&&o.path.isContainPoint(this.ctx,canvasPoint)) {

                objects.push(o);


            }
            // if(o.btnin.isContainPoint(this.ctx,canvasPoint)){
            //     let canvasPoint={x:2,y:16};
            //     canvasPoint.x+=this.domElement.clientWidth/2;
            //     canvasPoint.y+=this.domElement.clientHeight/2;
            //     this.line(this.ctx,canvasPoint);
            // }
        }
        let outputs=this.outputMouseTest(canvasPoint);
        if(outputs.length>0){

            outputs[outputs.length-1].dispatchEvent({
                type: 'mousedown',

                mouse: canvasPoint
            });

            this.inputHandler.startDragging(outputs[outputs.length-1], new Vector2());

            // outputs[outputs.length].parent.renderIndex=100;
            if(outputs[outputs.length-1].parent.type!="scene"){this.select = outputs[outputs.length-1].parent;
                this.select.renderIndex=100;}
            return;
        }
        let outputs1=this.outputMouseTest1(canvasPoint);
        if(outputs1.length>0){

            outputs1[outputs1.length-1].dispatchEvent({
                type: 'mousedown',

                mouse: canvasPoint
            });

            this.inputHandler.startDragging(outputs1[outputs1.length-1], new Vector2());

            // outputs[outputs.length].parent.renderIndex=100;
            if(outputs1[outputs1.length-1].parent.type!="scene"){this.select = outputs1[outputs1.length-1].parent;
                this.select.renderIndex=100;}
            return;
        }
        let inputs=this.inputMouseTest(canvasPoint);
        if(inputs.length>0){
            inputs[inputs.length-1].dispatchEvent({
                type: 'mousedown',

                mouse: canvasPoint
            });
            this.inputHandler.startDragging(inputs[inputs.length-1], new Vector2());
            if(inputs[inputs.length-1].parent.type!="scene"){this.select =inputs[inputs.length-1].parent;
                this.select.renderIndex=100;}
            return;
        }
        let inputs1=this.inputMouseTest1(canvasPoint);
        if(inputs1.length>0){
            inputs1[inputs1.length-1].dispatchEvent({
                type: 'mousedown',

                mouse: canvasPoint
            });
            this.inputHandler.startDragging(inputs1[inputs1.length-1], new Vector2());
            if(inputs1[inputs1.length-1].parent.type!="scene"){this.select =inputs1[inputs1.length-1].parent;
                this.select.renderIndex=100;}
            return;
        }
        let line=this.bezlineMouseTest(canvasPoint);
        if(line){
            this.lineSelect=line;
            this.lineSelect.line.strokeStyle="blue";
        }
        let setting=this.imgMouseTest(canvasPoint);
        if(setting.length>0){
            let str=setting[0].variable;
            let html="";
            let arr=Object.keys(str);
            $("#num").html(arr.length);
            for(let i=0;i<arr.length;i++){
                html+="<tr><td><span id=name"+i+">"+arr[i]+"</span>:</td><td><input type = \"text\" name= \"price\" id = 'input"+i+"' value='"+str[arr[i]]+"' onkeyup=\"$(this).val($(this).val().replace(/[^\\-?\\d.]/g,'')) \"/></td></tr>"
            }
            $("#varcenter").html(html);
            $("#variable").modal("show");
            $("#blsave").click(function () {
                $("#variable").modal("hide");
                let nn="";
                for(let i=0;i<arr.length;i++){
                    nn+='"'+$('#name'+i).html()+'":"'+$('#input'+i).val()+'",';
                }
                let ss="{"+nn.substring(0,nn.length-1)+"}";
                setting[0].variable=JSON.parse(ss);
                $("#variable").modal("hide");
            });
            return;
        }

        if(objects.length!==0){
            let o=objects[objects.length-1];
            o.isShowBounds = true;
            let offset = e.mouse.clone().sub(o.position);
            this.select = o;
            this.select.renderIndex=100;
            this.inputHandler.startDragging(o, offset);
            return;
        }
        // let outputs=this.outputMouseTest(canvasPoint);
        // if(outputs.length>0){

        //     outputs[outputs.length-1].dispatchEvent({
        //         type: 'mousedown',

        //         mouse: canvasPoint
        //     });

        //     this.inputHandler.startDragging(outputs[outputs.length-1], new Vector2());

        //    // outputs[outputs.length].parent.renderIndex=100;
        //    if(outputs[outputs.length-1].parent.type!="scene"){this.select = outputs[outputs.length-1].parent;
        //     this.select.renderIndex=100;}
        //     return;
        // }
        // let inputs=this.inputMouseTest(canvasPoint);
        // if(inputs.length>0){
        //     inputs[inputs.length-1].dispatchEvent({
        //         type: 'mousedown',

        //         mouse: canvasPoint
        //     });
        //     this.inputHandler.startDragging(inputs[inputs.length-1], new Vector2());
        //     if(inputs[inputs.length-1].parent.type!="scene"){this.select =inputs[inputs.length-1].parent;
        //     this.select.renderIndex=100;}
        //     return;
        // }
    }
    // outputMouseTest(mouse){
    //     let btns=[];

    //     for(let o of this.children){
    //         o.btnout&&o.btnout.path.isContainPoint(this.ctx,mouse)&&btns.push(o.btnout);
    //     }
    //     if(this.btnout&&this.btnout.path.isContainPoint(this.ctx,mouse)){
    //         btns.push(this.btnout);
    //     }
    //     return btns;
    // }
    // inputMouseTest(mouse){
    //     let btns=[];

    //     for(let o of this.children){
    //         o.btnin&&o.btnin.path.isContainPoint(this.ctx,mouse)&&btns.push(o.btnin);
    //     }
    //     if(this.btnin&&this.btnin.path.isContainPoint(this.ctx,mouse)){
    //         btns.push(this.btnin);
    //     }
    //     return btns;
    // }
    onDblClick(e){
        let canvasPoint=e.mouse.clone();
        for(let o of this.children) {
            if (o.path.isContainPoint(this.ctx, canvasPoint) && o.type == "container") {
                // if(o.kjid.length==10){
                    let str=o.zldm;
                    $('#zdykjzl').modal('show');
                    $('#zdykjid').val(o.sjid);
                    $('#zdykjzlLabel').html(o.name);
                    if(o.variable){
                        let arr=Object.keys(o.variable);
                        for(let i=0;i<arr.length;i++){
                            //console.log(o.variable[arr[i]]);
                            str=str.replace(/\$/, o.variable[arr[i]]);
                        }
                    }
                    if(o.kjid.length===10){
                        $("#zdyqd").show();
                    }else{
                        $("#zdyqd").hide();
                    }
                    $('#zdykjzlBody').val(str.replace(/<br\/>/g, ' \n ' ));
                    //$('#zdykjzlBody').attr("disabled",true);

                // }else{
                //     function getlen(str,ch){
                //         var ret=0;
                //         for(var i=0;i<str.length;i++){if(str.charAt(i)==ch)   ret++;}
                //         return ret;
                //     }
                //     var zldm=o.jckj;
                //     let count = getlen(zldm,'$');
                //     if(o.jcbl==""){
                //         for(let i=0;i<count;i++){
                //             zldm=zldm.replace('$', "<input style='text-align:center;width:30px;display: inline' class='form-control-sm' type='text' onkeyup=\"this.value=this.value.replace(/\\D/g,'')\" value='10'>");
                //         }
                //     }else{
                //         var arr=o.jcbl.split("-");
                //         for(let i=0;i<count;i++){
                //             zldm=zldm.replace('$', "<input style='text-align:center;width:30px;display: inline' class='form-control-sm' type='text' onkeyup=\"this.value=this.value.replace(/\\D/g,'')\" value='"+arr[i]+"'>");
                //         }
                //     }
                //     $('#jckjzl').modal('show');
                //     $('#jckjid').val(o.sjid);
                //     $('#jckjzlLabel').html(o.name);
                //     $('#jckjzlBody').html(zldm);
                // }
                $('#jcqd').click(function () {
                    var zldm=$('#jckjzlBody')[0].childNodes;
                    var id=$('#jckjid').val();
                    var arr=new Array();
                    let setzldm="";
                    for(let i=0;i<zldm.length;i++){
                        if(zldm[i].nodeValue){
                            setzldm+=zldm[i].nodeValue;
                        }else{
                            setzldm+=zldm[i].value;
                            arr.push(zldm[i].value);
                        }
                    }
                    // if(o.sjid==id){
                    //     o.zldm=setzldm;
                    //     o.jcbl=arr.join("-");
                    // }
                    $('#jckjzl').modal('hide');
                });
                $('#zdyqd').click(function () {
                    let setzldm=$('#zdykjzlBody').val();
                    let zdyid=$('#zdykjid').val();
                    if(o.sjid===zdyid){
                        o.zldm=setzldm;
                    }
                    $('#zdykjzl').modal('hide');
                })
            }
        }
    }
    // outputMouseTest(mouse){
    //     let btns=[];

    //     for(let o of this.children){
    //         o.btnout&&o.btnout.path.isContainPoint(this.ctx,mouse)&&btns.push(o.btnout);
    //     }
    //     if(this.btnout&&this.btnout.path.isContainPoint(this.ctx,mouse)){
    //         btns.push(this.btnout);
    //     }
    //     return btns;
    // }
    // inputMouseTest(mouse){
    //     let btns=[];

    //     for(let o of this.children){
    //         o.btnin&&o.btnin.path.isContainPoint(this.ctx,mouse)&&btns.push(o.btnin);
    //     }
    //     if(this.btnin&&this.btnin.path.isContainPoint(this.ctx,mouse)){
    //         btns.push(this.btnin);
    //     }
    //     return btns;
    // }
    outputMouseTest(mouse){
        let btns=[];

        for(let o of this.children){
            o.btnout&&o.btnout.path.isContainPoint(this.ctx,mouse)&&btns.push(o.btnout);
        }
        if(this.btnout&&this.btnout.path.isContainPoint(this.ctx,mouse)){
            btns.push(this.btnout);
        }
        return btns;
    }
    outputMouseTest1(mouse){
        let btns=[];

        for(let o of this.children){
            o.btnout1&&o.btnout1.path.isContainPoint(this.ctx,mouse)&&btns.push(o.btnout1);
        }
        if(this.btnout1&&this.btnout1.path.isContainPoint(this.ctx,mouse)){
            btns.push(this.btnout1);
        }
        return btns;
    }

    inputMouseTest(mouse){
        let btns=[];

        for(let o of this.children){
            o.btnin&&o.btnin.path.isContainPoint(this.ctx,mouse)&&btns.push(o.btnin);
        }
        if(this.btnin&&this.btnin.path.isContainPoint(this.ctx,mouse)){
            btns.push(this.btnin);
        }
        return btns;
    }
    inputMouseTest1(mouse){
        let btns=[];

        for(let o of this.children){
            o.btnin1&&o.btnin1.path.isContainPoint(this.ctx,mouse)&&btns.push(o.btnin1);
        }
        if(this.btnin1&&this.btnin1.path.isContainPoint(this.ctx,mouse)){
            btns.push(this.btnin1);
        }
        return btns;
    }

    imgMouseTest(mouse){
        let btns=[];

        for(let o of this.children){
            o.setting&&o.setting.path.isContainPoint(this.ctx,mouse)&&btns.push(o);
        }
        if(this.setting&&this.setting.path.isContainPoint(this.ctx,mouse)){
            btns.push(this);
        }
        return btns;
    }
    bezlineMouseTest(mouse){
        let btn;

        for(let o of this.children){
            if(o.btnout){
                let n=o.btnout.isOnCurveStroke(this.ctx,mouse);
                if(n)btn={line:n,o:o.btnout};
            }
            if(o.btnout1){
                let n=o.btnout1.isOnCurveStroke(this.ctx,mouse);
                if(n)btn={line:n,o:o.btnout1};
            }
        }
        if(this.btnout){
            let n=this.btnout.isOnCurveStroke(this.ctx,mouse);
            if(n)btn={line:n,o:this.btnout};
        }
        if(this.btnout1){
            let n=this.btnout1.isOnCurveStroke(this.ctx,mouse);
            if(n)btn={line:n,o:this.btnout1};
        }

        return btn;
    }
    onMouseUp(){
    }
    onMouseMove(e){
    }
    render(){

        requestAnimationFrame(this.render.bind(this));
        this.resetSize();
        this.ctx.clearRect(this.position.x-this.width/2, this.position.y-this.height/2, this.width, this.height);

        this.children.sort((o1,o2)=>{return o1.renderIndex-o2.renderIndex});
        this.draw(this.ctx);
    }
    // line(ctx,point){
    //     console.log(point);
        // var zd={x:0,y:0};
        // ctx.onmousemove = function(e) {
        //     var bbox = ctx.getBoundingClientRect();
        //     zd.x =  e.clientX - bbox.left * (ctx.width/bbox.width);
        //     zd.y = e.clientY - bbox.top * (ctx.height/bbox.height);
        // }
        // console.log(zd);
    //     ctx.beginPath();
    //     ctx.quadraticCurveTo(point.x,point.y,offset.x,offset.y);
    //     ctx.strokeStyle = "red";
    //     ctx.stroke();
    // }
    obj(){
        return this;
    }
    save(){
        let arr=[];
        let arr1=[];
        let c=scene.obj().children;
        if(c.length>2){
            for(let i=0;i<c.length;i++){
                if(c[i].name){//,"jckj":c[i].jckj
                    let kj={"uid":c[i].sjid,"name":c[i].name,"url":c[i].img,"zldm":c[i].zldm,"id":c[i].kjid,"command":c[i].command,"x":c[i].position.x,"y":c[i].position.y,"style":c[i].style,"variable":c[i].variable};
                    arr.push(kj);
                }
            }
        }
        let e=scene.obj();
        for(let c of e.children){
            if(c.type==="container"){
                let a={};
                let a1={};
                if(c.btnout.nexts.length>0){
                    let array=[];
                    let array1=[];
                    for(let n=0;n<c.btnout.nexts.length;n++){
                        if(c.btnout.nexts[n].nextput.type==="input"){
                            if(c.btnout.nexts[n].nextput.parent.type==="scene"){
                                array.push("btnin");
                            }
                            if(c.btnout.nexts[n].nextput.parent.type==="container"){
                                array.push(c.btnout.nexts[n].nextput.parent.sjid);
                            }
                        }
                        if(c.btnout.nexts[n].nextput.type==="input1"){
                            if(c.btnout.nexts[n].nextput.parent.type==="scene"){
                                array1.push("btnin");
                            }
                            if(c.btnout.nexts[n].nextput.parent.type==="container"){
                                array1.push(c.btnout.nexts[n].nextput.parent.sjid);
                            }
                        }

                    }
                    a={"bin":array,"bin1":array1};
                }
                if(c.btnout1){
                    if(c.btnout1.nexts.length>0){
                        let array=[];
                        let array1=[];
                        for(let n=0;n<c.btnout1.nexts.length;n++){
                            if(c.btnout1.nexts[n].nextput.type==="input"){
                                if(c.btnout1.nexts[n].nextput.parent.type==="scene"){
                                    array.push("btnin");
                                }
                                if(c.btnout1.nexts[n].nextput.parent.type==="container"){
                                    array.push(c.btnout1.nexts[n].nextput.parent.sjid);
                                }
                            }
                            if(c.btnout1.nexts[n].nextput.type==="input1"){
                                if(c.btnout1.nexts[n].nextput.parent.type==="scene"){
                                    array1.push("btnin");
                                }
                                if(c.btnout1.nexts[n].nextput.parent.type==="container"){
                                    array1.push(c.btnout1.nexts[n].nextput.parent.sjid);
                                }
                            }

                        }
                        a1={"bin":array,"bin1":array1};
                    }
                }
                let uid=c.sjid;
                let ccc={};
                ccc[uid]={"out":a,"out1":a1};
                arr1.push(ccc);
            }
            if(c.type==="output"){
                if(c.nexts.length>0){
                    let btout=[];
                    let btout1=[];
                    for(let n=0;n<c.nexts.length;n++){
                        if(c.nexts[n].nextput.type==="input"){
                            if(c.nexts[n].nextput.parent.type==="scene"){
                                btout.push("btnin");
                            }
                            if(c.nexts[n].nextput.parent.type==="container"){
                                btout.push(c.nexts[n].nextput.parent.sjid);
                            }
                        }
                        if(c.nexts[n].nextput.type==="input1"){
                            if(c.nexts[n].nextput.parent.type==="scene"){
                                btout1.push("btnin");
                            }
                            if(c.nexts[n].nextput.parent.type==="container"){
                                btout1.push(c.nexts[n].nextput.parent.sjid);
                            }
                        }
                    }
                    let aa={"bt":btout,"bt1":btout1};
                    arr1.push({"btin":aa});
                }
            }
        }
        let m={"tx":arr,"id":arr1};
        return m;
    }
}
export default Scene;