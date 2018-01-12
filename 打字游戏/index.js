class  Code{
	constructor(){
		this.char=[['A','img/A.png'],['B','img/B.png'],['C','img/C.png'],['D','img/D.png'],['E','img/E.png'],
        ['F','img/F.png'],['J','img/J.png'],['H','img/H.png'],['I','img/I.png'],['G','img/G.png'],['K','img/K.png'],
        ['L','img/L.png'],['M','img/M.png'],['N','img/N.png'],['O','img/O.png'],['P','img/P.png'],['Q','img/Q.png'],
        ['R','img/R.png'],['S','img/S.png'],['T','img/T.png'],['U','img/U.png'],['V','img/V.png'],['W','img/W.png']];
		this.length=5;
		this.current = [];
        this.fen=document.querySelector('.fenshu>span');
        this.sheng=document.querySelector('.shengming>span');
        this.shu=0;
        this.gq=5;
        this.position=[];

	}
	   start(){
        this.getChars(this.length);
        this.drop();
        this.keys();
    }
    getChars(length){
        for(let i = 0;i < length;i++){
            this.getChar();
        }
    }
    quchong(char){
        return this.current.some(ele=>ele.innerText==char);
    }
    chongdie(pos){
        return this.position.some(ele=>Math.abs(ele-pos)<50)
    }
    getChar(){
        let num = Math.floor(Math.random()*this.char.length);
        do{
            num = Math.floor(Math.random()*this.char.length);
        }while(this.quchong(this.char[num][0]));
        let divs = document.createElement('div'),
        tops = Math.floor(Math.random()*100),
        lefts = Math.floor((window.innerWidth - 400)*Math.random()+200);
        do{
            lefts = Math.floor((window.innerWidth - 400)*Math.random()+200);
        }while(this.chongdie(lefts));
        divs.style.cssText = `width:50px;
        height:77px;
        text-align:center;
        line-height:77px;
        font-size:0;
        position:absolute;
        top:${tops}px;
        left:${lefts}px;
        background:url(${this.char[num][1]});`
        divs.innerText = this.char[num][0];
        document.body.appendChild(divs);
        this.current.push(divs);
        this.position.push(lefts);
    }
    drop(){
        let _this = this;
        this.t=setInterval(function () {
            for(let i = 0;i < _this.current.length;i++){
                let tops = _this.current[i].offsetTop + 10;
                _this.current[i].style.top = tops + 'px';
                if(tops >= 500){
                    document.body.removeChild(_this.current[i]);
                    _this.current.splice(i,1);
                    _this.getChar();
                     _this.sheng.innerText--;
                     if(_this.sheng.innerText<=0){
                        _this.jiesuan1();   
                     }
                }
            }
        },100)
    }
    keys(){
        let that=this;
        document.onkeydown=function(e){
            
            let str1=String.fromCharCode(e.keyCode);
            for(let i=0;i<that.current.length;i++){
                let str=that.current[i].innerText;
                if(str==str1){
                    document.body.removeChild(that.current[i]);
                    that.current.splice(i,1);
                    that.position.splice(i,1)
                    that.fen.innerText=++that.shu;
                    that.getChar();
                    if(that.shu==that.gq){
                        that.jiesuan();
                        
                    }
                }
            
            }
        }
        
    }
    next(){
        clearInterval(this.t);
        for(let y=0;y<this.current.length;y++){
            document.body.removeChild(this.current[y]);
        }
        this.current=[];
        this.position=[];
       
        this.length++;
        this.getChars(this.length);
        this.gq+=10;
        this.drop();

    }
    jiesuan(){
        let this1=this;
        clearInterval(this.t);
        for(let y=0;y<this.current.length;y++){
            document.body.removeChild(this.current[y]);
        }
        this.current=[];
        this.position=[];
        let div=document.createElement('div');
        div.className='box';
        div.innerHTML=`分数:<h1>${this.shu}</h1>
    生命:<h1>${this.sheng.innerText}</h1>
    <button class="kaishi">重新开始</button>
    <button class="xiayiguan">下一关</button>
    <button class="tuichu">退出</button>`
        document.body.appendChild(div);
        let kai=document.querySelector('.kaishi');
        let xai=document.querySelector('.xiayiguan');
         let tui=document.querySelector('.tuichu');
        kai.onclick=function(){
            document.body.removeChild(div);
            this1.kaishi();
        }
        xai.onclick=function(){

            document.body.removeChild(div);
            this1.next();
        }
        tui.onclick=function(){

            close();
        }

    }
    jiesuan1(){
        let this1=this;
        clearInterval(this.t);
        for(let y=0;y<this.current.length;y++){
            document.body.removeChild(this.current[y]);
        }
        this.current=[];
        this.position=[];
        let div=document.createElement('div');
        div.className='box';
        div.innerHTML=`分数:<h1>${this.shu}</h1>
    生命:<h1>${this.sheng.innerText}</h1>
    <button class="kaishi">重新开始</button>
    <button class="tuichu">退出</button>`
        document.body.appendChild(div);
        let kai=document.querySelector('.kaishi');
        let tui=document.querySelector('.tuichu');
        
        kai.onclick=function(){
            document.body.removeChild(div);
            this1.kaishi();
        }
        tui.onclick=function(){
            
            close();
        }

    }
    kaishi(){
        this.shu=0;
        this.length=5;
        this.gq=5;
        this.fen.innerText=0;
        this.sheng.innerText=10;
        this.getChars(this.length);
        this.drop();
    }

}
