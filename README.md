# SWAPI (Star Wars API) Integration

This project integrates with the Star Wars API (SWAPI) to fetch and manage data related to Star Wars films, characters, planets, and more. It includes endpoints for retrieving, searching, filtering, and adding comments to films.


## Features

- **Film Retrieval**: Fetch films from SWAPI and present them through an API endpoint.

- **Character Retrieval**: Access character data from the Star Wars universe and enable searching based on multiple attributes.

- **Planet Retrieval**: Retrieve planet data and filter results based on specific attributes.

- **Commenting on Films**: Allow users to leave comments about the films retrieved.

- **Rating Films**: Enable users to rate the films they interact with.

- **Pagination**: Implement pagination for managing large amounts of data by providing subsets or pages of results.

- **Caching**: Utilize caching mechanisms to store fetched data for optimized retrieval and reduced external API calls.

- **Sorting**: Enable sorting of fetched data based on specified fields or criteria.

- **Cron Job for Data Update**: Schedule periodic updates or synchronization of data from the SWAPI to keep the local data updated.


## Getting Started

### Prerequisites

- Node.js installed on your local machine
- MongoDB set up locally or a connection to an online database
- Postman or a similar API testing tool

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/swapi-project.git
    ```

2. Install dependencies:

    ```bash
    cd swapi-project
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and define the following:

    ```plaintext
    SWAPI_BASE_URL=https://swapi.dev/api/
    MONGODB_URI=your-mongodb-connection-uri
    PORT=your-port-number 
    ```

### Usage

- Start the server:

    ```bash
    npm start
    ```

- Use Postman or a similar tool to test API endpoints.

### API Endpoints

#### Films

- `GET /api/films`: Retrieve films.
- `POST /api/films/:filmId/comments`: Add a comment to a film.
- `POST /api/films/:filmId/ratings`: Add a rating to a film.

#### People

- `GET /api/people`: Retrieve people.

#### Planet


- `GET /api/planets`: Retrieve planets.

#### Species

- `GET /api/species`: Retrieve species.

#### Starship

- `GET /api/starships`: Retrieve starships.

#### Vechile

- `GET /api/vehicles`: Retrieve vechiles.



## Contributing

Contributions are welcome! Feel free to raise issues or submit pull requests for new features or improvements.
