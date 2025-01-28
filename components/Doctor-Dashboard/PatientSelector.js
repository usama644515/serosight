import React, { useState, useEffect } from "react";
import styles from "./PatientSelector.module.css";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartAnnotation from "chartjs-plugin-annotation"; // Import the plugin

// Register required Chart.js components and the annotation plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartAnnotation // Register the annotation plugin here
);

export default function PatientSelector() {
  const diseases = [
    { name: "Influenza", data: [10, 30, 50, 40, 20, 60] },
    { name: "Respiratory", data: [20, 40, 30, 50, 70, 60] },
    { name: "MMR", data: [5, 15, 25, 35, 45, 55] },
    { name: "Hepatitis", data: [15, 25, 35, 25, 15, 5] },
  ];

  const reports = [
    { date: "1/20/2024", pdf: true },
    { date: "3/12/2024", pdf: false },
    { date: "9/04/2024", pdf: false },
    { date: "12/29/2024", pdf: false },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [verticalLines, setVerticalLines] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("selectedUser");
      if (storedUser) {
        setSelectedUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      try {
        const response = await axios.get(`/api/searchUsers?query=${value}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleUserClick = (user) => {
    const selected = {
      name: `${user.firstName} ${user.lastName}`,
      userId: user.userId,
    };
    setSelectedUser(selected);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedUser", JSON.stringify(selected));
    }
    setSearchResults([]);
    setSearchTerm("");
  };

  const handleDiseaseChange = (disease) => {
    const isAlreadySelected = selectedDiseases.some(
      (item) => item.name === disease.name
    );
    if (isAlreadySelected) {
      setSelectedDiseases((prev) =>
        prev.filter((item) => item.name !== disease.name)
      );
    } else {
      setSelectedDiseases((prev) => [...prev, disease]);
    }
  };

  useEffect(() => {
    const updatedGraphData = diseases.map((disease) => ({
      label: disease.name,
      data: disease.data,
      borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
      borderWidth: 2,
      tension: 0.4,
    }));

    setGraphData(updatedGraphData);

    const updatedVerticalLines = selectedDiseases.map((disease) =>
      disease.data.map((_, idx) => idx)
    );
    setVerticalLines(updatedVerticalLines);
  }, [selectedDiseases]);

  const handleReportChange = (report) => {
    setSelectedReports((prev) =>
      prev.includes(report)
        ? prev.filter((item) => item !== report)
        : [...prev, report]
    );
  };

  const handleDownload = (item) => {
    console.log(`Downloading data for: ${item}`);
    // Placeholder for actual download functionality
  };

  const annotations = selectedDiseases.map((disease, idx) => ({
    type: "line",
    mode: "vertical",
    scaleID: "x",
    value: idx,
    borderColor: "red",
    borderWidth: 2,
    label: {
      content: disease.name,
      enabled: true,
      position: "top",
      backgroundColor: "red",
      color: "white",
    },
  }));

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: graphData,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: { color: "white" },
      },
      annotation: {
        annotations,
      },
    },
    scales: {
      x: {
        type: "category",
        grid: { display: false },
        ticks: { color: "white" },
      },
      y: {
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: { color: "white" },
      },
    },
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Select Patient</h1>
      <div className={styles.dashboard}>
        <div className={styles.patientSelection}>
          <div className={styles.searchSection}>
            <h2>Patient Selection</h2>
            <input
              className={styles.input}
              placeholder="Input patient code or name"
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchResults.length > 0 && (
              <ul className={styles.dropdown}>
                {searchResults.map((user) => (
                  <li
                    key={user._id}
                    className={styles.dropdownItem}
                    onClick={() => handleUserClick(user)}
                  >
                    {user.firstName} {user.lastName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {selectedUser && (
            <div className={styles.selectedUser}>
              <p>
                ID: <strong>{selectedUser.userId}</strong>
              </p>
              <p>
                Name: <strong>{selectedUser.name}</strong>
              </p>
            </div>
          )}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Disease Selection</h3>
            <div className={styles.checkboxGroup}>
              {diseases.map((disease, idx) => (
                <div key={idx} className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id={`disease-${idx}`}
                    className={styles.checkboxInput}
                    onChange={() => handleDiseaseChange(disease)}
                  />
                  <label
                    htmlFor={`disease-${idx}`}
                    className={styles.checkboxLabel}
                  ></label>
                  <span className={styles.checkboxText}>{disease.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Patient Report Selection</h3>
            <div className={styles.checkboxGroup}>
              {reports.map((report, idx) => (
                <div key={idx} className={styles.checkboxContainer2}>
                  <input
                    type="checkbox"
                    id={`report-${idx}`}
                    className={styles.checkboxInput}
                    onChange={() => handleReportChange(report.date)}
                  />
                  <label
                    htmlFor={`report-${idx}`}
                    className={styles.checkboxLabel}
                  ></label>
                  <span className={styles.checkboxText2}>{report.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.patientData}>
          <h3 className={styles.sectionTitle}>Patient Data</h3>
          <div className={styles.list}>
            {selectedDiseases.map((disease, idx) => (
              <div key={idx} className={styles.item}>
                <span>{disease.name}</span>
                <button
                  className={styles.button}
                  onClick={() => handleDownload(disease.name)}
                >
                  Download PDF
                </button>
              </div>
            ))}
          </div>
          <div className={styles.graph}>
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}
