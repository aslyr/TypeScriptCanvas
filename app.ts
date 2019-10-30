


window.onload = () => {
    var el = document.getElementById('content');
    var canvasById = document.getElementById('mycanvas');
    let myCanvas = new Canvas(<HTMLCanvasElement>canvasById)
    myCanvas.show()



};
class Canvas {
    element: HTMLCanvasElement;
    constructor(element:HTMLCanvasElement) {
        this.element=element

    }
    show() {
        var ctx = this.element.getContext('2d');
        ctx.fillStyle = "#ff4c41";
        ctx.fillRect(0, 0, this.element.width, this.element.height);
        let height=this.element.height
        let width=this.element.width

        Util.captureMouse(this.element)
        function drawFrame(ele:HTMLElement) {
            function drawFrameInner(){
                window.requestAnimationFrame(drawFrameInner)
                ctx.clearRect(0,0,width,height)

                var dx=Util.mouse.x-width/2
                var dy=Util.mouse.y-height/2
                let rotation=Math.atan2(dy,dx)
                let arrow=new Arrow(width/2,height/2,"yellow",rotation)
                arrow.draw(ctx)
            }
            drawFrameInner()
        }

        drawFrame(this.element)

    }
}
interface IArrow {
    x:number
    y:number
    color:string
    rotation:number
}
class Arrow implements IArrow{
    color: string;
    rotation: number;
    x: number;
    y: number;
    draw(content:CanvasRenderingContext2D){
        content.save()
        content.translate(this.x,this.y)
        content.rotate(this.rotation)
        content.lineWidth=2
        content.fillStyle=this.color
        content.beginPath()
        content.moveTo(-50,-25)
        content.moveTo(0,-25)
        content.lineTo(0,-50)
        content.lineTo(50,0)
        content.lineTo(0,50)
        content.lineTo(0,25)
        content.lineTo(-50,25)
        content.lineTo(-50,-25)
        content.closePath()
        content.fill()
        content.stroke()
        content.restore()
    }
    constructor(x:number=0,y:number=0,color:string="#eeee",rotation:number=0){
        this.x=x
        this.y=y
        this.color=color
        this.rotation=rotation
    }

}
interface Point {
    x:number
    y:number
}
class Util {
    static mouse={
        x:0,
        y:0
    }
    static captureMouse(element:HTMLElement) {

        element.addEventListener('mousemove',(ev) => {
            if (ev.offsetX){
               this.mouse={
                    x:ev.offsetX,
                   y:ev.offsetY
               }
            }


        })


    }
    static captureTouch(element:HTMLElement) {
        let touch:{x?:number,y?:number,isPressed?:boolean}={
            x:null,
            y:null,
            isPressed:false
        }
        element.addEventListener('touchstart',(ev) => {
           touch.isPressed=true
            console.log(touch)
            console.log(ev.targetTouches.length)
        })
        element.addEventListener('touchend',(ev) => {
            touch.isPressed=false
            touch.x=null
            touch.y=null
            console.log(touch)
        })
        element.addEventListener('touchmove',(ev) => {
            var x,y
            let touch_event=ev.touches[0]
            touch.x=touch_event.pageX-element.offsetLeft
            touch.y=touch_event.pageY-element.offsetTop
            console.log(touch)
        })

        return touch


    }


}


