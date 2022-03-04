var boardValues = [
    [-1, 1, -1, -1, -1, -1, -1, 9, -1],
    [-1,-1,4,-1,-1,-1,2,-1,-1],
    [-1,-1,8,-1,-1,5,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,3,-1],
    [2,-1,-1,-1,4,-1,1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,1,8,-1,-1,6,-1,-1],
    [-1,3,-1,-1,-1,-1,-1,8,-1],
    [-1,-1,6,-1,-1,-1,-1,-1,-1]
];

function sameBlock(x1, y1, x2, y2) {
    let firstRow = Math.floor(y1 / 3) * 3;
    let firstCol = Math.floor(x1 / 3) * 3;
    return (y2 >= firstRow && y2 <= (firstRow + 2) && x2 >= firstCol && x2 <= (firstCol + 2));
}

function sameRow(x1, y1, x2, y2) {
    return y1 == y2;
}

function sameColumn(x1, y1, x2, y2) {
    return x1 == x2;
}

window.onload = function(){
    let gameTable = document.getElementById("board");
    //let palTable = document.getElementById("palette");

    //gameTable.innerHTML = "";
    var gameBoard = "<table id=\"board\" class=\"game-board\">";

    for(var i = 0; i < 9; i++){
        // row <tr>
        if(i==0){
            gameBoard += "<tr class = \"topRow\">";
        }

        else if(i==2 || i==5 || i==8){
            gameBoard += "<tr class = \"boldRow\">";
        }

        else{
            gameBoard += "<tr>"
        }

        for(var j = 0; j < 9; j++){
            // cols <td>
            gameBoard += `<td class = \"cell${i}${j}\">`;

            if(boardValues[i][j] != -1){
                gameBoard += boardValues[i][j];
            }

            gameBoard += "</td>"

        }

        gameBoard += "</tr>"
    }

    gameBoard += "</table>"
    console.log(gameBoard);
    gameTable.innerHTML = gameBoard;

    let board = document.getElementById("board");
    for(y=0; y<9; y++){
        let tr = document.getElementsByTagName("tr");;
        for(x=0; x<9; x++){
            let td = document.getElementsByTagName("td");;
            td.text(' ')
            td.click(boardClick)
            tr.append(td)
        }
        board.append(tr)
    }
    function boardClick(){
        $(this).text(paletteValue)
    }

    let palette = document.getElementById("palette")
    for (y =0; y<1; y++){
        let tr = document.getElementsByTagName("tr");
        for(x=0; x<9; x++){
            let td = document.getElementsByTagName("td");;
            td.text(x);
            td.click(paletteClick)
            tr.append(td)
        }
        palette.append(tr)
    }

    var paletteValue = ''
    function paletteClick(){
        paletteValue = $(this).text()
        alert($(this.text()))
    }
}
