//this class learn from potree.js
import EventDispatcher from "./EventDispatcher";
import Vector2 from "../math/Vector2";
class InputHandler extends EventDispatcher{
    constructor(domElement){
        super();
        this.domElement=domElement;
        this.inputListeners = [];
        this.mouse = new Vector2(0, 0);
        // console.log(this.domElement.tabIndex);
        if (this.domElement.tabIndex === -1) {
            this.domElement.tabIndex =2222;
        }
        // console.log(this.domElement.tabIndex);

        this.domElement.ondragover=this.onDragover;
        this.domElement.ondrop= this.onDrop.bind(this);
        this.domElement.addEventListener('click', this.onMouseClick.bind(this), false);
        this.domElement.addEventListener('mousedown', this.onMouseDown.bind(this), false);
        this.domElement.addEventListener('mouseup', this.onMouseUp.bind(this), false);
        this.domElement.addEventListener('mousemove', this.onMouseMove.bind(this), false);

        this.domElement.addEventListener('keydown', this.onKeyDown.bind(this),false);
        this.domElement.addEventListener('dblclick', this.onDblClick.bind(this), false);
        this.domElement.addEventListener('contextmenu', this.onDContextMenu.bind(this), false);
    }
    addInputListener (listener) {
        this.inputListeners.push(listener);
    }
    removeInputListener (listener) {
        this.inputListeners = this.inputListeners.filter(e => e !== listener);
    }
    onMouseClick(e){
    }
    onDragover(e){
        e.preventDefault();

    }
    onKeyDown(e){

        //e.preventDefault();
        for (let inputListener of this.inputListeners) {
            inputListener.dispatchEvent({
                type: 'keydown',

                e: e
            });
        }
    }
    onDContextMenu(e){
        e.preventDefault();
        this.domElement.focus();
        for (let inputListener of this.inputListeners) {
            inputListener.dispatchEvent({
                type: 'contextmenu',
                mouse: this.mouse
            });
        }
	}
    onDblClick(e){
        e.preventDefault();
        this.domElement.focus();
        for (let inputListener of this.inputListeners) {
            inputListener.dispatchEvent({
                type: 'dblclick',
                mouse: this.mouse
            });
        }
    }
    onDrop(e){
        e.preventDefault();
        let rect = this.domElement.getBoundingClientRect();
        let x = e.clientX - rect.left-this.domElement.clientWidth/2;
        let y = e.clientY - rect.top-this.domElement.clientHeight/2;
        this.mouse.set(x, y);
        for (let inputListener of this.inputListeners) {
            inputListener.dispatchEvent({
                type: 'domdrop',
                source: e,
                mouse: this.mouse

            });
        }
    }
    onMouseDown(e){
        e.preventDefault();
        this.domElement.focus();
        for (let inputListener of this.inputListeners) {
            inputListener.dispatchEvent({
                type: 'mousedown',

                mouse: this.mouse
            });
        }
    }
    onMouseUp(e){
        e.preventDefault();
        for (let inputListener of this.inputListeners) {
            inputListener.dispatchEvent({
                type: 'mouseup',

                mouse: this.mouse
            });
        }
        if (this.drag) {
            if (this.drag.object) {

                this.drag.object.dispatchEvent({
                    type: 'drop',
                    drag: this.drag
                });
            } else {
                for (let inputListener of this.inputListeners) {
                    inputListener.dispatchEvent({
                        type: 'drop',
                        drag: this.drag
                    });
                }
            }

            this.drag = null;
        }
    }
    onMouseMove(e){
        e.preventDefault();
        let rect = this.domElement.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        this.mouse.set(x, y);

        if (this.drag) {
            this.drag.mouse = e.buttons;
            this.drag.lastDrag.x = x - this.drag.end.x;
            this.drag.lastDrag.y = y - this.drag.end.y;
            this.drag.end.set(x, y);
            if (this.drag.object) {

                this.drag.object.dispatchEvent({
                    type: 'drag',
                    drag: this.drag
                });
            } else {

                let dragConsumed = false;
                for (let inputListener of this.inputListeners ){
                    inputListener.dispatchEvent({
                        type: 'drag',
                        drag: this.drag
                    });

                }
            }
        }
    }
    startDragging (object, offset) {
        this.drag = {
            start: this.mouse.clone(),
            end: this.mouse.clone(),
            lastDrag: new Vector2(0, 0),
            offset:offset,
            object: object
        };
    }
}
export default InputHandler;