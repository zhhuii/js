window.addEventListener('load',function(){
    let can = document.querySelector('canvas');
    let shape = document.querySelectorAll('.shape>li');
    let save = document.querySelectorAll('.save>li');
    let color = document.querySelectorAll('.color>li');
    let input = document.querySelectorAll('input');
    let num = document.querySelector('input[type=number]');
    let zhe = document.querySelector('.zhe');
    let font=document.querySelector('.font');
    let opacity = document.querySelector('.opacity');
    let chai=document.querySelector('.chai');
    let cai=document.querySelector('.cai');
    let canvas = new Palette(can,zhe,opacity);
    shape.forEach(e=>{
        let type = e.id;
        e.onclick = function(){
            shape.forEach(obj=>{
                obj.classList.remove('hot');
            })
            e.classList.add('hot');
            if(type == 'poly' || type == 'polyj'){
                let ang = prompt('请输入边数或度数')
                canvas.draw(type,ang);
                canvas.zhe.style.display = 'none';
                canvas.opacity.style.display = 'none';
            }else{
                canvas.draw(type);
                if(type == 'pencil'){
                    canvas.pencil();
                }
                canvas.zhe.style.display = 'none';
                canvas.opacity.style.display = 'none';
            }
            if(type == 'eraser'){
                canvas[type]();
            }
        }
    })
    shape[0].onclick();
    color.forEach(e=>{
        let col = e.className;
            e.onclick = function() {
                color.forEach(obj=>{
                    obj.classList.remove('hot');
                })
                e.classList.add('hot');
                if (col == 'stroke') {
                    canvas.style = 'stroke';
                } else if (col == 'fill') {
                    canvas.style = 'fill';
                }
            }
    })
    color[0].onclick();
    input.forEach(e=>{
        e.onchange = function(){
            if(e.className == 'color1'){
                let co = e.value;
                canvas.strokeStyle = co;
            }else if(e.className == 'color2'){
                let co = e.value;
                canvas.fillStyle = co;
            }else if(e.className == 'color3'){
                let co = e.value;
                canvas.fillStyle = co;
            }
        }
    })
    num.onchange = function(){
        canvas.lineWidth =  num.value;
    }
    save.forEach(e=> {
        let id = e.id;
        e.onclick = function () {
            if (id == 'empty') {
                canvas.empty();
            }
        }
    })
    font.onclick=function(){
        font.classList.add('hot');
        canvas.zhe.style.display = 'none';
        canvas.opacity.style.display = 'block';
        canvas.font();
    }
    chai.onclick=function(){
        canvas.chai(cai);
    }
})