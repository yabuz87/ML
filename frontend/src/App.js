import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    HighBP: 0,
    HighChol: 0,
    CholCheck: 0,
    BMI: 25,
    Smoker: 0,
    Stroke: 0,
    HeartDiseaseorAttack: 0,
    PhysActivity: 0,
    Fruits: 0,
    Veggies: 0,
    HvyAlcoholConsump: 0,
    AnyHealthcare: 0,
    NoDocbcCost: 0,
    GenHlth: 3,
    MentHlth: 0,
    PhysHlth: 0,
    DiffWalk: 0,
    Sex: 0,
    Age: 30,
    Education: 3,
    Income: 3,
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const features = Object.values(formData);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features }),
      });

      const data = await res.json();
      setResult(data.diabetes_risk);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setResult("Error fetching prediction");
    }
  };

  // Yes/No fields
  const yesNoFields = [
    "HighBP",
    "HighChol",
    "CholCheck",
    "Smoker",
    "Stroke",
    "HeartDiseaseorAttack",
    "PhysActivity",
    "Fruits",
    "Veggies",
    "HvyAlcoholConsump",
    "AnyHealthcare",
    "NoDocbcCost",
    "DiffWalk",
    "Sex",
  ];

  const labels = {
    HighBP: "Do you have high blood pressure?",
    HighChol: "Do you have high cholesterol?",
    CholCheck: "Had cholesterol checked in last 5 years?",
    Smoker: "Have you smoked in last 3 years?",
    Stroke: "Ever had a stroke?",
    HeartDiseaseorAttack: "Heart disease or heart attack history?",
    PhysActivity: "Do you do physical activity regularly?",
    Fruits: "Do you eat fruits regularly?",
    Veggies: "Do you eat vegetables regularly?",
    HvyAlcoholConsump: "Do you consume alcohol heavily?",
    AnyHealthcare: "Do you have health care?",
    NoDocbcCost: "Skipped doctor visit due to cost?",
    DiffWalk: "Do you have difficulty walking?",
    Sex: "Sex (0=Female, 1=Male)",
  };

  return (
    <div className="container">
      <h1 style={{ gridColumn: "1 / -1", textAlign: "center" }}>
        🩺 Diabetes Risk Checker
      </h1>
      <form onSubmit={handleSubmit} style={{alignItems:"center"}}>
        {/* Yes/No Fields */}
        {yesNoFields.map((key) => (
          <div key={key}>
            <label>{labels[key]}</label>
            <select name={key} value={formData[key]} onChange={handleChange}>
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>
        ))}

        {/* Sliders */}
        <div>
          <label>Age: {formData.Age}</label>
          <input
            type="range"
            min="10"
            max="90"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>BMI: {formData.BMI}</label>
          <input
            type="range"
            min="10"
            max="50"
            name="BMI"
            value={formData.BMI}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>General Health (1=Excellent, 5=Poor): {formData.GenHlth}</label>
          <input
            type="range"
            min="1"
            max="5"
            name="GenHlth"
            value={formData.GenHlth}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Mental Health (days not good last 30 days): {formData.MentHlth}</label>
          <input
            type="number"
            min="0"
            max="30"
            name="MentHlth"
            value={formData.MentHlth}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Physical Health (days not good last 30 days): {formData.PhysHlth}</label>
          <input
            type="number"
            min="0"
            max="30"
            name="PhysHlth"
            value={formData.PhysHlth}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Education Level (1=No School, 6=College Graduate): {formData.Education}</label>
          <input
            type="number"
            min="1"
            max="6"
            name="Education"
            value={formData.Education}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Income Level (1=Low, 8=High): {formData.Income}</label>
          <input
            type="number"
            min="1"
            max="8"
            name="Income"
            value={formData.Income}
            onChange={handleChange}
          />
        </div>

        <button type="submit" style={{ gridColumn: "1 / -1" }}>
          🚀 Predict Diabetes Risk
        </button>
      </form>

      {result && (
        <div style={{ gridColumn: "1 / -1", textAlign: "center", marginTop: "20px" }}>
          <h2>Your Diabetes Risk</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold", color: "#d62828" }}>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
