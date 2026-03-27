import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProvinceBudgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:6000/api/provinceBudgets')
      .then((response) => {
        setBudgets(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching provincial budgets:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Provincial Budgets</h2>
      {budgets.map((provinceBudget) => (
        <div key={provinceBudget._id}>
          <h3>{provinceBudget.provinceName || 'Province'}</h3>
          {provinceBudget.budgets.map((budget) => (
            <div key={budget.year}>
              <strong>Year:</strong> {budget.year} <br />
              {Object.entries(budget.sectors).map(([sector, amount]) => (
                <span key={sector}>
                  {sector}: {amount} <br />
                </span>
              ))}
              <hr />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProvinceBudgets;
