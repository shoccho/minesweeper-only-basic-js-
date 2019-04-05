 var total_tiles=64;
 var deffuse = false;
 function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
var board=[];
function numbering(){
	
	for(let i= 0;i<8;i++)
 	{
 		for(let j=0;j<8;j++)
 		{
 			var c=0;
 			if(i<7 && j<7 && board[i+1][j+1]=='x'){
 				c++;
 			}
 			if(j>0 && i<7 && board[i+1][j-1]=='x'){
 				c++;
 			}
 			if( i<7 && board[i+1][j]=='x'){
 				c++;
 			}
 			if(j<7 && board[i][j+1]=='x'){
 				c++;
 			}
 			if(j>0 && board[i][j-1]=='x'){
 				c++;
 			}
 			if(i>0 && j <7 &&  board[i-1][j+1]=='x'){
 				c++;
 			}if(i>0 && j>0 && board[i-1][j-1]=='x'){
 				c++;
 			}
 			if(i>0 && board[i-1][j]=='x'){
 				c++;
 			}
 			if(c>0 &&  board[i][j]!='x'){
 				document.getElementById("tile"+i+"_"+j).innerHTML=c;
 			}
 		}	
	}
}
function store(i,j){
	 board[i][j]='x';
}
function Create2DArray(rows){
  for (var i=0;i<rows;i++) {
     board[i] = [];
  }

  return board;
}
function lef(i,j){
	while(j >=0 && document.getElementById("tile"+i+"_"+j).innerHTML!="X"){
		transform(document.getElementById("tile"+i+"_"+j));
		
		if(document.getElementById("tile"+i+"_"+j).innerHTML!=""){
			break;
		}
		j--;
	}
}
function right(i,j){
	while(j<8 && document.getElementById("tile"+i+"_"+j).innerHTML!="X"){
		transform(document.getElementById("tile"+i+"_"+j));
		
		if(document.getElementById("tile"+i+"_"+j).innerHTML!=""){
			break;
		}
		j++;
	}
}
function reveal(x){

	console.log(x);
	var i=x[4];
	var j=x[6];
	while(i>=0 && document.getElementById("tile"+i+"_"+j).innerHTML!="X"){
			lef(i,j);
			right(i,j);
		
		if(document.getElementById("tile"+i+"_"+j).innerHTML!=""){
			break;
		}
		i--;
	}
	var i=x[4];
	var j=x[6];
	while(i<8 && document.getElementById("tile"+i+"_"+j).innerHTML!="X"){
		lef(i,j);
		right(i,j);
		
		if(document.getElementById("tile"+i+"_"+j).innerHTML!=""){
			break;
		}
		i++;
	}
}
function transform(x){
	x.style["color"]="#0215FC";
	x.style["font-weight"]="bold";
	x.style["background-color"]="#111111";
}
function allshow(){
	z=document.getElementsByClassName("tiles");
	for(let i=0; i<64 ; i++ ){
		transform(z[i]);
	}
}
function deffuse_bomb(x ){
	x.innerHTML="B";
	transform(x);
	deffuse=false;
}
function show(){
	if(this.innerHTML==""){
		reveal(this.id);
		if(deffuse){
			deffuse = false;
		}
	}
	if(this.innerHTML=='X'){
		if(deffuse){
			deffuse_bomb(this);
			return;
		}
		allshow();
		alert("Game Over!");
	}
	transform(this);
	//this.style["color"]="#0215FC";
	//this.style["font-weight"]="bold";
	//this.style["background-color"]="#8C8B8B";
	//this.style["vertical-align"]="middle";

}
function new_tiles(){ 
	Create2DArray(8);
 	for(let i= 0;i<8;i++)
 	{
 		for(let j=0;j<8;j++)
 		{
			
			var a= document.createElement("div");
		 	
		 	a.style["background-color"]="white";
		 	a.style["height"]="50px";
		 	a.style["width"]="50px";
		 	a.style["float"]="left";
		 	a.style["border-color"]="black";
		 	a.style["border-style"]="solid";
		 	a.style["border-width"]="1px";
		 	a.style["display"]="flex";
		 	a.style["align-items"]="center";
		 	a.style["justify-content"]="center";
		 	a.className="tiles";
		 	a.id="tile"+i+"_"+j;
		 	a.style["color"]="white";
		 	a.addEventListener('click',show);
		 	if (getRndInteger(0,9)==getRndInteger(0,9)){
		 		
		 		a.innerHTML="X";
		 	store(i,j);
		 	}
		 	document.getElementById("frame").appendChild(a);
		}
	}
	numbering();
}
function set_def(){
	deffuse = true;
	console.log(deffuse);
}
function game(){
	document.getElementById('deffuse').addEventListener("click",set_def);
}
window.onload = function (){
	new_tiles();
	game();
}