import Vector2 from "./Vector2";
class Bezier{
    constructor(p1,p2){
        this.first=p1;
        this.end=p2;
        this.getController();
    }
    getController(){
        let center=new Vector2().copy(this.first).add(this.end).multiply(0.5);
        let moveFirst=new Vector2().copy(this.first).sub(center).rotate(Math.PI/3);
        let moveEnd=new Vector2().copy(this.end).sub(center).rotate(Math.PI/3);
        this.c1=moveFirst.add(center);
        this.c2=moveEnd.add(center);
    }
}

export default Bezier;