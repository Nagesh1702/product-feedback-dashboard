import { useState, useEffect, useCallback } from "react";
import AdminPanel from "../pages/AdminPanel";
import PublicPage from "../pages/PublicPage";
import { uid } from "../utilities/utility";
import { useLocalStorage } from "../utilities/utility";

export default function ProductFeedbackDashboard() {
    const [feedbacks, setFeedbacks] = useLocalStorage('pfb_feedbacks_v1', []);
    const [view, setView] = useState('public'); // 'public' | 'admin'


    // seed sample data if empty (only once)
    useEffect(() => {
        if (feedbacks.length === 0) {
            const seed = [
                { id: uid(), product: 'Sahyadri Turmeric', text: 'Great aroma and color. Customer loved it.', rating: 5, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3, updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 3 },
                { id: uid(), product: 'Sahyadri Turmeric', text: 'Good texture, a bit coarse.', rating: 4, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2, updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 2 },
                { id: uid(), product: 'Herbal Soap', text: 'Leaves skin smooth. Mild fragrance.', rating: 5, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1, updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 1 },
            ];
            setFeedbacks(seed);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const onSetFeedbacks = useCallback((cbOrValue) => {
        setFeedbacks(cbOrValue);
    }, [setFeedbacks]);


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
