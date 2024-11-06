# TraderScore

TraderScore is a real-time leaderboard application that displays the top traders for various cryptocurrencies. It updates every minute and showcases the volume traded by each trader across different symbols like BTC, ETH, MATIC, ARB, DAI and USDT.

## Features

- Displays the top 10 traders for different cryptocurrencies (BTC, ETH, MATIC, ARB, DAI, etc.)
- Updates the leaderboard every minute
- Displays the trader's rank, name, and volume traded
- Real-time data fetched from a backend server using Redis
- User-friendly UI built with React

## How to Run

Follow these steps to run the application locally:

### 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Aastik243/TraderScore.git
```

### 2. Navigate to project

Navigate to project and install the dependecies.
```bash
cd TraderScore
npm install
```

### 3. Set Up Redis

If you don’t have Redis installed, you can install it via Docker:
```bash
docker run --name redis -p 6379:6379 -d redis
```
This will set up Redis on localhost at port 6379, which is Redis’s default.

Start the backend server.
```bash
npm start
```
### 4. Frontend setup

Navigate to frontend directory and install the dependencies.
```bash
cd frontend/trader-score
npm install
```

Start the frontend server.
```bash
npm start
```

### 5. Open the Application
Once both the backend and frontend are running, open your browser and navigate to http://localhost:3000 to view the TraderScore leaderboard.

## Testing
To run tests for TraderScore:

1. Install Jest: Make sure Jest is installed by running:
```bash
npm install --save-dev jest
```
2. Navigate to TraderScore folder.
3. Run Tests: Execute the following command to run your tests:
```bash
npm test
```
This will run all the test suites and display the results in the console.



