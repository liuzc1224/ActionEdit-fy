var path = require('path');
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '../css/index.less'
import domEvent from "./domEvent"
import Scene from "../../viewer/core/Scene";
import ActionManager from "../../viewer/drawing/ActionManager.js";



window.onload=function() {
    document.getElementById('viewer').height=document.getElementById('center').offsetHeight;
    document.getElementById('viewer').width=document.getElementById('center').offsetWidth;
    var node = $('#tree');
    renderTree(res, node);
    domEvent.init();
    let canvas = document.getElementById("viewer");
    window.scene = new Scene(canvas);
    scene.isShowBounds = true;

    // var wrap = document.getElementById('wrapper');
    // wrap.style.display = 'none';
    // var li = document.getElementsByTagName('li');
    // for (var i = 0; i < li.length; i++) {
    //     li.onmouseover = function () {
    //         this.classname = "active";
    //     }
    //     li.onmouseout = function () {
    //         this.classname = "";
    //     }
    // }
    // if(localStorage.getItem("savexx")){
    //     let arr=JSON.parse(localStorage.getItem("savexx"));
    //     for(let k=0;k<arr.length;k++){
    //         let pos=New Vector2(arr[k].x,arr[k].y);
    //         scene.addByNode(arr[k],pos,arr[k].id);
    //     }
    // }
    window.actionManager=new ActionManager(scene);
    document.oncontextmenu = function(e){
        return false;//取消右键点击的默认事件
    };
    if(localStorage.getItem("Address")){
        $('#ress').val(localStorage.getItem("Address"));
    }
    if(localStorage.getItem("wjname")) {
        localStorage.removeItem("wjname");
    }
};
//关闭右键菜单，很简单
window.onclick=function(e){
    if(document.querySelector('#wrapper').style.display=="block"){
        //用户触发click事件就可以关闭了，因为绑定在window上，按事件冒泡处理，不会影响菜单的功能
        document.querySelector('#wrapper').style.display = 'none';
        document.querySelector('#zdy'+sessionStorage.getItem('bg')).style.backgroundColor = "";

    }
    if(document.querySelector('#wrapper1').style.display=="block"){
        //用户触发click事件就可以关闭了，因为绑定在window上，按事件冒泡处理，不会影响菜单的功能
        document.querySelector('#wrapper1').style.display = 'none';
    }
}
  
  window.onresize = function(){
    document.getElementById('viewer').height=document.getElementById('center').offsetHeight;
    document.getElementById('viewer').width=document.getElementById('center').offsetWidth;
    scene.resetSize();
  };

  localStorage.removeItem("baseAssembly");
  let res =localStorage.getItem("baseAssembly");
