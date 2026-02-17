import AppTopbar from "../../components/AppTopbar/AppTopbar";
import AppFooter from "../../components/AppFooter/AppFooter";
import "./About.css";

function About() {
    return (
        <div className="about-page">
            <AppTopbar />
            <main className="about-main">
                <section className="about-hero">
                    <h1>About All Purpose CPQ</h1>
                    <p>
                        A flexible configuration and pricing platform built for modern
                        insurance products.
                    </p>
                </section>
                <section className="about-content">
                    <div className="about-panel">
                        <h3>Mission</h3>
                        <p>Deliver fast, consistent quoting experiences at scale.</p>
                    </div>
                    <div className="about-panel">
                        <h3>Values</h3>
                        <p>Clarity, precision, and collaboration in every workflow.</p>
                    </div>
                    <div className="about-panel">
                        <h3>Team</h3>
                        <p>Product, actuarial, and engineering working together.</p>
                    </div>
                </section>
            </main>
            <AppFooter />
        </div>
    );
}

export default About;
