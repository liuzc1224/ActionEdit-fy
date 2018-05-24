import BaseMaterial from "../core/BaseMaterial.js";
class TextMaterial extends BaseMaterial{
    constructor(position,text,font){
        super(position);
        this.type="text";
        this.text=text;
        this.maxWidth;
        this.color="black";
        this.font =font?font:"48px serif";
    }
    draw(ctx){
        if(!this.parent)return;
        if(!this.text)return;
        let position=this.computerRealPosition();
        ctx.beginPath();
        ctx.font = this.font;
        ctx.fillStyle=this.color;
        ctx.fillText(this.text, position.x,position.y);
    }
}
export default TextMaterial;