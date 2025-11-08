# OEE Tracker Pro

A client-side web application for tracking Overall Equipment Effectiveness (OEE) in automotive manufacturing environments.

## What is OEE?

Overall Equipment Effectiveness (OEE) is a key performance indicator that measures manufacturing productivity:

**OEE = Availability × Performance × Quality / 10,000**

Where:
- **Availability** = Actual Runtime / Planned Production Time
- **Performance** = (Total Parts × Ideal Cycle Time) / Runtime
- **Quality** = Good Parts / Total Parts

## Features

- **Real-time Dashboard**: View overall OEE metrics and area-specific performance
- **Data Entry**: Manually input production data with automatic OEE calculation
- **Multiple Areas**: Track 5 manufacturing areas:
  - Assembly Line
  - Welding Area
  - Spot Welding
  - Roll Feed
  - Power Press
- **Shift Tracking**: Monitor performance across three shifts (A, B, C)
- **Data Export**: Export all data as JSON
- **Local Storage**: All data persists in browser localStorage
- **Color-coded Status**: Visual indicators for performance levels
  - Green: ≥85% (Excellent)
  - Yellow: 65-84% (Good)
  - Red: <65% (Needs Improvement)

## Quick Start

1. Open `index.html` in a modern web browser
2. The dashboard will load with sample data
3. Navigate to "Data Entry" to add new OEE records
4. View aggregated metrics on the "Dashboard"

## File Structure

```
oee-tracker/
├── index.html           # Main HTML entry point
├── css/
│   └── style.css       # Application styling
├── js/
│   ├── app.js          # Main application controller & navigation
│   ├── storage.js      # LocalStorage data management
│   ├── dashboard.js    # Dashboard display logic
│   └── data-entry.js   # Data entry form & OEE calculations
└── README.md           # This file
```

## Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with custom properties
- **Storage**: Browser LocalStorage API
- **No dependencies**: Runs entirely in the browser

## Usage

### Adding New OEE Data

1. Click "Data Entry" in the navigation
2. Fill in the form:
   - Select Manufacturing Area
   - Choose Shift (A, B, or C)
   - Enter Date
   - Input Production Data:
     - Planned Production Time (minutes)
     - Actual Runtime (minutes)
     - Total Parts produced
     - Good Parts (quality)
     - Ideal Cycle Time (minutes per part)
   - Add optional downtime notes
3. Click "Save OEE Data"
4. The application automatically calculates OEE and its components

### Viewing Dashboard

The dashboard displays:
- Overall OEE percentage
- Availability, Performance, and Quality metrics
- Area-specific performance cards
- Last update timestamp
- Auto-refreshes every 30 seconds

### Exporting Data

Click "Export All Data" to download all OEE entries as a JSON file.

## Browser Compatibility

Requires a modern browser with support for:
- ES6 JavaScript
- CSS Grid & Flexbox
- LocalStorage API
- CSS Custom Properties

Tested on: Chrome, Firefox, Safari, Edge (latest versions)

## Future Enhancements

- Historical data visualization with charts
- Date range filtering
- Trend analysis
- Target OEE goals and alerts
- CSV export option
- Print-friendly reports

## License

This project is provided as-is for manufacturing performance tracking.
