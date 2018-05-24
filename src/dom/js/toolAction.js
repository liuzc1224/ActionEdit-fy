import domEvent from "./domEvent";
import Vector2 from "../../viewer/math/Vector2";
import Bezier from "../../viewer/math/Bezier";
import Scene from "../../viewer/core/Scene";
let toolAction={
    new:function(){
        // $("#newwj").modal('show');
        let i=actionManager.obj().actionHistory.length;
        console.log(i);
        if(i===0){
            location.reload();
        }else{
            $("#newwj").modal("show");
        }
    },
    open:function(){
        console.log("123");
        $("#files").click();
    },
    save:function(){
        if(localStorage.getItem("wjname")){
            let arr=[];
            let arr1=[];
            let c=scene.obj().children;
            if(c.length>2){
                for(let i=0;i<c.length;i++){
                    if(c[i].name){
                        let o=c[i].materials[1].sources.outerHTML.indexOf('"')+1;
                        let t=c[i].materials[1].sources.outerHTML.indexOf('"',o);
                        let kj={"uid":c[i].sjid,"name":c[i].name,"url":c[i].materials[1].sources.outerHTML.substring(o,t),"zldm":c[i].zldm,"id":c[i].kjid,"command":c[i].command,"jckj":c[i].jckj,"x":c[i].position.x,"y":c[i].position.y};
                        arr.push(kj);
                    }
                }
            }
            let e=scene.obj();
            for(let c of e.children){
                if(c.type==="container"){
                    if(c.btnout.nexts.length>0){
                        let array=[];
                        for(let n=0;n<c.btnout.nexts.length;n++){
                            if(c.btnout.nexts[n].nextput.parent.type==="scene"){
                                array.push("btnin");
                            }
                            if(c.btnout.nexts[n].nextput.parent.type==="container"){
                                array.push(c.btnout.nexts[n].nextput.parent.sjid);
                            }
                        }
                        let uid=c.sjid;
                        let a={};
                        a[uid]=array;
                        arr1.push(a)
                    }
                }
                if(c.type==="output"){
                    if(e.btnout.nexts.length>0){
                        let btout=[];
                        console.log(e.btnout.nexts[0]);
                        for(let n=0;n<e.btnout.nexts.length;n++){
                            if(e.btnout.nexts[n].nextput.parent.type==="scene"){
                                btout.push("btnin");
                            }
                            if(e.btnout.nexts[n].nextput.parent.type==="container"){
                                btout.push(e.btnout.nexts[n].nextput.parent.sjid);
                            }
                        }
                        arr1.push({"btin":btout})
                    }
                }
            }
            let m={"tx":arr,"id":arr1};
            let zl=scene.getConnectCommand();
            zl=zl.reverse();
            let str="";
            for(let i=0;i<zl.length;i++){
                str+="index\n"+i+"\nname"+zl[i].command+"\ncontent"+"\n"+zl[i].zldm;
            }
            let data={
                dz:$('#ress').val(),
                mc:localStorage.getItem("wjname"),
                str:JSON.stringify(m),
                zl:str
            };
            $("#save").modal('hide');
            $("#savename").val("");
            $.post("http://192.168.9.159:8888/",data,function (err, result) {
                console.log(err);
                console.log(result);
                if(result==="success"){
                    alert("保存成功")
                }else{
                    alert("保存失败");
                }
            });
            // $.ajax({
            //     type:"post",
            //     url:"http://192.168.9.159:8888/",
            //     data:data,
            //     dataType: "json",
            //     // jsonp:'callback',
            //     success:function(data){
            //         console.log(data);
            //         if(data){
            //             alert('保存成功')
            //         }
            //     } ,
            //     error: function(){
            //         //请求出错处理
            //         alert("保存失败")
            //     }
            // });
        }else{
            $("#save").modal('show');
            $("#savename").val("");
        }
        // function fake_click(obj) {
        //     var ev = document.createEvent("MouseEvents");
        //     ev.initMouseEvent(
        //         "click", true, false, window, 0, 0, 0, 0, 0
        //         , false, false, false, false, 0, null
        //     );
        //     obj.dispatchEvent(ev);
        // }
        //
        // function export_raw(name, data) {
        //     var urlObject = window.URL || window.webkitURL || window;
        //
        //     var export_blob = new Blob([data]);
        //
        //     var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
        //     save_link.href = urlObject.createObjectURL(export_blob);
        //     save_link.download = name;
        //     fake_click(save_link);
        // }
        // export_raw('test.txt', JSON.stringify(m));


    },
    forward(){
        actionManager.forward();
    },
    back(){
        actionManager.back();
    },
    compile:function(){
        let c=scene.getConnectCommand();
        c=c.reverse();//倒序

        let html="";
        if(c.length>0){
            for(let i=0;i<c.length;i++){
                console.log(c[i]);
                html+="<div class='accordion-heading'>" +
                    "<a class='accordion-toggle' data-toggle='collapse' data-parent='#dmq' href='#collapse"+i+"'>" +
                    c[i].command+
                    "</a>" +
                    "</div>" +
                    "<div id='collapse"+i+"' class='accordion-body collapse' style='height: 0; '>" +
                    "<div class='accordion-inner'>"+
                    c[i].zldm.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ')+
                    "</div>" +
                    "</div>"
            }
            $('#dmq').html(html);
        }else{
            $("#dmq").html("");
        }

        let data="compile&&"+$('#ress').val()+"&&"+localStorage.getItem("wjname");
        console.log(data);
        $.get("http://192.168.9.159:8888/"+data,function (err, result) {})

        // if(c.length>0){
        //     $("#dmq").html("<p>"+c.join("<br>")+"</p>");
        // }else{
        //     $("#dmq").html("");
        // }
    },
    run:function(){
        // let c=scene.getConnectCommand();
        // c=c.reverse();//c为命令数组 把这个数组发送到后台机器人
        let data="run&&"+$('#ress').val()+"&&"+localStorage.getItem("wjname");
        console.log(data);
        // $.ajax({
        //     type:"get",
        //         url:"http://192.168.9.159:8888/",
        //         data:data,
        //         dataType: "text",
        //         // jsonp:'callback',
        //         success:function(data){
        //             console.log(data);
        //             if(data){
        //                 alert('保存成功')
        //             }
        //         }
        // })
        $.get("http://192.168.9.159:8888/"+data,function (err, result) {
            console.log(err);
            console.log(result);
            $("#rzmain").html(err.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' '))
        })
    },
    help:function () {

    }
};
export default toolAction;