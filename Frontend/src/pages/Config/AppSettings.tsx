import ConfigLayout from "./ConfigLayout";
import "./Config.css";

function AppSettings() {
    return (
        <ConfigLayout title="Application Settings" activeSide="app-settings">
            <section className="config-card">
                <div className="config-card-header">
                    <h2>General</h2>
                    <span className="config-badge">Admin Only</span>
                </div>
                <div className="config-split">
                    <div>
                        <div className="config-field">
                            <label htmlFor="company-name">Company Display Name</label>
                            <input id="company-name" type="text" placeholder="All Purpose CPQ" />
                        </div>
                        <div className="config-field">
                            <label htmlFor="timezone">Default Timezone</label>
                            <input id="timezone" type="text" placeholder="America/New_York" />
                        </div>
                    </div>
                    <div>
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
                <button className="config-action config-action-ghost">Back</button>
                <button className="config-action config-action-primary">Save</button>
                <button className="config-action config-action-danger">Cancel</button>
            </div>
        </ConfigLayout>
    );
}

export default AppSettings;
