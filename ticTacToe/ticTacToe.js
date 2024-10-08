const controlGame = document.getElementById("controlGame");
controlGame.addEventListener("click", startGame);
(document.getElementById("+")).addEventListener("click", () => { updateBoardSize((x) => x + 1) });
(document.getElementById("-")).addEventListener("click", () => { updateBoardSize((x) => x - 1) });
let turn; //x false, o true
let turnsNum;
let board = document.getElementById("board");
let squares2D;
let squares;
buildBoardGeneric();

function buildBoardGeneric() {
    buildBoard(boardSizeX, boardSizeY);
}

function buildBoard(boardSizeX, boardSizeY) {
    board.innerHTML = "";
    for (let i = 0; i < boardSizeX * boardSizeY; i++) {
        let square = document.createElement("div");
        square.style.width = 100 / boardSizeX + "%";
        square.style.height = 100 / boardSizeX + "%";

        board.appendChild(square);
    }
    squares = board.querySelectorAll("div");

    squares2D = [];
    for (let i = 0; i < boardSizeX * boardSizeY; i++) {
        if (i % boardSizeX == 0) squares2D.push([]);
        (squares2D[Math.floor(i / boardSizeX)]).push(squares[i]);

    }
}

function updateBoardSize(update) {
    console.log("here");
    controlGame.addEventListener("click", startGame);
    controlGame.textContent = "start Game";
    controlGame.removeEventListener("click", reload);

    boardSizeX = update(boardSizeX);
    boardSizeY = update(boardSizeY);
    buildBoardGeneric();
}

function startGame() {
    controlGame.textContent = "Reset Game";
    controlGame.removeEventListener("click", startGame);
    console.log("wow");
    controlGame.addEventListener("click", reload);

    turn = false;
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", doTurn);
        squares[i].setAttribute("status", null);
    }
    turnsNum = 0;
}

function reload(){
    window.location.reload();
}

function doTurn(event) {
    // atrubite values is always string, so we parse it
    const isAvailable = JSON.parse(event.target.getAttribute("status"))
    if (isAvailable !== null) return;

    turnsNum++;
    event.target.setAttribute("status", turn);
    if (turn) event.target.innerHTML = oImage;
    else event.target.innerHTML = xImage;

    if (hasWon(findSquarePlace(event.target), turn)){
        gameWon(turn);
        return;
    }
    
    if(turnsNum == boardSizeX * boardSizeY){
        gameOver(null);
    }
    turn = !turn;
    
    return;
}

function findSquarePlace(element) {
    for (let i = 0; i < squares.length; i++)
        if (squares[i] == element) return i;

    return undefined;
}

function hasWon(wasPlaced, maybeWon) {
    let placeX = Math.floor(wasPlaced % boardSizeX);
    let placeY = Math.floor(wasPlaced / boardSizeY);
    console.log("row");
    let wonRow = hasWonSpecific((i) => i, (i) => placeY, maybeWon, boardSizeX);
    console.log("column");
    let wonColumn = hasWonSpecific((i) => placeX, (i) => i, maybeWon, boardSizeY)
    let wonDiagnol = false, wonRevDiagnol = false;
    if (placeX == placeY) wonDiagnol = hasWonSpecific((i) => i, (i) => i, maybeWon, boardSizeY)
    if (placeX == boardSizeY - placeY - 1) wonRevDiagnol = hasWonSpecific((i) => boardSizeY - i - 1, (i) => i, maybeWon, boardSizeY)


    return (wonRow || wonColumn || wonDiagnol || wonRevDiagnol)
}

function hasWonSpecific(xCheck, yCheck, maybeWon, max) {
    console.log("check")
    for (let i = 0; i < max; i++) {
        if (JSON.parse(squares2D[yCheck(i)][xCheck(i)].getAttribute("status")) != maybeWon) return false;
    }
    return true;
}

function gameWon(winner) {
    gameOver(winner);
}

function gameOver(hasWon) {
    for (let i = 0; i < squares.length; i++)
        squares[i].removeEventListener("click", doTurn);
    console.log(hasWon);
    if(hasWon == true)  {
        console.log("circle won");
        let gameOverTitle=document.createElement("h1")
        gameOverTitle.classList.add("gameover");
        let child=document.createElement("h2")
        child.innerHTML="O WON";
        gameOverTitle.innerHTML="GAME OVER!"
        gameOverTitle.appendChild(child);
        board.replaceWith(gameOverTitle)
    }
    else if(hasWon == false) { 
        console.log("x won");
        let gameOverTitle=document.createElement("h1")
        gameOverTitle.classList.add("gameover");
        let child=document.createElement("h2")
        child.innerHTML="X WON";
        gameOverTitle.innerHTML="GAME OVER!"
        gameOverTitle.appendChild(child);
        board.replaceWith(gameOverTitle)} 
    else{ 
        console.log("nobody won")
        let gameOverTitle=document.createElement("h1")
        gameOverTitle.classList.add("gameover");
        let child=document.createElement("h2")
        child.innerHTML="TIE";
        gameOverTitle.innerHTML="GAME OVER!"
        gameOverTitle.appendChild(child);
        console.log('gameOverTitle: ', gameOverTitle);
        board.replaceWith(gameOverTitle)
    }
}