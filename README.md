# 🌟 Humanity - Volunteer Management Platform

## 🔗 Live Link
[🌐 Humanity](https://humanity-by-mostafiz.netlify.app/my-saved-post)

---

## 📝 Project Overview
This project is a user-friendly platform for volunteer management, enabling users to create, update, and delete volunteer need posts. Users can also volunteer for others' posts. The project focuses on responsive design, secure authentication, and smooth user experience.

---

## 🎯 Purpose
The purpose of this project is to streamline volunteer activities and provide a centralized platform for managing volunteer needs.

---

## ✨ Features 

### **🏠 Home Page:**
- 🎞️ Added a slider with three meaningful slides.
- 📌 Created a "Volunteer Needs Now" section displaying six cards sorted by upcoming deadlines.
- 🔗 Implemented a "See All" button to navigate to the full list of posts.
- 🖼️ Designed two additional sections to enhance user engagement.

### **➕ Add Volunteer Need Post Page:**
- 📝 Developed a form with all necessary fields like Thumbnail, Title, Description, and more.
- 🔒 Made the page a private route and ensured data is stored in the database with success notifications.

### **📄 Volunteer Need Post Details Page:**
- ℹ️ Displayed detailed post information and added a "Be a Volunteer" button.
- 🔐 Made the route private and secured access for logged-in users only.

### **🤝 Be a Volunteer Page/Modal:**
- 📋 Implemented a modal displaying read-only post details and editable fields for volunteering.
- 📊 Integrated database operations to track volunteer requests and update the count of available slots.

### **📋 All Volunteer Need Posts Page:**
- 💡 Created a page displaying all posts in card format.
- 🔍 Added a search bar to filter posts by title using backend integration.

### **🛠️ Manage My Volunteer Need Posts Page:**
- 🖥️ Displayed user-created posts in a table format with options to update and delete.
- ✅ Added confirmation for deletions and ensured proper messages for empty states.
- 📝 Designed an update page with pre-filled forms for post modifications.

### **📬 My Volunteer Request Posts:**
- 📑 Developed a table to display user-requested posts with options to cancel requests.
- ⚠️ Included confirmation dialogs for cancellations.

### **🔖 Saved Post / Bookmark Post:**
- 📌 A feature allowing users to bookmark posts for future reference.

### **📥 Received Requests and Actions:**
- ✔️ Manage incoming volunteer requests with options to accept or reject.

### **📸 Dynamic Gallery / Memory Section:**
- 🖼️ Dynamically upload and view memories.

### **⭐ User/Volunteer Reviews:**
- 📝 Submit and view reviews for posts.

### **👤 Profile Section:**
- 📊 Users can view the number of posts they created, requests they received, and requests they sent.

### **🛠️ Update Profile:**
- ✏️ Update their profile details and preferences.

---

## ⚙️ Backend Features

### **🔑 User Authentication:**
- 🔒 Secure authentication with JWT tokens.
- 🔐 Password hashing using bcrypt.
- 🛡️ Role-based access for private routes.

### **🗃️ Database Management:**
- 🛢️ MongoDB used as the primary database.
- 🧩 Mongoose models for structured data handling.
- ⚡ Efficient query handling with MongoDB aggregation and indexes.

### **🤝 Volunteer Management:**
- 🖋️ CRUD operations for volunteer need posts.
- 📊 Ability to track volunteer requests with status updates.
- 🔽 Automatic decrement of required volunteers using MongoDB `$inc` operator.

### **⚠️ Error Handling:**
- 🚫 Custom error messages for invalid API requests.
- 🔧 Centralized error handling middleware.

### **🛠️ API Development:**
- 🌐 RESTful APIs for seamless integration with the frontend.
- 🔐 Secure endpoints with token-based authentication.
- 🔍 Pagination and search functionality for efficient data retrieval.

### **🛡️ Environment Management:**
- 🔑 Environment variables used to secure Firebase keys and MongoDB credentials.

### **🚀 Deployment:**
- ☁️ Backend deployment on reliable cloud hosting.
- 🌍 CORS configured to allow secure cross-origin requests.

---

## 💻 Technologies Used

### **Frontend Technologies**
- ⚛️ React
- 🎨 Tailwind CSS
- 🛣️ React Router
- 🧩 Material UI
- 🌼 Daisy UI
- 🎥 Lottie Files
- 🎭 Framer Motion

### **Backend Technologies**
- 🟩 Node.js
- 🛠️ Express.js
- 🛢️ MongoDB
- 🧩 Mongoose
- 🔑 JWT (JSON Web Token)
- 🔐 bcrypt
# volunteer-management-humanity-client-side



---
## Dependencies

### Production Dependencies
The following dependencies are required for the application to run:

- **@heroicons/react**: Icon library for React.
- **@material-tailwind/react**: Material Tailwind components for React.
- **@tanstack/react-query**: Library for managing server-state in React applications.
- **@tanstack/react-router**: Routing solution for React applications.
- **aos**: Animate On Scroll library for adding animations.
- **axios**: HTTP client for API requests.
- **firebase**: Backend-as-a-service for authentication, database, and hosting.
- **localforage**: Library for offline storage.
- **lottie-react**: For adding Lottie animations in React.
- **match-sorter**: Utility for filtering and sorting lists.
- **motion**: Declarative animations in React.
- **react**: Core library for building the UI.
- **react-card-carousel**: Carousel component for React.
- **react-copy-to-clipboard**: Enables copy-to-clipboard functionality.
- **react-dom**: React package for working with the DOM.
- **react-fast-marquee**: Scrolling text or image marquee component.
- **react-google-recaptcha**: Google reCAPTCHA integration for React.
- **react-helmet**: Manage the document head in React.
- **react-hook-form**: Library for managing forms in React.
- **react-hot-toast**: Notifications library for React.
- **react-icons**: Icon library for React.
- **react-responsive-carousel**: Carousel component optimized for responsiveness.
- **react-router-dom**: Client-side routing library for React.
- **react-simple-captcha**: A simple CAPTCHA library for React.
- **react-simple-typewriter**: Typewriter animation for React.
- **react-toastify**: Notifications library for React.
- **react-tooltip**: Tooltip library for React.
- **sort-by**: Utility for sorting arrays by property.
- **sweetalert2**: Beautiful, responsive, customizable JavaScript alert library.
- **swiper**: Modern touch slider for React.

### Dev Dependencies
The following dependencies are used for development purposes:

- **webpack**: Module bundler.
- **babel**: JavaScript compiler.
- **eslint**: Linting tool for JavaScript.
- **prettier**: Code formatter.
- **jest**: Testing framework for JavaScript.
- **dotenv**: Loads environment variables from a `.env` file.


---

## Installation

### Prerequisites

- **Node.js**: v16 or higher
- **NPM/Yarn**: Latest version
- **MongoDB**: For database management

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/MostafizurRahman199/volunteer-management-humanity-client-side.git
   cd volunteer-management-humanity-client-side


2. Install NPM:
   - Added proper Markdown syntax for `npm install` using:
     ```bash
     npm install
     ```
   - This ensures consistency with the other steps.

3. Verified Formatting:
   - All commands are now enclosed in `bash` code blocks.
   - The `.env` file variables are properly formatted with `env` syntax.

