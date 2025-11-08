// Enhanced Dashboard Module
const dashboard = {
    init() {
        this.loadDashboardData();
        this.setupAutoRefresh();
    },

    setupAutoRefresh() {
        // Refresh dashboard every 30 seconds
        setInterval(() => {
            this.loadDashboardData();
        }, 30000);
    },

    loadDashboardData() {
        const entries = oeeStorage.getEntries();
        const dashboardElement = document.querySelector('.dashboard-overview');
        
        if (entries.length === 0) {
            dashboardElement.innerHTML = this.getEmptyStateHTML();
            return;
        }

        const latestEntries = this.getLatestEntriesByArea(entries);
        const overallOEE = this.calculateOverallOEE(latestEntries);
        
        dashboardElement.innerHTML = this.getDashboardHTML(overallOEE, latestEntries);
        this.setupDashboardInteractions();
    },

    getLatestEntriesByArea(entries) {
        const areas = ['Assembly', 'Welding', 'Spot Welding', 'Roll Feed', 'Power Press'];
        const latestEntries = {};
        
        areas.forEach(area => {
            const areaEntries = entries.filter(entry => entry.area === area);
            if (areaEntries.length > 0) {
                latestEntries[area] = areaEntries.sort((a, b) => 
                    new Date(b.timestamp) - new Date(a.timestamp)
                )[0];
            }
        });
        
        return latestEntries;
    },

    calculateOverallOEE(entries) {
        const areas = Object.keys(entries);
        if (areas.length === 0) return { oee: 0, availability: 0, performance: 0, quality: 0 };
        
        const totals = areas.reduce((acc, area) => {
            const entry = entries[area];
            acc.availability += entry.availability;
            acc.performance += entry.performance;
            acc.quality += entry.quality;
            acc.oee += entry.oee;
            return acc;
        }, { availability: 0, performance: 0, quality: 0, oee: 0 });
        
        // Return averages
        const count = areas.length;
        return {
            availability: totals.availability / count,
            performance: totals.performance / count,
            quality: totals.quality / count,
            oee: totals.oee / count
        };
    },

    getDashboardHTML(overallOEE, areaEntries) {
        const areas = Object.keys(areaEntries);
        const lastUpdated = new Date().toLocaleTimeString();
        
        return `
            <div class="dashboard-header">
                <div>
                    <h2>Production Overview</h2>
                    <p style="color: var(--light);">Last updated: ${lastUpdated}</p>
                </div>
                <button class="btn" onclick="dashboard.refreshData()">🔄 Refresh</button>
            </div>

            <!-- Overall OEE Metrics -->
            <div class="card">
                <h3>Overall Equipment Effectiveness</h3>
                <div class="oee-metrics">
                    <div class="metric-card">
                        <div class="metric-value" style="color: ${this.getOEEColor(overallOEE.oee)};">
                            ${overallOEE.oee.toFixed(1)}%
                        </div>
                        <div class="metric-label">Overall OEE</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" style="color: ${this.getOEEColor(overallOEE.availability)};">
                            ${overallOEE.availability.toFixed(1)}%
                        </div>
                        <div class="metric-label">Availability</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" style="color: ${this.getOEEColor(overallOEE.performance)};">
                            ${overallOEE.performance.toFixed(1)}%
                        </div>
                        <div class="metric-label">Performance</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" style="color: ${this.getOEEColor(overallOEE.quality)};">
                            ${overallOEE.quality.toFixed(1)}%
                        </div>
                        <div class="metric-label">Quality</div>
                    </div>
                </div>
            </div>

            <!-- Area-wise Breakdown -->
            <div class="card">
                <h3>Area Performance</h3>
                <div class="area-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
                    ${areas.map(area => this.getAreaCardHTML(area, areaEntries[area])).join('')}
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="card">
                <h3>Quick Actions</h3>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <button class="btn" onclick="oeeApp.loadPage('data-entry')">
                        ➕ Add New Entry
                    </button>
                    <button class="btn btn-warning" onclick="dashboard.exportData()">
                        📊 Export Data
                    </button>
                    <button class="btn btn-success" onclick="dashboard.generateReport()">
                        📋 Generate Report
                    </button>
                </div>
            </div>
        `;
    },

    getAreaCardHTML(area, entry) {
        const status = this.getAreaStatus(entry);
        const timeAgo = this.getTimeAgo(entry.timestamp);
        
        return `
            <div class="metric-card area-${area.toLowerCase().replace(' ', '-')}">
                <div style="display: flex; justify-content: between; align-items: start; margin-bottom: 1rem;">
                    <h4>${area}</h4>
                    <span class="status-badge status-${status}">${status}</span>
                </div>
                <div class="metric-value">${entry.oee.toFixed(1)}%</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; margin: 1rem 0;">
                    <div>
                        <small style="color: var(--gray);">Avail</small>
                        <div style="font-weight: 600;">${entry.availability.toFixed(1)}%</div>
                    </div>
                    <div>
                        <small style="color: var(--gray);">Perf</small>
                        <div style="font-weight: 600;">${entry.performance.toFixed(1)}%</div>
                    </div>
                    <div>
                        <small style="color: var(--gray);">Qual</small>
                        <div style="font-weight: 600;">${entry.quality.toFixed(1)}%</div>
                    </div>
                </div>
                <div style="font-size: 0.8rem; color: var(--gray);">
                    Updated: ${timeAgo}
                </div>
            </div>
        `;
    },

    getAreaStatus(entry) {
        if (entry.oee >= 85) return 'running';
        if (entry.oee >= 65) return 'changeover';
        return 'fault';
    },

    getOEEColor(value) {
        if (value >= 85) return 'var(--success)';
        if (value >= 65) return 'var(--warning)';
        return 'var(--danger)';
    },

    getTimeAgo(timestamp) {
        const now = new Date();
        const time = new Date(timestamp);
        const diffMinutes = Math.floor((now - time) / (1000 * 60));
        
        if (diffMinutes < 1) return 'Just now';
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
        return `${Math.floor(diffMinutes / 1440)}d ago`;
    },

    getEmptyStateHTML() {
        return `
            <div class="card" style="text-align: center; padding: 3rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">📊</div>
                <h3>No Data Available</h3>
                <p style="color: var(--gray); margin-bottom: 2rem;">
                    Start tracking your OEE metrics by adding your first data entry.
                </p>
                <button class="btn" onclick="oeeApp.loadPage('data-entry')">
                    Add First Entry
                </button>
            </div>
        `;
    },

    refreshData() {
        this.loadDashboardData();
        // Show refresh feedback
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '🔄 Refreshing...';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 1000);
    },

    exportData() {
        const entries = oeeStorage.getEntries();
        const dataStr = JSON.stringify(entries, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `oee-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    },

    generateReport() {
        alert('Report generation feature coming soon!');
    },

    setupDashboardInteractions() {
        // Add any interactive dashboard elements here
    }
};