import React, { useState, useEffect } from "react";
import styles from "./PatientSelector.module.css";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale, // Register this for the x-axis
  LinearScale, // For the y-axis
  PointElement, // For line points
  LineElement, // For the line itself
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PatientSelector() {
  const diseases = ["Influenza", "Respiratory", "MMR", "Hepatitis"];
  const reports = [
    { date: "1/20/2024", pdf: true },
    { date: "3/12/2024", pdf: false },
    { date: "9/04/2024", pdf: false },
    { date: "12/29/2024", pdf: false },
  ];

  const data = {
    labels: ["Point 1", "Point 2", "Point 3", "Point 4", "Point 5", "Point 6"],
    datasets: [
      {
        label: "Dataset 1",
        data: [5, 20, 40, 60, 20, 5],
        borderColor: "white",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Dataset 2",
        data: [10, 30, 50, 40, 30, 10],
        borderColor: "skyblue",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Dataset 3",
        data: [15, 25, 45, 35, 25, 15],
        borderColor: "gray",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "category", // Explicitly set the x-axis as a category scale
        grid: { display: false },
        ticks: { color: "white" },
      },
      y: {
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: { color: "white" },
      },
    },
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Use useEffect to load data from localStorage only on the client-side
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
    // Store selected user in state and localStorage
    const selected = {
      name: `${user.firstName} ${user.lastName}`,
      userId: user.userId,
    };
    setSelectedUser(selected);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedUser", JSON.stringify(selected));
    }
    setSearchResults([]); // Clear the dropdown
    setSearchTerm(""); // Optional: Clear the search input
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Select Patient</h1>
      <div className={styles.dashboard}>
        {/* Patient Selection Section */}
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
                    onClick={() => handleUserClick(user)} // Handle user click
                  >
                    {user.firstName} {user.lastName}
                  </li>
                ))}
              </ul>
            )}
            
          </div>
          {selectedUser && (
              <div className={styles.selectedUser}>
                {/* <p>Selected Patient:</p> */}
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
            <hr className={styles.divider} />
            <div className={styles.checkboxGroup}>
              {diseases.map((disease, idx) => (
                <div key={idx} className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id={`customCheckboxx-${idx}`}
                    className={styles.checkboxInput}
                  />
                  <label
                    htmlFor={`customCheckboxx-${idx}`}
                    className={styles.checkboxLabel}
                  ></label>
                  <span className={styles.checkboxText}>{disease}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Patient Report Selection</h3>
            <hr className={styles.divider} />
            <div className={styles.checkboxGroup}>
              {reports.map((report, idx) => (
                <div key={idx} className={styles.checkboxContainer2}>
                  <input
                    type="checkbox"
                    id={`reportCheckbox-${idx}`}
                    className={styles.checkboxInput}
                  />
                  <label
                    htmlFor={`reportCheckbox-${idx}`}
                    className={styles.checkboxLabel}
                  ></label>
                  <span className={styles.checkboxText2}>
                    {report.date}{" "}
                    {report.pdf && <span className={styles.pdf}></span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Patient Data Section */}
        <div className={styles.patientData}>
          <h3 className={styles.sectionTitle}>Patient Data</h3>
          <hr className={styles.divider} />
          <div className={styles.list}>
            {diseases.map((item, idx) => (
              <div key={idx} className={styles.item}>
                <span>{item}</span>
                <button className={styles.button}>Download PDF</button>
              </div>
            ))}
          </div>
          <div className={styles.graph}>
            <Line data={data} options={options} />
            <div className={styles.verticalLine}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
