$(document).ready(function(){
    
    var grades =[]
    var i =0;

    let table = $('#table')
    $.ajax({
        type: 'GET',
        url: 'grades.csv',
        datatype: 'text',
        success: function(response){
            let rows = response.split('\n')
            let thead = $('<thead>')
            let tr = $('<tr>')
            let headings = rows[0].split(',')
            for(i=0; i<headings.length; i++){
                let th = $('<th>')
                th.text(headings[i])
                tr.append(th)
            }
            thead.append(tr)
            table.append(thead)
            let tbody = $('<tbody>')
            for(i=1;i<rows.length;i++){
                let tr = $('<tr>')
                let data = rows[i].split(',')
                for(j=0; j<data.length; j++){
                    if(j==0){
                        let th = $('<th>')
                        th.text(data[j])
                        tr.append(th)
                    }
                    else{
                        let td = $('<td>')
                        td.text(data[j])
                        tr.append(td)
                    }
                    tbody.append(tr)
                    table.append(tbody)
                }

            }
        }
        
    })

    let col = $('thead tr:first-child th')
    col.click(function(){
        let colIndex = $(this).index()
        selectColumn(colIndex)
    })

    let row = $('tbody tr th')
    row.click(function(){
        let rowIndex = $(this).parent().index()
        console.log(rowIndex)
        selectRow(rowIndex)
    });

    let td = $('tbody td')
    td.click(function(){
        deselectAll();
        let cell = $(this);
        var text = cell.text();
        cell.html("<input type='text' />");
        console.log(text)
        $("input").show();
        $("input").val(text).trigger("focus");
        $("input").keyup(function(event){
            if(event.which == 13){
                var newtxt = $(this).val();
                cell.text(newtxt);
            }
        })
        $("input").click(function(){
            return false
        })
        
    })
   
        
    function selectColumn(index){
        d3.selectAll("svg").remove();
        deselectAll()
        grades=[]
        i =0;
        let s = $('tr td:nth-child(' + (index+1) + ')')
        $('tr td:nth-child(' + (index+1) + ')').each(function(){
            grades[i] = $(this).text()
            i++;
        })
        console.log(grades)
        s.addClass('selected')

        initializeGraph();
    }

    function selectRow(rowIndex){
        d3.selectAll("svg").remove();
        grades=[]
        i=0;
        deselectAll()
        let x = $('tbody tr:nth-child(' + (rowIndex+1) + ') td')
        $('tbody tr:nth-child(' + (rowIndex+1) + ') td').each(function(){
            grades[i] = $(this).text()
            i++;
        })
        console.log(grades)
        x.addClass('selected')
        initializeGraph();
    }

    function deselectAll(){
        $('#table td').removeClass('selected')
        $('#table tbody tr').removeClass('selected')
        $("input").each(function () {
            $(this).hide();
        });
    }

    function initializeGraph() {
        d3.select("div#container").selectAll("svg").remove();
        const gradeData = createData();
        const colorScale = d3.scaleLinear()
        .domain([0, 1])
        .range(['white', 'blue'])

        const margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        const svg = d3.select('div#container')
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

        const x = d3.scaleBand()
        .range([ 0, width ])
        .domain(gradeData.map(d => d.grade))
        .padding(0.2);

        svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
    
      // Add Y axis
        const y = d3.scaleLinear()
        .domain([0, 1])
        .range([ height, 0]);
         svg.append("g")
        .call(d3.axisLeft(y));
    
        // Bars
        svg.selectAll("rect")
        .data(gradeData)
        .enter()
        .append("rect")
        .attr("x", d => x(d.grade))
        .attr("y", d => y(d.frequency))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.frequency))
        .attr("fill",  d => colorScale(d.frequency))

        svg.append("text")             
        .attr("transform",
              "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Grade");

        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Frequency(%)");
    }

    function createData() {
        var a = 0;
        var b = 0;
        var c = 0;
        var d = 0;
        var f = 0;

        for (i = 0; i < grades.length; i++) {
        
            if (grades[i] > 90) {
                a++;
            } else if (grades[i] > 70) {
                b++
            } else if (grades[i] > 60) {
                c++
            } else if (grades[i] > 50) {
                d++;
            } else {
                f++;
            }
        }
        const freq = [
            (a / grades.length),
            (b / grades.length),
            (c / grades.length),
            (d / grades.length),
            (f / grades.length),
        ];

        return data = [
            { "grade": "A", "frequency": freq[0] },
            { "grade": "B", "frequency": freq[1] },
            { "grade": "C", "frequency": freq[2] },
            { "grade": "D", "frequency": freq[3] },
            { "grade": "F", "frequency": freq[4] }
        ];
    }
});
