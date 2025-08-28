import { useState } from "react";
import "./App.css";

export default function App() {
  const [country, setCountry] = useState("");
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchUniversities(e) {
    e.preventDefault();
    if (!country) return;

    setLoading(true);
    setError("");
    setUniversities([]);

    try {
      const res = await fetch(
        `http://universities.hipolabs.com/search?country=${country}`
      );

      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setUniversities(data);
    } catch (err) {
      setError("❌ Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>🎓 University Finder</h1>
          <p>Discover universities worldwide by searching with a country name.</p>

          <form onSubmit={fetchUniversities} className="search-form">
            <input
              type="text"
              placeholder="Enter country name..."
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <button type="submit">🔍 Search</button>
          </form>
        </div>
      </header>

      {/* Loading / Error */}
      <div className="status">
        {loading && <p className="loading">Loading universities...</p>}
        {error && <p className="error">{error}</p>}
      </div>

      {/* Results */}
      <div className="card-grid">
        {universities.map((u, i) => (
          <div key={i} className="card">
            <div className="card-header">
              <h3>{u.name}</h3>
            </div>
            <div className="card-body">
              <p>🌍 {u.country}</p>
              {u.web_pages?.[0] ? (
                <a href={u.web_pages[0]} target="_blank" rel="noreferrer">
                  Visit Website
                </a>
              ) : (
                <span>No Website Available</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>Made with ❤️ for students worldwide</p>
      </footer>
    </div>
  );
}
