class TileMap{
    constructor(Default, Size, Padding, DebugText, FontSize, DebugMode, DebugLogging, textSlots, TextPaddingDenominator){
        this.Default = Default;
        this.Tiles = [];
        this.Size = Size;
        
        this.DebugText = optional(DebugText, false);
        this.DebugMode = optional(DebugMode, false);
        this.DebugLogging = optional(DebugLogging, false);
        
        this.Padding = optional(Padding, 20);
        this.FontSize = optional(FontSize, 15);
        this.PaddingDenominator = optional(TextPaddingDenominator, 8);
        this.textSlots = optional(textSlots, 3)
        
        this.warning = false;
    }
    
    AddTileType(name, color, rules){
        this.Default[name] = color;

        //remove later 
        optional(rules)
    }

    Initiate()
    {
        for(let y = 0; y < this.Size; y++){
            for(let x = 0; x < this.Size; x++){
                //make each tile equal to Default
                this.Tiles[y+(x*this.Size)+1] = this.Default;
            }
        }
    }

    Draw(){
        for(let y = 0; y < this.Size; y++){
            for(let x = 0; x < this.Size; x++){
                var tileDict = this.Tiles[y+(x*this.Size)+1]
                //select correct color default white
                if (Object.keys(tileDict).length == 1){
                    fill(tileDict[Object.keys(tileDict)[0]]);
                }
                else {
                    fill(255);
                }
                //draw the tile
                rect(this.Padding + x * ((width-this.Padding*2)/this.Size), this.Padding + y * ((height-this.Padding*2)/this.Size), (width-this.Padding*2)/this.Size, (height-this.Padding*2)/this.Size);
                //DebugText
                if(this.DebugText){
                    //check if debugtext fits inside slots, if not create warning message
                    if(Object.keys(this.Default).length > (this.textSlots*this.textSlots)-1){
                        if(this.warning == false){
                            console.log("You entered a imposible number for textSlots (there are too many tiles for the amount of slots you entered)")
                            this.warning = true; 
                        }
                    }
                    // if it fits display text
                    else{
                        for(let item = 0; item < Object.keys(tileDict).length; item++){
                            push();
                            fill(0);
                            translate((this.Padding + x * ((width-this.Padding*2)/this.Size)) + this.Padding/this.PaddingDenominator ,(this.Padding + y * ((height-this.Padding*2)/this.Size)) + this.Padding/this.PaddingDenominator);
                            textAlign(LEFT, TOP);
                            textSize(this.FontSize);
                            text(Object.keys(tileDict)[item], textPos(item, "x", this.textSlots) * ((width-this.Padding*2)/this.Size/this.textSlots) , textPos(item, "y", this.textSlots) * (height-this.Padding*2)/this.Size/this.textSlots);
                            text(y+(x*this.Size)+1  , (this.textSlots-1) * ((width-this.Padding*2)/this.Size/this.textSlots) , (this.textSlots-1) * (height-this.Padding*2)/this.Size/this.textSlots);
                            pop();
                        }
                    }
                }
            }
        }
    }

}

//additional functions
function optional(Var, Def){
    if(Var == undefined){
        return Def;
    }
    else{
        return Var;
    }
}
function textPos(c, axis, axisSlots){
    if (axis == "y"){
        return Math.floor(c/axisSlots)
    }
    if (axis == "x"){
    switch(axis == "x"){
        case c<axisSlots:
        return c;
        case c<axisSlots*2:
        return c-axisSlots;
        case c<axisSlots*3:
        return c-axisSlots*2;
    }
    }
}