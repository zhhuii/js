class Palette{
    constructor(canvas,zhe,opacity){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.cw = this.canvas.width;
        this.ch = this.canvas.height;
        this.history = [];
        this.style = 'stroke';
        this.fillStyle = '#000000';
        this.strokeStyle = '#000000';
        this.zhe = zhe;
        this.opacity = opacity;
        this.lineWidth = 1;
        this.chu=this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
        this.lin=null;
    }
    _style(){
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.lineWidth = this.lineWidth;
    }
    draw(type,ang){
        let that = this;
        that.canvas.onmousedown = function(e){
            let ox = e.offsetX, oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                let cx = e.offsetX, cy = e.offsetY;
                that.ctx.clearRect(0,0,that.cw,that.ch);
                that._style();
                that.ctx.beginPath();
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }

                that[type](ox,oy,cx,cy,ang);
                that.ctx.closePath();
                that.ctx[that.style]();
            }
            that.canvas.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
        this.z();
    }
    line(ox,oy,cx,cy){
        this.ctx.moveTo(ox,oy);
        this.ctx.lineTo(cx,cy);
        this.ctx.stroke();
    }
    circle(ox,oy,cx,cy){
        let r = Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
        this.ctx.arc(ox,oy,r,0,Math.PI*2);
    }
    pencil(){
        let that = this;
        that.canvas.onmousedown = function(){
            that._style();
            that.ctx.beginPath()
            that.canvas.onmousemove = function (e) {
                let cx = e.offsetX;
                let cy = e.offsetY;
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }
                that.ctx.lineTo(cx,cy);
                that.ctx.stroke();
            }
            that.canvas.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
        that.z();
    }
    rect(ox,oy,cx,cy){
        this.ctx.rect(ox,oy,cx-ox,cy-oy);
        this.ctx[this.style]();
    }
    poly(ox,oy,cx,cy,ang){
                let r = Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
                let a = 2 * Math.PI / ang;
                this.ctx.moveTo(ox+r,oy);
                for(let i = 0;i < ang;i++){
                    let x = ox + r * Math.cos(a * i);
                    let y = oy + r * Math.sin(a * i);
                    this.ctx.lineTo(x,y);
                }
                this.ctx.closePath();
    }
    polyj(ox,oy,cx,cy,ang){
        let R = Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
        let a = Math.PI / ang;
        this.ctx.moveTo(ox+R,oy);
        for(let i = 0;i < ang*2;i++){
            let x,y;
            if(i%2==0){
                x = ox + R * Math.cos(a * i);
                y = oy + R * Math.sin(a * i);
            }else{
                x = ox + R/3 * Math.cos(a * i);
                y = oy + R/3 * Math.sin(a * i);

            }
            this.ctx.lineTo(x,y);
        }
    }
    z(){
        let that = this;
        window.onkeydown=function(e){
            if(e.ctrlKey && e.key == 'z'){

                    that.history.pop();

                    if(that.history.length > 0){
                        that.ctx.putImageData(that.history[that.history.length-1],0,0)

                    }else{

                    that.ctx.clearRect(0,0,that.cw,that.ch)
                    }
                }   
        }
    }
    dash(ox,oy,cx,cy){
        this.ctx.setLineDash([5,5]);   
        this.ctx.moveTo(ox,oy);
        this.ctx.lineTo(cx,cy);
        this.ctx.setLineDash([0,0])
    }
    eraser(){
        let that = this;
        that.zhe.style.display = 'block';
        that.opacity.style.display = 'block';
        let maxH = that.opacity.offsetHeight -that.zhe.offsetHeight;
        let maxW = that.opacity.offsetWidth - that.zhe.offsetWidth;
        that.opacity.onmousedown=function(){

            that.opacity.onmousemove = function(e){
                let zw = that.zhe.offsetWidth;
                let zh = that.zhe.offsetHeight;
                let ex = e.offsetX - zw/2;
                let ey = e.offsetY - zh/2;
                if(ex >= maxW){
                    ex = maxW;
                }
                if(ey >= maxH){
                    ey = maxH;
                }
                if(ex <= 0){
                    ex = 0;
                }
                if(ey <= 0){
                    ey =0;
                }
                that.zhe.style.top = ey+ 'px';
                that.zhe.style.left = ex+ 'px';
                that.ctx.clearRect(ex,ey,zw,zh)
            }
            that.opacity.onmouseup = function(){
                
                that.opacity.onmousedown = null;
                that.opacity.onmouseup = null;
                that.opacity.onmousemove=null;
               that.zhe.style.display = 'none';
               that.opacity.style.display = 'none';
               that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
            }
        }
    }
    empty(){
        let that=this;
        if(that.history.length==0){
            window.onclick=null;
        }else{
           window.onclick=function(ee){
                if(ee.target.id=='empty'){
                    that.history.pop();

                    if(that.history.length > 0){
                        that.ctx.putImageData(that.history[that.history.length-1],0,0)

                    }else{

                    that.ctx.clearRect(0,0,that.cw,that.ch);
                    window.onclick=null;
                    }
                }
              
            } 
        }
    }
    font(){
        this.opacity.onmousedown=function(e){
            let ox = e.offsetX, oy = e.offsetY;
            let input=document.createElement('input');
            input.style.cssText=`
            width:100px;
            height:30px;
            padding:3px;
            border: 1px solid #c0c0c0;
            position: absolute;
            left:${ox}px;
            top:${oy}px;
            z-index: 10;
            `
            this.opacity.appendChild(input);
            this.opacity.onmousedown=null;
            input.onblur=function(){
                let l=input.offsetLeft,t=input.offsetTop;
                let v=input.value;
                this.opacity.removeChild(input);
                this.ctx.font="20px Georgia";
                this.ctx.textAlign='center';
                this.ctx.fillStyle = this.fillStyle;
                this.ctx.fillText(v, l,t);
                this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
            }.bind(this);
            input.onmousedown=function(e){
                let ox=e.clientX,oy=e.clientY;
                let l=input.offsetLeft,t=input.offsetTop;
                this.opacity.onmousemove=function(e){
                    let mx=e.clientX,my=e.clientY;
                    let lefts=l+(mx-ox),tops=t+(my-oy);
                    if(lefts<0){
                        lefts=0
                    }
                    if(tops<0){
                        tops=0;
                    }
                    if(lefts>this.opacity.offsetWidth-input.offsetWidth){
                        lefts=this.opacity.offsetWidth-input.offsetWidth
                    }
                    if(tops>this.opacity.offsetHeight-input.offsetHeight){
                        tops=this.opacity.offsetHeight-input.offsetHeight
                    }
                    input.style.left=lefts+'px';
                    input.style.top=tops+'px';
                }.bind(this);
                input.onmouseup=function(){
                    input.onmousedown=null;
                    this.opacity.onmousemove=null;
                    input.onmouseup=null;
                }.bind(this);
            }.bind(this);
        }.bind(this);
    }
    chai(cai){
        let that=this;
        that.canvas.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY,w,h,max,may;
            cai.style.display='block';
            cai.style.left=ox+'px';
            cai.style.top=oy+'px';
            that.canvas.onmousemove=function(e){
                let mx=e.offsetX,my=e.offsetY;
                w=Math.abs(mx-ox);
                h=Math.abs(my-oy);
                max=mx>ox?ox:mx;
                may=my>oy?oy:my;
                cai.style.left=max+'px';
                cai.style.top=may+'px';
                cai.style.width=w+'px';
                cai.style.height=h+'px';
            }
            cai.onmouseup=function(){
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
                that.canvas.onmousedown=null;
                that.lin=that.ctx.getImageData(max,may,w,h);
                that.ctx.clearRect(max,may,w,h);
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.ctx.putImageData(that.lin,max,may);
                that.drag(cai,max,may);
            }
        }
    }
    drag(cai,max,may){
        let that=this;
        cai.onmousedown=function(e){
            let ox=e. clientX,oy=e.clientY;
            cai.onmousemove=function(e){
                let mx=e. clientX,my=e.clientY;
                cai.style.left=max+(mx-ox)+'px';
                cai.style.top=may+(my-oy)+'px';
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);

                    }
                that.ctx.putImageData(that.lin,max+(mx-ox),may+(my-oy));
            }
            cai.onmouseup=function(){
                cai.onmousedown=null;
                cai.onmousemove=null;
                cai.onmouseup=null;
                cai.style.left=0;
                cai.style.top=0;
                cai.style.width=0;
                cai.style.height=0;
                cai.style.display='none';
            }
        }
    }
}