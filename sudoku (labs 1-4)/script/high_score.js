$(document).ready(function(){
    var hsVals = [
        {Date: "2021/01/17", Duration: "3:41"},
        {Date: "2021/01/21", Duration: "4:01"},
        {Date: "2021/02/17", Duration: "2:51"},
        {Date: "2021/03/02", Duration: "3:01"}, 
    ];

    let table = $("#high_scores");
    let data = Object.keys(hsVals[0])
    let tr = $("<tr>")
    for(let key of data){
        let th = $("<th>");
        th.text(key);
        tr.append(th)
    }
    table.append(tr)

    for(let elem of hsVals) {
        let tr = $("<tr>")
        for(key in elem){
            let td = $("<td>");
            td.text(elem[key])
            tr.append(td)
        }
        table.append(tr)
    }

})