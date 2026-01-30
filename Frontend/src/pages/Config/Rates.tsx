import ConfigLayout from "./ConfigLayout";
import "./Config.css";

function Rates() {
    return (
        <ConfigLayout title="Define Product Rates" activeSide="app-settings" activeTab="rates">
            <section className="config-card">
                <div className="config-card-header">
                    <h2>Rate Table</h2>
                    <span className="config-badge">Updated Today</span>
                </div>
                <div className="config-table">
                    <div className="config-table-head">
                        <span>Age Band</span>
                        <span>Base Rate</span>
                        <span>Risk Tier</span>
                    </div>
                    <div className="config-table-row">
                        <span>18 - 30</span>
                        <span>$42.00</span>
                        <span>Standard</span>
                    </div>
                    <div className="config-table-row">
                        <span>31 - 45</span>
                        <span>$58.00</span>
                        <span>Standard</span>
                    </div>
                    <div className="config-table-row">
                        <span>46 - 60</span>
                        <span>$79.00</span>
                        <span>Preferred</span>
                    </div>
                </div>
                <div className="config-helper">Add new bands to keep pricing aligned.</div>
            </section>

            <div className="config-actions">
                <button className="config-action config-action-ghost">Back</button>
                <button className="config-action config-action-primary">Next</button>
                <button className="config-action config-action-danger">Cancel</button>
            </div>
        </ConfigLayout>
    );
}

export default Rates;
