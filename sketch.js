var dog,db;
var hungry,happy,foodstock, foods;
function preload(){
    hungry = loadImage("Dog.png");
    happy = loadImage("happy dog.png")
}
function setup(){
    createCanvas(500,500);
    db = firebase.database();
    dog = createSprite(300,300,150,150);
    dog.addImage(hungry);
    dog.scale = 0.2;
    var foodstock = db.ref('food') ;
    foodstock.on("value",readstock,showerror); 
}

function draw(){
    background("white");
    if (keyWentDown (UP_ARROW)){
        writestock(foods);
        if (foods>0){
            dog.addImage(happy);

        }
      
    }
    stroke ("black");
    text("food remaining :" + foods,170,100);
    textSize (15);
    text ("please press up arrow to feed",100,200) 
    drawSprites();
}


function writestock(food){
    if(food<= 0){
        food = 0;
    }else {
        food-= 1;
    }
    db.ref('/').set({
        
        food: food
    })
}
function readstock(data){
    foods = data.val();

}
function showerror()
{
    console.log("could not read database");
}
