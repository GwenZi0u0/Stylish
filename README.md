# STYLiSH Project

E-commerce clothing

[Project Link](https://stylish-4b892.firebaseapp.com/)

## Introduction

A clothing e-commerce website with three categories: women's wear, men's wear, and accessories. After selecting a product, options for color, size, and quantity are available, along with more product details. The shopping cart collects the items you choose and calculates the total amount.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)

## Getting Started

This project is a simple application built with React, Vite, and styled-components. It serves as a starting point for building modern web applications with these technologies.

## Installation

Follow these steps to get the project up and running on your local machine:

1. **Install the dependencies:**
    
    Make sure you have Node.js and npm (or Yarn) installed.
     ```bash
    npm install
    ```
## Running the Project

To run the project locally:
```bash
npm run dev
```
## Project Structure
```
├── public              # Static files
│   ├── image
│   ├── js
│   └── stylesheet
├── src
│   ├── components      # Reusable UI components for the app
│   │  ├── Footer       # Footer section used across the site
│   │  └── Header       # Header section with navigation links
│   ├── pages           # Application pages
│   │  ├── ProductPage        # Page displaying product details with options like color, size, and quantity
│   │  └── ShoppingCartPage   # Page showing selected products, allowing users to review and calculate total cost
│   │  
│   ├── App.jsx         # Main application component
│   ├──  globalStyles.jsx   # Global styles
│   ├──  theme.jsx      # Color styles
│   └──  main.jsx       # Main application
│ 
index.html              # Homepage
product.html            # Entry point for
│ 
├── .gitignore          # Files to ignore in Git
├── package.json        # Project dependencies and scripts
├── vite.config.js      # Vite configuration
├── .eslintrc.cjs       # ESLint configuration for code linting
└── README.md           # Project documentation
```

## Tech Stack

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

**Frontend**

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 
- React(hooks) : A JavaScript library for building user interfaces.
- React Router DOM : A library for handling navigation in React apps, allowing you to create different pages and switch between them without refreshing the browser.

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) A fast development build tool for modern web projects.

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

**Styling**

![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) A library for styling React components using tagged template literals.

**Deployment**

![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Skills

- RWD (Responsive Web Design)
- DOM Manipualtion
- Data Manipulation
- REST API Integration

## Implementation

- Carousel
- Infinite Scroll
- Shopping Cart
- Search UI
- Login UI
- Form UI
