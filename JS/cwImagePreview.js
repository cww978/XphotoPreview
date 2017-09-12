
var ImagePreview = function(){
    var my_canvas = document.getElementsByClassName('photo-canvas')[0];
    my_canvas.height = '700';
    my_canvas.width = '500'
    var my_ctx = my_canvas.getContext('2d');
    var c_height = my_canvas.height;
    var c_width = my_canvas.width;
    function init(){
        my_ctx.fillStyle = "beige";
        my_ctx.fillRect(0,0,c_width,c_height)
    };
    function changeImage(){};
    function moveImage(){};
    function showNext(){};
    function showUp(){}
    return {
    	init:init
    }
};