
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