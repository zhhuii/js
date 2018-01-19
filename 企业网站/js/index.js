window.onload=function() {
    let nav = document.querySelector('nav');
    let bos = document.querySelector('.nav-img');
    let box = document.querySelectorAll('.nav-img > li');
    let dian = document.querySelectorAll('.nav-dian > li');
    let zuojiantou = document.querySelector('.nav-left');
    let youjiantou = document.querySelector('.nav-right');
    let now=0;
    let next=0;
    let t=setInterval(lunbo,3000);
    let flag=true;
    let imgW=parseInt(window.getComputedStyle(nav,null).width);
    let headxh1=document.querySelector('.headxh1');
    let headxh2=document.querySelector('.headxh2');
    let headxh3=document.querySelector('.headxh3');
    let kecheng=document.querySelector('.kecheng');
    let about=document.querySelector('.about');
    let zhishi=document.querySelector('.zhishi');
    let main = document.querySelector('main');
    let mainbottom=document.querySelector('.main-bottom');
    let count = mainbottom.childElementCount;
    let widths = mainbottom.firstElementChild.offsetWidth;
    let rights = parseInt(getComputedStyle(mainbottom.firstElementChild,null).marginRight);
    let mainli=mainbottom.querySelectorAll('li');
    let mainliw=mainbottom.querySelector('li').offsetWidth;
    let maindianli=document.querySelector('.main-dian>li');
    let mainleft=document.querySelector('.main-left');
    let mainright=document.querySelector('.main-right');
    let num = 0;
    //头部选项卡
    kecheng.onmouseover=function(){
        headxh1.style.display='block';
    };
    kecheng.onmouseout=function(){
        headxh1.style.display='none';
    };
    about.onmouseover=function(){
        headxh2.style.display='block';
    };
    about.onmouseout=function(){
        headxh2.style.display='none';
    };
    zhishi.onmouseover=function(){
        headxh3.style.display='block';
    };
    zhishi.onmouseout=function(){
        headxh3.style.display='none';
    };
    for(let i =1;i <box.length;i++){
        box[i].style.left = 1810 +'px';
    }
    //banner轮播
    function lunbo(type){
        type = type || 'you';
        if(type == 'you'){
            next++;
            if(next == box.length){
                next = 0;
            }
            box[next].style.left = 1810 +'px';
            animate(box[now],{left:-1810},function(){
                flag = true;
            });
        }else if(type == 'zuo'){
            next--;
            if(next == -1){
                next = box.length-1;
            }
            box[next].style.left = -1810 +'px';
            animate(box[now],{left:1810},function(){
                flag = true;
            });
        }
        box[now].style.left = 0 +'px';
        animate(box[next],{left:0},function(){
            flag = true;
        });
        now = next;
        for(let k =0;k <box.length;k++){
            dian[k].style.background = '#fff';
        };
        dian[now].style.backgroundColor = 'rgba(0,0,0,0.4)';
    };
    bos.onmouseover = function(){
        clearInterval(t);
    };
    bos.onmouseout = function(){
        t = setInterval(lunbo,3000);
    };
    dian.forEach(function(ele,index){
        ele.aa = index;
        ele.addEventListener('mouseover',function(){
            clearInterval(t);
            box[next].style.left = 1810 +'px';
            box[now].style.left = 0 +'px';
            if(this.aa > now){
                next = this.aa -1;
                if(flag){
                    lunbo('you');
                    flag = false;
                }
            }else if(this.aa < now){
                next = this.aa +1;
                if(flag){
                    lunbo('zuo');
                    flag = false;
                }
            }
        })
    });
    zuojiantou.onclick = function () {
        if(flag){
            lunbo('you');
            flag = false;
        }

    };
    youjiantou.onclick = function () {
        if(flag){
            lunbo('zuo');
            flag = false;
        }
    };

//    健身器材轮播
    mainleft.onclick = function(){
        if(num <= 0){
            return;
        }
        num--;
        mainbottom.style.transform = `translateX(${-1160*num}px)`;
        console.log(num)
    };
    mainright.onclick = function(){
        if(num >= 2){
            return;
        }
        num++;
        mainbottom.style.transform = `translateX(${-1160*num}px)`;
        console.log(num)
    };
}