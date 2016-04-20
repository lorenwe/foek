

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