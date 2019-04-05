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
 				board[i][j]=c;
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
	console.log("left called");
	while(j >=0 && board[i][j]!='x'){
		transform(document.getElementById("tile"+i+"_"+j));
		
		if(board[i][j]!=undefined){
			break;
		}
		j--;
	}
}
function right(i,j){
	while(j<8 && board[i][j]!="x"){
		transform(document.getElementById("tile"+i+"_"+j));
		
		if(board[i][j]!=undefined){
			break;
		}
		j++;
	}
}
function reveal(x){

	console.log(x);
	var i=x[4];
	var j=x[6];
	while(i>=0 && board[i][j]!="x"){
			lef(i,j);
			right(i,j);
		
		if(board[i][j]!=undefined){
			break;
		}
		i--;
	}
	var i=x[4];
	var j=x[6];
	while(i<8 && board[i][j]!="x"){
		lef(i,j);
		right(i,j);
		
		if(board[i][j]!=undefined){
			break;
		}
		i++;
	}
}
function transform(x){
	x.style["color"]="#0215FC";
	x.style["font-weight"]="bold";
	x.style["background-color"]="#BBBBBB";
	x.style["border-style"]="inset";
	var i=x.id[4];
	var j=x.id[6];
	if(board[i][j]==undefined)return;
	x.innerHTML=board[i][j];

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
	var i=this.id[4];
	var j=this.id[6];
	if(board[i][j]=='x'){
		if(deffuse){
			deffuse_bomb(this);
			return;
		}
		allshow();
		alert("Game Over!");
	}
	transform(this);
	

}
function new_tiles(){ 
	Create2DArray(8);
 	for(let i= 0;i<8;i++)
 	{
 		for(let j=0;j<8;j++)
 		{
			
			var a= document.createElement("div");
		 	
		 	a.style["background-color"]="#EEEEEE";
		 	a.style["height"]="50px";
		 	a.style["width"]="50px";
		 	a.style["float"]="left";
		 	a.style["border-style"]="outset";
		 	a.style["border-width"]="4px";
		 	a.style["display"]="flex";
		 	a.style["align-items"]="center";
		 	a.style["justify-content"]="center";
		 	a.className="tiles";
		 	a.id="tile"+i+"_"+j;
		 	a.addEventListener('click',show);
		 	if (getRndInteger(0,9)==getRndInteger(0,9)){
		 		
		 		
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