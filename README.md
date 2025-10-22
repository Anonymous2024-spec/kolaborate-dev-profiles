# Developer Profile API & Dashboard

A full-stack talent profile management system that enables browsing, creating, and managing developer profiles through a REST API backend and an interactive web dashboard.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-v18+-green.svg)
![React](https://img.shields.io/badge/react-v18+-blue.svg)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Usage Examples](#usage-examples)
- [Technology Choices](#technology-choices)
- [Assumptions & Tradeoffs](#assumptions--tradeoffs)
- [Time Spent](#time-spent)
- [Future Enhancements](#future-enhancements)
- [Author](#author)

## ✨ Features

### Backend API
- ✅ Create developer profiles with validation
- ✅ List all profiles with pagination support
- ✅ Retrieve individual profile details
- ✅ Update existing profiles
- ✅ Search profiles by skills or location
- ✅ Comprehensive error handling
- ✅ Input validation and sanitization
- ✅ Seeded database with 5+ sample profiles

### Frontend Dashboard
- ✅ Responsive card-based profile display
- ✅ Search and filter functionality by skills
- ✅ Create new profile form with client-side validation
- ✅ View detailed profile information
- ✅ Edit existing profiles
- ✅ Mobile-first responsive design
- ✅ Clean, modern UI with Tailwind CSS

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MySQL
- **Validation**: express-validator
- **CORS**: cors middleware

### Frontend
- **Framework**: React (v18+)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Routing**: React Router DOM

### Development Tools
- **Package Manager**: npm/yarn
- **Version Control**: Git

## 📁 Project Structure

```
kolaborate-dev-profiles/
├── backend/
│   ├── config/
│   │   └── (database configuration)
│   ├── models/
│   │   └── (database models)
│   ├── routes/
│   │   └── (API route definitions)
│   ├── .editorconfig
│   ├── .env                     # Environment variables
│   ├── .gitattributes
│   ├── .gitignore
│   ├── package.json
│   ├── pnp.cjs
│   ├── pnp.loader.mjs
│   ├── README.md
│   ├── seed.js                  # Database seeding script
│   ├── server.js                # Express server entry point
│   └── yarn.lock
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   └── (static assets)
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── EmptyState.jsx
│   │   │   ├── LoadingState.jsx
│   │   │   ├── ProfileCard.jsx
│   │   │   ├── ProfileForm.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── services/
│   │   │   └── api.js           # API service layer
│   │   ├── App.css
│   │   ├── App.jsx              # Main application component
│   │   ├── index.css            # Global styles
│   │   └── main.jsx             # React entry point
│   ├── .gitignore
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── jsconfig.json
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   └── vite.config.js
│
└── README.md
```

## 📦 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)
- **MySQL** (v8 or higher) - [Download](https://dev.mysql.com/downloads/)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Anonymous2024-spec/kolaborate-dev-profiles.git
cd kolaborate-dev-profiles
```

### 2. Database Setup

**Create MySQL Database:**

```bash
mysql -u root -p
```

```sql
CREATE DATABASE kolaborate_devs;
EXIT;
```

**Run the database schema:**

The application will automatically create the necessary tables on first run, or you can manually create them:

```sql
USE kolaborate_devs;

CREATE TABLE profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  location VARCHAR(255) NOT NULL,
  skills JSON NOT NULL,
  experienceYears INT NOT NULL,
  availableForWork BOOLEAN DEFAULT true,
  hourlyRate DECIMAL(10, 2) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 3. Backend Setup

```bash
cd backend
npm install
# or
yarn install
```

**Create a `.env` file in the backend directory:**

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=dev_profiles
NODE_ENV=development
```

**Seed the database with sample data:**

```bash
node seed.js
```

**Start the backend server:**

```bash
npm start
# or
node server.js
```

The API will be running at `http://localhost:5000`

### 4. Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
# or
yarn install
```

**Create a `.env` file in the frontend directory (if needed):**

```env
VITE_API_URL=http://localhost:5000
```

**Start the frontend development server:**

```bash
npm run dev
# or
yarn dev
```

The application will be running at `http://localhost:5173` (or the port shown in your terminal)

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Create Profile
**POST** `/api/profiles`

Creates a new developer profile.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "location": "San Francisco, CA",
  "skills": ["React", "Node.js", "TypeScript"],
  "experienceYears": 5,
  "availableForWork": true,
  "hourlyRate": 75
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "location": "San Francisco, CA",
    "skills": ["React", "Node.js", "TypeScript"],
    "experienceYears": 5,
    "availableForWork": true,
    "hourlyRate": 75,
    "createdAt": "2025-10-22T10:30:00.000Z",
    "updatedAt": "2025-10-22T10:30:00.000Z"
  }
}
```

#### 2. Get All Profiles
**GET** `/api/profiles?page=1&limit=10`

Retrieves all profiles with pagination.

**Query Parameters:**
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10) - Results per page

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "profiles": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalProfiles": 25,
      "limit": 10
    }
  }
}
```

#### 3. Get Profile by ID
**GET** `/api/profiles/:id`

Retrieves a specific profile by ID.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "location": "San Francisco, CA",
    "skills": ["React", "Node.js", "TypeScript"],
    "experienceYears": 5,
    "availableForWork": true,
    "hourlyRate": 75
  }
}
```

#### 4. Update Profile
**PUT** `/api/profiles/:id`

Updates an existing profile.

**Request Body:** (partial updates allowed)
```json
{
  "location": "New York, NY",
  "hourlyRate": 85,
  "availableForWork": false
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "location": "New York, NY",
    "skills": ["React", "Node.js", "TypeScript"],
    "experienceYears": 5,
    "availableForWork": false,
    "hourlyRate": 85
  }
}
```

#### 5. Search Profiles
**GET** `/api/profiles/search?skills=React&location=San Francisco`

Search profiles by skills or location.

**Query Parameters:**
- `skills` (optional) - Comma-separated skill names
- `location` (optional) - Location string (partial match)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "location": "San Francisco, CA",
      "skills": ["React", "Node.js", "TypeScript"],
      "experienceYears": 5,
      "availableForWork": true,
      "hourlyRate": 75
    }
  ]
}
```

### Error Responses

All endpoints return consistent error responses:

**400 Bad Request:**
```json
{
  "success": false,
  "error": "Validation error",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": "Profile not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Detailed error message"
}
```

## 🗄 Database Schema

### Profiles Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| name | VARCHAR(255) | NOT NULL | Developer's full name |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Contact email |
| location | VARCHAR(255) | NOT NULL | Current location |
| skills | JSON | NOT NULL | Array of skill strings |
| experienceYears | INT | NOT NULL | Years of experience |
| availableForWork | BOOLEAN | DEFAULT true | Availability status |
| hourlyRate | DECIMAL(10,2) | NOT NULL | Hourly rate in USD |
| createdAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updatedAt | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes:**
- Primary key on `id`
- Unique index on `email`
- Index on `location` for search optimization

## 💡 Usage Examples

### Creating a Profile via cURL

```bash
curl -X POST http://localhost:5000/api/profiles \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "location": "Austin, TX",
    "skills": ["Python", "Django", "PostgreSQL"],
    "experienceYears": 7,
    "availableForWork": true,
    "hourlyRate": 90
  }'
```

### Searching for Profiles

```bash
# Search by skill
curl "http://localhost:5000/api/profiles/search?skills=React"

# Search by location
curl "http://localhost:5000/api/profiles/search?location=San Francisco"

# Search by both
curl "http://localhost:5000/api/profiles/search?skills=React,Node.js&location=California"
```

### Getting Paginated Results

```bash
curl "http://localhost:5000/api/profiles?page=2&limit=5"
```

## 🎯 Technology Choices

### Why Node.js & Express?
- **Performance**: Non-blocking I/O perfect for API services
- **JavaScript Everywhere**: Single language across the stack
- **Rich Ecosystem**: Extensive npm packages for rapid development
- **Community Support**: Large community and extensive documentation

### Why React?
- **Component Reusability**: Modular architecture for maintainable code
- **Virtual DOM**: Optimal rendering performance
- **Ecosystem**: Rich library ecosystem for any feature needed
- **Industry Standard**: Widely adopted and well-documented

### Why Tailwind CSS?
- **Rapid Development**: Utility-first approach speeds up styling
- **Consistency**: Design system built-in with consistent spacing/colors
- **Responsive Design**: Mobile-first utilities make responsive design simple
- **Small Bundle Size**: PurgeCSS removes unused styles in production

### Why MySQL?
- **Reliability**: Proven, stable relational database
- **ACID Compliance**: Ensures data integrity
- **Scalability**: Handles growing data efficiently
- **Familiarity**: Wide adoption and extensive documentation
- **JSON Support**: Native JSON column type for skills array

## 🤔 Assumptions & Tradeoffs

### Assumptions Made
1. **Email Uniqueness**: Each developer has one unique email address
2. **Skill Format**: Skills are stored as simple string arrays (case-sensitive)
3. **USD Currency**: All hourly rates are in US Dollars
4. **Location Format**: Free-text location field (city, state/country)
5. **Experience Validation**: Minimum 0 years, maximum 50 years

### Tradeoffs
1. **No Authentication**: Focused on core functionality within time constraints
   - *Future*: Would implement JWT-based auth for production
   
2. **Basic Search**: Simple string matching for skills/location
   - *Future*: Full-text search or Elasticsearch for better performance
   
3. **In-Memory Session**: No persistent authentication
   - *Future*: Redis for session management at scale
   
4. **Limited Testing**: Focused on critical path testing
   - *Future*: Comprehensive unit and integration test coverage
   
5. **No File Uploads**: Profile pictures/resumes not implemented
   - *Future*: AWS S3 or Cloudinary integration
   
6. **Simple Pagination**: Basic offset-based pagination
   - *Future*: Cursor-based pagination for better performance

7. **Component Structure**: Kept components in a single folder for simplicity
   - *Future*: Separate into presentational/container components or feature-based folders

## ⏱ Time Spent

**Total Time**: Approximately 5 hours

**Breakdown**:
- Project setup & configuration: 30 minutes
- Backend API development: 2 hours
- Frontend development: 1.5 hours
- Testing & debugging: 45 minutes
- Documentation: 15 minutes

## 🚀 Future Enhancements

If given more time, the following features would be valuable additions:

### High Priority
- [ ] JWT Authentication & Authorization
- [ ] Comprehensive test coverage (>80%)
- [ ] Docker containerization with docker-compose
- [ ] Cloud deployment (AWS/Vercel/Railway)
- [ ] Profile picture upload functionality

### Medium Priority
- [ ] GraphQL API alternative
- [ ] Real-time updates with WebSockets
- [ ] Analytics dashboard (skill trends, rate analysis)
- [ ] Advanced filtering (experience range, rate range)
- [ ] Sorting options (by rate, experience, date)

### Nice to Have
- [ ] Email notifications for profile updates
- [ ] PDF resume export
- [ ] Social media integration
- [ ] Skill endorsements system
- [ ] Availability calendar

## 📝 License

This project is created as part of a technical assessment for Kolaborate.

## 👤 Author

**Naana Shifah**
- GitHub: [@Anonymous2024-spec](https://github.com/Anonymous2024-spec)
- Repository: [kolaborate-dev-profiles](https://github.com/Anonymous2024-spec/kolaborate-dev-profiles)

---

## 📞 Questions or Issues?

If you encounter any issues or have questions about the setup:

1. Ensure all prerequisites are installed correctly
2. Verify MySQL is running and credentials are correct
3. Check that ports 5000 and 5173 are not in use
4. Ensure both backend and frontend `.env` files are configured

For any additional questions, please feel free to reach out!

---

**Built with ❤️ for Kolaborate**
