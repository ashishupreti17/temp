import React, { useState, useEffect } from 'react';

function App() {
  const [terms, setTerms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [conditions, setConditions] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);

  useEffect(() => {
    // Fetch terms data from API
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      // Fetch terms data from API
     
      setTerms([{
codeCat:1,
description:"Transportation",
},
{
codeCat:2,
description:"Payment",
},
{
codeCat:3,
description:"Procurement",
}
]);
    } catch (error) {
      console.error('Error fetching terms:', error);
    }
  };

  const fetchConditions = async (codeCat) => {
    try {
      // Fetch conditions data from API based on codeCat
      //const response = await fetch(`your-api-url-for-conditions?codeCat=${codeCat}`);
     // const data = await response.json();
      setConditions([{
codeCat:2,
condition: "quick brown fox jumps over the lazy dog 1",
isMandatory:"Y",
},
{
codeCat:2,
condition: "quick brown fox jumps over the lazy dog 2",
isMandatory:"N",
},
{
codeCat:2,
condition: "quick brown fox jumps over the lazy dog 3",
isMandatory:"N",
}
]);
    } catch (error) {
      console.error('Error fetching conditions:', error);
    }
  };

  const handleTermClick = (term) => {
    setSelectedTerm(term);
    setSelectedConditions([]); // Clear selected conditions when term changes
    fetchConditions(term.codeCat);
  };

  const handleCheckboxChange = (condition) => {
    // Handle checkbox change
    const isSelected = selectedConditions.includes(condition);
    if (isSelected) {
      setSelectedConditions(selectedConditions.filter((c) => c !== condition));
    } else {
      setSelectedConditions([...selectedConditions, condition]);
    }
  };

  return (
    <div>
      <h1>Terms and Conditions</h1>
      <div>
        <h2>Terms:</h2>
        <ul>
          {terms.map((term) => (
            <li key={term.codeCat} onClick={() => handleTermClick(term)}>
              {term.description}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Conditions for {selectedTerm && selectedTerm.description}:</h2>
        <ul>
          {conditions.map((condition) => (
            <li key={condition.condition}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedConditions.includes(condition) || condition.isMandatory === "Y"}
                  disabled={condition.isMandatory === "Y"}
                  onChange={() => handleCheckboxChange(condition)}
                />
                {condition.condition}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
