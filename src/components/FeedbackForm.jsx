import { useState, useEffect } from "react";
import RatingStars from "./RatingStars";

function FeedbackForm({ onSave, initial = {}, onCancel }) {
    const [product, setProduct] = useState(initial.product || '');
    const [text, setText] = useState(initial.text || '');
    const [rating, setRating] = useState(initial.rating || 5);


    useEffect(() => {
        setProduct(initial.product || '');
        setText(initial.text || '');
        setRating(initial.rating || 5);
    }, [initial]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!product.trim() || !text.trim()) return;
        onSave({ ...initial, product: product.trim(), text: text.trim(), rating: Number(rating) });
        setProduct('');
        setText('');
        setRating(5);
    };


    return (
        <form onSubmit={handleSubmit} className="p-2">
            <div className="mb-2">
                <label className="form-label small">Product Name</label>
                <input className="form-control" value={product} onChange={(e) => setProduct(e.target.value)} required />
            </div>
            <div className="mb-2">
                <label className="form-label small">Feedback</label>
                <textarea className="form-control" rows={3} value={text} onChange={(e) => setText(e.target.value)} required />
            </div>
            <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label small mb-0">Rating</label>
                <select className="form-select w-auto" value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value={5}>5</option>
                    <option value={4}>4</option>
                    <option value={3}>3</option>
                    <option value={2}>2</option>
                    <option value={1}>1</option>
                </select>
                <small className="text-muted">Preview:</small>
                <RatingStars value={rating} size={14} />
            </div>
            <div className="d-flex gap-2 justify-content-end">
                {onCancel && (
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onCancel}>
                        Cancel
                    </button>
                )}
                <button type="submit" className="btn btn-primary btn-sm">
                    Save
                </button>
            </div>
        </form>
    );
}

export default FeedbackForm;