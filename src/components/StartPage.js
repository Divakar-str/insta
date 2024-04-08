import React, { useState } from 'react';

const StartPage = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSearch = () => {
    if (!username.trim()) {
      setError('Please enter a username.');
      return;
    }

    setLoading(true);
    fetch('http://127.0.0.1:8080/check-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUserData(data);
        setError(null);
      })
      .catch(error => {
        setError('Error fetching user data. Please try again.');
        console.error('Error fetching user data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClear = () => {
    setUsername('');
    setUserData(null);
    setError(null);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header" style={{ backgroundColor: '#405DE6', color: 'white' }}>Start Page</div>
            <div className="card-body">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  value={username}
                  onChange={handleInputChange}
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button" onClick={handleSearch}>
                    Search
                  </button>
                  <button className="btn btn-secondary ml-2" type="button" onClick={handleClear}>
                    Clear
                  </button>
                </div>
              </div>

              {loading && <p>Loading...</p>}

              {userData && (
                <div className="user-data">
                  <h3 className="mb-4">User Data</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <p><strong>Username:</strong> {userData.username}</p>
                      <p><strong>Is Fake:</strong> {userData.is_fake ? 'Yes' : 'No'}</p>
                      <p><strong>Fake Percentile:</strong> {userData.fake_percentile}</p>
                    </div>
                    <div className="col-md-6">
                      {userData.scraped_data && (
                        <div>
                          <p><strong>Profile Picture:</strong></p>
                          <img src={userData.scraped_data.profile_picture} alt="Profile" className="img-fluid rounded mb-3" />
                          <p><strong>Followers:</strong> {userData.scraped_data.followers}</p>
                          <p><strong>Following:</strong> {userData.scraped_data.following}</p>
                          <p><strong>Posts:</strong> {userData.scraped_data.posts}</p>
                          <p><strong>Profile:</strong> {userData.scraped_data.profile}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {error && <p className="text-danger">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
