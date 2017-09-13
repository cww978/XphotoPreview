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
var Twinke = function(){
	var my_canvas2 = document.getElementsByClassName('twinke')[0];
	var my_ctx2 = my_canvas2.getContext('2d');
	my_canvas2.height = '600';
	my_canvas2.width = '1280';
	var arc_objects = [];
	function init(){
		my_ctx2.fillStyle = "white";
		my_ctx2.fillRect(0,0,my_canvas2.width,my_canvas2.height);
	}
	my_canvas2.addEventListener('click',function(e){
		var arc = {x:e.clientX,y:e.clientY,color : 'black',r : 10};
		arc_objects.push(arc);
	});
	function arcDraw(){
		my_ctx2.clearRect(0,0,my_canvas2.width,my_canvas2.height);
		for(var i = 0;i<arc_objects.length;i++){
			my_ctx2.beginPath();
			my_ctx2.fillStyle = arc_objects[i].color;
			arc_objects[i].r +=0.2;  
			my_ctx2.arc(arc_objects[i].x,arc_objects[i].y,arc_objects[i].r,0,2*Math.PI);
			my_ctx2.closePath();
			my_ctx2.fill();
		}
		window.requestAnimationFrame(arcDraw);
	}
	return {
		init:init,
		arcDraw:arcDraw,
		arc_objects:arc_objects
	}
};