import { useState, useMemo } from "react";
import RatingStars from "../components/RatingStars";

function PublicPage({ feedbacks }) {
    const [productFilter, setProductFilter] = useState('');
    const [minRating, setMinRating] = useState(1);
    const [sortBy, setSortBy] = useState('newest');


    // Derived: products list and average rating per product
    const productsMap = useMemo(() => {
        const map = new Map();
        for (const f of feedbacks) {
            if (!map.has(f.product)) map.set(f.product, { sum: 0, count: 0, items: [] });
            const entry = map.get(f.product);
            entry.sum += Number(f.rating || 0);
            entry.count += 1;
            entry.items.push(f);
        }
        // convert
        const arr = Array.from(map.entries()).map(([product, { sum, count, items }]) => ({ product, avg: count ? sum / count : 0, count, items }));
        return arr;
    }, [feedbacks]);


    const productOptions = useMemo(() => productsMap.map((p) => p.product).sort(), [productsMap]);


    // filtered items list
    const filtered = useMemo(() => {
        let items = feedbacks.slice();
        if (productFilter) items = items.filter((i) => i.product === productFilter);
        items = items.filter((i) => i.rating >= minRating);


        if (sortBy === 'rating_desc') items.sort((a, b) => b.rating - a.rating);
        else if (sortBy === 'rating_asc') items.sort((a, b) => a.rating - b.rating);
        else if (sortBy === 'product') items.sort((a, b) => a.product.localeCompare(b.product));
        else items.sort((a, b) => b.createdAt - a.createdAt); // newest


        return items;
    }, [feedbacks, productFilter, minRating, sortBy]);
    return (
        <div>
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Overview</h5>
                    <div className="d-flex flex-wrap gap-2 align-items-center">
                        <div className="me-2">Filter product:</div>
                        <select className="form-select w-auto" value={productFilter} onChange={(e) => setProductFilter(e.target.value)}>
                            <option value="">All products</option>
                            {productOptions.map((p) => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>


                        <div className="ms-3 d-flex align-items-center gap-2">
                            <label className="small mb-0">Min rating</label>
                            <select className="form-select w-auto" value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
                                <option value={1}>1+</option>
                                <option value={2}>2+</option>
                                <option value={3}>3+</option>
                                <option value={4}>4+</option>
                                <option value={5}>5</option>
                            </select>
                        </div>
                        <div className="ms-3 d-flex align-items-center gap-2">
                            <label className="small mb-0">Sort</label>
                            <select className="form-select w-auto" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="newest">Newest</option>
                                <option value="rating_desc">Rating: High → Low</option>
                                <option value="rating_asc">Rating: Low → High</option>
                                <option value="product">Product name</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <h6>Average rating per product</h6>
                <div className="row g-2">
                    {productsMap.length === 0 && <div className="text-muted">No feedback yet.</div>}
                    {productsMap.map((p) => (
                        <div key={p.product} className="col-6 col-md-3">
                            <div className="card p-2 h-100">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="small text-truncate" style={{ maxWidth: 120 }}>{p.product}</div>
                                    <div className="text-end">
                                        <div><strong>{(p.avg).toFixed(2)}</strong></div>
                                        <div className="small text-muted">{p.count} review{p.count > 1 ? 's' : ''}</div>
                                    </div>
                                </div>
                                <div className="mt-2"><RatingStars value={Math.round(p.avg)} /></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h6>Feedback</h6>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {filtered.map((f) => (
                        <div className="col" key={f.id}>
                            <div className="card h-100">
                                <div className="card-body d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <strong>{f.product}</strong>
                                        <RatingStars value={f.rating} />
                                    </div>
                                    <p className="small text-muted mb-2" style={{ flex: '1 1 auto' }}>{f.text}</p>
                                    <div className="small text-muted">{new Date(f.createdAt).toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PublicPage;