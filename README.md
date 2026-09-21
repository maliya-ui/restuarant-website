# Tasteful Restaurant

A modern restaurant website built with Node.js, Express, and SQLite. The project includes a luxury-style landing page, dynamic menu data, reservation submission, and contact form handling.

## Overview

Tasteful is a full-stack restaurant website designed to showcase a premium dining experience online. It combines a polished frontend interface with a lightweight backend API for real data persistence.

## Features

- Elegant restaurant landing page with hero section and brand styling
- Dynamic menu page powered by SQLite data
- Reservation form with backend storage
- Contact form with backend storage
- Responsive layout optimized for desktop and mobile devices
- Simple full-stack architecture using Express and SQLite

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: SQLite
- Styling: Custom CSS with Google Fonts and Font Awesome icons

## Project Structure

- `restuarant.html` – main frontend page
- `style.css` – site styling and responsive layout
- `app.js` – frontend logic for fetching menu data and form submission
- `server.js` – Express server and SQLite database setup
- `package.json` – project scripts and dependencies
- `restaurant.db` – SQLite database file created automatically when the server starts

## Installation

1. Open a terminal in the project directory.
2. Install dependencies:

```bash
npm install
```

3. Start the application:

```bash
npm start
```

4. Open the site in a browser:

```text
http://localhost:3000
```

## API Endpoints

- `GET /api/health` – checks whether the API is running
- `GET /api/menu` – retrieves menu items from the database
- `POST /api/reservation` – saves a restaurant reservation request
- `POST /api/contact` – saves a contact message

## GitHub Setup

To initialize the project as a Git repository:

```bash
git init
git add .
git commit -m "Initial restaurant app"
git branch -M main
git remote add origin https://github.com/your-username/your-repository.git
git push -u origin main
```

Replace the repository URL with your own GitHub project link.

## Notes

- The SQLite database is created automatically when the server starts.
- The menu is pre-populated with sample data on first run.
- This project is ideal for portfolio, restaurant showcase, or freelance web design demonstrations.
