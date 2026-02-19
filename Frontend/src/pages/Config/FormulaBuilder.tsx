import { useState, useRef } from "react";
import ConfigLayout from "./ConfigLayout";
import "./Config.css";
import "./FormulaBuilder.css";

// --- Mock Data simulating Database Fetch ---
const MOCK_QUESTIONS = [
    { id: "q1", label: "Driver Age", value: "driver_age" },
    { id: "q2", label: "Vehicle Value", value: "vehicle_value" },
    { id: "q3", label: "Zip Code Factor", value: "zip_factor" },
    { id: "q4", label: "Accident Count", value: "accidents" },
    { id: "q5", label: "Coverage Limit", value: "coverage_limit" },
];

const MOCK_COMPONENTS = [
    { id: "c1", label: "Base Rate Policy", value: "_base_rate" },
    { id: "c2", label: "Risk Multiplier", value: "_risk_factor" },
    { id: "c3", label: "State Tax", value: "_state_tax" },
    { id: "c4", label: "Discount Package", value: "_discount_pkg" },
];

const OPERATORS = [
    { id: "op_plus", label: "+", value: "+" },
    { id: "op_minus", label: "-", value: "-" },
    { id: "op_mult", label: "×", value: "*" },
    { id: "op_div", label: "÷", value: "/" },
    { id: "op_open", label: "(", value: "(" },
    { id: "op_close", label: ")", value: ")" },
];

// --- Types ---
type FormulaItem = {
    id: string; // unique instance id
    type: "question" | "component" | "operator";
    label: string;
    value: string;
};

function FormulaBuilder() {
    const [formula, setFormula] = useState<FormulaItem[]>([]);
    const [dragOver, setDragOver] = useState(false);

    // This ref holds the data being dragged since dataTransfer in React events can be tricky
    const draggedItemRef = useRef<{ type: string; data: any } | null>(null);

    // --- Drag Handlers ---
    const handleDragStart = (e: React.DragEvent, item: any, type: "question" | "component" | "operator") => {
        draggedItemRef.current = { type, data: item };
        e.dataTransfer.effectAllowed = "copy";
        // Use a ghost image or just simulated drag
        // For simulation, we just need to know what's dragged
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault(); // Essential to allow dropping
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);

        if (draggedItemRef.current) {
            const { type, data } = draggedItemRef.current;
            const newItem: FormulaItem = {
                id: Date.now().toString() + Math.random().toString().slice(2, 5),
                type: type as any,
                label: data.label,
                value: data.value,
            };

            setFormula((prev) => [...prev, newItem]);
        }
        draggedItemRef.current = null;
    };

    // --- Actions ---
    const removeItem = (id: string) => {
        setFormula((prev) => prev.filter((item) => item.id !== id));
    };

    const clearFormula = () => {
        if (confirm("Clear the entire formula?")) {
            setFormula([]);
        }
    };

    const saveFormula = () => {
        const formulaString = formula.map((f) => f.value).join(" ");
        alert(`Formula Saved:\n${formulaString}`);
    };

    // Helper to render formula string
    const formulaString = formula.length > 0
        ? formula.map(f => f.value).join(" ")
        : "// Drag items here to build formula";

    return (
        <ConfigLayout
            title="Quote Configuration: Formula Builder"
            activeSide="quote-config"
            activeQuoteConfigTab="formula-builder"
        >
            <div className="formula-builder-wrapper">
                {/* Left Panel: Questions & Components */}
                <aside className="fb-panel">
                    <div className="fb-header">
                        <span>Data Sources</span>
                        <small style={{ color: '#64748b' }}>Drag to canvas</small>
                    </div>
                    <div className="fb-content">
                        {/* Questions Section */}
                        <div style={{ marginBottom: '1rem' }}>
                            <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase' }}>Questions</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {MOCK_QUESTIONS.map((q) => (
                                    <div
                                        key={q.id}
                                        className="fb-item question"
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, q, "question")}
                                    >
                                        <span>?</span> {q.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Components Section */}
                        <div>
                            <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase' }}>Components</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {MOCK_COMPONENTS.map((c) => (
                                    <div
                                        key={c.id}
                                        className="fb-item component"
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, c, "component")}
                                    >
                                        <span>⚙</span> {c.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Center Panel: Canvas */}
                <main className="fb-panel" style={{ background: '#f8fafc', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="fb-header" style={{ background: 'transparent', padding: 0, border: 'none' }}>
                        <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Formula Canvas</h2>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="fb-btn fb-btn-ghost" onClick={clearFormula}>Clear</button>
                            <button className="fb-btn fb-btn-primary" onClick={saveFormula}>Save Formula</button>
                        </div>
                    </div>

                    {/* Read-Only Formula Display */}
                    <div className="fb-display">
                        {formulaString}
                    </div>

                    {/* Drop Zone */}
                    <div
                        className={`fb-drop-zone ${dragOver ? "over" : ""}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {formula.length === 0 && (
                            <div className="fb-placeholder">
                                Drop questions, components, and operators here...
                            </div>
                        )}

                        {formula.map((item, index) => (
                            <div key={item.id} className={`fb-token ${item.type}`}>
                                {item.label}
                                <span
                                    className="fb-remove"
                                    onClick={() => removeItem(item.id)}
                                    title="Remove"
                                >
                                    ×
                                </span>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Right Panel: Operators */}
                <aside className="fb-panel">
                    <div className="fb-header">
                        <span>Operators</span>
                    </div>
                    <div className="fb-content">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                            {OPERATORS.map((op) => (
                                <div
                                    key={op.id}
                                    className="fb-item operator"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, op, "operator")}
                                >
                                    {op.label}
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f1f5f9', borderRadius: '8px', fontSize: '0.85rem', color: '#64748b' }}>
                            <p style={{ margin: 0 }}>
                                <strong>Tip:</strong> Drag items to the center canvas to build your pricing logic. Start with a Base Rate or Question.
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </ConfigLayout>
    );
}

export default FormulaBuilder;
