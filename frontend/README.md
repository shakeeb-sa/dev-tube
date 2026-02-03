
# DevTube 📺

**DevTube** is a high-performance, developer-centric video discovery platform built with **React**, **Tailwind CSS**, and **Vite**. It utilizes the YouTube v3 API to provide a curated, ad-free-inspired browsing experience, specifically optimized for educational and technical content.

## 🚀 Key Features

-   **Dynamic Content Discovery**: Automatically fetches and categorizes the latest developer tutorials, tech news, and coding sessions.
    
-   **Custom Sidebar Navigation**: Filter content through specialized categories such as "New," "JS Mastery," "React JS," "Coding," and "Gaming."
    
-   **Integrated Search**: A lightning-fast search bar with instant results powered by the RapidAPI YouTube engine.
    
-   **Immersive Watch Experience**: A dedicated video player page featuring real-time view counts, subscriber data, and a "Related Videos" sidebar for continuous learning.
    
-   **Modern Slate UI**: A sleek, dark-themed "Deep Slate" interface designed to reduce eye strain during long coding sessions.
    
-   **Responsive Architecture**: Fully optimized for mobile, tablet, and desktop viewing using Tailwind's utility-first grid system.
    

## 🛠️ Tech Stack

-   **Frontend**: React.js 18 (Functional Components & Hooks).
    
-   **Styling**: Tailwind CSS for a modern, utility-first design.
    
-   **API Management**: Axios for handling high-frequency requests to the YouTube v3 API via RapidAPI.
    
-   **Routing**: React Router DOM for seamless navigation between Home, Search, and Video details.
    
-   **Icons**: Material UI (MUI) Icons for a professional, standardized look.
    

## 📁 Project Structure

Plaintext

```
src/
├── components/       # Reusable UI (Navbar, SearchBar, Sidebar, VideoCard)
├── utils/            # API configuration and fetch constants
│   └── fetchFromAPI.js
├── App.js            # Main application routing and layout
├── index.css         # Tailwind directives and global styles
└── main.jsx          # Application entry point

```

## ⚙️ Setup & Configuration

To run this project locally, you will need a YouTube v3 API key from RapidAPI.

1.  **Clone the repository**:
    
    Bash
    
    ```
    git clone https://github.com/your-username/dev-tube.git
    cd dev-tube
    
    ```
    
2.  **Install dependencies**:
    
    Bash
    
    ```
    npm install
    
    ```
    
3.  **Configure API Key**: Open `src/utils/fetchFromAPI.js` and add your RapidAPI key to the `options` headers.
    
4.  **Start the development server**:
    
    Bash
    
    ```
    npm run dev
    
    ```
    

## 📖 Usage

-   **Explore**: Use the sidebar to switch between popular development niches.
    
-   **Search**: Enter keywords like "Next.js" or "System Design" to find specific tutorials.
    
-   **Watch**: Click on any video thumbnail to enter the cinema-mode player and view channel details.
    

----------

_Developed by [Shakeeb](https://shakeeb-sa.github.io/) to streamline technical learning._
