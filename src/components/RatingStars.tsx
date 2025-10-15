import React from 'react';

interface RatingStarsProps {
    value?: number;
    size?: number;
}

const RatingStars = React.memo(function ({ value = 0, size = 16 }: RatingStarsProps) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} style={{ fontSize: size, color: i <= value ? '#f59e0b' : '#e5e7eb' }}>
                ★
            </span>
        );
    }
    return <span aria-label={`Rating: ${value} out of 5`}>{stars}</span>;
});

export default RatingStars;
