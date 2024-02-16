# Next.js TypeScript Project: Who Wants to Be a Millionaire Game

## Overview

This project is a test task implementation of the "Who Wants to Be a Millionaire?" game using Next.js with TypeScript. It showcases frontend development skills, including interactive UI elements, state management Recoil, and integration with testing frameworks like Vitest for ensuring code quality and reliability. The application is deployed using Vercel, highlighting the ease of deploying Next.js applications and ensuring optimal performance and scalability. Additionally, the project is configured with Husky for Git hooks and Airbnb's ESLint configuration for maintaining high code quality standards.

## Features

- **Next.js**: A React framework for production-level applications, providing server-side rendering and generating static websites.
- **TypeScript**: Utilizes TypeScript for type-safe code, reducing errors and enhancing the development experience.
- **Vitest**: Integration with Vitest for unit and component testing, ensuring that all functionalities work as expected.
- **Responsive Design**: The UI is fully responsive and adapts to various screen sizes, ensuring a seamless user experience on both mobile and desktop devices.
- **Deployed with Vercel**: Leveraging Vercel for seamless deployment and hosting, offering high performance and scalability.
- **Husky**: Utilizes Husky for managing Git hooks, helping to prevent bad commits and push.
- **Airbnb ESLint Configuration**: Adopts Airbnb's ESLint configuration to enforce a consistent code style and catch common coding errors.

## Demo

Experience the live demo of the game: [Who Wants to Be a Millionaire Demo](https://who-wants-1million.vercel.app/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YanitskyiM/who-wants-1million.git
```

2. Navigate to the project directory:
```bash
cd who-wants-1million
```

3. Install dependencies:
```bash
npm install
```
or if you use yarn:
```bash
yarn install
```

4. Start the development server:
```bash
npm run dev
```
or
```bash
yarn dev
```

The application should now be running on [http://localhost:3000](http://localhost:3000). Open this link in your browser to view the app.

## Running Tests

This project uses Vitest for testing. To run the tests, use the following command:

```bash
npm run test
```
or
```bash
yarn test
```

Vitest will execute the test suites and provide a summary of the test cases.

## Code Quality Tools

- **ESLint with Airbnb Configuration**: Ensure code quality and consistency by running `npm run lint` or `yarn lint`. This project follows Airbnb's JavaScript style guide.
- **Husky**: This project uses Husky to enforce pre-commit and pre-push hooks, running linters and tests to ensure code quality before commits and pushes.


## Acknowledgments

- Next.js team for the amazing framework.
- The TypeScript team for enhancing JavaScript with types.
- Vitest for providing a fast testing library.
- Vercel for effortless deployment.
- Husky and Airbnb ESLint configuration for maintaining high code quality standards.

**Note**: This README is for demonstration purposes and reflects a project structure that uses Next.js, TypeScript, Vitest, Husky, and Airbnb's ESLint configuration for a game-based test task. Adjust the demo link and repository URL as per your actual project details.