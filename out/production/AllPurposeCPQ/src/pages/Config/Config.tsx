import "./Config.css";
import ConfigLayout from "./ConfigLayout";

function Config() {
    return (
        <ConfigLayout
            title="Quote Data: Products"
            activeSide="quote-data"
            activeTab="products"
        >
            <section className="config-card">
                <div className="config-form-grid">
                    <div className="config-field">
                        <label htmlFor="product-short">Product Short Name</label>
                        <input
                            id="product-short"
                            type="text"
                            placeholder="(Use underscore instead of space)"
                        />
                    </div>
                    <div className="config-field">
                        <label htmlFor="product-full">Product Full Name</label>
                        <input
                            id="product-full"
                            type="text"
                            placeholder="e.g. All purpose life insurance plan"
                        />
                    </div>
                </div>

                <div className="config-field config-field-note">
                    <label htmlFor="product-note">Note:</label>
                    <textarea
                        id="product-note"
                        rows={6}
                        placeholder="Enter additional notes here..."
                    />
                </div>
            </section>

            <div className="config-actions">
                <button className="config-action config-action-ghost">Back</button>
                <button className="config-action config-action-primary">Save Product</button>
                <button className="config-action config-action-danger">Cancel</button>
            </div>
        </ConfigLayout>
    );
}

export default Config;