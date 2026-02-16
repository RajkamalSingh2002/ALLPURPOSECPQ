import ConfigLayout from "./ConfigLayout";
import "./Config.css";

function RatesLibrary() {
    return (
        <ConfigLayout title="Rates Library" activeSide="rates">
            <section className="config-card">
                <div className="config-card-header">
                    <h2>Rate Collections</h2>
                    <span className="config-badge">Library</span>
                </div>
                <div className="config-list">
                    <div className="config-list-row">
                        <span>Standard Life 2026</span>
                        <span className="config-pill">Active</span>
                    </div>
                    <div className="config-list-row">
                        <span>Preferred Plus 2025</span>
                        <span className="config-pill">Archived</span>
                    </div>
                    <div className="config-list-row">
                        <span>Accidental Coverage</span>
                        <span className="config-pill">Active</span>
                    </div>
                </div>
                <div className="config-helper">Manage global rate libraries here.</div>
            </section>

            <div className="config-actions">
                <button className="config-action config-action-ghost">Back</button>
                <button className="config-action config-action-primary">New Library</button>
                <button className="config-action config-action-danger">Cancel</button>
            </div>
        </ConfigLayout>
    );
}

export default RatesLibrary;
