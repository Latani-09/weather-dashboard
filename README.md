# Weather App

## How to Run

### Prerequisites
- Node.js installed on your machine
- Docker installed on your machine

### Installation
1. Clone this repository.
2. Navigate to the project directory in your terminal.
3. Run the following command to install dependencies:
    ```
    npm install
    ```

### Setting up API Key
1. Create a file named `.env` in the root directory of the project.
2. Assign your weather API key to the environment variable `REACT_APP_WEATHERAPPID` in the `.env` file. 
    ```
    REACT_APP_WEATHERAPPID=your_api_key_here
    ```

### Running Locally
1. After setting up the API key, run the following command to start the development server:
    ```
    npm start
    ```
2. Open your web browser and go to `http://localhost:3000` to view the app.

### Building Docker Image
 Build the Docker image using the provided Dockerfile. 

### Running Docker Container
1. After building the Docker image, run the following command to start a container:
    ```
    docker run -e REACT_APP_WEATHERAPPID=[apikey] -p 3000:3000 [image Name]
    ```
   Replace `[apikey]` with your actual weather API key.

2. Open your web browser and go to `http://localhost:3000` to view the app.


