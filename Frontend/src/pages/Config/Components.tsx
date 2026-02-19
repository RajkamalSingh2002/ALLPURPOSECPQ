import { useState } from "react";
import ConfigLayout from "./ConfigLayout";
import "./Config.css";

type ComponentRow = {
    id: number;
    name: string; // Must start with _
    description: string; // Short Description
    details: string; // Full Details
    help: string;
    fml: string; // Formula
    rid: number; // Rate ID
    wid: number; // Wording ID
    image?: string; // Image filename
    start_date?: string;
    stop_date?: string;
};

// Mock Data for "Rate" dropdown
const MOCK_RATES = [
    { id: 10, name: "Base Rate 2024" },
    { id: 11, name: "Premium Modifier" },
    { id: 12, name: "Discount Factor" },
];

// Mock Data for "Wording" dropdown
const MOCK_WORDINGS = [
    { id: 20, summary: "Standard Liability" },
    { id: 21, summary: "Full Coverage Terms" },
    { id: 22, summary: "Exclusion Clauses" },
];

const initialComponents: ComponentRow[] = [
    {
        id: 1,
        name: "_base_coverage",
        description: "Basic insurance coverage component",
        details: "Includes liability and property damage up to $50k.",
        help: "Standard base package",
        fml: "base_rate * 1.5",
        rid: 10,
        wid: 20,
        start_date: "2024-01-01",
        stop_date: "2025-12-31"
    },
    {
        id: 2,
        name: "_risk_factor",
        description: "Risk assessment multiplier",
        details: "Calculated based on location and history.",
        help: "Internal use only",
        fml: "location_score + history_score",
        rid: 11,
        wid: 22
    }
];

