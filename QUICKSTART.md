# Quick Start Guide - OEE Tracker Pro

## Run Locally in 3 Steps

### Step 1: Download All Files
Make sure you have all these files in one folder:
```
oee-tracker/
├── index.html
├── styles.css
├── manifest.json
├── service-worker.js
├── icon.png
└── js/
    ├── storage.js
    ├── dashboard.js
    ├── data-entry.js
    └── app.js
```

### Step 2: Open Command Prompt
1. Press `Windows Key + R`
2. Type `cmd` and press Enter
3. Navigate to your folder:
   ```cmd
   cd C:\path\to\your\oee-tracker
   ```

### Step 3: Start the Server
Run this command:
```cmd
python -m http.server 8000
```

### Step 4: Open in Browser
Open your browser and go to:
```
http://localhost:8000
```

That's it! Your OEE Tracker is now running! 🎉

---

## Troubleshooting

**Problem: "python is not recognized"**
- Solution: Install Python from https://www.python.org/downloads/
- OR just double-click `index.html` (some features won't work)

**Problem: Port 8000 is already in use**
- Solution: Use a different port number:
  ```cmd
  python -m http.server 8080
  ```
  Then go to: http://localhost:8080

**Problem: Can't see the Frank Dudley logo**
- Make sure `icon.png` is in the same folder as `index.html`

---

## Features

✅ Purple gradient background (your original design)
✅ Colored stat cards with borders
✅ Dashboard with "REFRESH" button
✅ "Last updated" timestamp
✅ History tab
✅ Data Entry tab
✅ Export to CSV
✅ PWA - Install as app
✅ Offline support

---

## Installing as Desktop App

1. Open the app in Chrome or Edge
2. Look for the install icon (➕) in the address bar
3. Click "Install"
4. The app will open in its own window!

---

## Your Design is Back!

✨ Purple gradient background
✨ Vibrant colored borders on stats
✨ Production Overview section
✨ REFRESH button
✨ All the colors you had before

But now it's:
- Modular (split into separate files)
- Optimized for performance
- Works as a PWA (installable app)
- Easier to maintain and update

Enjoy! 🚀
