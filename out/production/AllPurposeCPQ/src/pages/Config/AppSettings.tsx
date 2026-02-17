import ConfigLayout from "./ConfigLayout";
import "./Config.css";

function AppSettings() {
    return (
        /* Ensure activeSide matches the ConfigSideType in your Layout */
        <ConfigLayout title="Application Settings" activeSide="app-settings">
            <section className="config-card">
                <div className="config-card-header">
                    <h2>General Settings</h2>
                    <span className="config-badge">Admin Only</span>
                </div>

                {/* The 'config-split' class likely handles your 2-column layout.
                  This is perfect for the "Config Table" data the sponsor mentioned.
                */}
                <div className="config-split">
                    <div className="config-column">
                        <div className="config-field">
                            <label htmlFor="company-name">Company Display Name</label>
                            <input id="company-name" type="text" placeholder="All Purpose CPQ" />
                        </div>
                        <div className="config-field">
                            <label htmlFor="timezone">Default Timezone</label>
                            <input id="timezone" type="text" placeholder="America/New_York" />
                        </div>
                    </div>
                    <div className="config-column">
                        <div className="config-field">
                            <label htmlFor="currency">Primary Currency</label>
                            <input id="currency" type="text" placeholder="USD" />
                        </div>
                        <div className="config-field">
                            <label htmlFor="locale">Locale</label>
                            <input id="locale" type="text" placeholder="en-US" />
                        </div>
                    </div>
                </div>
            </section>

            <div className="config-actions">
                {/* Updated 'Back' to return to the main dashboard or previous section */}
                <button className="config-action config-action-ghost">Back</button>
                <button className="config-action config-action-primary">Save Changes</button>
                <button className="config-action config-action-danger">Cancel</button>
            </div>
        </ConfigLayout>
    );
}

export default AppSettings;