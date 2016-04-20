/*2015 11 25 23:32*/

//获取样式信息
function getStyle(node,attr){	//无法取到复合样式 如：border
	if(node.currentStyle){ //IE
		return node.currentStyle[attr];
	}else{
		return getComputedStyle(node,false)[attr];
	}
}
//多属性缓冲运动
function bufferMove(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var state = true;
		for(var attr in json){
			var iCur = 0;
			if(attr == 'opacity'){
				iCur = parseInt(parseFloat(getStyle(obj,attr))*100);	
			}else{
				iCur = parseInt(getStyle(obj,attr));
			}
			var iSpeed = (json[attr]-iCur)/8;
			iSpeed = iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(iCur != json[attr]){
				state = false;
			}
			if(attr == 'opacity'){
				obj.alpha = iCur+iSpeed;
				obj.style.filter = 'alpha(opacity:'+obj.alpha+')';
				obj.style.opacity = obj.alpha/100;
			}else{
				obj.style[attr] = iCur+iSpeed+"px";
			}	
		}
		if(state){
			clearInterval(obj.timer);
			if(fn){fn();}
		}
	},30);	
}
//弹性运动
function elasticityMove(obj,attr,iTarget,fn){
	var iVal = 0;
	var iSpeed = 0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		if(iTarget == parseInt(getStyle(obj,attr))){
			return;
		}
		iSpeed +=(iTarget-parseInt(getStyle(obj,attr)))/5;
		iSpeed *=0.7;
		iVal += iSpeed;
		if((Math.abs(iSpeed)<1)&&(Math.abs(iVal-iTarget)<1)){
			clearInterval(obj.timer);
			obj.style[attr] = iTarget+'px';
			if(fn){fn();}
		}else{	
			obj.style[attr] = iVal+'px';
			console.log(iSpeed);
		}
	},30);
}
//基于底边的碰撞运动
function collisionMove(obj,xSpeed,ySpeed){
	var w = document.documentElement.clientWidth;
	var h = document.documentElement.clientHeight;
	var xNow = 0;
	var yNow = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		ySpeed +=3;
		xNow= obj.offsetLeft+xSpeed;
		yNow = obj.offsetTop+ySpeed;
		if(yNow>=(h-obj.offsetHeight)){
			ySpeed *= -0.8;
			xSpeed *= 0.8;
			yNow = h-obj.offsetHeight;
		}else if(yNow<=0){
			ySpeed *= -1;
			yNow = 0;
		}
		if(xNow>=(w-obj.offsetWidth)){
			xSpeed *= -0.8;
			xNow = w-obj.offsetWidth;
		}else if(xNow<=0){
			xSpeed *= -0.8;
			xNow = 0;
		}
		if(Math.abs(xSpeed)<1){
			xSpeed = 0;
		}
		if(Math.abs(ySpeed)<1){
			ySpeed = 0;
		}
		if(xSpeed == 0&& ySpeed == 0&&yNow == h-obj.offsetHeight){
			clearInterval(obj.timer);
		}else{
			obj.style.left = xNow+'px';
			obj.style.top = yNow+'px';
		}
	},30);
}
