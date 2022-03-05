$(document).ready(function() {

    var boardValues = [
        [-1, 1, -1, -1, -1, -1, -1, 9, -1],
        [-1, -1, 4, -1, -1, -1, 2, -1, -1],
        [-1, -1, 8, -1, -1, 5, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, 3, -1],
        [2, -1, -1, -1, 4, -1, 1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, 1, 8, -1, -1, 6, -1, -1],
        [-1, 3, -1, -1, -1, -1, -1, 8, -1],
        [-1, -1, 6, -1, -1, -1, -1, -1, -1]
    ];

    function sameBlock(x1, y1, x2, y2) {
        let firstRow = Math.floor(y1 / 3) * 3;
        let firstCol = Math.floor(x1 / 3) * 3;
        return (y2 >= firstRow && y2 <= (firstRow + 2) && x2 >= firstCol && x2 <= (firstCol + 2));
    }
    
    function sameRow(x1, y1, x2, y2) {
        return y1 == y2;
    }
    
    function sameColumn(x1, x2) {
        return x1 == x2;
    }
        var cellID;
        var lastMove; 
        let board = $("#board");
        for(y=0; y<9; y++){
            let tr = $("<tr>");;
            for(x=0; x<9; x++){
                let td = $("<td>");
                if(boardValues[y][x] == -1){
                    td.text(' ');
                    td.attr('r', y)
                    td.attr('c', x)
                    td.click(boardClick)
                }
                else{
                    td.attr('r', y)
                    td.attr('c', x)
                    td.text(boardValues[y][x]);
                }
                tr.append(td)
            }
            board.append(tr)
        }
        function boardClick(){
            $(this).text(paletteValue)
            lastMove = this;
            let cellX = $(this).attr('r');
            let cellY = $(this).attr('c');  
            for(y=0; y<9; y++){
                for(x=0; x<9; x++){
                    if(paletteValue == $(this).text() && sameRow(cellX, cellY, y, x)){
                        $(this).addClass('error').siblings.removeClass('error');
                    }
                }
            }
        }
        
        let palette = $("#palette")
        let tr = $("<tr>");
        for(x=0; x<10; x++){
            if(x == 9){
                let th = $("<th>");
                th.prepend($('<img>', {id: 'undo', src: 'images/undo.png'}))
                th.attr('id', '0'+x)
                th.click(paletteClick)
                tr.append(th);
            }
            else{
                let th = $("<th>");
                th.text(x+1);
                th.attr('id', '0'+x)
                th.click(paletteClick)
                tr.append(th)
            }
        }
        palette.append(tr)

        var paletteValue = ''
        function paletteClick(){
            if(this.id == "09"){
                lastMove.innerHTML = ' ';
                $(this).addClass('active').siblings().removeClass('active')
            }
            else{
                $(this).addClass('active').siblings().removeClass('active')
                paletteValue = $(this).text()
            }
        }
    })
