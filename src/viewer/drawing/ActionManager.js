class ActionManager{
    constructor(scene){
        this.actionHistory=[];
        this.actionIndex=-1;
        this.scene=scene;
    }
    deleteObject(container,nexts,lasts){
        this.clearForIndex();
        let action={
            type:"deleteContainer",
            object:container,
            nexts:nexts,
            back:()=>{
                container.btnout.nexts=nexts;
                for(let n of nexts){
                    n.nextput.lasts.push(container.btnout);
                }
                container.btnin.lasts=lasts;
                for(let l of lasts){
                    l.nexts.push({
                        strokeStyle:"#000000",
                        nextput:container.btnin
                    })
                }
                this.scene.select
                this.scene.add(container);
            },
            forward:()=>{
                nexts=container.clearConnect()[0];
                this.scene.remove(container);
            }
        }

        this.actionIndex++;
        this.actionHistory.push(action);
    }
    actionDrop(container){
        this.clearForIndex();
        let action={
            type:"addContainer",
            object:container,
            back:()=>{
                if(this.select===container){
                    this.scene.select.isShowBounds=false;
                    this.scene.select.renderIndex=0;
                    this.scene.select=null;
                }
                this.scene.remove(container);
            },
            forward:()=>{
                this.scene.add(container);
            }
        }

        this.actionIndex++;
        this.actionHistory.push(action);
    }
    actionMove(start,end,container){
        this.clearForIndex();
        this.actionIndex++;
        let action={
            type:"move",
            object:container,
            back:()=>{

                container.position=start;
            },
            forward:()=>{
                container.position=end;
            }
        };
        this.actionHistory.push(action);
    }
    deleteLine(outo,b){
        this.clearForIndex();
        this.actionIndex++;
        let action={
            type:"dline",

            back:()=>{

                outo.nexts.push(b);
                b.nextput.lasts.push(outo);
            },
            forward:()=>{
                outo.removeNext(b);
            }
        }
        this.actionHistory.push(action);
    }
    actionLine(outo,into,b){
        this.clearForIndex();
        this.actionIndex++;
        let action={
            type:"line",

            back:()=>{
                outo.removeNext(b);
            },
            forward:()=>{
                outo.nexts.push(b);
                into.lasts.push(outo);
            }
        }
        this.actionHistory.push(action);
    }
    back(){
        if(this.actionIndex<0)return;

        this.actionHistory[this.actionIndex].back();
        this.actionIndex--;
    }
    forward(){
        if(this.actionIndex>=this.actionHistory.length-1)return;
        this.actionIndex++;
        this.actionHistory[this.actionIndex].forward();
    }
    clearForIndex(){
        if(this.actionIndex<this.actionHistory.length-1){
            this.actionHistory=this.actionHistory.slice(0,this.actionIndex+1);

        }
    }
    obj(){
        return this;
    }
}
export default ActionManager;