import ConfigLayout from "./ConfigLayout";
import "./Config.css";

function PackageOffered() {
    return (
        <ConfigLayout title="Package Offered" activeSide="package-offered">
            <section className="config-card">
                <div className="config-card-header">
                    <h2>Packages</h2>
                    <span className="config-badge">4 Options</span>
                </div>
                <div className="config-card-grid">
                    <div className="config-mini-card">
                        <h3>Starter</h3>
                        <p className="config-muted">Basic benefits and coverage.</p>
                        <button className="config-mini-action">View</button>
                    </div>
                    <div className="config-mini-card">
                        <h3>Standard</h3>
                        <p className="config-muted">Most popular for new clients.</p>
                        <button className="config-mini-action">View</button>
                    </div>
                    <div className="config-mini-card">
                        <h3>Premium</h3>
                        <p className="config-muted">Extended coverage with perks.</p>
                        <button className="config-mini-action">View</button>
                    </div>
                </div>
            </section>

            <div className="config-actions">
                <button className="config-action config-action-ghost">Back</button>
                <button className="config-action config-action-primary">Create Package</button>
                <button className="config-action config-action-danger">Cancel</button>
            </div>
        </ConfigLayout>
    );
}

export default PackageOffered;
