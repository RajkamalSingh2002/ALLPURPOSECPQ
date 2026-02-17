import AppTopbar from "../../components/AppTopbar/AppTopbar";
import AppFooter from "../../components/AppFooter/AppFooter";
import "./Api.css";

function Api() {
    return (
        <div className="api-page">
            <AppTopbar />
            <main className="api-main">
                <section className="api-hero">
                    <h1>API Center</h1>
                    <p>
                        Connect your CPQ configuration to quoting, underwriting, and
                        policy systems.
                    </p>
                </section>
                <section className="api-grid">
                    <div className="api-card">
                        <h3>Authentication</h3>
                        <p>Secure access for partners and internal tools.</p>
                        <button>View Docs</button>
                    </div>
                    <div className="api-card">
                        <h3>Product Catalog</h3>
                        <p>Expose product definitions and coverage rules.</p>
                        <button>View Docs</button>
                    </div>
                    <div className="api-card">
                        <h3>Rate Engine</h3>
                        <p>Pull real-time pricing with full traceability.</p>
                        <button>View Docs</button>
                    </div>
                </section>
            </main>
            <AppFooter />
        </div>
    );
}

export default Api;
