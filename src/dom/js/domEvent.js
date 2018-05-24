import toolAction from "./toolAction";
import Scene from "../../viewer/core/Scene";
import Vector2 from "../../viewer/math/Vector2";

let eventObject={
    init:function(){
        this.initToolEvent();
        this.initTreeEvent();
        this.initAddEvent();
        this.initSearchEvent();
    },
    initToolEvent:function(){
        $("#tb").delegate("li","click",function(e){
            toolAction[$(e.currentTarget).attr("class")]();
          });
    },
    initTreeEvent:function(){
        $('#tree').on('click', '.tree-expand', function () {
            var $el = $(this);
            var childrenDom = $el.parent().siblings('.tree-children');
            if (childrenDom.length) {
                if (childrenDom.is(':visible')) {
                childrenDom.slideUp(50);
                $el.addClass('icon-tree-show').removeClass('icon-tree-hide');
                }
                else {
                childrenDom.slideDown(50);
                $el.addClass('icon-tree-hide').removeClass('icon-tree-show');
                }
            }
        });
        let doms=$("a.tree-text");
        for(let dom of doms){
            dom.ondragstart=function(ev){
                // console.log(ev.target.id);
                ev.dataTransfer.setData("id",ev.target.getAttribute("data-id"));
                ev.dataTransfer.setData("data-node",ev.target.getAttribute("data-node"));
            }
        }
        // $('#tree').on('ondragstart', 'a', function (ev) {
           
        // });
    },
    initSearchEvent(){
        $("#search").on("click",function(){
            let html="";
            let sosuo=$("#sosuo").val().replace(/(^\s*)|(\s*$)/g, "");
            let ss=new Array();
            if(sosuo!=null && sosuo!==undefined && sosuo!==""){
                let arr=JSON.parse(localStorage.getItem("baseAssembly")).children;
                for(let i=0;i<arr.length;i++){
                    if(arr[i].children){
                        for(let j=0;j<arr[i].children.length;j++){
                            if(arr[i].children[j].text.indexOf(sosuo) !== -1){
                                ss.push(arr[i].children[j]);
                                // html+="<div style='width: 99%;height: 40px; line-height: 40px;text-align: left;text-indent: 10px;'>"+"<img src='"+arr[i].children[j].url+"'/>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"+arr[i].children[j].text+"</span>"+"</div>";
                            }
                        }
                    }
                }
                if(localStorage.getItem("kjxx")!==null && localStorage.getItem("kjxx")!==undefined && localStorage.getItem("kjxx")!=="") {
                    let arr1 = JSON.parse(localStorage.getItem("kjxx"));
                    for(let i=0;i<arr1.length;i++) {
                        if(arr1[i].name.indexOf(sosuo) !== -1){
                            ss.push(arr1[i]);
                            // html+="<div style='width: 99%;height: 40px; line-height: 40px;text-align: left;text-indent: 10px;'>"+"<img src='"+arr1[i].url+"'/>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"+arr1[i].name+"</span>"+"</div>";
                        }
                    }
                }
                if(ss.length>0){
                    for(let i=0;i<ss.length;i++){
                        html+="<div style='width: 99%;height: 40px; line-height: 40px;text-align: left;text-indent: 10px;'>"+"<img  id='ss"+i+"' src='"+ss[i].url+"'/>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"+ss[i].name+"</span>"+"</div>";
                    }
                    $("#su").html(html);
                    for(let i=0;i<arr.length;i++) {
                        $("#ss" + i + "").mouseover(function () {
                            localStorage.setItem('ssxx',JSON.stringify(ss));
                            localStorage.setItem('sskjid',i)
                        })
                    }
                }else{
                    $("#su").html("");
                }


            }else{
                $("#su").html("");
            }

        })
    }
    ,
    initAddEvent(){
        $('#add').click(function () {
            $("#name").val("");
            $('#tbdz').html("images/text.png");
            $('#tp').attr('src',"images/text.png");
            $("#zl").val("");
            $("#hsm").val("");
            $('#ysid').html("");
        });
        $('#img').on('click','li',function() {
            let o=this.innerHTML.indexOf('"')+1;
            let t=this.innerHTML.indexOf('"',o);
            $('#tbdz').html(this.innerHTML.substring(o,t));
            $('#tp').attr('src',this.innerHTML.substring(o,t));
        });
        $("#name").blur(function(){
            let mc=$("#name").val().replace(/(^\s*)|(\s*$)/g, "");
            if(localStorage.getItem("kjxx")!=null && localStorage.getItem("kjxx")!==undefined && localStorage.getItem("kjxx")!==""){
                let arr=JSON.parse(localStorage.getItem("kjxx"));
                for(let i=0;i<arr.length;i++) {
                    if(arr[i].name===mc){
                        alert('名称重复！');
                        $("#name").val("");
                        return;
                    }
                }
            }
        });
        function randomString(len) {
            len = len || 32;
            var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            var maxPos = $chars.length;
            var pwd = '';
            for (let i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        }
        $("#qd").click(function () {
            var mc=$("#name").val().replace(/(^\s*)|(\s*$)/g, "");
            var tbdz=$('#tbdz').html();
            var hsm=$("#hsm").val();
            var zl=$("#zl").val();
            var ysid=$('#ysid').html();
            let kj="";
            if(ysid===""){
                kj={"name":mc,"url":tbdz,"zldm":zl,"id":randomString(10),"command":hsm};
            }else{
                kj={"name":mc,"url":tbdz,"zldm":zl,"id":ysid,"command":hsm};
            }

            if(mc!=null && mc!==undefined && mc!==""){
                if(zl!==""){
                    if(hsm===""){
                        alert("函数名不能为空");
                    }else{
                        add();
                    }
                }else{
                    add();
                }
                function add() {
                    if(localStorage.getItem("kjxx")!==null && localStorage.getItem("kjxx")!==undefined && localStorage.getItem("kjxx")!==""){
                        let arr=JSON.parse(localStorage.getItem("kjxx"));
                        if(ysid===""){
                            arr.push(kj);
                        }else{
                            arr[sessionStorage.getItem('bg')]=kj;
                        }
                        localStorage.setItem('kjxx',JSON.stringify(arr));
                    }else{
                        let arr=new Array();
                        arr.push(kj);
                        localStorage.setItem('kjxx',JSON.stringify(arr));
                    }
                    let job = localStorage.getItem("kjxx");
                    $("#name").val("");
                    $('#tbdz').html("images/text.png");
                    $('#tp').attr('src',"images/text.png");
                    $("#zl").val("");
                    $("#hsm").val("");
                    $('#ysid').html("");
                    $('#myModal').modal('hide');
                    var html="";
                    let arr = JSON.parse(localStorage.getItem("kjxx"));
                    for(let i=0;i<arr.length;i++) {
                        html+="<a  id='zdy"+i+"' style='text-decoration:none;width: 99%;height: 40px; line-height: 40px;text-align: left;text-indent: 10px;display:block'>"+"<img src='"+arr[i].url+"'/>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"+arr[i].name+"</span>"+"</a>";
                    }
                    $('#zdykj').html(html);
                    for(let i=0;i<arr.length;i++) {
                        $("#zdy" + i + "").mouseover(function () {
                            localStorage.setItem('zdykjid',i)
                        })
                        $("#zdy" + i + "").mousedown(function(e) {

                            if (3 == e.which) {
                                backinit();
                                $(this).css("background-color","#dddddd");
                                sessionStorage.setItem('bg',i);
                                $('#wrapper').css('display','block');
                                $('#wrapper').css('left',e.clientX+'px');
                                $('#wrapper').css('top',e.clientY +'px');
                            }
                        })
                    }
                    function backinit() {
                        for(let i=0;i<arr.length;i++) {
                            $("#zdy"+i).css("background-color","");
                        }
                    }
                }
            }else{
                alert('名称不能为空！')
            }
        });
        $("#zdymain").click(function () {
            var html="";
            if(localStorage.getItem("kjxx")!=null && localStorage.getItem("kjxx")!=undefined && localStorage.getItem("kjxx")!="") {
                let arr = JSON.parse(localStorage.getItem("kjxx"));
                for(let i=0;i<arr.length;i++) {
                    html+="<a id='zdy"+i+"' style='text-decoration:none;width: 99%;height: 40px; line-height: 40px;text-align: left;text-indent: 10px;display:block' class='tree-expand'>"+"<img src='"+arr[i].url+"'/>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"+arr[i].name+"</span>"+"</a>";
                }
                // console.log(localStorage.getItem("kjxx"));
                $('#zdykj').html(html);
                for(let i=0;i<arr.length;i++) {
                    $("#zdy" + i + "").mouseover(function () {
                        localStorage.setItem('zdykjid',i)
                    })
                    $("#zdy" + i + "").mousedown(function(e) {

                        if (3 == e.which) {
                            backinit();
                            $(this).css("background-color","#dddddd");
                            sessionStorage.setItem('bg',i);
                            $('#wrapper').css('display','block');
                            $('#wrapper').css('left',e.clientX+'px');
                            $('#wrapper').css('top',e.clientY +'px');
                        }
                    })
                }
                function backinit() {
                    for(let i=0;i<arr.length;i++) {
                        $("#zdy"+i).css("background-color","");
                    }
                }
            }
        });
        $("#edit").click(function () {
            var id=sessionStorage.getItem('bg');
            let arr = JSON.parse(localStorage.getItem("kjxx"));
            let node=arr[id];
            $("#name").val(node.name);
            $('#tbdz').html(node.url);
            $("#zl").val(node.zldm.replace(/<br\/>/g, ' \n ' ));
            $("#hsm").val(node.command);
            $('#ysid').html(node.id);
            $('#tp').attr('src',node.url);
            $('#myModal').modal('show');
        });
        $('#del').click(function () {
            var id="#zdy"+sessionStorage.getItem('bg');
            $(id).html("");
            $(id).css("height","0");
            let arr = JSON.parse(localStorage.getItem("kjxx"));
            arr.splice(sessionStorage.getItem('bg'),1);
            localStorage.setItem('kjxx',JSON.stringify(arr));
            sessionStorage.removeItem('bg');
        });
        $('#compile').click(function () {
            toolAction.compile();
        });
        $('#run').click(function () {
            toolAction.run();
        });
        $('#del1').click(function () {

            let obj= scene.obj();
            if(obj){
                $('#wrapper1').css('display','none');
                obj.deleteSelect();
                console.log(obj);
            }
        });
        $('#edit1').click(function () {
            let object=scene.obj().children[localStorage.getItem('object')];
            // if(object.kjid.length==10){
                $('#zdykjzl').modal('show');
                $('#zdykjid').val(object.sjid);
                $('#zdykjzlLabel').html(object.name);
                $('#zdykjzlBody').val(object.zldm.replace(/<br\/>/g, ' \n ' ));
            // }else{
            //     function getlen(str,ch){
            //         var ret=0;
            //         for(var i=0;i<str.length;i++){if(str.charAt(i)==ch)   ret++;}
            //         return ret;
            //     }
            //     var zldm=object.jckj;
            //     let count = getlen(zldm,'$');
            //     if(object.jcbl==""){
            //         for(let i=0;i<count;i++){
            //             zldm=zldm.replace('$', "<input style='text-align:center;width:30px;display: inline' class='form-control-sm' type='text' onkeyup=\"this.value=this.value.replace(/\\D/g,'')\" value='10'>");
            //         }
            //     }else{
            //         var arr=object.jcbl.split("-");
            //         for(let i=0;i<count;i++){
            //             zldm=zldm.replace('$', "<input style='text-align:center;width:30px;display: inline' class='form-control-sm' type='text' onkeyup=\"this.value=this.value.replace(/\\D/g,'')\" value='"+arr[i]+"'>");
            //         }
            //     }
            //     $('#jckjzl').modal('show');
            //     $('#jckjid').val(object.sjid);
            //     $('#jckjzlLabel').html(object.name);
            //     $('#jckjzlBody').html(zldm);
            // }
            localStorage.removeItem("object");
        });


        $("#zlku").click(function () {

        });
        $("#Address").click(function () {
            // $('#zdykjzl').modal('show');
            $('#myAddress').modal('show');
        });
        $("#qdAdress").click(function () {
            if($("#ress").val()!==""){
                localStorage.setItem("Address",$("#ress").val())
            }
            $('#myAddress').modal('hide');
        })
        $("#files").change(function () {
            fileImport();
        });
        function fileImport() {            //获取读取我文件的File对象
            var selectedFile = document.getElementById('files').files[0];
            var reader = new FileReader();//这是核心,读取操作就是由它完成.
            console.log(document.getElementById('files').files[0].name);
            localStorage.setItem("wjname",document.getElementById('files').files[0].name);
            reader.readAsText(selectedFile, "utf8");
            //reader.readAsText(selectedFile);//读取文件的内容,也可以读取文件的URL
            reader.onload = function () {
                // console.log("123");//当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
                // console.log(this.result);
                if(this.result){
                    let canvas = document.getElementById("viewer");
                    window.scene = new Scene(canvas);
                    scene.isShowBounds = true;
                    let arr=JSON.parse(this.result);
                    if(arr.tx.length>0){
                        for(let k=0;k<arr.tx.length;k++){
                            let pos=new Vector2(arr.tx[k].x,arr.tx[k].y);
                            scene.addByNode(arr.tx[k],pos,arr.tx[k].id);
                        }
                    }
                    let c=scene.obj();
                    if(arr.id.length>0){
                        for(let i=0;i<arr.id.length;i++){
                            let jzid=Object.keys(arr.id[i])[0];
                            if(jzid==="btin"){
                                for(let k=0;k<arr.id[i][jzid].length;k++) {
                                    if(arr.id[i][jzid][k]==="btnin"){
                                        let e={
                                            nextput:c.btnin
                                        };
                                        c.btnin.lasts.push(c.btnout);
                                        c.btnout.nexts.push(e);
                                    }else{
                                        for(let m=0;m<c.children.length;m++) {
                                            if (c.children[m].sjid === arr.id[i][jzid][k]) {
                                                let e={
                                                    nextput:c.children[m].btnin
                                                };
                                                c.btnout.nexts.push(e);
                                            }
                                        }
                                    }
                                }
                            }else{
                                let kj="";
                                for(let h=0;h<c.children.length;h++) {
                                    if (c.children[h].sjid === jzid) {
                                        kj=c.children[h].btnout;
                                    }
                                }
                                for(let k=0;k<arr.id[i][jzid].length;k++) {
                                    if(arr.id[i][jzid][k]==="btnin"){
                                        console.log("1");
                                        let e={
                                            nextput:c.btnin
                                        };
                                        c.btnin.lasts.push(kj);
                                        kj.nexts.push(e);
                                    }else{
                                        for(let m=0;m<c.children.length;m++) {
                                            if (c.children[m].sjid === arr.id[i][jzid][k]) {
                                                let e={
                                                    nextput:c.children[m].btnin
                                                };
                                                kj.nexts.push(e);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        $("#wjsave").click(function () {
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
            console.log(str);
            let data={
                dz:$('#ress').val(),
                mc:$("#savename").val(),
                str:JSON.stringify(m),
                zl:str
            };
            localStorage.setItem("wjname",$("#savename").val());
            if($("#savename").val()===""){
                alert("文件名不能为空");
            }else{
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
                })
                // $.ajax({
                //     type:"post",
                //     url:"http://192.168.9.159:8888/",
                //     data:data,
                //     dataType: "json",
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
            }
        });
        $(".wjsave").click(function () {
            toolAction.save();
        });
        $("#open").click(function () {
           toolAction.open();
        });
        $("#newwjsave").click(function () {
            $("#newwj").modal("hide");
            $(".wjsave").click();
        });
        $("#pq").click(function () {
            location.reload();
        });
        $("#jump").click(function () {
            let data="jump&&"+$('#ress').val()+"&&"+localStorage.getItem("wjname");
            console.log(data);
            $.get("http://192.168.9.159:8888/"+data,function (err, result) {})
        })
    }
};
export default eventObject;