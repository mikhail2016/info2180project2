/*Extra feature- Alerts the user when the game is won*/
"use strict";
window.onload=function(){
var mypuzzle= document.getElementById("puzzlearea");
var mypuzzle2= mypuzzle.getElementsByTagName("*");
for(var i=0;i<mypuzzle2.length;i++){
    mypuzzle2[i].className="puzzlepiece";
}
mypuzzle.style.backgroundImage="url(background1.jpg)";
var numRows =4;
var numColumns = 4;
var numTiles = 0;
var posArray = [];
var gameWon = false;
for(var i=0;i<numRows;i++){
    	for(var j=0;j<numColumns;j++){
            posArray.push([i*100,j*100]);
    		mypuzzle2[numTiles].style.top= i*100+"px";
    		mypuzzle2[numTiles].style.left= j*100+"px";
            mypuzzle2[numTiles].style.backgroundPosition=""+400-(j*100)+"px"+" "+(400-i*100)+"px";
    		numTiles++;
    		if(numTiles>=mypuzzle2.length){
    			break;
    		}
    	}
	}
    var shuffleClicked = false;
    document.getElementById("shufflebutton").addEventListener("click", shuffleMe);
    function shuffleMe(){
        shuffleClicked = true;
        var filledPositions = [];
        var possiblePos;
        for(var i=0; i<mypuzzle2.length;i++){
            possiblePos = false;
            var element = Math.floor(Math.random()*posArray.length);
            if(filledPositions.indexOf(posArray[element])!==-1 ){  //if position is already filled
                while(possiblePos!==true){
                    element = Math.floor(Math.random()*posArray.length);
                    if(filledPositions.indexOf(posArray[element])==-1){  //if position is not filled
                        possiblePos = true;
                    }
                }
            }
            filledPositions.push(posArray[element]);
            mypuzzle2[i].style.top = posArray[element][0]+"px";
            mypuzzle2[i].style.left = posArray[element][1]+"px";

        }
    }
    for (var i=0; i<mypuzzle2.length;i++){
         (
            function () 
            {
                var pos = i;
                mypuzzle2[i].addEventListener("click", function(){swap(pos);}, false);
        }());
    }
    function checkifGameWon(){
        var gameWon = true;
        for(var i=0;i<mypuzzle2.length;i++){
            var puzTop = parseInt(mypuzzle2[i].style.top.substring(0,3));
            var puzLeft = parseInt(mypuzzle2[i].style.left.substring(0,3));
            var initTop = posArray[i][0];
            var initLeft = posArray[i][1];
            if((puzTop==initTop && puzLeft==initLeft) === false){
                gameWon = false;
                break;
            }
        }
        return gameWon;
    }
    for (var i=0; i<mypuzzle2.length;i++){
        (
            function () 
            {
                var pos = i;
                mypuzzle2[i].addEventListener("mouseover", function(){highlight(pos);}, false);
        }());
    }
    function canMove(elementPos){
        var puzzleTop = parseInt(mypuzzle2[elementPos].style.top.substring(0,3));
        var puzzleLeft = parseInt(mypuzzle2[elementPos].style.left.substring(0,3));
        if(emptySpotTop==puzzleTop || emptySpotLeft==puzzleLeft){
            if((Math.abs(emptySpotTop-puzzleTop)==100 || Math.abs(emptySpotLeft-puzzleLeft)==100) && shuffleClicked === true){
                return true;
            }
        }
        return false;
    }
    var emptySpotTop = 300;
    var emptySpotLeft = 300;
    var spotNum = 15;
    function swap(elementPos){
        if(shuffleClicked=== false){
            alert("Click Shuffle First !");
        }
        var puzzleTop = parseInt(mypuzzle2[elementPos].style.top.substring(0,3));
        var puzzleLeft = parseInt(mypuzzle2[elementPos].style.left.substring(0,3));
        if(canMove(elementPos)){
            var tempSpotTop = emptySpotTop;
            var tempSpotLeft = emptySpotLeft;
            emptySpotTop = puzzleTop;
            emptySpotLeft = puzzleLeft;
            puzzleTop = tempSpotTop;
            puzzleLeft = tempSpotLeft;
            mypuzzle2[elementPos].style.top = puzzleTop+"px";
            mypuzzle2[elementPos].style.left = puzzleLeft+"px";
            spotNum = elementPos;
             for (var i=0; i<mypuzzle2.length;i++){
                mypuzzle2[i].classList.remove("movablepiece");   
            }
            if(checkifGameWon()===true){
                alert("Congratulations, You've won !");
                document.body.style.backgroundImage="url(https://mikhail2016.github.io/projectimages/winner.jpg)";
                var parent = document.getElementById("overall");
                var child = document.getElementById("puzzlearea");
                parent.removeChild(child);
            }
        }  
    }
    function highlight(elementPos){
        if(canMove(elementPos)){
            mypuzzle2[elementPos].classList.add("movablepiece");
    }          
}
};