if(!res){
    res={
        text:"基础控件",
        _id:0,
        children:[
            {
                text:"运动控制",
                _id:1,
                children:[
                    {
                        text:"前进",
                        _id:11,
                        command:"linear",
                        url:"images/前进.png",
                        name:"向前走",
                        iconCls:"icon-nav-forward",
                        zldm:"def linear(cmd_vel,speed=0.2,distance=1.0):  #线运动\n" +
                        "    linear_speed = abs(speed)   # 线速度\n" +
                        "    linear_duration = distance / speed  # 到达目标的时间\n" +
                        "    move_cmd = Twist()\n" +
                        "    rate = 50 \n" +
                        "    r = rospy.Rate(rate)   # 设置更新频率为50HZ\n" +
                        "    ticks = int(linear_duration * rate)\n" +
                        "    flag=0\n" +
                        "    if ticks<0:\n" +
                        "        flag=1\n" +
                        "\n" +
                        "    # Set the forward speed\n" +
                        "    move_cmd.linear.x = linear_speed*(-1)**flag\n" +
                        "    # 机器人向前运动，延时一定时间\n" +
                        "    for t in range(ticks*(-1)**flag):\n" +
                        "        cmd_vel.publish(move_cmd)\n" +
                        "        r.sleep()\n" +
                        "    # 发送一个空的Twist消息是机器人停止\n" +
                        "    cmd_vel.publish(Twist())\n" +
                        "    #rospy.sleep(1)\n"
                    },{
                        text:"后退",
                        _id:21,
                        command:"angular",
                        url:"images/后退.png",
                        name:"向后走",
                        iconCls:"icon-nav-back",
                        zldm:"def angular(cmd_vel,speed=50,angle=50):  #角运动\n" +
                        "    angular_speed = abs(speed) *pi/180   # 角速度\n" +
                        "    angular_duration = angle/ speed  # 到达目标的时间\n" +
                        "    move_cmd = Twist()\n" +
                        "    rate = 50\n" +
                        "    r = rospy.Rate(rate)   # 设置更新频率为50HZ\n" +
                        "    ticks = int(angular_duration *rate)\n" +
                        "    flag=0\n" +
                        "    if ticks<0:\n" +
                        "        flag=1\n" +
                        "        angular_speed =angular_speed*(-1)\n" +
                        "\n" +
                        "    # Set the forward speed\n" +
                        "    move_cmd.angular.z = angular_speed\n" +
                        "    # 机器人运动，延时一定时间\n" +
                        "    for t in range(ticks*(-1)**flag):\n" +
                        "        cmd_vel.publish(move_cmd)\n" +
                        "        r.sleep()\n" +
                        "    # 发送一个空的Twist消息是机器人停止\n" +
                        "    cmd_vel.publish(Twist())\n" +
                        "    #rospy.sleep(1)\n"
                    },{
                        text:"左转",
                        _id:31,
                        command:"",
                        url:"images/左转-01.png",
                        name:"左转",
                        iconCls:"icon-nav-Turnleft",
                        zldm:""
                    },{
                        text:"右转",
                        command:"",
                        _id:41,
                        url:"images/右转-01.png",
                        name:"右转",
                        iconCls:"icon-nav-Turnright",
                        zldm:""
                    },{
                        text:"停止",
                        command:"",
                        _id:51,
                        url:"images/停止.png",
                        name:"停止",
                        iconCls:"icon-nav-stop",
                        zldm:""
                    },{
                        text:"开始",
                        command:"",
                        _id:61,
                        url:"images/开始.png",
                        name:"开始",
                        iconCls:"icon-nav-start",
                        zldm:""
                    }
                ]
            },{
                text:"控制",
                _id:2,
                children:[
                    {
                        text:"if",
                        _id:12,
                        command:"",
                        url:"images/text.png",
                        name:"if",
                        zldm:""
                    },{
                        text:"if else",
                        _id:22,
                        command:"",
                        url:"images/text.png",
                        name:"if else",
                        zldm:""
                    },{
                        text:"While()",
                        _id:32,
                        command:"",
                        url:"images/text.png",
                        name:"While()",
                        zldm:""
                    },{
                        text:"等待",
                        _id:42,
                        command:"",
                        url:"images/等待.png",
                        name:"等待",
                        iconCls:"icon-nav-Waiting",
                        zldm:""
                    },
                ]
            },{
                text:"视觉",
                _id:3,
                command:"",
                children:[
                    {
                        text:"人脸识别",
                        _id:13,
                        command:"",
                        url:"images/人脸识别.png",
                        name:"人脸识别",
                        iconCls:"icon-nav-Facerecognition",
                        zldm:""
                    },{
                        text:"拍照",
                        _id:23,
                        command:"",
                        url:"images/拍照.png",
                        name:"拍照",
                        iconCls:"icon-nav-Takingpictures",
                        zldm:""
                    },{
                        text:"录像",
                        _id:33,
                        command:"",
                        url:"images/录像.png",
                        name:"录像",
                        iconCls:"icon-nav-video",
                        zldm:""
                    }
                ]
            },{
                text:"听觉",
                _id:4,
                children:[
                    {
                        text:"播放声音",
                        _id:14,
                        command:"",
                        url:"images/语音播放2.png",
                        name:"播放声音",
                        iconCls:"icon-nav-Voicebroadcast",
                        zldm:""
                    },{
                        text:"录音",
                        _id:24,
                        command:"",
                        url:"images/录音.png",
                        name:"录音",
                        iconCls:"icon-nav-recording",
                        zldm:""
                    },{
                        text:"语音识别",
                        _id:34,
                        command:"",
                        url:"images/语音识别.png",
                        name:"语音识别",
                        iconCls:"icon-nav-Speechrecognition",
                        zldm:""
                    },
                ]
            }, {
                text: "运算",
                _id: 5,
                children: [
                    {
                        text: "运算+",
                        _id: 15,
                        command: "",
                        url: "images/加.png",
                        name: "运算+",
                        iconCls:"icon-nav-add",
                        zldm: ""
                    }, {
                        text: "运算-",
                        _id: 25,
                        command: "",
                        url: "images/减.png",
                        name: "运算-",
                        iconCls:"icon-nav-sub",
                        zldm: ""
                    }, {
                        text: "运算X",
                        _id: 35,
                        command: "",
                        url: "images/乘.png",
                        name: "运算X",
                        iconCls:"icon-nav-Themultiplication",
                        zldm: ""
                    }, {
                        text: "运算/",
                        _id: 45,
                        command: "",
                        url: "images/运算-除.png",
                        name: "运算/",
                        iconCls:"icon-tree-division",
                        zldm: ""
                    }, {
                        text: "运算%",
                        _id: 55,
                        command: "",
                        url: "images/百分号.png",
                        name: "运算%",
                        iconCls:"icon-tree-percent",
                        zldm: ""
                    }
                ]
            }, {
                text: "传感器",
                _id: 6,
                children: [
                    {
                        text: "温度",
                        _id: 16,
                        command: "",
                        url: "images/温度.png",
                        name: "温度",
                        iconCls:"icon-nav-temperature",
                        zldm: ""
                    }, {
                        text: "湿度",
                        _id: 26,
                        command: "",
                        url: "images/湿度.png",
                        iconCls:"icon-nav-humidity",
                        name: "湿度",
                        zldm: ""
                    }, {
                        text: "PM2.5",
                        _id: 36,
                        command: "",
                        url: "images/pm2.5.png",
                        name: "PM2.5",
                        iconCls:"icon-tree-PM",
                        zldm: ""
                    }, {
                        text: "CO2",
                        _id: 46,
                        command: "",
                        url: "images/CO2.png",
                        name: "CO2",
                        iconCls:"icon-tree-CO2",
                        zldm: ""
                    },{
                        text: "激光雷达",
                        _id: 56,
                        command: "",
                        url: "images/雷达.png",
                        name: "激光雷达",
                        iconCls:"icon-tree-radar",
                        zldm: ""
                    },{
                        text: "陀螺仪",
                        _id: 66,
                        command: "",
                        url: "images/陀螺仪.png",
                        name: "陀螺仪",
                        iconCls:"icon-nav-gyroscope",
                        zldm: ""
                    }
                ]
            }
        ]
    };
    localStorage.setItem("baseAssembly",JSON.stringify(res));
  }else{
    res=JSON.parse(res);
  }
 
  
  
  // 渲染树
