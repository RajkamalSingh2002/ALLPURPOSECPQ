import { useState } from "react";
import ConfigLayout from "./ConfigLayout";
import "./Config.css";

type RateRow = {
    id: number;
    question: string;
    answer: string;
    value: number;
    operation: "add" | "subtract" | "multiply" | "divide";
};

const MATH_OPERATIONS = [
    { value: "add", label: "Add (+)", symbol: "+" },
    { value: "subtract", label: "Subtract (-)", symbol: "-" },
    { value: "multiply", label: "Multiply (*)", symbol: "*" },
    { value: "divide", label: "Divide (/)", symbol: "/" },
] as const;

const initialRates: RateRow[] = [
    {
        id: 1,
        question: "paint",
        answer: "Gold",
        value: 499.95,
        operation: "add"
    },
    {
        id: 2,
        question: "paint",
        answer: "Matte Black",
        value: 250.00,
        operation: "add"
    },
    {
        id: 3,
        question: "coverage",
        answer: "Yes",
        value: 0.90, // 10% discount
        operation: "multiply"
    }
];

function Rates() {
    const [formMode, setFormMode] = useState<"create" | "edit" | "delete" | null>(null);
    const [selectedRateId, setSelectedRateId] = useState<number | null>(null);
    const [rates, setRates] = useState<RateRow[]>(initialRates);
    const [form, setForm] = useState<Omit<RateRow, "id">>({
        question: "paint",
        answer: "",
        value: 0,
        operation: "add"
    });

    const resetForm = () => {
        setForm({
            question: "paint",
            answer: "",
            value: 0,
            operation: "add"
        });
    };

    const openCreateForm = () => {
        resetForm();
        setSelectedRateId(null);
        setFormMode("create");
    };

    const closeForm = () => {
        setFormMode(null);
        setSelectedRateId(null);
        resetForm();
    };

    const openEditForm = (rate: RateRow) => {
        setSelectedRateId(rate.id);
        setForm({
            question: rate.question,
            answer: rate.answer,
            value: rate.value,
            operation: rate.operation
        });
        setFormMode("edit");
    };

    const openDeleteForm = (rate: RateRow) => {
        setSelectedRateId(rate.id);
        setForm({
            question: rate.question,
            answer: rate.answer,
            value: rate.value,
            operation: rate.operation
        });
        setFormMode("delete");
    };

    const submitForm = () => {
        const trimmedAnswer = form.answer.trim();

        if (!trimmedAnswer && formMode !== "delete") {
            return;
        }

        if (formMode === "create") {
            setRates((prev) => [
                {
                    id: Date.now(),
                    question: form.question,
                    answer: trimmedAnswer,
                    value: Number(form.value),
                    operation: form.operation
                },
                ...prev
            ]);
            closeForm();
            return;
        }

        if (formMode === "edit" && selectedRateId !== null) {
            setRates((prev) =>
                prev.map((item) =>
                    item.id === selectedRateId
                        ? {
                            ...item,
                            question: form.question,
                            answer: trimmedAnswer,
                            value: Number(form.value),
                            operation: form.operation
                        }
                        : item
                )
            );
            closeForm();
            return;
        }

        if (formMode === "delete" && selectedRateId !== null) {
            setRates((prev) => prev.filter((item) => item.id !== selectedRateId));
            closeForm();
        }
    };

    return (
        <ConfigLayout title="Quote Data: Rates" activeSide="quote-data" activeTab="rates">
            {!formMode && (
                <section className="config-card">
                    <div className="config-section-toolbar">
                        <div className="config-card-header config-card-header-compact">
                            <h2>Rates</h2>
                            <span className="config-badge">{rates.length} Total</span>
                        </div>
                        <button
                            className="config-icon-button"
                            type="button"
                            aria-label="Create new rate"
                            onClick={openCreateForm}
                        >
                            +
                        </button>
                    </div>

                    <div className="config-table-wrap">
                        <table className="config-question-table">
                            <thead>
                                <tr>
                                    <th>Question</th>
                                    <th>Answer</th>
                                    <th>Operation</th>
                                    <th>Value</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rates.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.question}</td>
                                        <td>{item.answer}</td>
                                        <td>
                                            {MATH_OPERATIONS.find(op => op.value === item.operation)?.label || item.operation}
                                        </td>
                                        <td>{item.value}</td>
                                        <td>
                                            <div className="config-row-actions">
                                                <button
                                                    className="config-row-action config-row-action-edit"
                                                    type="button"
                                                    onClick={() => openEditForm(item)}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="config-row-action config-row-action-delete"
                                                    type="button"
                                                    onClick={() => openDeleteForm(item)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {formMode && (
                <>
                    <section className="config-card config-rate-card">
                        <form
                            className="config-rate-grid"
                            style={{ display: "grid", gap: "1rem" }}
                            onSubmit={(event) => {
                                event.preventDefault();
                                submitForm();
                            }}
                        >
                            <label className="config-field">
                                <span>Question</span>
                                <select
                                    value={form.question}
                                    onChange={(e) => setForm({ ...form, question: e.target.value })}
                                    disabled={formMode === "delete"}
                                >
                                    <option value="paint">Paint</option>
                                    <option value="finish">Finish</option>
                                    <option value="coverage">Coverage</option>
                                </select>
                            </label>

                            <label className="config-field">
                                <span>When Answer Is</span>
                                <input
                                    type="text"
                                    value={form.answer}
                                    onChange={(e) => setForm({ ...form, answer: e.target.value })}
                                    required
                                    disabled={formMode === "delete"}
                                />
                            </label>

                            <label className="config-field">
                                <span>Math Operation</span>
                                <select
                                    value={form.operation}
                                    onChange={(e) => setForm({ ...form, operation: e.target.value as RateRow['operation'] })}
                                    disabled={formMode === "delete"}
                                >
                                    {MATH_OPERATIONS.map((op) => (
                                        <option key={op.value} value={op.value}>
                                            {op.label}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="config-field">
                                <span>Value / Price</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={form.value}
                                    onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
                                    required
                                    disabled={formMode === "delete"}
                                />
                            </label>
                        </form>
                    </section>

                    <div className="config-actions">
                        <button className="config-action config-action-ghost" type="button" onClick={closeForm}>
                            Back
                        </button>
                        <button
                            className={`config-action${formMode === "delete" ? " config-action-danger" : " config-action-primary"}`}
                            type="button"
                            onClick={submitForm}
                        >
                            {formMode === "create" && "Save Rate"}
                            {formMode === "edit" && "Update Rate"}
                            {formMode === "delete" && "Delete Rate"}
                        </button>
                        <button className="config-action config-action-danger" type="button" onClick={closeForm}>
                            Cancel
                        </button>
                    </div>
                </>
            )}
        </ConfigLayout>
    );
}

export default Rates;
