# OEE Tracker Pro - Progressive Web App

A **modern, professional** OEE (Overall Equipment Effectiveness) tracking application for Frank Dudley Ltd, optimized as a Progressive Web App (PWA) with a contemporary design.

## Design Features

✨ **Modern Professional UI**
- Clean, contemporary design with neutral color palette
- Enterprise-grade appearance suitable for manufacturing
- Subtle shadows and refined spacing
- Professional typography with optimal readability
- Smooth transitions and interactions

🎨 **Design Principles**
- Minimalist aesthetic without clutter
- Focus on data and functionality
- Consistent spacing and alignment
- Professional color scheme (Navy blue primary)
- Mobile-first responsive design

## Features

- 📊 Real-time OEE calculations
- 💾 Offline functionality with PWA
- 📱 Mobile-friendly responsive design
- 📈 Dashboard with comprehensive statistics
- 📥 Export data to CSV
- 🔄 Auto-refresh dashboard
- 💪 Optimized modular architecture

## File Structure

```
oee-tracker/
├── index.html              # Main HTML file
├── styles.css              # All CSS styles
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker for offline support
├── icon.png               # App icon (Frank Dudley Ltd logo)
├── js/
│   ├── storage.js         # Data storage module
│   ├── dashboard.js       # Dashboard display module
│   ├── data-entry.js      # Data entry and calculation module
│   └── app.js            # Main application logic
└── README.md             # This file
```

## Installation

### Local Development

1. Place all files in a folder on your web server
2. Ensure the file structure is maintained
3. Open `index.html` in a modern web browser
4. The app will automatically initialize with sample data

### Installing as PWA

#### Desktop (Chrome/Edge)
1. Open the app in Chrome or Edge
2. Click the install icon (➕) in the address bar
3. Click "Install" in the dialog
4. The app will open in a standalone window

#### Mobile (Android/iOS)
1. Open the app in your mobile browser
2. Tap the browser menu (⋮ or Share icon)
3. Select "Add to Home Screen" or "Install App"
4. The app icon will appear on your home screen

## Usage

### Dashboard
- View overall OEE statistics
- See recent entries in the data table
- Export data to CSV
- Clear all data (with confirmation)

### Data Entry
1. Select production area
2. Choose shift
3. Enter production data:
   - Planned production time (minutes)
   - Actual runtime (minutes)
   - Total parts produced
   - Good parts
   - Ideal cycle time (minutes per part)
   - Downtime reason (optional)
4. Click "Save OEE Data"
5. View calculated results

### OEE Calculation

The app automatically calculates:

- **Availability** = (Runtime / Planned Production Time) × 100%
- **Performance** = (Total Parts × Ideal Cycle Time / Runtime) × 100%
- **Quality** = (Good Parts / Total Parts) × 100%
- **Overall OEE** = Availability × Performance × Quality

### Color Coding

- 🟢 Green: ≥85% (Excellent)
- 🟡 Yellow/Orange: 70-84% (Good)
- 🔴 Red: <70% (Needs Improvement)

## Optimization Features

### PWA Benefits
- **Offline Access**: Works without internet after first load
- **Fast Loading**: Cached resources load instantly
- **Installable**: Can be installed like a native app
- **App-like Experience**: Runs in standalone mode

### Code Optimization
- **Modular Architecture**: Separated into logical modules
- **Smaller Files**: Easier to maintain and update
- **Better Performance**: Optimized loading and execution
- **Clean Code**: Well-commented and organized

## Browser Support

- Chrome/Edge (Desktop & Mobile)
- Firefox (Desktop & Mobile)
- Safari (Desktop & Mobile)
- Opera

## Local Storage

All data is stored locally in your browser's localStorage. Data persists between sessions but is specific to the device and browser.

To export your data before clearing browser data, use the "Export Data" button on the dashboard.

## Technical Details

- **Framework**: Vanilla JavaScript (no dependencies)
- **Storage**: localStorage API
- **PWA**: Service Workers with Cache API
- **Responsive**: CSS Grid and Flexbox
- **Icons**: PNG format (512×512)
- **Design System**: Custom CSS with modern best practices
- **Color Palette**: Professional navy blue theme
- **Typography**: System fonts for optimal performance

## Design Improvements

### From 90s to Modern
The updated design features:

**Before:**
- Gradient backgrounds
- Heavy shadows
- Uppercase labels
- Bold colors
- Cluttered spacing

**After:**
- Clean white/light gray background
- Subtle, refined shadows
- Normal case labels with proper hierarchy
- Professional navy blue accent
- Generous, consistent spacing
- Modern card-based layout
- Contemporary typography

## Maintenance

### Updating the App
1. Replace files on the server
2. Update the cache version in `service-worker.js`
3. The service worker will automatically update on user's next visit

### Adding Production Areas
Edit the area dropdown in `js/data-entry.js` line 17-24

### Changing Shifts
Edit the shift dropdown in `js/data-entry.js` line 28-32

## Support

For issues or questions, contact your IT department or the development team.

## Version

Version 1.0.0 - Optimized PWA Release

---

Built for Frank Dudley Ltd - Professional Automotive Manufacturing