function Components() {
    const [components, setComponents] = useState<ComponentRow[]>(initialComponents);
    const [formMode, setFormMode] = useState<"create" | "edit" | "delete" | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState<Omit<ComponentRow, "id">>({
        name: "",
        description: "",
        details: "",
        help: "",
        fml: "",
        rid: 0,
        wid: 0,
        image: "",
        start_date: "",
        stop_date: ""
    });

    const resetForm = () => {
        setForm({
            name: "",
            description: "",
            details: "",
            help: "",
            fml: "",
            rid: 0,
            wid: 0,
            image: "",
            start_date: "",
            stop_date: ""
        });
        setError(null);
    };

    const openCreateForm = () => {
        resetForm();
        setSelectedId(null);
        setFormMode("create");
    };

    const closeForm = () => {
        setFormMode(null);
        setSelectedId(null);
        resetForm();
    };

    const openEditForm = (item: ComponentRow) => {
        setSelectedId(item.id);
        setForm({
            name: item.name,
            description: item.description,
            details: item.details,
            help: item.help,
            fml: item.fml,
            rid: item.rid,
            wid: item.wid,
            image: item.image || "",
            start_date: item.start_date || "",
            stop_date: item.stop_date || ""
        });
        setFormMode("edit");
    };

    const openDeleteForm = (item: ComponentRow) => {
        setSelectedId(item.id);
        setForm({ ...item, image: item.image || "" });
        setFormMode("delete");
    };

    const submitForm = () => {
        // Validation: Name must start with '_'
        if (formMode !== "delete" && !form.name.startsWith("_")) {
            setError("Name must start with an underscore (_)");
            return;
        }

        setError(null);

        const newEntry = {
            name: form.name,
            description: form.description,
            details: form.details,
            help: form.help,
            fml: form.fml,
            rid: Number(form.rid),
            wid: Number(form.wid),
            image: form.image,
            start_date: form.start_date,
            stop_date: form.stop_date
        };

        if (formMode === "create") {
            setComponents(prev => [
                { id: Date.now(), ...newEntry },
                ...prev
            ]);
            closeForm();
        } else if (formMode === "edit" && selectedId !== null) {
            setComponents(prev => prev.map(item =>
                item.id === selectedId ? { ...item, ...newEntry } : item
            ));
            closeForm();
        } else if (formMode === "delete" && selectedId !== null) {
            setComponents(prev => prev.filter(item => item.id !== selectedId));
            closeForm();
        }
    };

    // Helper to get display names
    const getRateName = (id: number) => {
        const item = MOCK_RATES.find(r => r.id === id);
        return item ? item.name : (id ? `ID: ${id}` : "-");
    };

    const getWordingSummary = (id: number) => {
        const item = MOCK_WORDINGS.find(w => w.id === id);
        return item ? item.summary : (id ? `ID: ${id}` : "-");
    };

    return (
        <ConfigLayout
            title="Quote Data: Components"
            activeSide="quote-data"
            activeTab="components"
        >
            {!formMode && (
                <section className="config-card">
                    <div className="config-section-toolbar">
                        <div className="config-card-header config-card-header-compact">
                            <h2>Components</h2>
                            <span className="config-badge">{components.length} Total</span>
                        </div>
                        <button
                            className="config-icon-button"
                            type="button"
                            aria-label="Create new component"
                            onClick={openCreateForm}
                        >
                            +
                        </button>
                    </div>

                    <div className="config-table-wrap">
                        <table className="config-question-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Rate</th>
                                    <th>Wording</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {components.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{getRateName(item.rid)}</td>
                                        <td>{getWordingSummary(item.wid)}</td>
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
                    <section className="config-card config-question-card">
                        <form
                            className="config-form-grid"
                            onSubmit={(event) => {
                                event.preventDefault();
                                submitForm();
                            }}
                        >
                            <label className="config-field config-question-field">
                                <span>Name:</span>
                                <input
                                    type="text"
                                    value={form.name}
                                    placeholder="_component_name"
                                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                                    disabled={formMode === "delete"}
                                    required
                                />
                                <small style={{ color: error ? '#b42318' : '#888' }}>
                                    {error || "Must start with underscore (_)"}
                                </small>
                            </label>

                            <label className="config-field config-question-field">
                                <span>Short Description:</span>
                                <input
                                    type="text"
                                    value={form.description}
                                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                                    disabled={formMode === "delete"}
                                    required
                                />
                            </label>

                            <label className="config-field config-question-field" style={{ gridColumn: "1 / -1" }}>
                                <span>Full Details:</span>
                                <textarea
                                    rows={3}
                                    value={form.details}
                                    onChange={(e) => setForm(prev => ({ ...prev, details: e.target.value }))}
                                    disabled={formMode === "delete"}
                                />
                            </label>

                            <label className="config-field config-question-field" style={{ gridColumn: "1 / -1" }}>
                                <span>Help Text:</span>
                                <textarea
                                    rows={2}
                                    value={form.help}
                                    onChange={(e) => setForm(prev => ({ ...prev, help: e.target.value }))}
                                    disabled={formMode === "delete"}
                                />
                            </label>

                            <label className="config-field config-question-field" style={{ gridColumn: "1 / -1" }}>
                                <span>Formula (FML):</span>
                                <input
                                    type="text"
                                    value={form.fml}
                                    onChange={(e) => setForm(prev => ({ ...prev, fml: e.target.value }))}
                                    disabled={formMode === "delete"}
                                    placeholder="e.g. rate * factor"
                                />
                            </label>

                            <label className="config-field config-question-field">
                                <span>Rate:</span>
                                <select
                                    value={form.rid}
                                    onChange={(e) => setForm(prev => ({ ...prev, rid: Number(e.target.value) }))}
                                    disabled={formMode === "delete"}
                                >
                                    <option value={0}>-- Select Rate --</option>
                                    {MOCK_RATES.map(rate => (
                                        <option key={rate.id} value={rate.id}>{rate.name}</option>
                                    ))}
                                </select>
                            </label>

                            <label className="config-field config-question-field">
                                <span>Wording:</span>
                                <select
                                    value={form.wid}
                                    onChange={(e) => setForm(prev => ({ ...prev, wid: Number(e.target.value) }))}
                                    disabled={formMode === "delete"}
                                >
                                    <option value={0}>-- Select Wording --</option>
                                    {MOCK_WORDINGS.map(wording => (
                                        <option key={wording.id} value={wording.id}>{wording.summary}</option>
                                    ))}
                                </select>
                            </label>

                            <label className="config-field config-question-field" style={{ gridColumn: "1 / -1" }}>
                                <span>Image:</span>
                                <input
                                    type="file"
                                    disabled={formMode === "delete"}
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setForm(prev => ({ ...prev, image: e.target.files![0].name }))
                                        }
                                    }}
                                />
                                {form.image && <small>Selected: {form.image}</small>}
                            </label>

                            <label className="config-field config-question-field">
                                <span>Start Date:</span>
                                <input
                                    type="date"
                                    value={form.start_date}
                                    onChange={(e) => setForm(prev => ({ ...prev, start_date: e.target.value }))}
                                    disabled={formMode === "delete"}
                                />
                            </label>

                            <label className="config-field config-question-field">
                                <span>End Date:</span>
                                <input
                                    type="date"
                                    value={form.stop_date}
                                    onChange={(e) => setForm(prev => ({ ...prev, stop_date: e.target.value }))}
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
                            {formMode === "create" && "Save Component"}
                            {formMode === "edit" && "Update Component"}
                            {formMode === "delete" && "Delete Component"}
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

export default Components;
