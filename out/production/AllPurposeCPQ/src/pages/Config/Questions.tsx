import { useState } from "react";
import ConfigLayout from "./ConfigLayout";
import "./Config.css";

type QuestionRow = {
    id: number;
    question: string;
    description: string;
    type: "radio" | "select" | "number" | "text";
    page: number;
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

function Questions() {
    const [formMode, setFormMode] = useState<"create" | "edit" | "delete" | null>(null);
    const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
    const [questions, setQuestions] = useState<QuestionRow[]>(initialQuestions);
    const [form, setForm] = useState<Omit<QuestionRow, "id">>({
        question: "",
        description: "",
        type: "radio",
        page: 1
    });

    const resetForm = () => {
        setForm({
            question: "",
            description: "",
            type: "radio",
            page: 1
        });
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
            page: question.page
        });
        setFormMode("edit");
    };

    const openDeleteForm = (question: QuestionRow) => {
        setSelectedQuestionId(question.id);
        setForm({
            question: question.question,
            description: question.description,
            type: question.type,
            page: question.page
        });
        setFormMode("delete");
    };

    const submitForm = () => {
        const trimmedQuestion = form.question.trim();
        const trimmedDescription = form.description.trim();

        if (!trimmedQuestion && formMode !== "delete") {
            return;
        }

        if (formMode === "create") {
            setQuestions((prev) => [
                {
                    id: Date.now(),
                    question: trimmedQuestion,
                    description: trimmedDescription,
                    type: form.type,
                    page: form.page
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
                            question: trimmedQuestion,
                            description: trimmedDescription,
                            type: form.type,
                            page: form.page
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
                            <label className="config-field config-question-field" data-area="description">
                                <span>Description:</span>
                                <textarea
                                    rows={6}
                                    value={form.description}
                                    onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
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
                                    <option value="radio">Radio</option>
                                    <option value="select">Select</option>
                                    <option value="number">Number</option>
                                    <option value="text">Text</option>
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
                            <label className="config-field config-question-field" data-area="image">
                                <span>Image:</span>
                                <input type="file" disabled={formMode === "delete"} />
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