var renderTree = function (data, node) {
    var func = function (data, level, last) {
        str += '<div class="tree-node">';
        var line = '<div class="tree-line"></div>';
        if (last) {
            line = '';
            if (!data.children) {
                line = '<div class="tree-line-last"></div>';
            }
        }
        if (level === 0) {
            line = '';
        }
        var linev = '<div class="tree-line-v"></div>';
        if (level === 0) {
            linev = '';
        }
        str += line
            +'<div class="tree-content">'
            + linev;
        data.iconCls = data.iconCls || 'icon-tree-table';
        var expand = '';
        var iconStr = '<i class="tree-icon ' + data.iconCls + '"></i>';
        var fillStr = '';
        var draggable='draggable=true'; 
        var node="leaf";
        if (data.children) {
            expand = '<a href="javascript:;" class="tree-expand icon-tree-hide"></a>';
            iconStr = '';
            fillStr = '<div class="tree-fill"></div>';
         
            draggable='';
            node="internal";
        }
        str += expand
            + fillStr
            + '<a href="javascript:;" class="tree-text" '+draggable+' data-node="'+node+'" data-id="' + data._id + '" id="' + data._id +'-catalog">'
            + iconStr
            + '<span>' + data.text + '</span>'
            + '</a>'
            + '</div>';
        if (data.children) {
            str += '<div class="tree-children">';
            for (let i = 0; i < data.children.length; i++) {
                var last = i === data.children.length - 1;
                func(data.children[i], level + 1, last);
            }
            str += '</div>';
        }
        str += '</div>';
    };
    var str = '';
    func(data, 0);
    node.html(str);
};
  
  

  