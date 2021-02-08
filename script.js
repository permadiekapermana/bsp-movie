// function search movie
function searchMovie() {

    // mengkosongkan html terlebih dahulu ketika akan melakukan pencarian ulang, agar data pencarian sebelumnya tidak ikut tampil
    $('#movie-list').html('');

    $.ajax({
        // data API
        url : 'http://omdbapi.com/',
        type : 'get',
        dataType : 'json',
        data : {
            'apikey' : '8f102fb1',
            's' : $('#input').val()
        },
        // return response API
        success : function (result) {
            // jika response True
            if(result.Response == 'True') {
                let movies = result.Search;

                // debug tampil object movies
                // console.log(movies);
                
                $.each(movies, function (i, data){
                    $('#movie-list').append(`
                        <div class="col-md-4">
                        <div class="card mb-3" style="width: 18rem;">
                            <img src="${data.Poster}" class="card-img-top" alt="Image not Found!">
                            <div class="card-body">
                            <h5 class="card-title">${data.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                            <a href="#" style="text-decoration: none;" class="card-link">Go detail</a>
                            </div>
                        </div>
                        </div>
                    `);
                });

                // menghapus text bekas input di search input
                $('#input').val('');

            // jika response false
            } else {
                $('#movie-list').html(`
                <h3 class="text-center"><font color="red">Error 404</font> : ${result.Error} </h3>
                `)
            }
        }
    });

}

// function when class search on click
$('#search').on('click', function() {

    searchMovie();

});


// function menggunakan enter pada kolom input
$('#input').on('keyup', function(event) {
    if (event.which == 13){
        searchMovie();
    }
});