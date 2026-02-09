import ConfigLayout from "./ConfigLayout";
import "./Config.css";

function PdfTemplate() {
    return (
        <ConfigLayout
            title="Quote Configuration: PDF Template"
            activeSide="quote-config"
            activeQuoteConfigTab="pdf-template"
        >
            <section className="config-card">
                <div className="config-card-header">
                    <h2>PDF Template</h2>
                    <span className="config-badge">Current</span>
                </div>
                <div className="config-list">
                    <div className="config-list-row">
                        <span>Policy Summary Template</span>
                        <span className="config-pill">v2.3</span>
                    </div>
                    <div className="config-list-row">
                        <span>Coverage Breakdown Template</span>
                        <span className="config-pill">v1.8</span>
                    </div>
                </div>
            </section>
        </ConfigLayout>
    );
}

export default PdfTemplate;
