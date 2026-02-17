import ConfigLayout from "./ConfigLayout";
import "./Config.css";

function Rates() {
    return (
        <ConfigLayout title="Quote Data: Rates" activeSide="quote-data" activeTab="rates">
            <section className="config-card config-rate-card">
                <div className="config-rate-grid">
                    <label className="config-field">
                        <span>Question</span>
                        <select defaultValue="paint">
                            <option value="paint">Paint</option>
                            <option value="finish">Finish</option>
                            <option value="coverage">Coverage</option>
                        </select>
                    </label>
                    <label className="config-field">
                        <span>When Answer Is</span>
                        <input type="text" defaultValue="Yes" />
                    </label>
                    <label className="config-field">
                        <span>Price</span>
                        <input type="text" defaultValue="499.95" />
                    </label>
                    <label className="config-field">
                        <span>Math</span>
                        <select defaultValue="plus">
                            <option value="plus">Plus</option>
                            <option value="minus">Minus</option>
                            <option value="multiply">Multiply</option>
                        </select>
                    </label>
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

export default Rates;
