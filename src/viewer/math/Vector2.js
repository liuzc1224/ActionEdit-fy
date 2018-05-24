class Vector2{
    constructor(x,y){
        this.x=x?x:0;
        this.y=y?y:0;
    }
    set(x,y){
        this.x=x?x:0;
        this.y=y?y:0;
    }
    copy(s){
        this.x=s.x;
        this.y=s.y;
        return this;
    }
    add(v){
        this.x+=v.x;
        this.y+=v.y;
        return this;
    }
    clone(){
        return new Vector2(this.x,this.y);
    }
    sub(v){
        this.x-=v.x;
        this.y-=v.y;
        return this;
    }
    multiply(s){
        this.x*=s;
        this.y*=s;
        return this;
    }
    rotate(a){
        let sinA=Math.sin(a);
        let cosA=Math.cos(a);
        this.x=this.x*cosA-this.y*sinA;
        this.y= this.x*sinA+this.y*cosA;
        return this;
    }
}
export default Vector2;