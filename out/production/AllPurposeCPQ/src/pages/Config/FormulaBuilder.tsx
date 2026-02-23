import ConfigLayout from "./ConfigLayout";
import "./Config.css";

function FormulaBuilder() {
    return (
        <ConfigLayout
            title="Quote Configuration: Formula Builder"
            activeSide="quote-config"
            activeQuoteConfigTab="formula-builder"
        >
            <section className="config-card">
                <div className="config-card-header">
                    <h2>Formula Builder</h2>
                    <span className="config-badge">Draft</span>
                </div>
                <div className="config-field">
                    <label htmlFor="formula-name">Formula Name</label>
                    <input id="formula-name" type="text" placeholder="Base premium adjustment" />
                </div>
                <div className="config-field config-field-note">
                    <label htmlFor="formula-expression">Expression</label>
                    <textarea id="formula-expression" rows={6} placeholder="(baseRate + riderAmount) * coverageMultiplier" />
                </div>
            </section>
        </ConfigLayout>
    );
}

export default FormulaBuilder;
