var board;
var score=0;
var rows=4;
var columns=4;

window.onload=function() {
    setBoard();
}

function setBoard(){
    board=[
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    // board=[
    //     [2, 2, 0, 0],
    //     [0, 2, 0, 2],
    //     [4, 4, 0, 8],
    //     [4, 4, 8, 8]
    // ]

    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num=board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
}

function hasEmptyTile() {
    for(let r=0; r<rows; r++){
        for(let c=0; c<columns; c++){
            if(board[r][c]==0){
                return true;
            }
        }
    }
    return false;
}

function setAny(num) {
    if(num<2){
        setTwo();
    }
    else{
        setFour();
    }
}

function setTwo() {
    if(!hasEmptyTile()){
        return;
    }

    let fnd=0;
    while(!fnd){
        let r=Math.floor(Math.random()*rows);
        let c=Math.floor(Math.random()*columns);
        if(board[r][c]==0){
            board[r][c]=2;
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            tile.innerText="2";
            tile.classList.add("x2");
            fnd=true;
        }
    }
}

function setFour() {
    if(!hasEmptyTile()){
        return;
    }

    let fnd=0;
    while(!fnd){
        let r=Math.floor(Math.random()*rows);
        let c=Math.floor(Math.random()*columns);
        if(board[r][c]==0){
            board[r][c]=4;
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            tile.innerText="4";
            tile.classList.add("x4");
            fnd=true;
        }
    }
}

function updateTile(tile, num){
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if(num>0){
        tile.innerText = num;
        if(num<=4096){
            tile.classList.add("x"+num.toString());
        }
        else{
            tile.classList.add("x8192");
        }
    }
}

function noMoves() {
    for(let r=0; r<rows; r++){
        for(let c=0; c<columns-1; c++){
            if(board[r][c]==board[r][c+1]){
                return 0;
            }
        }
    }
    for(let c=0; c<columns; c++){
        for(let r=0; r<rows-1; r++){
            if(board[r][c]==board[r+1][c]){
                return 0;
            }
        }
    }
    return 1;
}

document.addEventListener("keyup", (e) => {
    let num=Math.floor(Math.random()*3);
    if(e.code == "ArrowLeft"){
        slideLeft();
        setAny(num);
    }
    else if(e.code == "ArrowRight"){
        slideRight();
        setAny(num);
    }
    else if(e.code == "ArrowUp"){
        slideUp();
        setAny(num);
    }
    else if(e.code == "ArrowDown"){
        slideDown();
        setAny(num);
    }
    document.getElementById("score").innerText=score;
    if(!hasEmptyTile() && noMoves()){
        alert("You lost and Your score is: "+score);
    }
})

function filterZero(row) {
    return row.filter(num => num!=0);
}

function slide(row){
    row=filterZero(row);
    for(let i=0; i<row.length-1; i++){
        if(row[i]==row[i+1]){
            row[i]*=2;
            row[i+1]=0;
            score+=row[i];
        }
    }
    row=filterZero(row);
    while(row.length < columns){
        row.push(0);
    }
    return row;
}

function slideRight() {
    for(let r=0; r<rows; r++){
        let row = board[r];
        row.reverse();
        row=slide(row);
        row.reverse();
        board[r]=row;

        for(let c=0; c<columns; c++){
            let tile=document.getElementById(r.toString() +"-"+ c.toString());
            let num=board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideLeft() {
    for(let r=0; r<rows; r++){
        let row = board[r];
        row=slide(row);
        board[r]=row;

        for(let c=0; c<columns; c++){
            let tile=document.getElementById(r.toString() +"-"+ c.toString());
            let num=board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for(let c=0; c<columns; c++){
        let row = [];
        for(let r=0; r<rows; r++){
            row.push(board[r][c]);
        }
        row=slide(row);
        // for(let r=0; r<rows; r++){
        //     board[r][c]=row[r];
        // }

        for(let r=0; r<rows; r++){
            board[r][c]=row[r];
            let tile=document.getElementById(r.toString() +"-"+ c.toString());
            let num=board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for(let c=0; c<columns; c++){
        let row = [];
        for(let r=0; r<rows; r++){
            row.push(board[r][c]);
        }
        row.reverse();
        row=slide(row);
        row.reverse();
        // for(let r=0; r<rows; r++){
        //     board[r][c]=row[r];
        // }

        for(let r=0; r<rows; r++){
            board[r][c]=row[r];
            let tile=document.getElementById(r.toString() +"-"+ c.toString());
            let num=board[r][c];
            updateTile(tile, num);
        }
    }
}