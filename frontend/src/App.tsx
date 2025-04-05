import React, { useEffect, useState } from 'react';
import './App.css';

interface Job {
  id: number;
  title: string;
  description: string;
  companyId: number;
}

interface Company {
  id: number;
  name: string;
  description: string;
}

interface Review {
  id: number;
  companyId: number;
  rating: number;
  comment: string;
}

const API_BASE = 'http://localhost:8085';

function App() {
  const [view, setView] = useState<'jobs' | 'companies' | 'reviews'>('jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    let url = '';
    if (view === 'jobs') url = `${API_BASE}/jobs`;
    else if (view === 'companies') url = `${API_BASE}/companies`;
    else if (view === 'reviews') url = `${API_BASE}/reviews`;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        if (view === 'jobs') setJobs(data);
        else if (view === 'companies') setCompanies(data);
        else if (view === 'reviews') setReviews(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [view]);

  return (
    <div className="App">
      <header className="app-header">
        <h1>Job Portal</h1>
        <nav>
          <button className={view === 'jobs' ? 'active' : ''} onClick={() => setView('jobs')}>Jobs</button>
          <button className={view === 'companies' ? 'active' : ''} onClick={() => setView('companies')}>Companies</button>
          <button className={view === 'reviews' ? 'active' : ''} onClick={() => setView('reviews')}>Reviews</button>
        </nav>
      </header>
      <main>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {view === 'jobs' && !loading && !error && (
          <section>
            <h2>Jobs</h2>
            <ul className="card-list">
              {jobs.map(job => (
                <li key={job.id} className="card">
                  <h3>{job.title}</h3>
                  <p>{job.description}</p>
                  <p><strong>Company ID:</strong> {job.companyId}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
        {view === 'companies' && !loading && !error && (
          <section>
            <h2>Companies</h2>
            <ul className="card-list">
              {companies.map(company => (
                <li key={company.id} className="card">
                  <h3>{company.name}</h3>
                  <p>{company.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
        {view === 'reviews' && !loading && !error && (
          <section>
            <h2>Reviews</h2>
            <ul className="card-list">
              {reviews.map(review => (
                <li key={review.id} className="card">
                  <p><strong>Company ID:</strong> {review.companyId}</p>
                  <p><strong>Rating:</strong> {review.rating} / 5</p>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <footer>
        <p>© {new Date().getFullYear()} Job Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
