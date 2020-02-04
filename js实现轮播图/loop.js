var jsBox = document.getElementById('box')
var jsPic = document.getElementById('pic')
var jsLeft = document.getElementById('left')
var jsRight = document.getElementById('right')
var jsLisArr = document.getElementsByTagName('li')

//第一个li设置为红色
jsLisArr[0].style.background='red'

//启动一个定时器去更换jsPic中的src属性
var currentPage = 1
var timer = setInterval(startLoop,1000)
function startLoop(){
	currentPage++
	changePage()
}
function changePage(){
	if (currentPage > 8){
		currentPage = 1
	}
	else if (currentPage == 0){
		currentPage = 8
	}
	jsPic.src = 'image/' + currentPage + '.jpg'
	//清空所有小圆点的颜色
	for (var i = 0;i < jsLisArr.length;i++){
		jsLisArr[i].style.background = 'gray'
	}
	jsLisArr[currentPage-1].style.background = 'red'
}

//鼠标进入box
jsBox.addEventListener('mouseover',overFunc,false)
function overFunc(){
	//停止定时器
	clearInterval(timer)
	//显示左右按钮
	jsLeft.style.display = 'block'
	jsRight.style.display = 'block'
}
jsBox.addEventListener('mouseout',outFunc,false)

function outFunc(){
	//重启定时器
	timer = setInterval(startLoop,1000)
	jsLeft.style.display = 'none'
	jsRight.style.display = 'none'
}

//点击左右按钮
// jsLeft.addEventListener('mouseover',func1,false)
// function func1(){
// 	jsLeft.style.background = 'silver'
// }

// jsLeft.addEventListener('mouseout',func2,false)
// function func2(){
// 	jsLeft.style.background = 'rgba(0,0,0,0.2)'
// }


// jsRight.addEventListener('mouseover',func3,false)
// function func3(){
// 	jsRight.style.background = 'silver'
// }

// jsRight.addEventListener('mouseout',func4,false)
// function func4(){
// 	jsRight.style.background = 'rgba(0,0,0,0.2)'
// }


//高级写法
jsLeft.addEventListener('mouseover',deep,false)
jsRight.addEventListener('mouseover',deep,false)
function deep(){
	this.style.backgroundColor = 'rgba(0,0,0,0.6)'
}

jsLeft.addEventListener('mouseout',nodeep,false)
jsRight.addEventListener('mouseout',nodeep,false)
function nodeep(){
	this.style.backgroundColor = 'rgba(0,0,0,0.2)'
}

//点击左右进行轮播
jsRight.addEventListener('click',function(){
	currentPage++
	changePage()
},false)
jsLeft.addEventListener('click',function(){
	currentPage--
	changePage()
},false)

//进入小圆点进行轮播
//第一种方法
// for (var i = 0;i < jsLisArr.length;i++){
// 	jsLisArr[i].addEventListener('mouseover',function(){
// 		currentPage = parseInt(this.innerHTML)
// 		changePage()
// 	},false)
// }

for (var i = 0;i < jsLisArr.length;i++){
	jsLisArr[i].index = i+ 1
	jsLisArr[i].addEventListener('mouseover',function(){
		currentPage = parseInt(this.index) 
		changePage()
	},false)
}
