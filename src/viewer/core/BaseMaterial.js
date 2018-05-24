import Vector2 from "../math/Vector2.js";
class BaseMaterial{
    constructor(position,sources){
        this.parent;
        this.sources=sources;
        this.position=position?position:new Vector2();
    }
    computerRealPosition(){
        if(!this.parent)return;
        return this.parent.computerRealPosition().add(this.position);
    }
   
}
export default BaseMaterial;