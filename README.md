# Quote System and Performance Dashboard

A full-stack application designed for EnKoat company to manage contractor quote submissions and visualize project performance metrics.

## Project Overview

The system consists of three main components:

1. **Contractor Quote Submission Form** - A responsive form allowing contractors to submit quote information for roofing projects
2. **REST API Backend** - Handles quote data storage and retrieval (using in-memory data store)
3. **Performance Dashboard** - Visualizes project trends and performance metrics

## Technology Stack

### Frontend
- HTML / CSS
- Bootstrap
- JavaScript
- Chart.js

### Backend
- Node.js
- Express.js
- In-memory data store (No additional database required)

### Other Tools
- Cors (Cross-Origin Resource Sharing)
- Dotenv (Environment Variable Management)

## How to Run Locally

### Prerequisites
- Node.js

### Installation Steps

1. Clone the repository:
   ```
   git clone https://github.com/hanktchen18/quote-system-and-performance-dashboard.git
   cd quote-system-and-performance-dashboard
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Start the backend server:
   ```
   npm run dev
   ```

4. Access the application:
   - Quote Submission Form: http://localhost:3000
   - Performance Dashboard: http://localhost:3000/dashboard.html

## Mock Data

The system uses mock data to demonstrate dashboard functionality. The mock data is generated when the backend starts, creating 1000 random quote records stored in application memory.

Mock data includes:
- Contractor name
- Company name
- Roof size (1000-5000 square feet)
- Roof type (Metal, TPO, Foam, Shingle, Other)
- Project city and state
- Project date (within the last 3 years)

## API Endpoints

- `GET /api/quotes` - Get all quotes with optional filtering
  - Query parameters: `state`, `roofType`
- `POST /api/quotes` - Create a new quote

## Data Persistence

This application uses in-memory storage, which means all data only exists during the server runtime. When the server restarts, all user-submitted data will be lost, but the 1000 mock data records will be regenerated.

## Features

### Quote Submission
- Form validation for required fields
- Success/error notifications
- Responsive design for all devices

### Dashboard
- Key performance indicators (KPIs):
  - Total projects count
  - Average roof size
  - Total states covered
  - Estimated energy savings
- Data visualization:
  - Projects by state (bar chart)
  - Roof types distribution (pie chart)
  - Monthly project completion trends (line chart)
  - Estimated energy savings by roof type (doughnut chart)
- Data filtering by state and roof type
- CSV export functionality

## Future Improvements

Potential improvements for the project:

1. **Data Persistence** - Implement a MongoDB or SQL database
2. **User Authentication** - Add login system for contractors and administrators
3. **Enhanced Filtering** - Add date range filters and additional search options
4. **PDF Report Generation** - Add option to export dashboard data as PDF reports
5. **Frontend Framework** - Migrate to React or Vue.js for improved component management
6. **Testing** - Implement unit and integration tests

## Development Notes

1. **Data Persistence** - Add a real database to persist data
2. **Authentication & Authorization** - Add user login system and different roles (admin, contractor)
3. **Enhanced Data Visualization** - Add more interactive charts and deeper analysis
5. **PDF Report Generation** - Fully implement PDF report export functionality
6. **Frontend Framework Migration** - Consider using React or Vue.js for improved maintainability
