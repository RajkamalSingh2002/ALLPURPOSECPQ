import ConfigLayout from "./ConfigLayout";
import "./Config.css";

function Components() {
    return (
        <ConfigLayout
            title="Quote Data: Components"
            activeSide="quote-data"
            activeTab="components"
        >
            <section className="config-card">
                <div className="config-card-header">
                    <h2>Components</h2>
                    <span className="config-badge">In Use</span>
                </div>
                <div className="config-list">
                    <div className="config-list-row">
                        <span>Coverage Options</span>
                        <span className="config-pill">12 Questions</span>
                    </div>
                    <div className="config-list-row">
                        <span>Eligibility Checks</span>
                        <span className="config-pill">8 Questions</span>
                    </div>
                    <div className="config-list-row">
                        <span>Applicant Profile</span>
                        <span className="config-pill">10 Questions</span>
                    </div>
                </div>
            </section>
        </ConfigLayout>
    );
}

export default Components;
