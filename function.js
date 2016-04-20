//格式化数字（例：001）
function fix(num, length) {
    return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}

//获取文件本地路径 getObjectURL(this.files[0])
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
};

//获取样式信息
function getStyle(node,attr){	//无法取到复合样式 如：border
    if(node.currentStyle){ //IE
        return node.currentStyle[attr];
    }else{
        return getComputedStyle(node,false)[attr];
    }
}

//设置样式
function setStyle(node,attr,value){
    node.style[attr]=value;
}

function css(node,attr,value){
    if(arguments.length==2){	//获取样式
        return getStyle(node,attr);
    }else if(arguments.length==3){	//设置样式
        node.style[attr]=value;
    }
}