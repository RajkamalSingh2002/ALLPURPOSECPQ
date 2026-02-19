import { useState } from "react";
import ConfigLayout from "./ConfigLayout";
import "./Config.css";

type QuestionRow = {
    id: number;
    question: string;
    description: string;
    type: "radio" | "select" | "number" | "text" | "checkbox" | "date" | "textarea";
    page: number;
    // Advanced fields
    sort_parent?: number;
    input_val?: number;
    field_sizing?: string;
    field_constraint?: string;
    field_attributes?: string;
    active_when?: string;
    image?: string; // storing file name or path for now
    note_admin?: string;
    start_date?: string;
    stop_date?: string;
};

const initialQuestions: QuestionRow[] = [
    {
        id: 1,
        question: "Gold",
        description: "This is not paint, it is Gold flake and may wrinkle if left in the sun for prolonged time.",
        type: "radio",
        page: 1
    },
    {
        id: 2,
        question: "Existing Coverage",
        description: "Has the applicant had prior policy coverage within the last 24 months?",
        type: "select",
        page: 1
    },
    {
        id: 3,
        question: "Annual Income",
        description: "Provide annual income in USD.",
        type: "number",
        page: 2
    }
];

const QUESTION_TYPES = [
    { value: "text", label: "Text Input" },
    { value: "number", label: "Number Input" },
    { value: "radio", label: "Radio Button (Single Choice)" },
    { value: "select", label: "Dropdown Select (Single Choice)" },
    { value: "checkbox", label: "Checkbox (Multiple Choice)" },
    { value: "date", label: "Date Picker" },
    { value: "textarea", label: "Multi-line Text Area" }
] as const;

