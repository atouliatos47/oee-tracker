// Data Entry Module
const dataEntry = {
    init() {
        this.renderForm();
        this.setupEventListeners();
    },

    renderForm() {
        const formElement = document.querySelector('.data-entry-form');
        formElement.innerHTML = this.getFormHTML();
    },

    getFormHTML() {
        return `
            <div class="card">
                <form id="oee-entry-form">
                    <div class="form-group">
                        <label for="area">Manufacturing Area:</label>
                        <select id="area" required>
                            <option value="">Select Area</option>
                            <option value="Assembly">Assembly Line</option>
                            <option value="Welding">Welding Area</option>
                            <option value="Spot Welding">Spot Welding</option>
                            <option value="Roll Feed">Roll Feed</option>
                            <option value="Power Press">Power Press</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="shift">Shift:</label>
                        <select id="shift" required>
                            <option value="">Select Shift</option>
                            <option value="A">Shift A (06:00-14:00)</option>
                            <option value="B">Shift B (14:00-22:00)</option>
                            <option value="C">Shift C (22:00-06:00)</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="date">Date:</label>
                        <input type="date" id="date" required value="${new Date().toISOString().split('T')[0]}">
                    </div>

                    <div class="form-group">
                        <label for="plannedProductionTime">Planned Production Time (minutes):</label>
                        <input type="number" id="plannedProductionTime" required min="0" step="1" placeholder="480">
                    </div>

                    <div class="form-group">
                        <label for="runtime">Actual Runtime (minutes):</label>
                        <input type="number" id="runtime" required min="0" step="1" placeholder="420">
                    </div>

                    <div class="form-group">
                        <label for="totalParts">Total Parts Produced:</label>
                        <input type="number" id="totalParts" required min="0" step="1" placeholder="1000">
                    </div>

                    <div class="form-group">
                        <label for="goodParts">Good Parts:</label>
                        <input type="number" id="goodParts" required min="0" step="1" placeholder="980">
                    </div>

                    <div class="form-group">
                        <label for="idealCycleTime">Ideal Cycle Time (minutes per part):</label>
                        <input type="number" id="idealCycleTime" required min="0" step="0.01" placeholder="0.5">
                    </div>

                    <div class="form-group">
                        <label for="downtimeReason">Downtime Reason (optional):</label>
                        <textarea id="downtimeReason" placeholder="Describe any major downtime issues..."></textarea>
                    </div>

                    <button type="submit">Save OEE Data</button>
                </form>
            </div>

            <div id="calculation-result" class="card" style="display: none;">
                <h3>OEE Calculation Result</h3>
                <div id="result-content"></div>
            </div>
        `;
    },

    setupEventListeners() {
        const form = document.getElementById('oee-entry-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
    },

    handleFormSubmit() {
        const formData = this.getFormData();
        
        if (this.validateForm(formData)) {
            const oeeResult = this.calculateOEE(formData);
            this.saveEntry(formData, oeeResult);
            this.showResult(formData, oeeResult);
        }
    },

    getFormData() {
        return {
            area: document.getElementById('area').value,
            shift: document.getElementById('shift').value,
            date: document.getElementById('date').value,
            plannedProductionTime: parseFloat(document.getElementById('plannedProductionTime').value),
            runtime: parseFloat(document.getElementById('runtime').value),
            totalParts: parseInt(document.getElementById('totalParts').value),
            goodParts: parseInt(document.getElementById('goodParts').value),
            idealCycleTime: parseFloat(document.getElementById('idealCycleTime').value),
            downtimeReason: document.getElementById('downtimeReason').value
        };
    },

    validateForm(data) {
        // Basic validation
        if (data.goodParts > data.totalParts) {
            alert('Good parts cannot exceed total parts!');
            return false;
        }
        if (data.runtime > data.plannedProductionTime) {
            alert('Runtime cannot exceed planned production time!');
            return false;
        }
        return true;
    },

    calculateOEE(data) {
        // Availability = Runtime / Planned Production Time
        const availability = (data.runtime / data.plannedProductionTime) * 100;
        
        // Performance = (Total Parts * Ideal Cycle Time) / Runtime
        const performance = ((data.totalParts * data.idealCycleTime) / data.runtime) * 100;
        
        // Quality = Good Parts / Total Parts
        const quality = (data.goodParts / data.totalParts) * 100;
        
        // Overall OEE
        const oee = (availability * performance * quality) / 10000;
        
        return {
            availability: Math.min(100, availability),
            performance: Math.min(100, performance),
            quality: Math.min(100, quality),
            oee: Math.min(100, oee)
        };
    },

    saveEntry(formData, oeeResult) {
        const entry = {
            ...formData,
            ...oeeResult
        };
        
        oeeStorage.saveEntry(entry);
        console.log('Entry saved:', entry);
    },

    showResult(formData, oeeResult) {
        const resultElement = document.getElementById('calculation-result');
        const contentElement = document.getElementById('result-content');
        
        contentElement.innerHTML = `
            <p><strong>Area:</strong> ${formData.area}</p>
            <p><strong>Shift:</strong> ${formData.shift}</p>
            <p><strong>Availability:</strong> ${oeeResult.availability.toFixed(1)}%</p>
            <p><strong>Performance:</strong> ${oeeResult.performance.toFixed(1)}%</p>
            <p><strong>Quality:</strong> ${oeeResult.quality.toFixed(1)}%</p>
            <p><strong>Overall OEE:</strong> <span style="font-size: 1.2em; font-weight: bold;">${oeeResult.oee.toFixed(1)}%</span></p>
        `;
        
        resultElement.style.display = 'block';
        resultElement.scrollIntoView({ behavior: 'smooth' });
        
        // Reset form
        document.getElementById('oee-entry-form').reset();
    }
};