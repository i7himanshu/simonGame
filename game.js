var gameStart=1;
var gameLevel=1;
var gamePattern=[];
var gameSequence=[];
var n=0;


function randomButtonSelector(){
    var color=["green","red","yellow","blue"];

    var cls= color[Math.floor(Math.random()*4)];
    return cls;
}

function gameOver(){
    
    gameLevel=1;
    gameStart=1;
    gameSequence=[];
    n=0;
    gamePattern=[];
    $("#level-title").text("Game Over , Press A Key to Start");

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    var audio=new Audio("./sounds/wrong.mp3");
        audio.play();
}


function buttonBeeper(c){

    $("#level-title").text("Level "+gameLevel);

    $("."+c).addClass("pressed");
    setTimeout(function(){
        $("."+c).removeClass("pressed");
    },100);

    var audio=new Audio("./sounds/"+c+".mp3");
    audio.play();
    gamePattern.push(c);

}

function check(){
    var count=0;
    var trueOrFalse=true;
    for(count=0;count<gameSequence.length;count++){
        if(gamePattern[count]==gameSequence[count])
            continue;
        else{
            trueOrFalse=false;
            break;
        }
            
    }
    if(trueOrFalse){
        gameSequence=[];
        n=0;
        gameLevel++;

        setTimeout(function(){
            buttonBeeper(randomButtonSelector());
        },1200);
    }
    else{

       gameOver();

    }
}




$(document).keypress(function(){
   if(gameStart===1){
    var c= randomButtonSelector();

   buttonBeeper(c);
   gameStart=0;

   }

});

$(".btn").click(function(){
    var c=this.getAttribute("id");
    
    var audio=new Audio("./sounds/"+c+".mp3");
    audio.play();
    $("#"+c).addClass("pressed");
    setTimeout(function(){
        $("#"+c).removeClass("pressed");
    },100);

    gameSequence.push(c);
  

    var count=0;
    for(count=0;count<gameSequence.length;count++){
        if(gamePattern[count]==gameSequence[count])
            continue;
        else{
       gameOver();
        }
    }

    n++;
    if(n===gamePattern.length)
    check();
    
});



$(".start").click(function(){
    buttonBeeper(randomButtonSelector());
})