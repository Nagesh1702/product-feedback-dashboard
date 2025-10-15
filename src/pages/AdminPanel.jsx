
import { useState,} from 'react';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackCard from '../components/FeedbackCard';
import { uid } from "../utilities/utility";

function AdminPanel({ feedbacks, setFeedbacks }) {
    const [editing, setEditing] = useState(null);


    const handleSave = (data) => {
        if (data.id) {
            setFeedbacks((prev) => prev.map((p) => (p.id === data.id ? { ...p, ...data, updatedAt: Date.now() } : p)));
            setEditing(null);
        } else {
            const newItem = { ...data, id: uid(), createdAt: Date.now(), updatedAt: Date.now() };
            setFeedbacks((prev) => [newItem, ...prev]);
        }
    };


    const handleEdit = (item) => setEditing(item);
    const handleDelete = (id) => {
        if (!window.confirm('Delete this feedback?')) return;
        setFeedbacks((prev) => prev.filter((p) => p.id !== id));
    };


    return (
        <div>
            <div className="d-flex flex-column flex-md-row gap-3 mb-3">
                <div className="card flex-fill">
                    <div className="card-body">
                        <h5 className="card-title">{editing ? 'Edit Feedback' : 'Add Feedback'}</h5>
                        <FeedbackForm
                            onSave={handleSave}
                            initial={editing || {}}
                            onCancel={() => setEditing(null)}
                        />
                    </div>
                </div>
                <div className="card" style={{ minWidth: 260 }}>
                    <div className="card-body">
                        <h6 className="card-title">Stats</h6>
                        <p className="mb-1">Total items: <strong>{feedbacks.length}</strong></p>
                        <p className="mb-0 small text-muted">Data persisted in localStorage. Refresh to confirm persistence.</p>
                    </div>
                </div>
            </div>


            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {feedbacks.map((f) => (
                    <div className="col" key={f.id}>
                        <FeedbackCard item={f} onEdit={handleEdit} onDelete={handleDelete} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminPanel;