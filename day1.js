// Movie Objects
const movie1 = {
  id: 1,
  title: "Interstellar",
  year: 2014
};
const movie2 = {
  id: 2,
  title: "The Dark Knight",
  year: 2008
};
const movie3 = {
  id: 3,
  title: "Inception",
  year: 2010
};
const movie4 = {
  id: 4,
  title: "The Prestige",
  year: 2006
};
const movie5 = {
  id: 5,
  title: "Batman Begins",
  year: 2005
};
const movie6 = {
  id: 6,
  title: "Dunkirk",
  year: 2017
};
const movie7 = {
  id: 7,
  title: "Tenet",
  year: 2020
};
const movie8 = {
  id: 8,
  title: "Memento",
  year: 2000
};
const movie9 = {
  id: 9,
  title: "Insomnia",
  year: 2002
};
const movie10 = {
  id: 10,
  title: "Following",
  year: 1998
};

// Movie List Array
const movies = [
  movie1,
  movie2,
  movie3,
  movie4,
  movie5,
  movie6,
  movie7,
  movie8,
  movie9,
  movie10
];

// Print Movie Lists
function showMovies() {
  console.log("Movie List:");
  movies.forEach(movie => 
    console.log(`${movie.id} - ${movie.title} (${movie.year})`)
  );
};

// Function to Add a Movie
function addMovie(title, year) {
    const lastId = movies.reduce((maxId, movie) => Math.max(maxId, movie.id), 0);
  const newMovie = {
    id: lastId + 1,
    title: title,
    year: year
  };
  console.log(`Adding Movie: ${newMovie.title} (${newMovie.year}) with ID ${newMovie.id}`); 
  movies.push(newMovie);
};

// Function to Get a Movie by ID
function getMovieById(id) {
    const movie = movies.find(movie => movie.id === id);
    if (movie) {
        console.log(`Movie Found: ${movie.title} (${movie.year})`);
    } else {
        console.log(`Movie with ID ${id} not found.`);
    };
};

// Function to Delete a Movie by ID
function deleteMovie(id) {
    const index = movies.findIndex(movie => movie.id === id);
    if (index !== -1) {
        const [deletedMovie] = movies.splice(index, 1);
        console.log(`Movie with ID ${id}, ${deletedMovie.title} (${deletedMovie.year}) deleted.`);
    } else {
        console.log(`Movie with ID ${id} not found.`);
    }
};

// Test the functions
showMovies();
addMovie("The Dark Knight Rises", 2012);

showMovies();
getMovieById(3);
getMovieById(12);
deleteMovie(4);

showMovies();
addMovie("Odyssey", 2026);
showMovies();