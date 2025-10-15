import { useState, useEffect, useCallback } from "react";
import AdminPanel from "../pages/AdminPanel";
import PublicPage from "../pages/PublicPage";
import { uid, useLocalStorage } from "../utilities/utility";

export interface Feedback {
    id: string;
    product: string;
    text: string;
    rating: number;
    createdAt: number;
    updatedAt: number;
}

export default function ProductFeedbackDashboard() {
    const [feedbacks, setFeedbacks] = useLocalStorage(
        'pfb_feedbacks_v1',
        []
    );
    const [view, setView] = useState<'public' | 'admin'>('public');

    useEffect(() => {
        if (feedbacks.length === 0) {
            const seed: Feedback[] = [
                { id: uid(), product: 'Sahyadri Turmeric', text: 'Great aroma and color. Customer loved it.', rating: 5, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3, updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 3 },
                { id: uid(), product: 'Sahyadri Turmeric', text: 'Good texture, a bit coarse.', rating: 4, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2, updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 2 },
                { id: uid(), product: 'Herbal Soap', text: 'Leaves skin smooth. Mild fragrance.', rating: 5, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1, updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 1 },
            ];
            setFeedbacks(seed);
        }
    }, []);

    const onSetFeedbacks = useCallback(
        (cbOrValue: Feedback[] | ((prev: Feedback[]) => Feedback[])) => {
            setFeedbacks(cbOrValue);
        },
        [setFeedbacks]
    );

    return (
        <div className="container py-3">
            <header className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
                <div>
                    <h3 className="mb-0">Product Feedback Dashboard</h3>
                    <small className="text-muted">React + Bootstrap • Local storage • Responsive</small>
                </div>
                <div className="btn-group" role="group">
                    <button className={`btn ${view === 'public' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setView('public')}>Public</button>
                    <button className={`btn ${view === 'admin' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setView('admin')}>Admin</button>
                </div>
            </header>
            <main>
                {view === 'public' ? (
                    <PublicPage feedbacks={feedbacks} />
                ) : (
                    <AdminPanel feedbacks={feedbacks} setFeedbacks={onSetFeedbacks} />
                )}
            </main>
            <footer className="text-center text-muted small mt-4">Built with performance in mind — memoized components and derived data via useMemo.</footer>
        </div>
    );
}
