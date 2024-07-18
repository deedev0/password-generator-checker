# My Hapi Application

This is a simple Hapi server application.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed Node.js and npm.
- You have a basic understanding of Node.js and Hapi framework.

## Getting Started

Follow these instructions to set up the project on your local machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/deedev0/password-generator-checker-backend.git
   cd password-generator-checker-backend
2. Install the dependencies
   ```bash
   npm install
3. Create .env file
   ```bash
   touch .env
4. Add the following configuration to the .env file:
   ```bash
   HOST=yourhost
   PORT=yourport
5. Running The Server
   ```bash
   npm run start:dev

### API Documentation
# Generate Password
- url: /generates
- method: POST
request body:
```json
{
    "password_length": 10,
    "uppercase": true, 
    "numbers": true,
    "symbols": true
}
```
response: 
   ```json
      {
          "status": "success",
          "message": "Password berhasil digenerate",
          "data": {
              "generated_password": "@:WE)3_4>Q",
              "score": 3,
              "crack_time": "12 hari",
              "exposed_time": 0
          }
      }
```
# Check Password
- url: /checkers
- method: POST
- request body:
   ```json
   {
       "password": "dede"
   }
response: 
   ```json
   {
       "status": "success",
       "message": "Password berhasil dicheck",
       "data": {
           "checked_password": "dede",
           "score": 0,
           "crack_time": "Kurang dari satu detik",
           "exposed_time": 9113
       }
   }
