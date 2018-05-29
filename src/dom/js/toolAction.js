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
            let m=scene.save();
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
            $.post("http://127.0.0.1:8888/",data,function (err, result) {
                console.log(err);
                console.log(result);
                if(result==="success"){
                    alert("保存成功")
                }else{
                    alert("保存失败");
                }
            });
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

        console.log(c);
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
        if(localStorage.getItem("wjname")){
            let data="compile&&"+$('#ress').val()+"&&"+localStorage.getItem("wjname");
            console.log(data);
            $.get("http://127.0.0.1:8888/"+data,function (err, result) {})
        }
        // if(c.length>0){
        //     $("#dmq").html("<p>"+c.join("<br>")+"</p>");
        // }else{
        //     $("#dmq").html("");
        // }
    },
    run:function(){
        // let c=scene.getConnectCommand();
        // c=c.reverse();//c为命令数组 把这个数组发送到后台机器人
        if(localStorage.getItem("wjname")){
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
            $.get("http://127.0.0.1:8888/"+data,function (err, result) {
                console.log(err);
                console.log(result);
                $("#rzmain").html(err.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' '))
            })
        }
    },
    help:function () {

    }
};
export default toolAction;