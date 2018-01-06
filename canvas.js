var canvas = document.querySelector('canvas'); 

//var canvas = document.getElementById("canvas");
console.log(canvas); 
canvas.width = window.innerWidth;
canvas.height = 400;

// context variable
var c = canvas.getContext("2d");
var maxRadius = 50; 
//var minRadius = 8; 

var colorArray = [
    '#F34A53',
    '#FAE3B4',
    '#AAC789',
    '#437356', 
    '#1E4147',
]; 

// Create mouse object 
var mouse = {
    x: undefined, 
    y: undefined 
}

window.addEventListener('mousemove', 
    function(event){
    
    mouse.x = event.x; 
    mouse.y = event.y; 
    //console.log(mouse); 
}); 

// This is called every time the browser is resized
window.addEventListener('resize', 
    function(){
    canvas.width = window.innerWidth;
    canvas.height = 300;
    init()
}); 

function Circle(x, y, xVel, yVel, radius){
    this.x = x; 
    this.y = y; 
    this.xVel = xVel; 
    this.yVel = yVel;  
    this.radius = radius; 
    this.minRadius = radius; 
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
    
    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y, this.radius,0,Math.PI*2, false);
        c.fillStyle =  this.color; 
        c.fill(); 
    } 
    
    this.update = function(){
        
        
    if(this.x + this.radius > innerWidth || this.x-this.radius < 0){
        this.xVel = -this.xVel; 
    }
    
    if(this.y + this.radius > innerHeight || this.y-this.radius < 0){
        this.yVel = -this.yVel; 
    }
        
        
        this.x+=this.xVel; 
        this.y+=this.yVel; 
        
        
        if(mouse.x - this.x < 100 && mouse.x -this.x > -100 && mouse.y - this.y < 100 && mouse.y - this.y > -100){
            if(this.radius< maxRadius){
          this.radius += 1; 
            }
        }   else if(this.radius > this.minRadius){
            this.radius -=1; 
        }
        
        
        this.draw(); 
    }
}
    var circleArray = []; 

function init(){

circleArray =   [];  
for (var i = 0; i < 800; i++){
    var radius = Math.random()*5 + 1; 
    var x = Math.random() * (innerWidth - radius*2)+ radius; 
    var y = Math.random() * (innerHeight - radius*2)+radius; 
    var xVel = (Math.random() - 0.5) * 2;  
    var yVel = (Math.random() - 0.5) * 2;
    
    circleArray.push(new Circle(x, y, xVel, yVel, radius)); 
    }
}


function animate(){
    requestAnimationFrame(animate); 
    c.clearRect(0,0,innerWidth, innerHeight); 
    for (var i = 0; i < circleArray.length; i++){
        circleArray[i].update(); 
    }
    
}
init(); 
animate(); 