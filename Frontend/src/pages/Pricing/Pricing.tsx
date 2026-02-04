import AppTopbar from "../../components/AppTopbar/AppTopbar";
import AppFooter from "../../components/AppFooter/AppFooter";
import "./Pricing.css";

function Pricing() {
    return (
        <div className="pricing-page">
            <AppTopbar />

            <main className="pricing-main">
                <section className="pricing-hero">
                    <h1>Package Offered</h1>
                </section>

                <section className="pricing-card">
                    <div className="pricing-card-header">
                        <h2>Packages</h2>
                        <span className="pricing-badge">4 Options</span>
                    </div>

                    <div className="pricing-grid">
                        <div className="package-item">
                            <h3>Starter</h3>
                            <p>Basic benefits and coverage.</p>
                            <button className="package-view-btn">View</button>
                        </div>

                        <div className="package-item">
                            <h3>Standard</h3>
                            <p>Most popular for new clients.</p>
                            <button className="package-view-btn">View</button>
                        </div>

                        <div className="package-item">
                            <h3>Premium</h3>
                            <p>Extended coverage with perks.</p>
                            <button className="package-view-btn">View</button>
                        </div>
                    </div>
                </section>

                <div className="pricing-actions">
                    <button className="pricing-action pricing-action-ghost">Back</button>
                    <button className="pricing-action pricing-action-primary">Create Package</button>
                    <button className="pricing-action pricing-action-danger">Cancel</button>
                </div>
            </main>

            <AppFooter />
        </div>
    );
}

export default Pricing;