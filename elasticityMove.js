
//获取样式信息
function getStyle(node,attr){	//无法取到复合样式 如：border
    if(node.currentStyle){ //IE
        return node.currentStyle[attr];
    }else{
        return getComputedStyle(node,false)[attr];
    }
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