import ConfigLayout from "./ConfigLayout";
import "./Config.css";

function Wordings() {
    return (
        <ConfigLayout
            title="Quote Data: Wordings"
            activeSide="quote-data"
            activeTab="wordings"
        >
            <section className="config-card">
                <div className="config-card-grid">
                    <div className="config-mini-card">
                        <h3>Policy Form</h3>
                        <p className="config-muted">PDF template used for customer quotes.</p>
                        <button className="config-mini-action">Upload</button>
                    </div>
                    <div className="config-mini-card">
                        <h3>Rate Schedule</h3>
                        <p className="config-muted">Latest approved rate sheet.</p>
                        <button className="config-mini-action">Upload</button>
                    </div>
                    <div className="config-mini-card">
                        <h3>Underwriting Guide</h3>
                        <p className="config-muted">Rules for special cases and referrals.</p>
                        <button className="config-mini-action">Upload</button>
                    </div>
                </div>
            </section>

            <div className="config-actions">
                <button className="config-action config-action-ghost">Back</button>
                <button className="config-action config-action-primary">Next</button>
                <button className="config-action config-action-danger">Cancel</button>
            </div>
        </ConfigLayout>
    );
}

export default Wordings;
