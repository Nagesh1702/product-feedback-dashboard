
import React from 'react';
import RatingStars from './RatingStars';

const FeedbackCard = React.memo(function ({ item, onEdit, onDelete }) {
    return (
        <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="card-title mb-0">{item.product}</h6>
                    <div>
                        <RatingStars value={item.rating} />
                    </div>
                </div>
                <p className="card-text small text-truncate" style={{ WebkitLineClamp: 4, display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                    {item.text}
                </p>
                <div className="mt-auto d-flex gap-2 pt-2">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(item)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(item.id)}>Delete</button>
                </div>
            </div>
        </div>
    );
});

export default FeedbackCard;