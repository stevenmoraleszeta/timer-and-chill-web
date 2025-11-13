# Timer & Chill 🕐

A beautiful, accessible timer application with ambient sounds for focus, study, and relaxation.

## Features

- ⏱️ **Customizable Timer**: Set hours, minutes, and seconds with an intuitive interface
- 🌙 **Day/Night Mode**: Toggle between light and dark themes
- 🎵 **Ambient Sounds**: Choose from 6 different ambient soundscapes:
  - Rain
  - Forest
  - Cafe
  - Garden
  - Farm
  - Restaurant
- 🔊 **Volume Control**: Individual volume sliders for each sound
- 🔔 **Notifications**: Browser notifications when timer completes
- ♿ **Accessible**: Built with accessibility in mind (ARIA labels, keyboard navigation, focus states)

## Project Structure

```
timer-and-chill-prototype/
├── AUDIO/          # Ambient sound files
├── CSS/            # Stylesheets
│   ├── estructura.css    # Layout and structure
│   ├── estilo.css        # Colors and styling
│   └── animaciones.css   # Animations
├── IMG/             # Image assets
├── JS/              # JavaScript modules
│   ├── botonesReloj.js      # Timer functionality
│   ├── modoNoche.js         # Theme switching
│   ├── reproductorSonidos.js # Sound player
│   ├── textoCambiante.js    # Animated text
│   └── LIB/                 # Third-party libraries
└── index.html       # Main HTML file
```

## Recent Improvements

### Code Quality
- ✅ Refactored repetitive code in sound player
- ✅ Improved code organization with better function structure
- ✅ Added JSDoc comments for better documentation
- ✅ Removed console.log statements
- ✅ Fixed inconsistent image paths

### Performance
- ✅ Optimized volume slider (removed inefficient setInterval)
- ✅ Improved event handling with proper event listeners
- ✅ Better DOM ready state handling

### Bug Fixes
- ✅ Fixed timer reset bug (timer now stops when reset is clicked)
- ✅ Fixed notification permission handling
- ✅ Improved error handling for audio playback

### Accessibility
- ✅ Added ARIA labels to all interactive elements
- ✅ Added semantic HTML (role attributes, aria-live regions)
- ✅ Improved focus states for keyboard navigation
- ✅ Added alt text to all images
- ✅ Better screen reader support

### HTML/CSS
- ✅ Removed deprecated `autobuffer` attribute
- ✅ Fixed inconsistent image paths (all use `IMG/` now)
- ✅ Removed duplicate CSS rules
- ✅ Cleaned up empty CSS rules
- ✅ Added proper meta tags (charset, description)

## Usage

1. Open `index.html` in a modern web browser
2. Click the edit button (pencil icon) to modify the timer
3. Use +/- buttons to adjust hours, minutes, and seconds
4. Click the play button to start the countdown
5. Toggle ambient sounds using the play buttons
6. Adjust volume with the sliders
7. Switch between day/night mode using the sun/moon button

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser with ES6+ support

## Technical Details

- **Pure JavaScript**: No frameworks or build tools required
- **CSS Grid**: Modern layout system for responsive design
- **CSS Custom Properties**: For theme switching
- **Web Audio API**: For sound playback
- **Notifications API**: For timer completion alerts

## Future Enhancements

Potential improvements for future versions:
- [ ] Save timer presets
- [ ] Multiple timer sessions
- [ ] Sound mixing (play multiple sounds simultaneously)
- [ ] Timer history/statistics
- [ ] PWA support for offline use
- [ ] Custom sound uploads

## License

This project is open source and available for personal and educational use.
