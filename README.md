# Movie Search App

A full-stack movie search application built with JavaScript and designed to provide an interactive, user-friendly experience for discovering movies. The app enables users to search for movies by title, with optional filters for release year and region, and features pagination and detailed views of individual movies.

## Features

- **Movie Search**: Users can search for movies by typing the title, with optional fields for the release year and region.
- **API Integration**: The app communicates with a movie database API to retrieve accurate, up-to-date movie information based on the search query.
- **Pagination**: Supports pagination for easy navigation through search results.
- **Movie Details**: Clicking on a movie in the search results brings up a new page displaying details such as the synopsis, cast, release date, and other relevant information.
- **MVC Architecture**: Organized with a clear Model-View-Controller (MVC) structure for efficient data handling and separation of concerns.

## Technologies Used

- **JavaScript**: Used across the application for both front-end interactions and back-end logic.
- **MVC Pattern**: Enables clean separation of concerns, with models for data management, views for rendering UI, and controllers for handling user input and responses.

## Getting Started

To run this app locally:

1. Clone the repository:
   `git clone https://github.com/yourusername/movie-search-app.git`
2. Install dependencies:
   `npm install`
3. Start the server:
   `npm start`
4. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- **Model**: Handles data retrieval from the API and structures the information for the app.
- **View**: Manages the display and rendering of search results, pagination, and movie details.
- **Controller**: Connects user input from the search and pagination to the data in the Model, updating the View as needed.

## Usage

1. **Search**: Enter a movie title, with optional filters for release year and region.
2. **Explore**: Browse results using pagination.
3. **View Details**: Click on a movie to view detailed information on a separate page.

