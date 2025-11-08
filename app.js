getFormHTML() {
    return `
        <div class="card">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
                <div style="font-size: 2rem;">📝</div>
                <div>
                    <h3 style="margin: 0;">New OEE Entry</h3>
                    <p style="color: var(--gray); margin: 0;">Enter production data for OEE calculation</p>
                </div>
            </div>

            <form id="oee-entry-form">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                    <div class="form-group">
                        <label for="area">Manufacturing Area</label>
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
                        <label for="shift">Shift</label>
                        <select id="shift" required>
                            <option value="">Select Shift</option>
                            <option value="A">Shift A (06:00-14:00)</option>
                            <option value="B">Shift B (14:00-22:00)</option>
                            <option value="C">Shift C (22:00-06:00)</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="date">Date</label>
                    <input type="date" id="date" required value="${new Date().toISOString().split('T')[0]}">
                </div>

                <div style="background: var(--light); padding: 1.5rem; border-radius: var(--border-radius); margin: 2rem 0;">
                    <h4 style="margin-bottom: 1rem; color: var(--primary);">Production Data</h4>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                        <div class="form-group">
                            <label for="plannedProductionTime">Planned Production Time (min)</label>
                            <input type="number" id="plannedProductionTime" required min="0" step="1" placeholder="480">
                            <small style="color: var(--gray);">Total available production minutes</small>
                        </div>

                        <div class="form-group">
                            <label for="runtime">Actual Runtime (min)</label>
                            <input type="number" id="runtime" required min="0" step="1" placeholder="420">
                            <small style="color: var(--gray);">Actual machine running time</small>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem;">
                        <div class="form-group">
                            <label for="totalParts">Total Parts</label>
                            <input type="number" id="totalParts" required min="0" step="1" placeholder="1000">
                        </div>

                        <div class="form-group">
                            <label for="goodParts">Good Parts</label>
                            <input type="number" id="goodParts" required min="0" step="1" placeholder="980">
                        </div>

                        <div class="form-group">
                            <label for="idealCycleTime">Ideal Cycle Time (min/part)</label>
                            <input type="number" id="idealCycleTime" required min="0" step="0.01" placeholder="0.5">
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="downtimeReason">Downtime Notes (Optional)</label>
                    <textarea id="downtimeReason" rows="3" placeholder="Describe any major downtime issues, maintenance, or quality problems..."></textarea>
                </div>

                <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                    <button type="button" class="btn" style="background: var(--gray);" onclick="oeeApp.loadPage('dashboard')">
                        ← Back to Dashboard
                    </button>
                    <button type="submit" class="btn btn-success">
                        💾 Save OEE Data
                    </button>
                </div>
            </form>
        </div>

        <div id="calculation-result" class="card" style="display: none;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                <div style="font-size: 2rem;">✅</div>
                <h3 style="margin: 0;">OEE Calculation Complete</h3>
            </div>
            <div id="result-content"></div>
            <div style="margin-top: 1.5rem;">
                <button class="btn" onclick="document.getElementById('calculation-result').style.display = 'none'">
                    Add Another Entry
                </button>
            </div>
        </div>
    `;
}