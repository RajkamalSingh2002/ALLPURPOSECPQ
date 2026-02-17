import ConfigLayout from "./ConfigLayout";
import "./Config.css";

function QuestionItems() {
    return (
        <ConfigLayout
            title="Question Item Library"
            activeSide="quote-data"
            activeTab="questions"
        >
            <section className="config-card">
                <div className="config-card-header">
                    <h2>Reusable Questions</h2>
                    <span className="config-badge">Library</span>
                </div>
                <div className="config-list">
                    <div className="config-list-row">
                        <span>Annual Income</span>
                        <span className="config-pill">Currency</span>
                    </div>
                    <div className="config-list-row">
                        <span>Employment Status</span>
                        <span className="config-pill">Select</span>
                    </div>
                    <div className="config-list-row">
                        <span>Existing Coverage</span>
                        <span className="config-pill">Yes/No</span>
                    </div>
                    <div className="config-list-row">
                        <span>Dependents</span>
                        <span className="config-pill">Number</span>
                    </div>
                </div>
                <div className="config-helper">Add to this list to reuse across products.</div>
            </section>

            <div className="config-actions">
                <button className="config-action config-action-ghost">Back</button>
                <button className="config-action config-action-primary">Add Question</button>
                <button className="config-action config-action-danger">Cancel</button>
            </div>
        </ConfigLayout>
    );
}

export default QuestionItems;
