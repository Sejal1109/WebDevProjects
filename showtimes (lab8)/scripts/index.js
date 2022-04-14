$(document).ready(function(){

    $('#MovieForm').submit(function(event){
        event.preventDefault();
        let location = $('#Location').val()
        var date = $('#movieDate').val();
        var newDate = date[0] + date[1] + date[2] + date[3] + "/" + date[5] + date[6] + "/" + date[8] + date[9]
        //alert(newDate)
        let table = $('#showtimes')
        let arr1 = []
        var title;
        table.html('')
        $.ajax({
            type: 'GET',
            url: 'showtimes.json',
            
            success: function(data){
                console.log(data)
                $.each(data, function(key, value){
                    if (value.location.search(location) != -1 && value.date == newDate){
                        title = value.title
                        console.log(title)
                        arr1 = value.times
                        console.log(arr1)
                        let  tr = $('<tr>')
                        let td1 = $("<td width = '80%' class='link'>")
                        td1.text(title)
                        tr.append(td1)
                        let td = $('<td>')
                        for(let i=0; i<arr1.length; i++){
                            td.append('<p>' + arr1[i] + '</p>')
                            tr.append(td)
                        }
                        table.append(tr)   
                    }
                })

                $("td").each(function(){
                    $(this).click(function(){
                        var movie = $(this).text()
                        var movieId;
                        $.each(data, function(key, value){
                            if(value.title == movie){
                                movieId = value.id
                            }
                        })
                        getMovieInfo(movieId)
                        console.log(movieId)
                    
                    })
                })
                
                function getMovieInfo(id){
                    $.ajax({
                    type: 'GET',
                    url: 'http://www.omdbapi.com/?apikey=' + 'bd7ccd8c' + '&i=' + id,
                    success: function(information){
                        console.log(information)
                        $('#info').html('')
                        let poster = $('<p><img src="' + information.Poster + '" class="image"></p>')
                        $('#info').append(poster)
                        let title = $('<p><label for="title">Title: </label><input type="text" id="title" value="' + information.Title + '" readonly ></p>')
                        $('#info').append(title)
                        let year = $('<p><label for="year">Year: </label><input type="text" id="year" value="' + information.Year + '" readonly ></p>')
                        $('#info').append(year)
                        let genre = $('<p><label for="genre">Genre: </label><input type="text" id="Genre" value="' + information.Genre + '" readonly ></p>')
                        $('#info').append(genre)
                        let rt = $('<p><label for="rt">Runtime: </label><input type="text" id="runtime" value="' + information.Runtime + '" readonly ></p>')
                        $('#info').append(rt)
                        let director = $('<p><label for="director">Director: </label><input type="text" id="director" value="' + information.Director + '" readonly ></p>')
                        $('#info').append(director)
                        let writer = $('<p><label for="writer">Writer: </label><input type="text" id="writer" value="' + information.Writer + '" readonly ></p>')
                        $('#info').append(writer)
                        let actors = $('<p><label for="actors">Actors: </label><input type="text" id="actors" value="' + information.Actors + '" readonly ></p>')
                        $('#info').append(actors)
                    }
                })
                }
            }
        })
    })
})