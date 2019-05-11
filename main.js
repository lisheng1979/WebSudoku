function Sample()
{
  iniarray(rows);
	iniarray(columns);
	iniarray(boxes);
  document.getElementById('r0c0').value = 5;
  document.getElementById('r0c4').value = 9;
  document.getElementById('r0c6').value = 2;
  document.getElementById('r0c8').value = 1;
  document.getElementById('r1c2').value = 2;
  document.getElementById('r1c5').value = 7;
  document.getElementById('r1c8').value = 8;
  document.getElementById('r2c1').value = 8;
  document.getElementById('r2c6').value = 3;
  document.getElementById('r3c1').value = 1;
  document.getElementById('r3c2').value = 4;
  document.getElementById('r3c5').value = 5;
  document.getElementById('r4c3').value = 9;
  document.getElementById('r4c5').value = 3;
  document.getElementById('r5c3').value = 8;
  document.getElementById('r5c6').value = 9;
  document.getElementById('r5c7').value = 4;
  document.getElementById('r6c2').value = 3;
  document.getElementById('r6c7').value = 6;
  document.getElementById('r7c0').value = 6;
  document.getElementById('r7c3').value = 2;
  document.getElementById('r7c6').value = 1;
  document.getElementById('r8c0').value = 8;
  document.getElementById('r8c2').value = 9;
  document.getElementById('r8c4').value = 6;
  document.getElementById('r8c8').value = 5;
}


var rows = new Array();
function iniarray(x)
{
	for(var a = 0;a<9;a++)
	{
  	x[a] = new Array();
		for(var b = 0;b<9;b++)
  	{
  		x[a][b] = 0;
  	}
	}
}

var columns = new Array();

var boxes = new Array();


function Solve() 
{
  for(var i = 0;i<9;i++)
  {
    for(var j = 0;j<9;j++)
    {
      var n = document.getElementById("r"+i+"c"+j).value;
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
  if(document.getElementById("r"+y+"c"+x).value!="")
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
        document.getElementById("r"+y+"c"+x).value = i;
        if(fill(nx,ny)== true)
        {
            return true;
        }
        document.getElementById("r"+y+"c"+x).value = "";
        boxes[box_key][i] = 0;
        columns[x][i] = 0;
        rows[y][i] = 0;
    }   
   }
   return false;
}

function Clear() 
{
  var x=document.getElementsByTagName("input");
  for(var i=0;i<x.length-3;i++)
    {
      x[i].value = "";
    }
	iniarray(rows);
	iniarray(columns);
	iniarray(boxes);
}
