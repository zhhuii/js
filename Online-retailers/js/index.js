let section = document.querySelector('.banner');		//窗口
let ul = document.querySelector('.banner_father');					//长图
let lis = document.querySelectorAll('dd');
console.log(section,ul,lis);
//	console.log(section,ul);
let iw = section.offsetWidth;							//令iw = 窗口的宽度/一屏的宽
let sx,dirx;											//声明sx,dirx因为下面move要用，所以设置为全局变量
ul.innerHTML += ul.innerHTML;							//图片的数量翻一倍
ul.style.width = iw * ul.childElementCount + 'px';		//调整imgbox的宽度
section.addEventListener('touchstart',function(e){		//给窗口添加触摸事件
    ul.style.transition = 'none';						//让transition设置为空
    let event = e.changedTouches[0];					//触摸手指，默认1个
    sx = event.pageX;									//令sx = 当前手指距离页面(或者screenX距离屏幕)的距离。手指位置
    dirx = ul.offsetLeft;								//令dirx = imgbox距离屏幕左边的距离。ul位置
    // console.log(event,sx,dirx);
    if(dirx / iw == 0){									//用dirx / iw(表示滑动了多少个img)=0,代表第一张再往右滑
        ul.style.left = -lis.length * iw + 'px';					//设置imgbox距离窗口左边的距离，调到第6张
    }else if(dirx / iw == -ul.childElementCount+1){							//如果dirx / iw = -9,代表最后一张再往左滑
        ul.style.left = (-lis.length+1) * iw + 'px';					//设置imgbox距离窗口左边的距离，调到第5张
    }
    dirx = ul.offsetLeft;								//更新一下地址，因为判断的时候位置发生变化
//		console.log(iw,sx,dirx);
//		console.log(ul.childElementCount);
},false);
section.addEventListener('touchmove',function(e){		//添加触摸移动事件
    let event = e.changedTouches[0];					//触摸手指，默认1个
    let mx = event.pageX;								//令mx = 移动之后手指距离页面左边的距离
//		console.log(sx);
    ul.style.left = dirx + (mx - sx) + 'px';			//设置imgbox距离窗口左边的距离，
},false);
section.addEventListener('touchend',function(e){        //添加触摸离开事件
    let event = e.changedTouches[0];					//触摸手指，默认1个
    let num = Math.round(ul.offsetLeft / iw);			//令num = 偏移了多少张图片(四舍五入)
    lis.forEach(ele => {								//遍历圆点
        ele.classList.remove('active');					//删除所有效果
    });
    lis[(-num % 5)].classList.add('active');			//给当前圆点添加颜色
    ul.style.transition = 'all ease .5s';				//图片加过渡
    ul.style.left = num * iw + 'px';					//图片加偏移量
});

let navz = document.querySelector(".navz");
let nav = document.querySelector(".nav");
let jw = navz.offsetWidth;
let sy,diry;
navz.addEventListener('touchstart',function (e) {
    let event = e.changedTouches[0];
    sy = event.pageX;
    diry = nav.offsetLeft;
},false);
navz.addEventListener('touchmove',function (e) {
    let event = e.changedTouches[0];
    let mx = event.pageX;
    nav.style.left = diry + (mx - sy) + 'px';
},false);
navz.addEventListener('touchend',function (e) {
    nav.style.left = nav + jw + 'px';
});