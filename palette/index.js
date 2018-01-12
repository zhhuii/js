window.addEventListener('load',function(){
	let canvas = document.querySelector('canvas');
	let tool = document.querySelectorAll('.tool>li');
	let shape = document.querySelectorAll('.shape>li');
	let style = document.querySelectorAll('.styleBtn');
	let color = document.querySelectorAll('input[type=color]');
	let lineWidth = document.querySelectorAll('input[type=number]');
	let operate = document.querySelectorAll('.operate>li');
	let era = document.querySelector('.mask');
    let opacity = document.querySelector('.opacity');
    let clip = document.querySelector('.clip');
    let save = document.querySelector('a');
	let palette = null;
	let history = [];
	let flag = false;
	operate.forEach(e => {
		let type = e.id;
		e.onclick = function(){
			if(type == 'newc'){
				let cw  = parseInt(prompt('请输入画板宽度'));
                let ch = parseInt(prompt('请输入画板高度'));
                canvas = document.createElement('canvas');
                canvas.width = cw;
                canvas.height = ch;
                canvas.className = 'canvas';
                document.querySelector('section').appendChild(canvas);
                palette = new Palette(opacity,canvas);
                flag = true;
			}else{
				if(!flag){return};
				palette[type]();
			}
		}
	})
	save.onclick = function(){
		let data = canvas.toDataURL('image/png');
		save.href = data;
		save.download = '1.png';
	}		
	tool.forEach(e => {
		let type = e.id;
		e.onclick = function(){
			tool.forEach(obj => obj.classList.remove('active'));
			this.classList.add('active');
			if(type == 'eraser'){
				if(!flag){return};
				let ew = prompt('请输入橡皮尺寸');
				era.style.width = ew+'px';
				era.style.height = ew+'px';
				palette.eraser(ew);
			}else if(type == 'clipBtn'){
				if(!flag){return};
				palette.clip(clip);
			}else{
				if(!flag){return};
				palette[type]();
			}
		}
	})

	shape.forEach(e => {
		let type = e.id;
		e.onclick = function(){
			shape.forEach(obj => obj.classList.remove('active'));
			this.classList.add('active');
			if(type == 'poly' || type == 'polygon'){
				if(!flag){return};
				let ask = prompt('请输入边数或角数');
				palette.draw(type,ask);
			}else if(type == 'pencil'){
				if(!flag){return};
				palette[type]();
			}else{
				if(!flag){return};
				palette.draw(type);
			}
		}
	})
	shape[0].onclick();

	style.forEach(e => {
		e.onclick = function(){
			style.forEach(obj => obj.classList.remove('active'));
			this.classList.add('active');
			if(!flag){return};
   			palette.style = this.id;
		}
	})
	style[0].onclick();
    color.forEach(e=>{
        e.onchange = function(){
        	if(!flag){return};
            palette[this.id] = this.value;
        }
    })
    lineWidth.forEach(e=>{
        e.onchange = function(){
            if(!flag){return};
            palette[this.id] = this.value;
        }
    })
})
