// Local Storage Management
class OEEStorage {
    constructor() {
        this.entriesKey = 'oee_entries';
        this.settingsKey = 'oee_settings';
    }

    // Save OEE entry
    saveEntry(entry) {
        const entries = this.getEntries();
        entry.id = Date.now().toString(); // Simple ID generation
        entry.timestamp = new Date().toISOString();
        entries.push(entry);
        localStorage.setItem(this.entriesKey, JSON.stringify(entries));
        return entry;
    }

    // Get all OEE entries
    getEntries() {
        const entries = localStorage.getItem(this.entriesKey);
        return entries ? JSON.parse(entries) : [];
    }

    // Get entries by area
    getEntriesByArea(area) {
        const entries = this.getEntries();
        return entries.filter(entry => entry.area === area);
    }

    // Get entries by date range
    getEntriesByDateRange(startDate, endDate) {
        const entries = this.getEntries();
        return entries.filter(entry => {
            const entryDate = new Date(entry.timestamp);
            return entryDate >= startDate && entryDate <= endDate;
        });
    }

    // Delete entry
    deleteEntry(entryId) {
        const entries = this.getEntries();
        const filteredEntries = entries.filter(entry => entry.id !== entryId);
        localStorage.setItem(this.entriesKey, JSON.stringify(filteredEntries));
    }

    // Initialize with sample data (for testing)
    initializeSampleData() {
        if (this.getEntries().length === 0) {
            const sampleEntries = [
                {
                    id: '1',
                    area: 'Welding',
                    shift: 'A',
                    date: new Date().toISOString().split('T')[0],
                    plannedProductionTime: 480,
                    runtime: 420,
                    totalParts: 850,
                    goodParts: 845,
                    idealCycleTime: 0.5,
                    timestamp: new Date().toISOString()
                }
            ];
            localStorage.setItem(this.entriesKey, JSON.stringify(sampleEntries));
        }
    }
}

// Create global instance
const oeeStorage = new OEEStorage();