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

iniarray(rows);
iniarray(columns);
iniarray(boxes);
iniarray(sudoku);

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
/*   iniarray(rows);
  iniarray(columns);
  iniarray(boxes); */
  
  for(j = 0;j<9;j++)
  {
    for(i = 0;i<9;i++)
    {
      var n = sudoku[j][i];
      if(n!= 0)
      {
        var by = Math.floor(j/3);
        var bx = Math.floor(i/3);
        rows[j][n-1]=1;
        columns[i][n-1]=1;
        boxes[by*3+bx][n-1]=1;
      }
      
    }
  }
  fill(0,0);

  for(j=0;j<9;j++) //output result
  {
    for(i=0;i<9;i++)
    {
      if(sudoku[j][i]!=0)
      {
        DrawTextInMiddleOfBox(sudoku[j][i],i*WIDTH,j*HEIGHT);
      }
    }
  }
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
  if(sudoku[y][x]!= 0)
  {
    return fill(nx,ny);
  }
  for(var z=1;z<10;z++)
  {
    var bx = Math.floor(x / 3);
    var by = Math.floor(y / 3);
    var box_key = by * 3 + bx;
    if((rows[y][z-1]!=1) && (columns[x][z-1]!=1) && (boxes[box_key][z-1]!=1))
    {
        rows[y][z-1] = 1;
        columns[x][z-1] = 1;
        boxes[box_key][z-1] = 1;
        sudoku[y][x] = z;
        if(fill(nx,ny)== true)
        {
            return true;
        }
        sudoku[y][x] = 0;
        boxes[box_key][z-1] = 0;
        columns[x][z-1] = 0;
        rows[y][z-1] = 0;
        
    }   
  }
   return false;
}


function DrawTable()
{
    var x;
    for(var t=1;t<9;t++)
    {
        x = t*50;
        cxt.beginPath();
        cxt.moveTo(x,0);
        cxt.lineTo(x,HEIGHT*9);
        cxt.moveTo(0,x);
        cxt.lineTo(WIDTH*9,x);
        cxt.closePath();
        if(t % 3 == 0)
        {
          cxt.strokeStyle="#ff7341";
          cxt.lineWidth=3;
        }
        else
        {
          cxt.strokeStyle="#007341";
          cxt.lineWidth=2;
        }
        
        cxt.stroke();
    }

}

function DrawTextInMiddleOfBox(number, offsetX, offsetY)
{
    cxt.font="30px Arial";
    cxt.fillStyle = "red";
    cxt.fillText(number, offsetX+16, offsetY+35 );
}

function Sample()
{
  iniarray(sudoku);
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
  
  for(j=0;j<9;j++)
  {
    for(i=0;i<9;i++)
    {
      if(sudoku[j][i]!=0)
      {
        DrawTextInMiddleOfBox(sudoku[j][i],i*WIDTH,j*HEIGHT);
      }
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
}


window.addEventListener('keydown',handlekeydown,false);

function handlekeydown(e)
{
  var key = e.keyCode;
  if (key<=57 && key >= 49)
  {
    numberToFill = key - 48;
    sudoku[selectedX][selectedY]=numberToFill;
    rows[selectedY][numberToFill-1]=1;
    columns[selectedX][numberToFill-1]=1;
    var bx = Math.floor(selectedX / 3);
    var by = Math.floor(selectedY / 3);
    var box_key = by * 3 + bx;
    boxes[box_key][numberToFill-1]=1;
    DrawTextInMiddleOfBox(numberToFill, selectedX*WIDTH, selectedY*HEIGHT);
  }
}