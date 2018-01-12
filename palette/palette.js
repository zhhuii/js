/*
Palette画板
属性
    canvas、ctx、线宽、描边样式、填充样式、端点样式、几角、几边
方法
    画线、圆、矩形、多边形、多角形
*/
class Palette{
    constructor(opacity,canvas){
        this.opacity = opacity;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.cw = this.canvas.width;
        this.ch = this.canvas.height;

        this.history = [];
        this.temp = [];
        this.lineWidth = 1;

        this.style = 'stroke';
        this.fillStyle = '#000';
        this.strokeStyle = '#000';
    }
    //初始样式
    _init(){
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.fillStyle = this.fillStyle;
    }
    //保存
    //撤销
    revocation(){
        let that = this;
        let back = document.querySelector('#revocation');
        back.onclick = function(){
            if(that.history.length > 0){
                let data = that.history.pop();
                that.ctx.putImageData(data, 0, 0)
            }else{
                that.ctx.clearRect(0, 0, that.cw, that.ch);
            }
        }
        document.onkeydown = function(e){
            if(e.ctrlKey && e.key == 'z'){
                if(that.history.length > 0){
                    let data = that.history.pop();
                    that.ctx.putImageData(data, 0, 0)
                }else{
                    that.ctx.clearRect(0, 0, that.cw, that.ch);
                }
            };
        };
        document.onkeydown = function(e){
            if(e.ctrlKey && e.key == 'z'){
                if(that.history.length > 0){
                    let data = that.history.pop();
                    that.ctx.putImageData(data, 0, 0)
                }else{
                    that.ctx.clearRect(0, 0, that.cw, that.ch);
                }
            };
        };
        this.history.push(this.ctx.getImageData(0, 0,this.cw,this.ch));
    }
    //清空
    clear(){
        this.ctx.clearRect(0, 0, this.cw, this.ch);
        this.history.push(this.ctx.getImageData(0, 0,this.cw,this.ch));
    }
    //铅笔
    pencil(){
        let that = this;
        let era = document.querySelector('.mask');
        era.style.display = 'none';
        that.opacity.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that._init();
            that.ctx.beginPath();
            that.ctx.moveTo(ox, oy);
            that.opacity.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                that.ctx.lineTo(mx, my);
                that.ctx.stroke();
            }
            that.opacity.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0, 0,that.cw,that.ch));
                that.opacity.onmousemove = null;
                that.opacity.onmouseup = null;
            }
        }
        that.revocation();
    }
    //橡皮
    eraser(ew){
        let that = this;
        let era = document.querySelector('.mask');
        era.style.display = 'block';
        that.opacity.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offseY;
            let ew = era.offsetWidth,eh = era.offsetHeight;
            let maxW = e.offsetWidth - era.offsetWidth;
            let maxH = e.offsetHeight - era.offsetHeight;
            that.opacity.onmousemove = function(e){
                let lefts = e.offsetX - ew/2;
                let tops = e.offsetY - eh/2;
                if(lefts >= maxW){
                    lefts = maxW;
                }
                if(tops >= maxH){
                    tops = maxH;
                }
                if(lefts <= 0){
                    lefts = 0;
                }
                if(tops <= 0){
                    tops = 0;
                }
                era.style.left = lefts+ 'px';
                era.style.top = tops+ 'px';
                that.ctx.clearRect(lefts,tops,ew,eh);
            }
            that.opacity.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0, 0,that.cw,that.ch));
                that.opacity.onmousemove = null;
                that.opacity.onmouseup = null;
            }
        }
        that.revocation();
    }
    //文字
    word(){
        this.opacity.onmousedown = function(e){
            //输入内容
            this.opacity.onmousedown = null;
            let ox = e.offsetX,oy = e.offsetY;
            this._init();
            let inputs = document.createElement('input');
            inputs.style.cssText = `
                width:100px;
                height:30px;
                padding:5px 2px;
                border-radius:3px;
                border:1px dashed skyblue;
                position: absolute;;
                left:${ox}px;
                top:${oy}px;
            `;
            inputs.autofouces = true;
            this.opacity.appendChild(inputs);
            inputs.onblur = function(){
                let ox = inputs.offsetLeft,oy = inputs.offsetTop;
                let v = inputs.value;
                inputs.value = null;
                this.ctx.font = '100px';
                this.ctx.fillText(v, ox, oy);
                this.opacity.removeChild(inputs);

            }.bind(this);
            //拖拽
            inputs.onmousedown = function(e){
                let ox = e.clientX,oy = e.clientY;
                let inputsl = inputs.offsetLeft,inputst = inputs.offsetTop;
                this.opacity.onmousemove = function(e){
                    let mx = e.clientX,my = e.clientY;
                    let lefts = inputsl + mx - ox;
                    let tops = inputst + my - oy;
                    if(lefts <= 0){
                        lefts = 0;
                    }
                    if(lefts >= this.cw - 100){
                        lefts = this.cw - 100;
                    }
                    if(tops <= 0){
                        tops = 0;
                    }
                    if(tops >= this.ch - 30){
                        tops = this.ch - 30;
                    }
                    inputs.style.left = lefts + 'px';
                    inputs.style.top = tops + 'px';
                }.bind(this);
                inputs.onmouseup = function(){
                    this.opacity.onmousemove = null;
                    inputs.onmouseup = null; 
                }.bind(this);
            }.bind(this);
        }.bind(this);
        this.revocation();
    }
    //裁切
    clip(clip){
        let that = this;
        let cut = document.querySelector('.clip');
        that.opacity.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            let boxw,boxh,minx,miny;
            cut.style.display = 'block';
            cut.left = ox + 'px';
            cut.top = oy + 'px';
            //裁切框方向选择
            that.opacity.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                //移动距离
                boxw = Math.abs(mx - ox);boxh = Math.abs(my - oy);
                //解决反向画选取方向问题问题：选择较小的点是左上角点
                minx = ox <= mx ? ox : mx;miny = oy <= my ? oy : my;
                //位置
                cut.style.left =  minx + 'px';
                cut.style.top =  miny + 'px';
                //尺寸
                cut.style.width =  boxw + 'px';
                cut.style.height =  boxh + 'px';
            }
            that.opacity.onmouseup = function(){
                that.opacity.onmousemove = null;
                that.opacity.onmouseup = null;
                that.temp = that.ctx.getImageData(minx, miny, boxw, boxh);
                that.ctx.clearRect(minx, miny, boxw, boxh);
                that.history.push(that.ctx.getImageData(0, 0, that.cw, that.ch))
                that.ctx.putImageData(that.temp, minx, miny);
                that.drag(clip,minx,miny);
            }
        }
        that.revocation();
    }
    //裁切拖拽
    drag(obj,minx,miny){
        let that = this;
        that.opacity.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.opacity.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                let lefts = minx + mx - ox;
                let tops = miny + my - oy;
                obj.style.left = lefts + 'px';
                obj.style.top = tops + 'px';
                that.ctx.clearRect(0, 0, that.cw, that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0)
                }
                that.ctx.putImageData(that.temp, lefts, tops);
            }
            that.opacity.onmouseup = function(){
                that.opacity.onmousedown = null;
                that.opacity.onmousemove = null;
                that.opacity.onmouseup = null;
                obj.style.display = 'none';
                that.history.push(that.ctx.getImageData(0, 0, that.cw, that.ch))
            }
        }
        that.revocation();
    }
    line(ox,oy,mx,my){
        this.ctx.beginPath();
        this.ctx.moveTo(ox, oy);
        this.ctx.lineTo(mx, my);
        this.ctx.stroke();
    }
    dotted(ox,oy,mx,my){
        this.ctx.setLineDash([5,18]);
        this.ctx.beginPath();
        this.ctx.moveTo(ox, oy);
        this.ctx.lineTo(mx, my);
        this.ctx.stroke();
        this.ctx.setLineDash([0,0]);
    }
    rect(ox,oy,mx,my){
        this.ctx.beginPath();
        this.ctx.rect(ox,oy,mx-ox,my-oy);
        this.ctx[this.style]();
    }
    circle(ox,oy,mx,my){
        let radius = Math.sqrt(Math.pow(ox-mx,2)+Math.pow(oy-my,2));
        this.ctx.beginPath();
        this.ctx.arc(ox, oy, radius, 0, Math.PI*2);
        this.ctx[this.style]();           
    }
    poly(ox,oy,mx,my,ask){
        let radius = Math.sqrt(Math.pow(ox-mx,2) + Math.pow(oy-my,2));
        let deg = 2 * Math.PI / ask;
        this.ctx.beginPath();
        this.ctx.moveTo(ox + radius, oy);
        for(let i = 0;i < ask;i++){
            let x = ox + radius*Math.cos(deg*i);
            let y = oy + radius*Math.sin(deg*i);
            this.ctx.lineTo(x,y);
        }
        this.ctx.closePath();
        this.ctx[this.style]();
    }
    polygon(ox,oy,mx,my,ask){
        let radius = Math.sqrt(Math.pow(ox-mx,2) + Math.pow(oy-my,2));
        let radius1 = radius/3;
        let deg = Math.PI / ask
        this.ctx.beginPath();
        this.ctx.moveTo(ox + radius, oy);
        for(let i = 0;i < ask * 2;i++){
            let x,y;
            if(i % 2 == 0){
                x = ox + radius * Math.cos(deg*i);
                y = oy + radius * Math.sin(deg*i);
            }else{
                x = ox + radius1 * Math.cos(deg*i);
                y = oy + radius1 * Math.sin(deg*i);
            }
            this.ctx.lineTo(x,y);
        }
        this.ctx.closePath();
        this.ctx[this.style]();
    }
    draw(type,ask){
        let that = this;
        let era = document.querySelector('.mask');
        era.style.display = 'none';
        that.opacity.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.opacity.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                that._init();
                that[type](ox,oy,mx,my,ask);
            }
            that.opacity.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0, 0,that.cw,that.ch));
                that.opacity.onmousemove = null;
                that.opacity.onmouseup = null;
            }
        }
        that.revocation();
    }
}