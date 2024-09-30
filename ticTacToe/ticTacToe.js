(document.getElementById("start-game")).addEventListener("click", startGame);
(document.getElementById("+")).addEventListener("click", () => {updateBoard((x)=>x+1)});
(document.getElementById("-")).addEventListener("click", () => {updateBoard((x)=>x-1)});
let turn= false; //x false, o true

let board = document.getElementById("board");
let squares2D = [];
let squares;
buildBoardGeneric();

function buildBoardGeneric(){
    buildBoard(boardSizeX, boardSizeY);
}

function buildBoard(boardSizeX, boardSizeY){
    board.innerHTML = "";
    console.log("cleared");
    for(let i = 0; i<boardSizeX*boardSizeY; i++){
        let square = document.createElement("div");
        square.style.width = 100/boardSizeX+ "%";
        square.style.height = 100/boardSizeX+ "%";
        
        board.appendChild(square);
    }
    squares = board.querySelectorAll("div");


    for(let i = 0; i<boardSizeX*boardSizeY; i++){
        if(i%boardSizeX == 0)  squares2D.push([]);
        (squares2D[Math.floor(i/boardSizeX)]).push(squares[i]); 
        
    }   
}

function updateBoard(update){
    boardSizeX = update(boardSizeX);
    boardSizeY = update(boardSizeY);
    buildBoardGeneric();
}

function startGame(){
    turn = false;
    for(let i = 0; i<squares.length; i++){
        squares[i].addEventListener("click", doTurn);
        squares[i].setAttribute("status",undefined);
    }

   
    
}

function doTurn(event){
    if(event.target.status !== undefined)     return;
    event.target.status = turn;

    if(turn)    event.target.innerHTML = oImage;
    else    event.target.innerHTML = xImage;

    let winner = hasWon(findSquarePlace(event.target), turn);
    if(winner) gameWon(winner);
    turn = !turn;
 
    return;
}

function findSquarePlace(element){
    for(let i = 0; i<squares.length; i++)
        if(squares[i] == element)   return i;

    return undefined;
}

function hasWon(wasPlaced,maybeWon){
    let placeX = Math.floor(wasPlaced%boardSizeX);
    let placeY = Math.floor(wasPlaced/boardSizeY);

    let wonRow = hasWonSpecific((i)=>i, (i) => placeY, maybeWon, boardSizeX);
    let wonColumn = hasWonSpecific((i) => placeX, (i)=>i, maybeWon, boardSizeY)
    let wonDiagnol = false, wonRevDiagnol =false;
    if(placeX == placeY) wonDiagnol = hasWonSpecific((i) => i, (i)=>i, maybeWon, boardSizeY)
    if(placeX == boardSizeY-placeY-1) wonRevDiagnol = hasWonSpecific((i) => boardSizeY-i-1, (i)=>i, maybeWon, boardSizeY)


    return (wonRow || wonColumn || wonDiagnol || wonRevDiagnol)  
}

function hasWonSpecific(xCheck, yCheck, maybeWon, max){
    console.log("check")
    for(let i=0; i<max; i++){
        if(squares2D[yCheck(i)][xCheck(i)].status != maybeWon) return false;
    }
    return true;
}

function gameWon(winner){
    console.log("game won");
    gameOver();
}

function gameOver(){
    for(let i = 0; i<squares.length; i++)
        squares[i].removeEventListener("click", doTurn);

}