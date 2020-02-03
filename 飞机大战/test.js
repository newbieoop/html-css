var mainscreen = document.getElementById('mainscreen')


//让背景动起来
var jsBg1 = document.getElementById('bg1')
var jsBg2 = document.getElementById('bg2')

var timerBg = setInterval(function(){
	jsBg1.style.top = jsBg1.offsetTop + 1 + 'px'
	jsBg2.style.top = jsBg2.offsetTop + 1 + 'px'
	
	if (jsBg1.offsetTop >= 731){
		jsBg1.style.top = "-731px"
	}
	if (jsBg2.offsetTop >= 731){
		jsBg2.style.top = "-731px"
	}
},10)


//让飞机动起来
//拖拽效果
var airplane = document.getElementById('airplane')
//给飞机添加鼠标按下事件

	

airplane.addEventListener('mousedown',function(e){
	var ev = e || window.event
	basex = ev.pageX
	basey = ev.pageY
	movex = 0
	movey = 0
	
	//给主屏幕添加鼠标移动事件
	mainscreen.addEventListener('mousemove',function(e){
		var en = e || window.event
		movex = en.pageX - basex
		basex = en.pageX
		movey = en.pageY - basey
		basey = en.pageY
		airplane.style.left = airplane.offsetLeft +movex + 'px'
		airplane.style.top = airplane.offsetTop + movey + 'px'
	},false)
	
	
},false)


//发射子弹
var timerBullent = setInterval(function(){
	//创建子弹
	var bullent = document.createElement('div')
	mainscreen.appendChild(bullent)
	bullent.className = "bullent"
	bullent.style.left = airplane.offsetLeft + 50 + 'px'
	bullent.style.top = airplane.offsetTop - 10 + 'px'
	
	//让子弹飞
	var timerBullentFly = setInterval(function(){
		bullent.style.top = bullent.offsetTop - 10 + 'px'
		if (bullent.offsetTop <= -20){
			clearInterval(timerBullentFly)
			mainscreen.removeChild(bullent)
		}
	},20)
	bullent.timer = timerBullentFly
	
},100)




//敌人
var timertank = setInterval(function(){
	//创建敌人
	var tank = document.createElement('div')
	mainscreen.appendChild(tank)
	tank.className = "tank"
	tank.style.left = randomNum(0,490) + 'px'
	tank.style.top = '0px'
	
	//让坦克飞
	var timerTankFly = setInterval(function(){
		tank.style.top = tank.offsetTop + 10 + 'px'
		if (tank.offsetTop >= 731){
			clearInterval(timerTankFly)
			mainscreen.removeChild(tank)
		}
	},60)
	tank.timer = timerTankFly
	
},1000)
//生成随机数
function randomNum(min,max){
	return parseInt(Math.random() * (max - min) + min);
}


var timerPZJC = setInterval(function(){
	var alltanks = document.getElementsByClassName('tank')
	var allbullent = document.getElementsByClassName('bullent')
	for (var i = 0;i < allbullent.length; i++){
		for (var j = 0; j < alltanks.length; j++){
			var b = allbullent[i]
			var t = alltanks[j]
			
			if (pzjcFunc(b,t)){
				clearInterval(b.timer)
				clearInterval(t.timer)
				mainscreen.removeChild(b)
			    mainscreen.removeChild(t)
				break
			}
		}
	}
},50)
//死亡检测
var timerDie = setInterval(function(){
	var alltanks = document.getElementsByClassName('tank')
	
	for (var i = 0;i < alltanks.length; i++){
		if (pzjcFunc(alltanks[i],airplane)){
			for (var j = 0;j < 100; j++){
				clearInterval(j)
			}
		}
	}
},50)


//碰撞检测
function pzjcFunc(obj1,obj2){
	var obj1Left = obj1.offsetLeft;
	var obj1Width = obj1Left + obj1.offsetWidth;
	var obj1Top = obj1.offsetTop;
	var obj1Height = obj1Top + obj1.offsetHeight;
	
	var obj2Left = obj2.offsetLeft;
	var obj2Width = obj2Left + obj2.offsetWidth;
	var obj2Top = obj2.offsetTop;
	var obj2Height = obj2Top + obj2.offsetHeight;
	
	
	if (!(obj1Left > obj2Width || obj1Width < obj2Left || obj1Top > obj2Height || obj1Height < obj2Top)){
		return true;
	}else{
		return false;
	}	
	
}