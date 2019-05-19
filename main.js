var WIDTH = 50;
var HEIGHT = 50;

var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");

var sudoku = new Array();
var rows = new Array();
var columns = new Array();
var boxes = new Array();

var i; //for loop
var j; //for loop

var selectedX;
var selectedY;
var numberToFill

function iniarray(x)
{
	for(i = 0;i<9;i++)
	{
  	x[i] = new Array();
		for(j = 0;j<9;j++)
  	{
  		x[i][j] = 0;
  	}
	}
}

function Solve() 
{
  for(i = 0;i<9;i++)
  {
    for(j = 0;j<9;j++)
    {
      var n = document.getElementById("r"+i+"c"+j);
      if(n!="")
      {
        var bx = Math.floor(j/3);
        var by = Math.floor(i/3);
        rows[i][n]=1;
        columns[j][n]=1;
        boxes[by*3+bx][n]=1;
      }
      
    }
  }
  fill(0,0);
}
function fill(x, y)
{
  if(y==9)
  {
    return true;
  }
  var nx = (x+1)%9;
  var ny = y;
  if(nx == 0)
  {
    ny = y+1;
  }
  if(document.getElementById("r"+y+"c"+x)!="")
  {
    return fill(nx,ny);
  }
  for(var i=1;i<10;i++)
  {
    var bx = Math.floor(x / 3);
    var by = Math.floor(y / 3);
    var box_key = by * 3 + bx;
    if((rows[y][i]!=1) && (columns[x][i]!=1) && (boxes[box_key][i]!=1))
    {
        rows[y][i] = 1;
        columns[x][i] = 1;
        boxes[box_key][i] = 1;
        document.getElementById("r"+y+"c"+x) = i;
        if(fill(nx,ny)== true)
        {
            return true;
        }
        document.getElementById("r"+y+"c"+x) = "";
        boxes[box_key][i] = 0;
        columns[x][i] = 0;
        rows[y][i] = 0;
    }   
   }
   return false;
}


function DrawTable()
{
    var x;
    for(i=1;i<9;i++)
    {
        x = i*50;
        cxt.moveTo(x,0);
        cxt.lineTo(x,HEIGHT*9);
        cxt.moveTo(0,x);
        cxt.lineTo(WIDTH*9,x);
        cxt.strokeStyle="#007341";
        cxt.lineWidth=2;
        cxt.stroke();
    }

}

function DrawTextInMiddleOfBox(number, offsetX, offsetY)
{
    cxt.font="30px Arial";
    cxt.fillStyle = "red";
    /* alert(number);
    alert(offsetX);
    alert(offsetY); */
    cxt.fillText(number, offsetX+16, offsetY+35 );
}

function Sample()
{
  iniarray(sudoku);
  for(i = 0;i<9;i++)
  {
    for(j = 0;j<9;j++)
    {
      sudoku[i][j]="";
    }
  }
  sudoku[0][0] = 5;
  sudoku[0][4] = 9;
  sudoku[0][6] = 2;
  sudoku[0][8] = 1;
  sudoku[1][2] = 2;
  sudoku[1][5] = 7;
  sudoku[1][8] = 8;
  sudoku[2][1] = 8;
  sudoku[2][6] = 3;
  sudoku[3][1] = 1;
  sudoku[3][2] = 4;
  sudoku[3][5] = 5;
  sudoku[4][3] = 9;
  sudoku[4][5] = 3;
  sudoku[5][3] = 8;
  sudoku[5][6] = 9;
  sudoku[5][7] = 4;
  sudoku[6][2] = 3;
  sudoku[6][7] = 6;
  sudoku[7][0] = 6;
  sudoku[7][3] = 2;
  sudoku[7][6] = 1;
  sudoku[8][0] = 8;
  sudoku[8][2] = 9;
  sudoku[8][4] = 6;
  sudoku[8][8] = 5;

}

function LoadSample()
{
  Sample();
  
  for(i=0;i<9;i++)
  {
    for(j=0;j<9;j++)
    {
      DrawTextInMiddleOfBox(sudoku[i][j],i*WIDTH,j*HEIGHT);
    }
  }
}

function Clear() 
{
  
  cxt.clearRect(0, 0, c.width, c.height);
  DrawTable();
  iniarray(rows);
	iniarray(columns);
  iniarray(boxes);
  iniarray(sudoku);
  
}




DrawTable();

c.onmousedown = function(e)
{
  var rect = c.getBoundingClientRect();
  var x = Math.floor((e.clientX-rect.left-5)/WIDTH);
  var y = Math.floor((e.clientY-rect.top-5)/HEIGHT);
  selectedX = x;
  selectedY = y;
  cxt.fillStyle="#c9bfbc";
  cxt.fillRect(x*WIDTH,y*HEIGHT,WIDTH,HEIGHT); 

  DrawTable();
  
  
  //alert((e.clientX-rect.left-5)+','+(e.clientY-rect.top-5));

}


window.addEventListener('keydown',handlekeydown,false);

function handlekeydown(e)
{
  var key = event.keyCode;
  if (key<=57 && key >= 49)
  {
    numberToFill = key - 48;
  
  //alert(numberToFill);
  DrawTextInMiddleOfBox(numberToFill, selectedX*WIDTH, selectedY*HEIGHT);
  }
}