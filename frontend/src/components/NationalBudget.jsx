import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NationalBudget = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch national budget from backend
    axios.get('http://localhost:6000/api/nationalBudgets')
      .then((response) => {
        setBudgets(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching national budget:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>National Budget</h2>
      <ul>
        {budgets.map((budget) => (
          <li key={budget._id}>
            <strong>Year:</strong> {budget.year} <br />
            {Object.entries(budget.sectors).map(([sector, amount]) => (
              <span key={sector}>
                {sector}: {amount} <br />
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NationalBudget;