function Questions() {
    const [formMode, setFormMode] = useState<"create" | "edit" | "delete" | null>(null);
    const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
    const [questions, setQuestions] = useState<QuestionRow[]>(initialQuestions);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const [form, setForm] = useState<Omit<QuestionRow, "id">>({
        question: "",
        description: "",
        type: "radio",
        page: 1,
        sort_parent: 0,
        input_val: 0,
        field_sizing: "",
        field_constraint: "",
        field_attributes: "",
        active_when: "",
        note_admin: "",
        start_date: "",
        stop_date: ""
    });

    const resetForm = () => {
        setForm({
            question: "",
            description: "",
            type: "radio",
            page: 1,
            sort_parent: 0,
            input_val: 0,
            field_sizing: "",
            field_constraint: "",
            field_attributes: "",
            active_when: "",
            note_admin: "",
            start_date: "",
            stop_date: ""
        });
        setShowAdvanced(false);
    };

    const openCreateForm = () => {
        resetForm();
        setSelectedQuestionId(null);
        setFormMode("create");
    };

    const closeForm = () => {
        setFormMode(null);
        setSelectedQuestionId(null);
        resetForm();
    };

    const openEditForm = (question: QuestionRow) => {
        setSelectedQuestionId(question.id);
        setForm({
            question: question.question,
            description: question.description,
            type: question.type,
            page: question.page,
            sort_parent: question.sort_parent || 0,
            input_val: question.input_val || 0,
            field_sizing: question.field_sizing || "",
            field_constraint: question.field_constraint || "",
            field_attributes: question.field_attributes || "",
            active_when: question.active_when || "",
            note_admin: question.note_admin || "",
            start_date: question.start_date || "",
            stop_date: question.stop_date || ""
        });
        setFormMode("edit");
    };

    const openDeleteForm = (question: QuestionRow) => {
        setSelectedQuestionId(question.id);
        setForm({
            question: question.question,
            description: question.description,
            type: question.type,
            page: question.page,
            sort_parent: question.sort_parent,
            input_val: question.input_val,
            field_sizing: question.field_sizing,
            field_constraint: question.field_constraint,
            field_attributes: question.field_attributes,
            active_when: question.active_when,
            note_admin: question.note_admin,
            start_date: question.start_date,
            stop_date: question.stop_date
        });
        setFormMode("delete");
    };

    const submitForm = () => {
        const trimmedQuestion = form.question.trim();
        const trimmedDescription = form.description.trim();

        if (!trimmedQuestion && formMode !== "delete") {
            return;
        }

        const newQuestionData = {
            question: trimmedQuestion,
            description: trimmedDescription,
            type: form.type,
            page: form.page,
            sort_parent: form.sort_parent,
            input_val: form.input_val,
            field_sizing: form.field_sizing,
            field_constraint: form.field_constraint,
            field_attributes: form.field_attributes,
            active_when: form.active_when,
            note_admin: form.note_admin,
            start_date: form.start_date,
            stop_date: form.stop_date
        };

        if (formMode === "create") {
            setQuestions((prev) => [
                {
                    id: Date.now(),
                    ...newQuestionData
                },
                ...prev
            ]);
            closeForm();
            return;
        }

        if (formMode === "edit" && selectedQuestionId !== null) {
            setQuestions((prev) =>
                prev.map((item) =>
                    item.id === selectedQuestionId
                        ? {
                            ...item,
                            ...newQuestionData
                        }
                        : item
                )
            );
            closeForm();
            return;
        }

        if (formMode === "delete" && selectedQuestionId !== null) {
            setQuestions((prev) => prev.filter((item) => item.id !== selectedQuestionId));
            closeForm();
        }
    };

    return (
        <ConfigLayout
            title="Quote Data: Questions"
            activeSide="quote-data"
            activeTab="questions"
        >
            {!formMode && (
                <section className="config-card">
                    <div className="config-section-toolbar">
                        <div className="config-card-header config-card-header-compact">
                            <h2>Questions</h2>
                            <span className="config-badge">{questions.length} Total</span>
                        </div>
                        <button
                            className="config-icon-button"
                            type="button"
                            aria-label="Create new question"
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
                                    <th>Type</th>
                                    <th>Page</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questions.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.question}</td>
                                        <td>{item.type}</td>
                                        <td>{item.page}</td>
                                        <td>{item.description || "No description"}</td>
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
                            className="config-question-grid"
                            onSubmit={(event) => {
                                event.preventDefault();
                                submitForm();
                            }}
                        >
                            {/* Standard Fields */}
                            <label className="config-field config-question-field" data-area="question">
                                <span>Question:</span>
                                <input
                                    type="text"
                                    value={form.question}
                                    onChange={(event) => setForm((prev) => ({ ...prev, question: event.target.value }))}
                                    required
                                    disabled={formMode === "delete"}
                                />
                            </label>

                            <label className="config-field config-question-field" data-area="type">
                                <span>Question Type:</span>
                                <select
                                    value={form.type}
                                    onChange={(event) => {
                                        const value = event.target.value as QuestionRow["type"];
                                        setForm((prev) => ({ ...prev, type: value }));
                                    }}
                                    disabled={formMode === "delete"}
                                >
                                    {QUESTION_TYPES.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="config-field config-question-field" data-area="page">
                                <span>Page Number:</span>
                                <input
                                    type="number"
                                    min={1}
                                    value={form.page}
                                    onChange={(event) => setForm((prev) => ({ ...prev, page: Number(event.target.value) || 1 }))}
                                    disabled={formMode === "delete"}
                                />
                            </label>

                            <label className="config-field config-question-field" data-area="description">
                                <span>Description:</span>
                                <textarea
                                    rows={3}
                                    value={form.description}
                                    onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                                    disabled={formMode === "delete"}
                                />
                            </label>

                            {/* Advanced Fields Toggle */}
                            <div className="config-advanced-toggle">
                                <button
                                    type="button"
                                    className="config-action config-action-ghost"
                                    onClick={() => setShowAdvanced(!showAdvanced)}
                                >
                                    {showAdvanced ? '▼ Hide Advanced Settings' : '► Show Advanced Settings'}
                                </button>
                            </div>

                            {/* Advanced Fields */}
                            {showAdvanced && (
                                <div className="config-advanced-fields">
                                    <label className="config-field config-question-field">
                                        <span>Parent Order (sort_parent):</span>
                                        <input
                                            type="number"
                                            value={form.sort_parent}
                                            onChange={(e) => setForm(prev => ({ ...prev, sort_parent: Number(e.target.value) }))}
                                            disabled={formMode === "delete"}
                                        />
                                    </label>
                                    <label className="config-field config-question-field">
                                        <span>Monetary Value (input_val):</span>
                                        <input
                                            type="number"
                                            value={form.input_val}
                                            onChange={(e) => setForm(prev => ({ ...prev, input_val: Number(e.target.value) }))}
                                            disabled={formMode === "delete"}
                                        />
                                    </label>
                                    <label className="config-field config-question-field">
                                        <span>Field Size (field_sizing):</span>
                                        <input
                                            type="text"
                                            placeholder='cols="n", rows="n"'
                                            value={form.field_sizing}
                                            onChange={(e) => setForm(prev => ({ ...prev, field_sizing: e.target.value }))}
                                            disabled={formMode === "delete"}
                                        />
                                        <small style={{ color: '#666' }}>Format: cols="n", rows="n"</small>
                                    </label>
                                    <label className="config-field config-question-field">
                                        <span>Field Constraint:</span>
                                        <input
                                            type="text"
                                            value={form.field_constraint}
                                            onChange={(e) => setForm(prev => ({ ...prev, field_constraint: e.target.value }))}
                                            disabled={formMode === "delete"}
                                        />
                                    </label>
                                    <label className="config-field config-question-field">
                                        <span>Field Attributes:</span>
                                        <input
                                            type="text"
                                            value={form.field_attributes}
                                            onChange={(e) => setForm(prev => ({ ...prev, field_attributes: e.target.value }))}
                                            disabled={formMode === "delete"}
                                        />
                                    </label>
                                    <label className="config-field config-question-field">
                                        <span>Only Active When:</span>
                                        <input
                                            type="text"
                                            placeholder="iid=29 and to_number(ans) > 1"
                                            value={form.active_when}
                                            onChange={(e) => setForm(prev => ({ ...prev, active_when: e.target.value }))}
                                            disabled={formMode === "delete"}
                                        />
                                        <small style={{ color: '#666' }}>Format: iid=29 and to_number(ans) &gt; 1</small>
                                    </label>
                                    <label className="config-field config-question-field">
                                        <span>Admin Notes:</span>
                                        <textarea
                                            rows={2}
                                            value={form.note_admin}
                                            onChange={(e) => setForm(prev => ({ ...prev, note_admin: e.target.value }))}
                                            disabled={formMode === "delete"}
                                        />
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
                                    <label className="config-field config-question-field" data-area="image">
                                        <span>Image:</span>
                                        <input type="file" disabled={formMode === "delete"} />
                                    </label>
                                </div>
                            )}
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
                            {formMode === "create" && "Save Question"}
                            {formMode === "edit" && "Update Question"}
                            {formMode === "delete" && "Delete Question"}
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

export default Questions;
