//done 
var Default = ["G","W","S","T","B","D"]
var Tiles = [];
var collapsed;

var Size = 30;
var Padding = 20;
var PaddingDenominator = 8;
var FontSize = 10;

var DebugText = false;
var DebugMode = false;
var DebugLogging = false;


function setup() {
  createCanvas(600, 600);
  CreateTilemap();
}
function draw(){
  background(220); 
  if(DebugMode == false){
    CollapseOne();
  }
  //for(let err = 0; err<2; err++){
    for(let y = 0; y < Size; y++){
      for(let x = 0; x < Size; x++){
        CalculateSP(y+(x*Size)+1);
      }
    }
  //}
  DrawTiles();
}

//done
function CreateTilemap(){
  for(let y = 0; y < Size; y++){
    for(let x = 0; x < Size; x++){
      Tiles[y+(x*Size)+1] = Default ;
    }
  }
}
function DrawTiles(){
  for(let y = 0; y < Size; y++){
    for(let x = 0; x < Size; x++){
      if (Tiles[y+(x*Size)+1].length == 1){
        switch(Tiles[y+(x*Size)+1][0]){
          case Tiles[y+(x*Size)+1][0] = "G":
            fill(0,255,0);
            break;
            case Tiles[y+(x*Size)+1][0] = "S":
              fill(255,255,0);
              break;
              case Tiles[y+(x*Size)+1][0] = "W":
                fill(35,206,250);
                break;
                case Tiles[y+(x*Size)+1][0] = "T":
                  fill(165,42,42);
                  break;
                  case Tiles[y+(x*Size)+1][0] = "B":
                    fill(93,58,26);
                    break;
                    case Tiles[y+(x*Size)+1][0] = "D":
                    fill(0,0,255);
                    break;
                  }
              }
              else {fill(255)}
              noStroke();
              rect(Padding + x * ((width-Padding*2)/Size), Padding + y * ((height-Padding*2)/Size), (width-Padding*2)/Size, (height-Padding*2)/Size);
              for(let e = 0; e < Tiles[y+(x*Size)+1].length; e++){
                if(DebugText){
        push();fill(0);translate((Padding + x * ((width-Padding*2)/Size)) + Padding/PaddingDenominator ,(Padding + y * ((height-Padding*2)/Size)) + Padding/PaddingDenominator);textAlign(LEFT, TOP);textSize(FontSize);
        text(Tiles[y+(x*Size)+1][e], defbythree(e, "x") * ((width-Padding*2)/Size/3) , defbythree(e, "y") * (height-Padding*2)/Size/3);
        textSize(FontSize/1.3);
        text(y+(x*Size)+1  , 2 * ((width-Padding*2)/Size/3) , 2 * (height-Padding*2)/Size/3);
        pop();
                }
      }
    }
  }
}
function defbythree(c, axis){
  if (axis == "y"){
    switch(axis == "y"){
      case c<3:
        return 0;
      case c<6:
        return 1;
      case c<9:
        return 2;
    }
  }
  if (axis == "x"){
    switch(axis == "x"){
      case c<3:
        return c;
      case c<6:
        return c-3;
      case c<9:
        return c-6;
    }
  }
}
function CalculateSP(tile){
  for(let pos = 0; pos < GetNeigbours(tile).length; pos++){
    var NeigbourSP = Tiles[GetNeigbours(tile)[pos]];
    if (NeigbourSP.includes("G") == false && NeigbourSP.includes("S") == false && NeigbourSP.includes("T") == false && Tiles[tile].includes("G")){       
      Tiles[tile] = del(Tiles[tile], "G");
      if(tile == 66 && pos == 5){
        return Tiles[tile]
      }
      if(DebugLogging){console.log("Deleted G on tile: " + tile)}
    }
    if (NeigbourSP.includes("W") == false && NeigbourSP.includes("S") == false && NeigbourSP.includes("D") == false && Tiles[tile].includes("W")){       
      Tiles[tile] = del(Tiles[tile], "W");
      if(DebugLogging){console.log("Deleted W on tile: " + tile)}
    }
    if (NeigbourSP.includes("G") == false && NeigbourSP.includes("S") == false && NeigbourSP.includes("W") == false && Tiles[tile].includes("S")){       
      Tiles[tile] = del(Tiles[tile], "S");
      if(DebugLogging){console.log("Deleted S on tile: " + tile)}
    }
    if (NeigbourSP.includes("G") == false && NeigbourSP.includes("T") == false && NeigbourSP.includes("B") == false &&Tiles[tile].includes("T")){       
      Tiles[tile] = del(Tiles[tile], "T");
      if(DebugLogging){console.log("Deleted T on tile: " + tile)}
    }
    if (NeigbourSP.includes("T") == false && NeigbourSP.includes("B") == false && Tiles[tile].includes("B")){       
      Tiles[tile] = del(Tiles[tile], "B");
      if(DebugLogging){console.log("Deleted B on tile: " + tile)}
    }
    if (NeigbourSP.includes("W") == false && NeigbourSP.includes("D") == false && Tiles[tile].includes("D")){       
      Tiles[tile] = del(Tiles[tile], "D");
      if(DebugLogging){console.log("Deleted D on tile: " + tile)}
    }
  }
  function del(list, value){
    var array = Array.from(list)
    var index = array.indexOf(value)
    if(index>-1){
      array.splice(index,1)
    }
    return array
  }
}
function GetNeigbours(tile){
  var x = Math.ceil(tile/Size);
  var y = Size - ((x*Size)-tile);
  
  var a = x - 1;
  var i = y - 1;
  
  switch(true){
    case y == 1 && x == 1:
      return[(i)+((a+1)*Size)+1,(i+1)+((a+1)*Size)+1,(i+1)+((a)*Size)+1];
    break;
    case y == 1 && x == Size:
      return[(i+1)+((a)*Size)+1,(i+1)+((a-1)*Size)+1,(i)+((a-1)*Size)+1];
    break;
    case y == Size && x == 1:
      return[(i-1)+((a)*Size)+1,(i-1)+((a+1)*Size)+1,(i)+((a+1)*Size)+1];
      break;
    case y == Size && x == Size:
      return[(i-1)+((a-1)*Size)+1,(i-1)+((a)*Size)+1,(i)+((a-1)*Size)+1];
    break;
    //not a corner piece
    case x == 1:
      return[(i-1)+((a)*Size)+1,(i-1)+((a+1)*Size)+1,(i)+((a+1)*Size)+1,(i+1)+((a+1)*Size)+1,(i+1)+((a)*Size)+1];  
    break;
    case y == Size:
      return[(i-1)+((a-1)*Size)+1,(i-1)+((a)*Size)+1,(i-1)+((a+1)*Size)+1,(i)+((a+1)*Size)+1,(i)+((a-1)*Size)+1];
    break;
    case y == 1:
      return[(i)+((a+1)*Size)+1,(i+1)+((a+1)*Size)+1,(i+1)+((a)*Size)+1,(i+1)+((a-1)*Size)+1,(i)+((a-1)*Size)+1];
    break;
    case x == Size:
      return[(i-1)+((a-1)*Size)+1,(i-1)+((a)*Size)+1,(i+1)+((a)*Size)+1,(i+1)+((a-1)*Size)+1,(i)+((a-1)*Size)+1];
    break;
    //not a side piece
    default:
      return([(i-1)+((a-1)*Size)+1,(i-1)+((a)*Size)+1,(i-1)+((a+1)*Size)+1,(i)+((a+1)*Size)+1,(i+1)+((a+1)*Size)+1,(i+1)+((a)*Size)+1,(i+1)+((a-1)*Size)+1,(i)+((a-1)*Size)+1]);
    break;
  }
}
function CollapseOne(){
  var lowestcap = [];
  
  for(let y = 0; y < Size; y++){
    for(let x = 0; x < Size; x++){
      if (Tiles[y+(x*Size)+1].length < Default.length && Tiles[y+(x*Size)+1].length > 1){
        lowest.push(y+(x*Size)+1);
      }
    }
  }
  if (Tiles[1] == Default && Tiles[Size] == Default && Tiles[(Size*Size)-Size+1] == Default && Tiles[(Size * Size)] == Default){
    lowest = [1,Size,(Size*Size)-Size+1,(Size * Size)]
  }
  if(lowest.length > 0){
    var CollapsingCellNumber = random(lowest) 
    var chosen = random(Tiles[CollapsingCellNumber])
    if(DebugLogging){console.log("collapsed cell number: " + CollapsingCellNumber + " to: " + chosen + " chosen from: " + Tiles[CollapsingCellNumber])}
    Tiles[CollapsingCellNumber] = [chosen]
  }
}
function keyPressed() {
  if (keyCode === 32 && DebugMode) {
    CollapseOne();
  }
}