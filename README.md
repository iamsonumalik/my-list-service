# My List Service

This project implements a backend service for the "My List" feature on an OTT platform. Users can save, remove, and list their favorite movies and TV shows. The project uses NestJS, MongoDB, and TypeScript.

## Features
- Add a movie or TV show to the user's personalized list.
- Remove an item from the list.
- List all items in the user's list with pagination.
- Basic user authentication using mock user IDs.

## Tech Stack
- **Backend**: NestJS
- **Database**: MongoDB
- **Testing**: Jest, MongoMemoryServer
- **CI/CD**: GitHub Actions (or use any CI/CD service)

## Prerequisites

- Node.js (preferably v16 or higher)
- MongoDB (use MongoMemoryServer for local testing)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/iamsonumalik/my-list-service.git
cd my-list-service
```

### 2. Install Dependencies

Ensure you have Node.js installed. Then, install all required dependencies by running:

```bash
npm install
```

### 3. Set Up MongoDB

You can run MongoDB locally, or use a service like MongoDB Atlas for production. For local testing, we recommend using **MongoMemoryServer** for an in-memory MongoDB instance during tests.

To run MongoDB locally:
1. Install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community).
2. Start MongoDB with the following command:
   ```bash
   mongod
   ```

Alternatively, **MongoMemoryServer** will automatically handle the database for you during test execution.

### 4. Set Up Environment Variables

Create a `.env` file in the root directory of your project. The following is an example of the environment variables you might need:

```env
MONGO_URI=mongodb://localhost:27017/my_list_service
```

You can adjust these based on your MongoDB URI and any authentication secrets you require.

### 5. Running the Project

You can run the application in development mode with:

```bash
npm run start:dev
```

This will start the server at `http://localhost:3000`.

### 6. Running Tests

To run the end-to-end (E2E) tests:

```bash
npm run test:e2e
```

### 7. Seed Dummy Data (Optional)

For testing purposes, you might want to add some dummy movies and TV shows to the database.

```angular2html
cd seed
ts-node seed.ts
```
### 8. CI/CD Pipelines

This project includes CI/CD configurations for services like **GitHub Actions** or **Travis CI**. You can use GitHub Actions to automate testing and deployment to platforms such as AWS, Heroku, or any other cloud service.

#### Example GitHub Actions Workflow
```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mongodb:
        image: mongo:latest
        options: --health-cmd="curl --silent --fail localhost:27017" --health-interval=5s --health-timeout=10s --health-retries=3
        ports:
          - 27017:27017

    steps:
      - name: Checkout Code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install Dependencies
        run: npm install

      - name: Run Tests
        run: npm run test:e2e

      - name: Build Application
        run: npm run build

      - name: Deploy to Production (optional)
        if: github.ref == 'refs/heads/main'
        run: |
          echo "Deploying to production..."
          # Add your deployment scripts here (e.g., deploy to AWS, Heroku, etc.)
```

### 9. Deployment

You can deploy this app to any platform of your choice such as AWS, Heroku, or DigitalOcean. You may need to set up a production MongoDB database (e.g., MongoDB Atlas) and configure your environment variables accordingly.

### 10. Troubleshooting

- If you face issues with MongoDB or the application not starting, make sure MongoDB is running and accessible.
- If you have issues with testing, make sure **MongoMemoryServer** is correctly set up or your local MongoDB instance is running.
- If you receive connection errors, double-check your environment variables (e.g., MongoDB URI).

## API Documentation

Here are the key endpoints exposed by the service:

### `POST /list/add`

Adds an item (movie or TV show) to the user's list.

**Request body:**
```json
{
  "itemId": "string",
  "type": "movie|tvshow"
}
```

**Response:**
```json
{
  "success": true
}
```

### `DELETE /list/:id`

Removes an item from the user's list by ID.

**Response:**
```json
{
  "success": true
}
```

### `GET /list`

Fetches all items in the user's list with pagination.

**Query parameters:**
- `page`: The current page.
- `limit`: Number of items per page.

**Response:**
```json
{
  "items": [
    {
      "id": "string",
      "title": "string",
      "type": "movie|tvshow"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```