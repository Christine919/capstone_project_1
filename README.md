# Portfolio Website - Capstone Project

## Overview

This project is my capstone for completing my learning course, where I developed a personal portfolio website to showcase my skills and projects. The website is built using modern web technologies such as HTML, EJS, CSS, JavaScript, Node.js, Express, and PostgreSQL.

## Features

- **Dynamic Content Rendering**: Using EJS as the templating engine to dynamically generate HTML pages.
- **Responsive Design**: Ensuring the portfolio is accessible on all devices with a clean and modern layout.
- **Interactive User Interface**: Implementing interactivity using JavaScript for a smooth user experience.
- **Backend Server**: Node.js and Express handle the server-side logic and routing.
- **Database Integration**: PostgreSQL is used to manage and store user data, including project information and contact submissions.

## Technologies Used

- **Frontend**: 
  - HTML
  - EJS (Embedded JavaScript Templating)
  - CSS
  - JavaScript
  
- **Backend**:
  - Node.js
  - Express.js
  
- **Database**:
  - PostgreSQL

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/portfolio-project.git
   cd portfolio-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup environment variables**:
   Create a `.env` file and add the following values:
   ```
   SESSION_SECRET=your_session_secret
   DB_USER=your_postgres_user
   DB_HOST=your_postgres_host
   DB_NAME=your_postgres_db
   DB_PASSWORD=your_postgres_password
   DB_PORT=5432
   ```

4. **Start the server**:
   ```bash
   npm start
   ```

5. Open the application in your browser at `http://localhost:3000`.

## Usage

This portfolio website is designed to display personal and professional projects, along with skills, an about me section, and a contact form for visitors to reach out. The backend processes contact form submissions and stores project information in the PostgreSQL database.

## Future Enhancements

- Add a blog section to share articles and tutorials.
- Implement user authentication for a personalized dashboard to manage content.
- Integrate a content management system (CMS) to easily update projects and skills.

## Conclusion

This capstone project showcases the skills I've learned throughout my course, including front-end development, back-end development, and database management. It serves as a foundation for future projects and personal growth in web development.
