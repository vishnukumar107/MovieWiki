//initializing the variables and getting input from the user
var myform =document.querySelector('#searchform');
var nameinput=document.querySelector('#searchtext');
myform.addEventListener('submit',(e)=>{
    let searchText=(nameinput.value);
    getMovies(searchText);
    e.preventDefault();
})
//function to display the movies in the front page
function getMovies(searchText){
    sessionStorage.setItem('searchid',searchText);
    const url = 'http://www.omdbapi.com/?s='+searchText+'&apikey=b4095f54';
    //fetching the details using the fetch API
    fetch(url)
    .then(
        function(response) {
            //to check if there was a problem in fetching
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
            response.status);
            return;
        }
        response.json().then(function(data) {
            let movies = data.Search;
            //To give a alert message when no movie is present
            if(movies === undefined){
                alert("No Movies Found!!")
            }
            //html tag for displaying outpput
            let output ='';
            var output1='';
            for(let i=0;i<movies.length;i++){
                if(i<6){
                    output+=`
                                <div class="box-1">
                                        <a onclick="movieSelected('${movies[i].imdbID}')" href="#">
                                                <img src="${movies[i].Poster}" class="listimage">
                                        </a>
                                    <h3 class="header3">${movies[i].Title}</h3>
                                </div>
                    `
                }
                else{
                    output1+=`
                                <div class="box-1">
                                        <a onclick="movieSelected('${movies[i].imdbID}')" href="#">
                                                <img src="${movies[i].Poster}" class="listimage">
                                        </a>
                                    <h3 class="header3">${movies[i].Title}</h3>
                                </div>
                    `
                }
            }
            output1=output+output1;
            if(movies.length>6){
            output+=`
                <div align = "center">
                     <a onclick="display()"  class="button" href="#">show more</a>
                <div> 

            `
            }
            //displaying the output and storing some data in storage
            document.getElementById('movies').innerHTML=output;
            sessionStorage.setItem('output1',output1);
            store=document.getElementsByTagName('html')[0].innerHTML;
            sessionStorage.setItem('store',store);
        });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}
//To display when show more button is clicked
function display(){
    searchid=sessionStorage.getItem('searchid');
    output1=sessionStorage.getItem('output1');
    const url = 'http://www.omdbapi.com/?s='+searchid+'&apikey=b4095f54';
    fetch(url)
    .then(
        function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
            response.status);
            return;
        }
        response.json().then(function(data) {
            movies=data.Search;
            document.getElementById('movies').innerHTML=output1;
            store=document.getElementsByTagName('html')[0].innerHTML;
            sessionStorage.setItem('store',store);
        });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}
//function when any poster is clicked
function movieSelected(id){
    sessionStorage.setItem('movieId',id);
    window.location ='movie.html';
    return false
}
//function to display the second page 
function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    const url = 'http://www.omdbapi.com/?i='+movieId+'&apikey=b4095f54';
    fetch(url)
    .then(
        function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
            response.status);
            return;
        }
        response.json().then(function(data) {
            let output='';
            output=`
            <div class="text">
                    <div class="box">
                            <img src="${data.Poster}" alt="No Poster Available" class = "thumbnail" >
                    </div>
                    <div class="box">
                            <h1 align="center" style="text-decoration: underline;">${data.Title}</h1>
                        <ul class="list">
                            <li><strong>Genre: </strong>${data.Genre}</li>
                            <li><strong>Released: </strong>${data.Released}</li>
                            <li><strong>Rated: </strong>${data.Rated}</li>
                            <li><strong>IMDB Rating: </strong>${data.imdbRating}</li>
                            <li><strong>Writer: </strong>${data.Writer}</li>
                            <li><strong>Actors: </strong>${data.Actors}</li>
                        </ul>
                        <h3 align="center" style="text-decoration: underline;">PLOT<h3><br>
                        ${data.Plot}<br>
                    </div>
            <div align = "center">
                <a onclick="select()"  class="button" href="#">back</a>
            <div> 
            </div>
        `
            document.getElementById('movie').innerHTML=output;
        });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}
//to go back when back button is clicked
function select()
{
    window.location='index.html';
    store=sessionStorage.getItem('store');
    document.write(store);
}