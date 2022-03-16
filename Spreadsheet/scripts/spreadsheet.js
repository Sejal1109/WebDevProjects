$(document).ready(function(){
    
    let col = $('thead tr:first-child th')
    col.click(function(){
        let colIndex = $(this).index()
        selectColumn(colIndex)
    })
    
    function selectColumn(index){
        deselectAll()
        let s = $('tr td:nth-child(' + (index+1) + ')')
        s.addClass('selected')
    }

    let row = $('tbody tr')
    row.click(function(){
        let rowIndex = $(this).index()
        selectRow(rowIndex)
    })
    function selectRow(rowIndex){
        deselectAll()
        let x = $('tbody tr:nth-child(' + (rowIndex+1) + ')')
        x.addClass('selected')
    }

    function deselectAll(){
        $('#table td').removeClass('selected')
        $('#table tbody tr').removeClass('selected')
    }
})