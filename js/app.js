// Main Application Controller
const oeeApp = {
    // Initialize the application
    init() {
        console.log('OEE Tracker Pro - Initializing...');

        // Set up navigation event listeners
        this.setupNavigation();

        // Initialize modules
        this.initializeModules();

        // Load the default page
        this.loadPage('dashboard');

        console.log('OEE Tracker Pro - Ready!');
    },

    // Set up navigation event listeners
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const page = e.target.getAttribute('data-page');
                this.loadPage(page);
            });
        });
    },

    // Load a specific page
    loadPage(pageName) {
        console.log(`Loading page: ${pageName}`);

        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // Remove active class from all nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Show the selected page
        const targetPage = document.getElementById(`${pageName}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Add active class to corresponding nav link
        const targetNavLink = document.querySelector(`[data-page="${pageName}"]`);
        if (targetNavLink) {
            targetNavLink.classList.add('active');
        }

        // Trigger page-specific initialization if needed
        if (pageName === 'dashboard' && typeof dashboard !== 'undefined') {
            dashboard.init();
        } else if (pageName === 'data-entry' && typeof dataEntry !== 'undefined') {
            dataEntry.init();
        }
    },

    // Initialize all modules
    initializeModules() {
        // Initialize storage with sample data if empty
        const storage = new OEEStorage();
        const entries = storage.getEntries();

        if (entries.length === 0) {
            console.log('No data found. Initializing with sample data...');
            storage.initializeSampleData();
        }

        // Initialize dashboard module
        if (typeof dashboard !== 'undefined') {
            dashboard.init();
        }

        // Initialize data entry module
        if (typeof dataEntry !== 'undefined') {
            dataEntry.init();
        }
    }
};

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => oeeApp.init());
} else {
    oeeApp.init();
}
