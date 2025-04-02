# Leaflet Challenge

**Module 14 Challenge**  
**EdX/UT Data Analytics and Visualization Bootcamp**  
**Cohort UTA-VIRT-DATA-PT-11-2024-U-LOLC**  
**Author:** Neel Agarwal

**Leaflet Challenge** is a front-end project built with HTML, CSS, and JavaScript that showcases interactive mapping using the Leaflet library. The project is divided into two parts:

- **Part 1:** The core mapping challenge with essential functionality.
- **Part 2 (Optional):** An extended version with additional features and enhancements. A duplicate `index.html` is provided in the root of the repository to facilitate hosting via GitHub Pages.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Installation & Setup](#installation--setup)
3. [Technology Requirements](#technology-requirements)
4. [Directory Structure & File Breakdown](#directory-structure--file-breakdown)
5. [Deployment Details](#deployment-details)
6. [Usage](#usage)
7. [Limitations](#limitations)
8. [Credits & Citations](#credits--citations)

---

## Project Overview

Leaflet Challenge demonstrates interactive mapping capabilities using Leaflet.js. It provides a rich visual experience with dynamic data overlays, custom markers, and interactive layers. The project is designed for both learning and showcasing modern web mapping techniques.

- **Part 1:** Implements the basic mapping features and data visualization.
- **Part 2 (Optional):** Expands on the base functionality with extra layers, enhanced UI elements, and additional interactivity.

The duplicate `index.html` in the root is used to host the fully completed Part 2 version on GitHub Pages.

---

## Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/leaflet-challenge.git
   cd leaflet-challenge
   ```

2. **Open the Project Locally**

   Since this project is built entirely with HTML, CSS, and JavaScript, you can open the files directly in your web browser. For development, it’s recommended to use a live server extension (for example, the Live Server extension in VS Code) to preview changes in real time.

3. **Optional: Set Up a Local HTTP Server**

   If you prefer using a simple HTTP server, you can run one using Python:
   ```bash
   # For Python 3.x
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000/` in your browser.

---

## Technology Requirements

### Operating Systems

- **Supported OS:** Windows 10 or later, macOS, and Linux.
- **Minimum Hardware:**
  - CPU: Any modern processor
  - Memory: 2 GB RAM or higher
  - Disk Space: Minimal requirements as this is a front-end project

### Web Technologies

- **HTML5 & CSS3:** For structuring and styling the web pages.
- **JavaScript (ES6+):** For interactivity and logic.
- **Leaflet.js:** Core library for interactive mapping.
- **Additional Libraries:** (if any—include details on other frameworks/plugins used)

---

## Directory Structure & File Breakdown

Below is an overview of the project’s file structure along with brief explanations of each component:

```plaintext
leaflet-challenge/
│
├── part1/                       
│   ├── index.html              # Main HTML file for Part 1 with basic mapping features.
│   ├── css/                    
│   │   └── style.css           # Styles for Part 1.
│   ├── js/                     
│   │   └── main.js             # JavaScript logic for Part 1.
│   └── Images/                 # Image assets used in the project.
│       └── ...
│
├── part2/                       
│   ├── index.html              # Enhanced HTML file for Part 2 with extra functionality.
│   ├── css/                    
│   │   └── style.css           # Styles for Part 2 (may include additional customizations).
│   ├── js/                     
│   │   └── main.js             # JavaScript logic for Part 2 with extended features.
│   └── Images/                 # Image assets used in the project.
│       └── ...
│
├── index.html                  # Duplicate of Part 2's index.html for GitHub Pages deployment.
└── README.md                   # This README file.
```

### Explanation of File & Directory Connections

- **part1/**:  
  Contains the initial version of the project with core mapping functionality.
  
- **part2/**:  
  Includes the extended version of the project with optional enhancements. This version may feature additional layers, UI improvements, or interactivity.
  
- **index.html (root)**:  
  A duplicate of Part 2’s `index.html` is placed in the root directory to simplify hosting on GitHub Pages. This file is used as the landing page for the deployed site.
  
- **assets/**:  
  Stores static resources such as images and data files required for the map.
  
- **README.md**:  
  Provides an overview and instructions for the project.

---

## Deployment Details

- **GitHub Pages:**  
  The project is configured to deploy via GitHub Pages using the duplicate `index.html` (which is Part 2’s version) in the root directory. This ensures that visitors see the fully enhanced version of the project.

- **Hosting:**  
  Simply push your changes to the GitHub repository and enable GitHub Pages from the repository settings. The site will be accessible at [https://neelka96.github.io/leaflet-challenge/](https://neelka96.github.io/leaflet-challenge/).

---

## Usage

- **Local Development:**  
  Open the `part1/index.html` or `part2/index.html` (or the root `index.html` for the enhanced version) in your browser. Use a live server for real-time updates.

- **Viewing on GitHub Pages:**  
  Navigate to the GitHub Pages URL (e.g., [https://neelka96.github.io/leaflet-challenge/](https://neelka96.github.io/leaflet-challenge/)) to view the deployed site with the full functionality of Part 2.

- **Interactivity:**  
  Use the interactive controls provided by the Leaflet map to explore data layers and features. JavaScript files in the `js/` directories manage the map’s behavior and data interactions.

---

## Limitations

- **Browser Compatibility:**  
  While the project uses modern web standards, some legacy browsers may not fully support all features.
  
- **Data Integration:**  
  The project currently uses static data files (if any). Future iterations could integrate live data feeds or APIs for real-time updates.

- **Performance:**  
  Extensive data layers or high-resolution images may impact performance on lower-end devices.

- **Feature Completeness:**  
  Part 1 is a simplified version; Part 2 includes optional enhancements. Some users may prefer additional features which could be implemented in future updates.

---

## Credits & Citations

- **Key References & Documentation:**  
  - [Leaflet Documentation](https://leafletjs.com/)
  - [HTML5 & CSS3 Documentation](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
  - [JavaScript (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  - README template and design guidance inspired by previous projects and ChatGPT assistance.