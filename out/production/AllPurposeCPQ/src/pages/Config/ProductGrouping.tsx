import ConfigLayout from "./ConfigLayout";
import "./Config.css";

function ProductGrouping() {
    return (
        <ConfigLayout title="Product Grouping" activeSide="product-grouping">
            <section className="config-card">
                <div className="config-card-header">
                    <h2>Group Definitions</h2>
                    <span className="config-badge">3 Active</span>
                </div>
                <div className="config-card-grid">
                    <div className="config-mini-card">
                        <h3>Term Life</h3>
                        <p className="config-muted">Short-term protection plans.</p>
                        <button className="config-mini-action">Edit Group</button>
                    </div>
                    <div className="config-mini-card">
                        <h3>Whole Life</h3>
                        <p className="config-muted">Long-term growth products.</p>
                        <button className="config-mini-action">Edit Group</button>
                    </div>
                    <div className="config-mini-card">
                        <h3>Accidental</h3>
                        <p className="config-muted">Accident-focused coverage.</p>
                        <button className="config-mini-action">Edit Group</button>
                    </div>
                </div>
            </section>

            <div className="config-actions">
                <button className="config-action config-action-ghost">Back</button>
                <button className="config-action config-action-primary">New Group</button>
                <button className="config-action config-action-danger">Cancel</button>
            </div>
        </ConfigLayout>
    );
}

export default ProductGrouping;
