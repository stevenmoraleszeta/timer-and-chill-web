# Timer & Chill

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)

A modern, responsive, and professional React timer application with ambient sounds for focus, study, and relaxation.

[Features](#-features) • [Installation](#-installation) • [Documentation](#-documentation) • [Development](#-development)

</div>

---

## ✨ Introduction

**Timer & Chill** is a modern, fully-featured React application designed to help users maintain focus and productivity through customizable timers and ambient soundscapes. Built with React 18, TypeScript, and Vite, this project demonstrates professional front-end development practices including:

- ⚡ **Fast Development** - Vite for lightning-fast HMR
- 🏗️ **Scalable Architecture** - Modular components, custom hooks, and context providers
- 🎨 **Modern Styling** - CSS Modules with CSS Custom Properties
- ♿ **Accessibility First** - ARIA labels, keyboard navigation, and semantic HTML
- 📱 **Fully Responsive** - Mobile-first design with breakpoints
- 🔒 **Type Safety** - Full TypeScript support
- 🧪 **Production Ready** - Error boundaries, error handling, and optimizations

## 🚀 Technologies Used

### Core Technologies
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Next-generation frontend tooling
- **CSS Modules** - Scoped styling

### Key Libraries
- **Typed.js** - Animated typing effect for activity display
- **Web Audio API** - For ambient sound playback
- **Notifications API** - Browser notifications for timer completion

### Development Tools
- **ESLint** - Code linting and quality
- **TypeScript Compiler** - Type checking

## ⚙️ Installation

### Prerequisites
- **Node.js** 18+ (LTS recommended)
- **npm** or **yarn** or **pnpm**

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/timer-and-chill-prototype.git
   cd timer-and-chill-prototype
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically reload on file changes

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The production build will be in the `dist` folder. You can preview it with:

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## 🧩 Project Structure

```
timer-and-chill-prototype/
│
├── public/                  # Static assets served directly
│   ├── audio/              # Ambient sound files (served at /audio/)
│   ├── images/             # Static images (e.g., notification icons)
│   └── favicon.png         # Site favicon
│
├── src/                     # Source code
│   ├── assets/             # Assets processed by bundler
│   │   └── images/        # Component images (icons, UI elements)
│   │
│   ├── components/         # React components (with CSS Modules)
│   │   ├── AnimatedText.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   ├── SoundControls.tsx
│   │   ├── SoundPlayer.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── Timer.tsx
│   │
│   ├── contexts/           # React context providers
│   │   └── ThemeContext.tsx
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useAudio.ts
│   │   └── useTimer.ts
│   │
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   │
│   ├── utils/              # Utility functions
│   │   └── index.ts
│   │
│   ├── constants/          # Constants and configuration
│   │   └── index.ts
│   │
│   ├── App.tsx             # Root component
│   ├── App.module.css      # Root component styles
│   ├── main.tsx            # Application entry point
│   ├── index.css           # Global styles and CSS variables
│   └── vite-env.d.ts      # Vite type declarations
│
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tsconfig.node.json      # TypeScript config for Node.js tools
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

**Note:** This project follows React best practices with a clean, modular structure. All legacy folders (JS/, CSS/, IMG/, AUDIO/) have been removed in favor of the modern React/Vite architecture.

## 📋 Features

### ⏱️ Timer Functionality
- ✅ Customizable countdown timer (hours, minutes, seconds)
- ✅ Intuitive edit mode with +/- controls
- ✅ Play/pause functionality
- ✅ Reset button with proper state management
- ✅ Browser notifications on timer completion
- ✅ Real-time countdown with accurate timing

### 🎵 Ambient Sounds
- ✅ **6 Different Soundscapes**: Rain, Forest, Cafe, Garden, Farm, Restaurant
- ✅ Individual volume controls for each sound
- ✅ Play/pause controls for each sound independently
- ✅ Multiple sounds can play simultaneously
- ✅ Optimized audio playback with error handling
- ✅ Smooth volume transitions

### 🌙 Theme System
- ✅ Day/Night mode toggle
- ✅ Smooth color transitions
- ✅ CSS Custom Properties for dynamic theming
- ✅ Persistent visual feedback
- ✅ Context-based theme management

### ♿ Accessibility Features
- ✅ ARIA labels and roles for screen readers
- ✅ Keyboard navigation support
- ✅ Focus states for all interactive elements
- ✅ Semantic HTML structure
- ✅ Alt text for all images
- ✅ Reduced motion support

### 📱 Responsive Design
- ✅ Mobile-first approach
- ✅ Adaptive layouts for different screen sizes
- ✅ Touch-friendly controls
- ✅ Optimized for desktop, tablet, and mobile devices
- ✅ Breakpoints: 815px, 500px

## 🎯 Usage

### Setting a Timer
1. Click the **edit button** (pencil icon) to enter edit mode
2. Use the **+/- buttons** to adjust hours, minutes, and seconds
3. Click the **save button** (checkmark icon) to confirm
4. Click the **play button** to start the countdown
5. Click **pause** to stop the timer
6. Use the **reset button** to clear the timer

### Using Ambient Sounds
1. Click the **play button** next to any sound to start playback
2. Adjust the **volume slider** to control the sound level
3. Click **stop** to pause the sound
4. Multiple sounds can be played simultaneously

### Switching Themes
- Click the **sun/moon button** in the header to toggle between day and night modes
- The interface will smoothly transition between themes

## 🚀 Deployment

### Recommended Platforms

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```
- **Pros**: Zero configuration, automatic HTTPS, global CDN, Git integration
- **Best for**: Quick deployment, personal projects

#### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod
```
- **Pros**: Drag-and-drop deployment, form handling, serverless functions
- **Best for**: Static sites with forms or serverless needs

#### GitHub Pages
1. Build the project: `npm run build`
2. Push code to GitHub repository
3. Go to Settings → Pages
4. Select branch and folder (`dist`)
5. Site will be available at `username.github.io/repository-name`

#### Render
- Connect GitHub repository
- Select "Static Site"
- Build command: `npm run build`
- Publish directory: `dist`

#### AWS S3 + CloudFront
- Build the project: `npm run build`
- Upload `dist` folder to S3 bucket
- Configure static website hosting
- Set up CloudFront distribution for CDN
- **Best for**: Enterprise deployments, custom domains

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality Standards
- ✅ **TypeScript** with strict mode
- ✅ **ESLint** for code linting
- ✅ **Modular architecture** with separated concerns
- ✅ **Custom hooks** for reusable logic
- ✅ **Context providers** for state management
- ✅ **Error boundaries** for error handling
- ✅ **CSS Modules** for scoped styling
- ✅ **Performance optimization** (efficient hooks, memoization)

### Architecture Decisions

#### Component Structure
- **Layout Components** - Structure and layout
- **Feature Components** - Timer, Sound controls
- **UI Components** - Theme toggle, Animated text
- **Utility Components** - Error boundary

#### State Management
- **React Hooks** - `useState`, `useEffect`, `useCallback`, `useRef`
- **Context API** - Theme management
- **Custom Hooks** - Timer logic, Audio logic

#### Styling Approach
- **CSS Modules** - Scoped component styles
- **CSS Custom Properties** - Dynamic theming
- **Mobile-First** - Responsive design

## 📊 Performance

- ⚡ **Fast Build** - Vite for instant HMR
- 🎯 **Optimized Bundle** - Code splitting and tree shaking
- 🚀 **Efficient Rendering** - React hooks optimization
- 📦 **Asset Optimization** - Public assets for audio files
- 🎨 **CSS Optimization** - Scoped styles, minimal re-renders

## 🔧 Configuration

### Environment Variables
This project does not require environment variables as it runs entirely client-side.

### TypeScript Configuration
TypeScript is configured with strict mode enabled. See `tsconfig.json` for details.

### Vite Configuration
Vite is configured with React plugin and path aliases. See `vite.config.ts` for details.

## 🤝 Contributing

This is a personal project. For collaboration inquiries, please contact the repository owner.

## 📜 License

**Proprietary License**

Copyright (c) 2024 Steven Morales Fallas

All rights reserved. Redistribution, modification, reproduction, sublicensing, or any form of transaction (including commercial, educational, or promotional use) involving this repository, its source code, or derived works is strictly prohibited without the explicit and personal written authorization of the Lead Developer, Steven Morales Fallas.

Unauthorized commercial use, resale, or licensing of this repository or its contents is strictly forbidden and will be subject to applicable legal action.

See [LICENSE](LICENSE) file for full details.

## 👨‍💻 Author

**Steven Morales Fallas**
- Full Stack Developer
- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn URL]
- Email: [Your Email]

## 🔮 Future Enhancements

- [ ] Save timer presets to localStorage
- [ ] Multiple timer sessions
- [ ] Sound mixing presets
- [ ] Timer history and statistics
- [ ] PWA support for offline use
- [ ] Custom sound uploads
- [ ] Pomodoro technique integration
- [ ] Export timer data
- [ ] Dark mode based on system preferences
- [ ] Internationalization (i18n)
- [ ] Unit and integration tests
- [ ] E2E testing with Playwright/Cypress

## 📝 Changelog

### Version 2.0.0 (Current)
- 🎉 Complete React rewrite
- ✨ TypeScript integration
- 🏗️ Modern component architecture
- 🎨 CSS Modules implementation
- 🪝 Custom hooks for timer and audio
- 🎭 Context API for theme management
- ♿ Enhanced accessibility features
- 📱 Improved responsive design
- 🚀 Performance optimizations
- 🛡️ Error boundaries and error handling
- 🧹 Project structure cleanup (removed legacy folders)
- 📁 Reorganized assets following React best practices

### Version 1.0.0
- Initial vanilla JavaScript release
- Timer functionality
- Ambient sounds player
- Day/Night theme switching
- Basic accessibility improvements

---

<div align="center">

**Made with ❤️ by Steven Morales Fallas**

⭐ Star this repo if you find it helpful!

</div>
