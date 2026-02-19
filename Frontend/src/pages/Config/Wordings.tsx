import { useState } from "react";
import ConfigLayout from "./ConfigLayout";
import "./Config.css";

type WordingRow = {
    id: number;
    table_name: string; // Wording Type
    record_id: number; // Associated To
    summary_text: string;
    full_text: string;
    text_filename?: string;
    doc_filename?: string;
    image_filenames?: string;
    sort_order: number;
    start_date?: string;
    stop_date?: string;
};

// Mock data for "Associated To" dropdown
const MOCK_RECORDS = [
    { id: 101, name: "Premium Coverage" },
    { id: 102, name: "Basic Plan" },
    { id: 103, name: "Gold Component" },
    { id: 104, name: "Risk Factor Question" },
    { id: 105, name: "Base Rate" },
];

const WORDING_TYPES = [
    { value: "Product", label: "Product" },
    { value: "Component", label: "Component" },
    { value: "Question", label: "Question" },
    { value: "Rate", label: "Rate" },
];

const initialWordings: WordingRow[] = [
    {
        id: 1,
        table_name: "Product",
        record_id: 101,
        summary_text: "Standard Policy Terms",
        full_text: "These are the standard terms for the premium coverage policy...",
        sort_order: 10,
        start_date: "2024-01-01",
        stop_date: "2025-12-31"
    },
    {
        id: 2,
        table_name: "Question",
        record_id: 104,
        summary_text: "Help Text for Risk",
        full_text: "Please explain any prior incidents in detail.",
        sort_order: 20
    }
];

