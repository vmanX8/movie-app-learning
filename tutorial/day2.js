// Movie Objects
const movies = [
  {
    id: 1,
    title: "Interstellar",
    year: 2014
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2008
  },
  {
    id: 3,
    title: "Inception",
    year: 2010
  },
  {
    id: 4,
    title: "The Prestige",
    year: 2006
  },
  {
    id: 5,
    title: "Batman Begins",
    year: 2005
  },
  {  
 id: 6,
  title: "Dunkirk",
  year: 2017
},
{
  id: 7,
  title: "Tenet",
  year: 2020
},
{
  id: 8,
  title: "Memento",
  year: 2000
},
{
  id: 9,
  title: "Insomnia",
  year: 2002
},
{
  id: 10,
  title: "Following",
  year: 1998
}];     

// Simulate fetching movies from a database with a delay
function fetchMoviesFromDatabase() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() >= 0.5; // Simulate success or failure
            if (success)
            resolve(movies);
            else reject(new Error("Database connection failed")); 
        }, 2400);
    });
}

async function displayMovies() {
    try {  
    console.log("Loading movies...");
    const movieList = await fetchMoviesFromDatabase();
    console.log("Movies loaded:");
    movieList.forEach(movie => {
        
        console.log(` ${movie.id} - ${movie.title} (${movie.year})`);
    });
    } catch (error) {
        console.error("Error fetching movies:", error.message);
    }
}

displayMovies();

// Fake movie search function
function fetchMoviesByIdFromDatabase(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const movie = movies.find(movie => movie.id === id);
            resolve(movie);
        }, 1500);
    });
} 

async function displayMovieById(id) {
    console.log(`Searching for movie with ID: ${id}...`);
    const movie = await fetchMoviesByIdFromDatabase(id);
    if (movie) {
        console.log(`Found: ${movie.id} - ${movie.title} (${movie.year})`);
    } else {
        console.log(`Movie with ID: ${id} not found.`);
    }
}

displayMovieById(3);
displayMovieById(11);