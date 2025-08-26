# 🍅 Cute Pomodoro Timer

A beautiful, blue-themed Pomodoro timer built with React, featuring cute animations and delightful easter eggs! Perfect for staying focused while having fun.

![Cute Pomodoro Timer](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.16.4-purple?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

### 🎯 Core Functionality
- **Pomodoro Timer**: 25-minute focus sessions
- **Short Breaks**: 5-minute breaks between sessions
- **Long Breaks**: 15-minute breaks after 4 pomodoros
- **Customizable Times**: Adjust all durations in settings
- **Progress Ring**: Beautiful circular progress indicator
- **Sound Notifications**: Audio alerts when timer completes

### 🎨 Design & UX
- **Blue Theme**: Beautiful gradient backgrounds
- **Glassmorphism**: Modern frosted glass effects
- **Smooth Animations**: Powered by Framer Motion
- **Responsive Design**: Works on all devices
- **Cute Icons**: Emoji-based interface elements

### 🎪 Easter Eggs & Fun Features
- **Konami Code**: Press ↑↑↓↓←→←→BA to unlock a secret message
- **Floating Hearts**: Click the play button 10 times to see hearts float
- **Sparkle Effects**: Hover over buttons for sparkle animations
- **Rainbow Mode**: Click the title 20+ times to activate rainbow background
- **Hidden Messages**: Discover secret notifications throughout the app
- **Cute Cursor**: Custom cursor effects on certain elements

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cute-pomodoro-timer.git
   cd cute-pomodoro-timer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 🎮 Easter Eggs Guide

### 🎯 How to Find Easter Eggs

1. **Konami Code**: 
   - Press: ↑↑↓↓←→←→BA
   - Result: Secret celebration message appears

2. **Floating Hearts**:
   - Click the play button 10 times
   - Result: Blue hearts float across the screen

3. **Sparkle Effects**:
   - Hover over the play/pause button
   - Result: Sparkle animation appears

4. **Rainbow Mode**:
   - Click the title "Cute Pomodoro" 20+ times
   - Result: Background changes to animated rainbow colors

5. **Hidden Interactions**:
   - Try clicking different elements multiple times
   - Hover over various buttons and icons
   - Watch for subtle animations and effects

## 🎨 Customization

### Changing Colors
The app uses CSS custom properties for easy theming. Main colors are defined in `src/App.css`:

```css
:root {
  --primary-blue: #3b82f6;
  --secondary-blue: #1d4ed8;
  --accent-color: #10b981;
}
```

### Adding New Easter Eggs
Easter eggs are managed in the `easterEggs` state object in `src/App.js`. Add new properties and trigger conditions as needed.

## 📱 Deployment

### GitHub Pages
1. Add `"homepage": "https://yourusername.github.io/cute-pomodoro-timer"` to `package.json`
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add deploy scripts to `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
4. Run `npm run deploy`

### Netlify
1. Build the project: `npm run build`
2. Drag the `build` folder to Netlify
3. Or connect your GitHub repository for automatic deployments

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

## 🛠️ Tech Stack

- **React 18.2.0** - UI framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **CSS3** - Styling with modern features
- **HTML5** - Semantic markup

## 📁 Project Structure

```
cute-pomodoro-timer/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.js          # Main application component
│   ├── App.css         # Styles and animations
│   ├── index.js        # React entry point
│   └── index.css       # Global styles
├── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the Pomodoro Technique
- Icons from [Lucide React](https://lucide.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Beautiful gradients and effects

## 📞 Support

If you find any bugs or have suggestions for new features, please open an issue on GitHub!

---

Made with 💙 and lots of ☕ by [Your Name]
