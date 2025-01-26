# p2p-book-exchange-platform
---
layout: page
title: BookLives
---

BookLives is a Peer-to-Peer Book Exchange Platform. It is a platform which **gives books a second life.** This idea was formed when we recognized that books no longer read by someone could be a treasure for someone else, and this platform aims to make book exchange **as easy as clicking a button**, ensuring books find new readers who appreciate them. BookLives also **promotes a culture of *sharing and sustainability*, *reducing waste*, and fostering a community of readers who can *benefit from each other's* collections**. 

---

## Quick start

1. Download the latest compressed `BookLives` file from [here](https://github.com/yuanchengg/p2p-book-exchange-platform/releases).

2. Extract the downloaded compressed file into a folder on youe computer.

3. Open a command terminal, `cd` into the folder you put the extracted file in.

4. Ensure that you have the following installed on your computer:
* Node.js (including npm)
* PostgreSQL

5. Set up the database using PostgreSQL.

6. `cd` into the `backend` folder and install dependencies using `npm install`.

7. Update the `.env` file with your PostgreSQL credentials.

8. `cd` to the root folder. 

9. Give execute permission for `run.sh` using `chmod +x run.sh`.

9. Run the application using `./run.sh`.

---
## BookLives Features

* Creating Accounts and Logging in

* Book Listings and Search
Add your books at a click on a button. 

* User Profiles

* Exchange Mechanism

## Upcoming Features
- [] User Reviews and Ratings - allow users to leave reviews and ratings
- [] Messaging System - enable users to chat directly within the platforms to negotiate exchanges
- [] AI-Powered Recommendations - use machine learning to recommend books based on user preferences, history or search patterns
- [] Advanced Search Filters - add filters for book condition, genre, exchange mode
- [] Location-Based Features - use geolocation to display books available nearby for easier meetups/deliveries
- [] Barcode Scanner - allow users to scan barcodes to quickly add book details while listing
- [] Cross Platform Mobile App

## Project Plan and Milestone for future extension
# Project Plan and Milestones
* Framework: AGILE
* Sprint Duration: 2 weeks

---
# Sprint 1: Proof of Concept
User stories:
1. As a user, I want to be able to sign up and login. 
2. As a user, I want to be able to list books which I want to exchange so that others can view them. 
3. As a user, I want to be able to log out of the system so that my data is safe.

# Sprint 2: User Reviews and Ratings
Objective: Allow users to leave reviews and ratings for books and other users.
1. As a user, I want to leave a review and rating for a book after completing an exchange so I can share my feedback with others.
2. As a user, I want to see the average rating and recent reviews on a book listing page so I can make informed decisions before requesting an exchange.
3. As an admin, I want to moderate reviews flagged as inappropriate so the platform remains safe and respectful.

# Sprint 3: Messaging System
Objective: Enable users to chat within the platform to negotiate exchanges, providing a seamless communication channel.
1. As a user, I want to send messages to another user when interested in their listed book so I can negotiate an exchange.
2. As a user, I want to view my message history so I can continue conversations about exchanges.
3. As a user, I want to receive notifications for new messages so I don’t miss opportunities for exchanges.

# Sprint 4: AI-Powered Recommendations
Objective: Use machine learning to recommend books based on user preferences, past exchanges, and browsing history.
1. As a user, I want personalized book recommendations based on my past exchanges and genres of interest so I can discover new books easily.
2. As a user, I want to view trending books on the platform so I can explore popular listings.
3. As a backend engineer, I want to gather user activity data (searches, clicks, exchanges) to train and refine the recommendation algorithm.

# Sprint 5: Advanced Search Filters
Objective: Enhance the search functionality by adding filters for book condition, genre, and exchange mode.
1. As a user, I want to filter search results by book condition so I can find books in the desired state.
2. As a user, I want to filter search results by genre so I can browse books of a specific type (e.g., "Romance" or "Fiction").
3. As a user, I want to filter books by exchange mode (meetup or postal) so I can choose listings based on my preference.

# Sprint 6: Barcode Scanner
Objective: Allow users to scan barcodes to quickly add book details while listing.
1. As a user, I want to scan a barcode on the book so I can list it quickly. 