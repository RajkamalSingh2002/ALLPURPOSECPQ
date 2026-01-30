import ConfigLayout from "./ConfigLayout";
import "./Config.css";

function Questions() {
    return (
        <ConfigLayout title="Define Product Questions" activeSide="app-settings" activeTab="questions">
            <section className="config-card">
                <div className="config-card-header">
                    <h2>Question Set</h2>
                    <span className="config-badge">8 Questions</span>
                </div>
                <div className="config-list">
                    <div className="config-list-row">
                        <span>Applicant Age</span>
                        <span className="config-pill">Number</span>
                    </div>
                    <div className="config-list-row">
                        <span>Coverage Amount</span>
                        <span className="config-pill">Currency</span>
                    </div>
                    <div className="config-list-row">
                        <span>Tobacco Usage</span>
                        <span className="config-pill">Yes/No</span>
                    </div>
                    <div className="config-list-row">
                        <span>Policy Term</span>
                        <span className="config-pill">Select</span>
                    </div>
                </div>
                <div className="config-helper">Drag to reorder, click to edit.</div>
            </section>

            <div className="config-actions">
                <button className="config-action config-action-ghost">Back</button>
                <button className="config-action config-action-primary">Next</button>
                <button className="config-action config-action-danger">Cancel</button>
            </div>
        </ConfigLayout>
    );
}

export default Questions;
