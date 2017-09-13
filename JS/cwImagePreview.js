/*var monse_orien = function(fn){
	this.fn = fn;
	this.successor = null;
}
monse_orien.prototype.setNext = function(successor){
	this.successor = successor;
}
monse_orien.prototype.passNext = function(){
	var res = this.fn.apply(this,arguments);
	if(res = 'nextSuccessor'){
		阿斯大大
		return this.successor && this.successor.passNext(this.successor,arguments);
	}
}*/
var SPEED = 0;
var SCALE = 1;
var HEI_WID = 1;
var ImagePreview = function(){
    var my_canvas = document.getElementsByClassName('photo-canvas')[0];
    my_canvas.height = '500';
    my_canvas.width = '300'
    var my_ctx = my_canvas.getContext('2d');
    var c_height = my_canvas.height;
    var c_width = my_canvas.width;
    HEI_WID = c_height/c_width;
    var vx = SPEED;
    var vy = SPEED;
    var imageObj = {
    	imgsrcs:[],
    	num:0,
    	x:0,
    	y:0
    };
    var monse = {
    	x : 0,
    	y : 0,
    }
    monse.detectorTan = function(x,y){
    	imageObj.x = x - my_canvas.offsetLeft - (monse.x-my_canvas.offsetLeft);
    	imageObj.y = y -my_canvas.offsetTop - (monse.y-my_canvas.offsetTop);
    	console.log(imageObj.x);
    }
    function init(){
        my_ctx.fillStyle = "beige";
        my_ctx.fillRect(0,0,c_width,c_height);
        touchImgae();
    };
    imageObj.intoImage = function(src){
    	var image = new Image();
    	image.src = src;
    	imageObj.imgsrcs.push(image);
    };
	function drawImage(n){
		imageObj.num = n;
		var img = new Image();
		img = imageObj.imgsrcs[n];
		img.onload = function(){
			my_ctx.drawImage(img,0,0,img.width,img.height,100,100,c_width,c_height);
		}
	}
    function changeImage(){};
    function moveImage(){
    	
    	my_ctx.clearRect(0,0,c_width,c_height);
    	
		var img = new Image();
		var n = imageObj.num;
		img = imageObj.imgsrcs[n];
		imageObj.x +=vx;
		imageObj.y +=vy;
		my_ctx.drawImage(img,0,0,img.width,img.height,imageObj.x,imageObj.y,SCALE*c_width,SCALE*c_height);
		window.requestAnimationFrame(moveImage);
		
    };
    function hanlder(e){
    	monse.detectorTan(e.clientX,e.clientY);
    }
    function imageScale(e){
    	if(e.wheelDelta>0){
    		imageObj.x -=11/HEI_WID;
    		imageObj.y -=8;
    		SCALE +=0.05;
    	}
    	else{
    		imageObj.x +=11/HEI_WID;
    		imageObj.y +=8;
    		SCALE -=0.05;
    	}
	    monse.x = -imageObj.x;
    	monse.y = -imageObj.y;
    }
    function touchImgae(){//图片操作以及鼠标事件监听
    	my_canvas.addEventListener('mouseenter',function(){
    		my_canvas.addEventListener('mousewheel',imageScale,false);
    	});
    	my_canvas.addEventListener('mousedown',function(e){
			monse.x += e.clientX;
    		monse.y += e.clientY;
    		my_canvas.addEventListener('mousemove',hanlder,false);
    		
    	})
    	my_canvas.addEventListener('mouseup',function(e){
    		monse.x = -imageObj.x;
    		monse.y = -imageObj.y;
			my_canvas.removeEventListener('mousemove',hanlder,false);
    	});
    	my_canvas.addEventListener('mouseleave',function(e){
    		monse.x = -imageObj.x;
    		monse.y = -imageObj.y;
    		my_canvas.removeEventListener('mousewheel',imageScale,false);
			my_canvas.removeEventListener('mousemove',hanlder,false);
    	});
    	
    	
    }
    function showNext(){
    	
    };
    function showUp(){}
    return {
    	init:init,
    	image:imageObj,
    	drawImage:drawImage,
    	moveImage:moveImage
    }
};