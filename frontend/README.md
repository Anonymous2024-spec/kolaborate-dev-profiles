# Developer Profile Dashboard - Frontend

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)

A modern, responsive developer profile management dashboard built with:

- ⚡ **Vite** for ultra-fast development and hot module replacement
- ⚛️ **React 18** for building the user interface
- 🎨 **Tailwind CSS** for utility-first styling
- 📡 **Axios** for API communication
- 🧩 Component-based architecture for maintainability

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Available Scripts](#available-scripts)
- [Component Overview](#component-overview)
- [API Integration](#api-integration)
- [Styling Approach](#styling-approach)
- [Browser Support](#browser-support)
- [Future Enhancements](#future-enhancements)

## ✨ Features

### Core Functionality

- ✅ **Profile Listing**: Browse all developer profiles in a responsive card layout
- ✅ **Search & Filter**: Real-time search by developer skills
- ✅ **Create Profile**: Intuitive form to add new developer profiles
- ✅ **View Details**: Detailed view of individual developer profiles
- ✅ **Edit Profile**: Update existing profile information
- ✅ **Responsive Design**: Mobile-first approach, works on all screen sizes
- ✅ **Loading States**: Smooth loading indicators for better UX
- ✅ **Empty States**: Helpful messaging when no data is available
- ✅ **Error Handling**: User-friendly error messages

### UI/UX Highlights

- 🎯 Clean, modern interface
- 📱 Mobile-responsive design
- 🔍 Instant search feedback
- ⚡ Fast page transitions
- 🎨 Consistent color scheme and typography
- ♿ Semantic HTML for better accessibility

## 🛠 Tech Stack

### Core Technologies

- **React** (v18+) - UI library for building component-based interfaces
- **Vite** - Next-generation frontend build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - Promise-based HTTP client

### Development Tools

- **ESLint** - Code quality and consistency
- **PostCSS** - CSS transformation and optimization
- **Vite Config** - Custom build configuration

## 📁 Project Structure

```
frontend/
├── node_modules/          # Dependencies
├── public/                # Static assets
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Reusable UI components
│   │   ├── EmptyState.jsx       # No data placeholder
│   │   ├── LoadingState.jsx     # Loading spinner
│   │   ├── ProfileCard.jsx      # Profile display card
│   │   ├── ProfileForm.jsx      # Create/Edit form
│   │   └── SearchBar.jsx        # Search input component
│   ├── services/          # API integration layer
│   │   └── api.js               # Axios instance & API calls
│   ├── App.css            # Component-specific styles
│   ├── App.jsx            # Main application component
│   ├── index.css          # Global styles & Tailwind imports
│   └── main.jsx           # React entry point
├── .gitignore             # Git ignore rules
├── components.json        # Component configuration
├── eslint.config.js       # ESLint rules
├── index.html             # HTML entry point
├── jsconfig.json          # JavaScript compiler options
├── package-lock.json      # Dependency lock file
├── package.json           # Project dependencies & scripts
├── postcss.config.js      # PostCSS configuration
└── vite.config.js         # Vite build configuration
```

## 📦 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher, comes with Node.js)
- **Backend API** running on `http://localhost:5000`

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Anonymous2024-spec/kolaborate-dev-profiles.git
cd kolaborate-dev-profiles/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration (Optional)

Create a `.env` file in the frontend directory if you need to customize the API URL:

```env
VITE_API_URL=http://localhost:5000
```

**Note**: The default API URL is already configured in `src/services/api.js`

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at **http://localhost:5173** (or the next available port)

### 5. Build for Production

```bash
npm run build
```

Optimized production files will be generated in the `dist/` folder.

### 6. Preview Production Build

```bash
npm run preview
```

## 📜 Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build optimized production bundle        |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint to check code quality         |

## 🧩 Component Overview

### `App.jsx`

Main application component that handles routing logic and renders different views based on the current state (list, create, edit).

**Key Features**:

- Profile listing with pagination
- Search functionality
- Navigation between views
- State management for profiles

### `ProfileCard.jsx`

Displays individual developer profile information in a card format.

**Props**:

- `profile` - Profile object containing developer data
- `onEdit` - Callback function for edit action
- `onView` - Callback function for view details

**Features**:

- Displays name, location, email
- Shows skill tags
- Availability badge
- Hourly rate display
- Action buttons (Edit, View)

### `ProfileForm.jsx`

Reusable form component for creating and editing profiles.

**Props**:

- `initialData` - Pre-filled data for edit mode (optional)
- `onSubmit` - Callback function when form is submitted
- `onCancel` - Callback function for cancel action

**Features**:

- Client-side validation
- Dynamic skill tag input
- Checkbox for availability
- Responsive form layout
- Error messaging

### `SearchBar.jsx`

Search input component with real-time filtering.

**Props**:

- `onSearch` - Callback function with search query
- `placeholder` - Custom placeholder text (optional)

**Features**:

- Debounced search input
- Clear button
- Search icon
- Responsive design

### `LoadingState.jsx`

Loading indicator component for async operations.

**Features**:

- Animated spinner
- Customizable message
- Centered layout

### `EmptyState.jsx`

Placeholder component shown when no data is available.

**Props**:

- `message` - Custom empty state message
- `action` - Optional action button

**Features**:

- Friendly messaging
- Call-to-action button
- Centered layout

## 📡 API Integration

### API Service (`src/services/api.js`)

The API service uses Axios to communicate with the backend REST API.

**Base Configuration**:

```javascript
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
```

**Available Methods**:

| Method                     | Endpoint               | Description               |
| -------------------------- | ---------------------- | ------------------------- |
| `getProfiles(page, limit)` | GET `/profiles`        | Fetch paginated profiles  |
| `getProfile(id)`           | GET `/profiles/:id`    | Fetch single profile      |
| `createProfile(data)`      | POST `/profiles`       | Create new profile        |
| `updateProfile(id, data)`  | PUT `/profiles/:id`    | Update existing profile   |
| `searchProfiles(query)`    | GET `/profiles/search` | Search by skills/location |

**Error Handling**:
All API calls include try-catch blocks and return user-friendly error messages.

**Example Usage**:

```javascript
import api from "./services/api";

// Fetch all profiles
const profiles = await api.getProfiles(1, 10);

// Create new profile
const newProfile = await api.createProfile({
  name: "John Doe",
  email: "john@example.com",
  location: "San Francisco, CA",
  skills: ["React", "Node.js"],
  experienceYears: 5,
  availableForWork: true,
  hourlyRate: 75,
});
```

## 🎨 Styling Approach

### Tailwind CSS Configuration

The project uses Tailwind CSS with custom configuration:

**`tailwind.config.js`**:

- Custom color palette
- Extended spacing scale
- Custom font families
- Responsive breakpoints

**Utility Classes**:
The project makes extensive use of Tailwind's utility classes for:

- Responsive design (`sm:`, `md:`, `lg:` prefixes)
- Flexbox and Grid layouts
- Spacing and sizing
- Colors and backgrounds
- Hover and focus states

### Custom Styles

**Global Styles** (`src/index.css`):

- Tailwind base imports
- Custom CSS variables
- Typography defaults
- Scroll behavior

**Component Styles** (`src/App.css`):

- Component-specific overrides
- Animation keyframes
- Custom utilities

### Design System

**Colors**:

- Primary: Blue tones for actions
- Success: Green for availability
- Warning: Yellow for alerts
- Neutral: Gray scale for text and backgrounds

**Typography**:

- Headings: Bold, clear hierarchy
- Body: Readable line-height and spacing
- Monospace: For technical data

**Spacing**:

- Consistent use of Tailwind's spacing scale (4px increments)
- Generous whitespace for readability

## 🌐 Browser Support

This application is compatible with:

- ✅ Chrome (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Edge (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

**Note**: Internet Explorer is not supported.

## 🚀 Future Enhancements

### Planned Features

- [ ] **Authentication UI**: Login/signup forms with JWT integration
- [ ] **Profile Pictures**: Avatar upload and display
- [ ] **Advanced Filters**: Filter by experience, rate, availability
- [ ] **Sorting Options**: Sort by name, rate, experience, date
- [ ] **Pagination UI**: Better pagination controls
- [ ] **Dark Mode**: Toggle between light and dark themes
- [ ] **Export Functionality**: Download profiles as CSV/PDF
- [ ] **Favorites**: Bookmark/favorite profiles
- [ ] **Notifications**: Toast notifications for actions
- [ ] **Skeleton Loaders**: Better loading states

### Technical Improvements

- [ ] **State Management**: Migrate to Zustand or Redux for complex state
- [ ] **Form Validation**: Integrate Formik or React Hook Form
- [ ] **Testing**: Add Jest and React Testing Library
- [ ] **Accessibility**: WCAG 2.1 AA compliance
- [ ] **Performance**: Code splitting and lazy loading
- [ ] **PWA**: Progressive Web App capabilities
- [ ] **TypeScript**: Gradual migration to TypeScript

## 🔧 Troubleshooting

### Common Issues

**Port Already in Use**:

```bash
# Vite will automatically try the next available port
# Or specify a custom port:
npm run dev -- --port 3000
```

**API Connection Errors**:

- Ensure backend server is running on `http://localhost:5000`
- Check CORS configuration in backend
- Verify API endpoints are correct

**Build Errors**:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Styling Issues**:

```bash
# Rebuild Tailwind
npm run build
```

## 👤 Author

**Naana Shifah**

- GitHub: [@Anonymous2024-spec](https://github.com/Anonymous2024-spec)
- Repository: [kolaborate-dev-profiles](https://github.com/Anonymous2024-spec/kolaborate-dev-profiles)

## 📄 License

This project is created as part of a technical assessment for Kolaborate.

---

**Built with ❤️ using React + Vite + Tailwind CSS**
