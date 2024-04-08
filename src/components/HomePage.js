// HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4" style={{ color: '#405DE6' }}>Welcome to our Website</h2>
      <p className="lead" style={{ color: '#5851DB' }}>This is the home page. Feel free to explore!</p>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Link to="/start" className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: '#405DE6', borderColor: '#405DE6' }}>Get Started</Link> {/* Adding Bootstrap button styling */}
        </div>
      </div>
    </div>
  );
}
export default HomePage;