function Wordings() {
    const [wordings, setWordings] = useState<WordingRow[]>(initialWordings);
    const [formMode, setFormMode] = useState<"create" | "edit" | "delete" | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [form, setForm] = useState<Omit<WordingRow, "id">>({
        table_name: "Product",
        record_id: 0,
        summary_text: "",
        full_text: "",
        text_filename: "",
        doc_filename: "",
        image_filenames: "",
        sort_order: 0,
        start_date: "",
        stop_date: ""
    });

    const resetForm = () => {
        setForm({
            table_name: "Product",
            record_id: 0,
            summary_text: "",
            full_text: "",
            text_filename: "",
            doc_filename: "",
            image_filenames: "",
            sort_order: 0,
            start_date: "",
            stop_date: ""
        });
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

    const openEditForm = (item: WordingRow) => {
        setSelectedId(item.id);
        setForm({
            table_name: item.table_name,
            record_id: item.record_id,
            summary_text: item.summary_text,
            full_text: item.full_text,
            text_filename: item.text_filename || "",
            doc_filename: item.doc_filename || "",
            image_filenames: item.image_filenames || "",
            sort_order: item.sort_order,
            start_date: item.start_date || "",
            stop_date: item.stop_date || ""
        });
        setFormMode("edit");
    };

    const openDeleteForm = (item: WordingRow) => {
        setSelectedId(item.id);
        setForm({
            table_name: item.table_name,
            record_id: item.record_id,
            summary_text: item.summary_text,
            full_text: item.full_text,
            text_filename: item.text_filename,
            doc_filename: item.doc_filename,
            image_filenames: item.image_filenames,
            sort_order: item.sort_order,
            start_date: item.start_date,
            stop_date: item.stop_date
        });
        setFormMode("delete");
    };

    const submitForm = () => {
        const newEntry = {
            table_name: form.table_name,
            record_id: Number(form.record_id),
            summary_text: form.summary_text,
            full_text: form.full_text,
            text_filename: form.text_filename,
            doc_filename: form.doc_filename,
            image_filenames: form.image_filenames,
            sort_order: Number(form.sort_order),
            start_date: form.start_date,
            stop_date: form.stop_date
        };

        if (formMode === "create") {
            setWordings(prev => [
                { id: Date.now(), ...newEntry },
                ...prev
            ]);
            closeForm();
        } else if (formMode === "edit" && selectedId !== null) {
            setWordings(prev => prev.map(item =>
                item.id === selectedId ? { ...item, ...newEntry } : item
            ));
            closeForm();
        } else if (formMode === "delete" && selectedId !== null) {
            setWordings(prev => prev.filter(item => item.id !== selectedId));
            closeForm();
        }
    };

    // Helper to get record name by ID
    const getRecordName = (id: number) => {
        const record = MOCK_RECORDS.find(r => r.id === id);
        return record ? record.name : `ID: ${id}`;
    };

    return (
        <ConfigLayout
            title="Quote Data: Wordings"
            activeSide="quote-data"
            activeTab="wordings"
        >
            {!formMode && (
                <section className="config-card">
                    <div className="config-section-toolbar">
                        <div className="config-card-header config-card-header-compact">
                            <h2>Wordings</h2>
                            <span className="config-badge">{wordings.length} Total</span>
                        </div>
                        <button
                            className="config-icon-button"
                            type="button"
                            aria-label="Create new wording"
                            onClick={openCreateForm}
                        >
                            +
                        </button>
                    </div>

                    <div className="config-table-wrap">
                        <table className="config-question-table">
                            <thead>
                                <tr>
                                    <th>Summary</th>
                                    <th>Type</th>
                                    <th>Associated To</th>
                                    <th>Sort Order</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wordings.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.summary_text}</td>
                                        <td>{item.table_name}</td>
                                        <td>{getRecordName(item.record_id)}</td>
                                        <td>{item.sort_order}</td>
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
                                <span>Wording Type:</span>
                                <select
                                    value={form.table_name}
                                    onChange={(e) => setForm(prev => ({ ...prev, table_name: e.target.value }))}
                                    disabled={formMode === "delete"}
                                >
                                    {WORDING_TYPES.map(type => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                                <small style={{ color: '#888' }}>
                                    (e.g: wording for: product, component, question or rate)
                                </small>
                            </label>

                            <label className="config-field config-question-field">
                                <span>Associated To:</span>
                                <select
                                    value={form.record_id}
                                    onChange={(e) => setForm(prev => ({ ...prev, record_id: Number(e.target.value) }))}
                                    disabled={formMode === "delete"}
                                >
                                    <option value={0}>-- Select Record --</option>
                                    {MOCK_RECORDS.map(record => (
                                        <option key={record.id} value={record.id}>{record.name}</option>
                                    ))}
                                </select>
                                <small style={{ color: '#888' }}>
                                    Dropdown list of the name field of the table
                                </small>
                            </label>

                            <label className="config-field config-question-field" style={{ gridColumn: "1 / -1" }}>
                                <span>Summary:</span>
                                <input
                                    type="text"
                                    value={form.summary_text}
                                    onChange={(e) => setForm(prev => ({ ...prev, summary_text: e.target.value }))}
                                    disabled={formMode === "delete"}
                                />
                            </label>

                            <label className="config-field config-question-field" style={{ gridColumn: "1 / -1" }}>
                                <span>Wording:</span>
                                <textarea
                                    rows={4}
                                    value={form.full_text}
                                    onChange={(e) => setForm(prev => ({ ...prev, full_text: e.target.value }))}
                                    disabled={formMode === "delete"}
                                />
                            </label>

                            <label className="config-field config-question-field">
                                <span>Text File:</span>
                                <input
                                    type="file"
                                    disabled={formMode === "delete"}
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setForm(prev => ({ ...prev, text_filename: e.target.files![0].name }))
                                        }
                                    }}
                                />
                                {form.text_filename && <small>Selected: {form.text_filename}</small>}
                            </label>

                            <label className="config-field config-question-field">
                                <span>Document File:</span>
                                <input
                                    type="file"
                                    disabled={formMode === "delete"}
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setForm(prev => ({ ...prev, doc_filename: e.target.files![0].name }))
                                        }
                                    }}
                                />
                                {form.doc_filename && <small>Selected: {form.doc_filename}</small>}
                            </label>

                            <label className="config-field config-question-field" style={{ gridColumn: "1 / -1" }}>
                                <span>Image Files:</span>
                                <input
                                    type="file"
                                    multiple
                                    disabled={formMode === "delete"}
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            const names = Array.from(e.target.files).map(f => f.name).join(", ");
                                            setForm(prev => ({ ...prev, image_filenames: names }))
                                        }
                                    }}
                                />
                                {form.image_filenames && <small>Selected: {form.image_filenames}</small>}
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

                            <label className="config-field config-question-field">
                                <span>Sort Order:</span>
                                <input
                                    type="number"
                                    value={form.sort_order}
                                    onChange={(e) => setForm(prev => ({ ...prev, sort_order: Number(e.target.value) }))}
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
                            {formMode === "create" && "Save Wording"}
                            {formMode === "edit" && "Update Wording"}
                            {formMode === "delete" && "Delete Wording"}
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

export default Wordings;
