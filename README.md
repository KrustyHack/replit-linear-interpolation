# Linear Interpolation Project

A web application built with React, Express, and TypeScript.

## Project Overview

This project is a fullstack web application with:
- React frontend with Tailwind CSS
- Express backend
- TypeScript for type safety

## Development Setup

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm

### Installation

1. Clone the repository:
```
git clone <repository-url>
cd replit-linear-interpolation
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm run dev
```

## Building for Production

```
npm run build
npm start
```

## Docker Deployment

This project includes Docker configuration for easy deployment.

### Building the Docker Image

```
docker build -t linear-interpolation .
```

### Running the Docker Container

```
docker run -p 5000:5000 linear-interpolation
```

The application will be available at http://localhost:5000.

## Project Structure

- `client/`: React frontend application
- `server/`: Express backend server
- `shared/`: Shared code between frontend and backend
- `dist/`: Built application (generated)

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Run production server
- `npm run check`: Type check the codebase

## License

MIT 