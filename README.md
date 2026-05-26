# 🚀 Developer Portfolio

A modern full-stack developer portfolio showcasing projects, technical expertise, open-source contributions, and engineering experience.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-None-red)
![Stars](https://img.shields.io/github/stars/Suyash2527/developer-portfolio?style=social)
![Forks](https://img.shields.io/github/forks/Suyash2527/developer-portfolio?style=social)

![Project Preview]<p align="center">
    <a href="https://portfolio-f3a7b.web.app" target="_blank">
      <img src="/src/app/opengraph-image.png" alt="Live Preview" width="800" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
    </a>
  </p>
  <p align="center">
    <a href="https://portfolio-f3a7b.web.app" target="_blank"><strong>✨ Click above to view Live Preview ✨</strong></a>
  </p>

## ✨ Features

*   **🎨 Dynamic Project Showcase:** Elegantly display your projects with detailed descriptions, technologies used, and live demos.
*   **💡 Technical Expertise Highlights:** Clearly articulate your skills across various technologies and programming languages.
*   **🌱 Open-Source Contribution Tracking:** Integrate and highlight your contributions to open-source projects.
*   **📅 Engineering Experience Timeline:** Present your professional journey with a clear, chronological overview of your roles and achievements.
*   **🤖 Interactive AI Assistant:** Engage visitors with an AI-powered assistant, leveraging Google Cloud's Dialogflow CX, Discovery Engine, and Vertex AI for intelligent interactions.

## 🛠️ Installation

Follow these steps to get your developer portfolio up and running locally.

### Prerequisites

Ensure you have the following installed on your system:

*   Node.js (LTS version recommended)
*   npm or Yarn package manager

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Suyash2527/developer-portfolio.git
cd developer-portfolio
```

### Install Dependencies

Navigate into the project directory and install the required dependencies:

```bash
npm install
# OR
yarn install
```

### Environment Configuration

This project relies on environment variables for various services (e.g., Firebase, Google Cloud APIs, Nodemailer).

1.  Create a `.env.local` file by copying the example:

    ```bash
    cp .env.local.example .env.local
    ```

2.  Open `.env.local` and fill in the necessary API keys and credentials.
    *   This includes configuration for Firebase, Google Cloud (Dialogflow CX, Discovery Engine, Vertex AI), and any other third-party services you wish to integrate (e.g., Nodemailer for contact forms).

## 🚀 Usage

Once installed and configured, you can run the development server or build for production.

### Development Server

To start the development server with hot-reloading:

```bash
npm run dev
# OR
yarn dev
```

The application will be accessible at `http://localhost:3000`.

### Build for Production

To create an optimized production build:

```bash
npm run build
# OR
yarn build
```

To start the production server after building:

```bash
npm run start
# OR
yarn start
```



## 🗺️ Project Roadmap

We're continuously working to enhance the developer portfolio experience. Here's what's planned for future releases:

*   **V2.0 - Enhanced AI Agent:** Deeper integration with Google Cloud AI services, allowing for more personalized and context-aware interactions.
*   **Theme Customization:** Introduce multiple pre-built themes and options for users to customize colors and fonts.
*   **Automated Content Sync:** Implement features to automatically pull project details and blog posts from GitHub and other platforms (e.g., Dev.to).
*   **Accessibility Improvements:** Conduct thorough accessibility audits and implement improvements to ensure the portfolio is usable by everyone.
*   **CMS Integration:** Explore options for integrating with a headless CMS for easier content management.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please follow these guidelines.

### How to Contribute

1.  **Fork** the repository.
2.  **Create a new branch** for your feature or bug fix:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3.  **Make your changes** and ensure they adhere to the existing code style.
4.  **Commit your changes** with a clear and concise message:
    ```bash
    git commit -m 'feat: Add new feature for X'
    ```
5.  **Push** your branch to your forked repository:
    ```bash
    git push origin feature/your-feature-name
    ```
6.  **Open a Pull Request** against the `main` branch of this repository.

### Code Style

*   This project uses ESLint and Prettier for code formatting. Please ensure your code passes linting checks before submitting a PR.
*   Adhere to the existing TypeScript and React conventions.

### Branch Naming

Please use descriptive branch names with a prefix:

*   `feature/`: For new features.
*   `bugfix/`: For bug fixes.
*   `refactor/`: For code refactoring.
*   `docs/`: For documentation updates.
*   `chore/`: For maintenance tasks.

### Pull Request Process

*   Ensure your PR description clearly explains the problem it solves or the feature it adds.
*   Link to any relevant issues.
*   Make sure all automated checks (if any) pass.

## 📄 License

This project is currently **unlicensed**. All rights are reserved by the main contributor(s).

Copyright © 2023-present Suyash2527.
