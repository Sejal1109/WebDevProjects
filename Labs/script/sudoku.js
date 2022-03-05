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
    
    function sameColumn(x1, y1, x2, y2) {
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
        let err = []
        function boardClick(){
            $(this).text(paletteValue)
            lastMove = this;
            let cellX = $(this).attr('r');
            let cellY = $(this).attr('c');  
 
            $("#board tr").each(function(){
                $('td', this).each(function(){
                    let cell = $(this)
                    y = cell.attr('r');
                    x = cell.attr('c'); 
                    if(cellX != y || cellY != x){
                        if(paletteValue == cell.text() && sameRow(cellX, cellY, y, x)){
                            err.push(cell)
                            cell.addClass('error'); 
                        }
                        else if(paletteValue == cell.text() && sameColumn(cellX, cellY, y, x)){
                            err.push(cell)
                            cell.addClass('error');
                        }
                        else if(paletteValue == cell.text() && sameBlock(cellX, cellY, y, x)){
                            err.push(cell)
                            cell.addClass('error');
                        }
                    }
                    
                    })
                })
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
                for(i=0; i<err.length; i++){
                    err[i].removeClass('error');
                }
                console.log(err);
                $(this).addClass('active').siblings().removeClass('active')
            }
            else{
                $(this).addClass('active').siblings().removeClass('active')
                paletteValue = $(this).text()
            }
        }
    })
