#!/bin/bash

# Start the backend (in the background)
cd backend
nodemon server.js &
BACKEND_PID=$!

# Move to the frontend folder
cd ../frontend
npm start &
FRONTEND_PID=$!

# If you press Ctrl+C, kill both processes
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT

# Wait for both processes so the script doesn't exit immediately
wait

