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
import ChartAnnotation from "chartjs-plugin-annotation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

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
  ChartAnnotation
);

export default function PatientSelector() {
  const diseases = [
    { name: "Influenza", data: [10, 30, 50, 40, 20, 60] },
    { name: "Respiratory", data: [20, 40, 30, 50, 70, 60] },
    { name: "MMR", data: [5, 15, 25, 35, 45, 55] },
    { name: "Hepatitis", data: [15, 25, 35, 25, 15, 5] },
  ];

  // Static global data for testing
  const globalData = {
    Influenza: [10, 30, 50, 40, 20, 60, 70, 80, 90, 100], // Static population data
    Respiratory: [20, 40, 30, 50, 70, 60, 80, 90, 100, 110],
    MMR: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95],
    Hepatitis: [15, 25, 35, 25, 15, 5, 10, 20, 30, 40],
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [expandedReports, setExpandedReports] = useState({}); // Track which reports are expanded

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("selectedUser");
      if (storedUser) {
        setSelectedUser(JSON.parse(storedUser));
      }
    }
  }, []);

  // Fetch reports based on patient ID
  useEffect(() => {
    if (selectedUser) {
      const fetchReports = async () => {
        try {
          const response = await axios.get(
            `/api/report?patientId=${selectedUser.userId}`
          );
          if (response.data.length === 0) {
            setPatientData([]); // Set patientData to empty if no reports are found
          } else {
            setPatientData(response.data);
          }
        } catch (error) {
          console.error("Error fetching reports:", error);
        }
      };
      fetchReports();
    }
  }, [selectedUser]);

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
    const updatedGraphData = diseases
      .filter((disease) =>
        selectedDiseases.some((d) => d.name === disease.name)
      )
      .map((disease) => ({
        label: disease.name,
        data: globalData[disease.name] || [], // Use static global data for the chart
        borderColor: `hsl(${disease.name.length * 50}, 70%, 50%)`, // Static color based on disease name
        borderWidth: 2,
        tension: 0.4,
        fill: true, // Fill the area under the line
      }));

    setGraphData(updatedGraphData);
  }, [selectedDiseases]);

  const handleReportChange = (reportDate) => {
    setSelectedReports((prev) =>
      prev.includes(reportDate)
        ? prev.filter((item) => item !== reportDate)
        : [...prev, reportDate]
    );
  };

  const handleDownloadPDF = (reportDate) => {
    const input = document.getElementById(`graph-container-${reportDate}`);

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape");

      // Add a professional header
      pdf.setFontSize(18);
      pdf.setTextColor(33, 150, 243); // Blue color
      pdf.text("Patient Immunity Report", 105, 20, { align: "center" });

      // Add patient information
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0); // Black color
      pdf.text(`Patient ID: ${selectedUser.userId}`, 20, 40);
      pdf.text(`Patient Name: ${selectedUser.name}`, 20, 50);

      // Add selected diseases
      pdf.text("Selected Diseases:", 20, 60);
      selectedDiseases.forEach((disease, index) => {
        pdf.text(`- ${disease.name}`, 20, 70 + index * 10);
      });

      // Add a horizontal line separator
      pdf.setDrawColor(33, 150, 243); // Blue color
      pdf.setLineWidth(0.5);
      pdf.line(20, 90, 280, 90);

      // Add the graph image
      const imgWidth = 160; // Adjusted width for better fit
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 20, 100, imgWidth, imgHeight);

      // Add a footer
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100); // Gray color
      pdf.text("Generated by Immunity Tracker", 105, 200, { align: "center" });

      // Save the PDF
      pdf.save(`${selectedUser.name}_${reportDate}_report.pdf`);
    });
  };

  const toggleReportGraph = (reportDate) => {
    setExpandedReports((prev) => ({
      ...prev,
      [reportDate]: !prev[reportDate], // Toggle the expanded state for this report
    }));
  };

  const getAnnotationForReport = (reportDate) => {
    const report = patientData.find((r) => r.reportDate === reportDate);
    if (!report) return [];

    const immunityLevel = report.immunityLevel; // Get immunityLevel from the report
    const index = globalData[report.diseaseName]?.findIndex(
      (value) => value === immunityLevel
    );

    if (index === -1 || index === undefined) return [];

    return [
      {
        type: "line",
        mode: "vertical",
        scaleID: "x",
        value: index,
        borderColor: "red",
        borderWidth: 2,
        label: {
          content: `Immunity: ${immunityLevel}`,
          enabled: true,
          position: "top",
          backgroundColor: "red",
          color: "white",
        },
      },
    ];
  };

  const data = {
    labels: Array.from({ length: 10 }, (_, i) => i + 1), // Labels for immunity levels (1 to 10)
    datasets: graphData,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom chart size
    plugins: {
      legend: {
        display: true,
        labels: { color: "white" },
      },
      annotation: {
        annotations: expandedReports[selectedReports[0]]
          ? getAnnotationForReport(selectedReports[0])
          : [],
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Immunity Level",
          color: "white",
        },
        grid: { display: false },
        ticks: { color: "white" },
      },
      y: {
        title: {
          display: true,
          text: "Population",
          color: "white",
        },
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
            {patientData.length === 0 ? (
              <p className={styles.noReport}>No Report Found</p>
            ) : (
              <div className={styles.checkboxGroup}>
                {patientData.map((report, idx) => {
                  const formattedDate = new Intl.DateTimeFormat("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(report.reportDate));

                  return (
                    <div key={idx} className={styles.checkboxContainer2}>
                      <input
                        type="checkbox"
                        id={`report-${idx}`}
                        className={styles.checkboxInput}
                        onChange={() => handleReportChange(report.reportDate)}
                      />
                      <label
                        htmlFor={`report-${idx}`}
                        className={styles.checkboxLabel}
                      ></label>
                      <span className={styles.checkboxText2}>
                        {formattedDate}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className={styles.patientData}>
          <h3 className={styles.sectionTitle}>Patient Data</h3>
          <div className={styles.list}>
            {selectedReports.map((reportDate, idx) => {
              const report = patientData.find(
                (r) => r.reportDate === reportDate
              );
              return (
                <div key={idx} className={styles.item}>
                  <div className={styles.reportHeader}>
                    <span>
                      <span
                        className={styles.dropdownIcon}
                        onClick={() => toggleReportGraph(reportDate)}
                      >
                        <FontAwesomeIcon
                          icon={
                            expandedReports[reportDate]
                              ? faChevronUp
                              : faChevronDown
                          }
                        />
                      </span>
                      <span>{report?.diseaseName}</span>
                    </span>
                    <button
                      className={styles.button}
                      onClick={() => handleDownloadPDF(reportDate)}
                    >
                      Download PDF
                    </button>
                  </div>
                  {expandedReports[reportDate] && (
                    <div
                      className={styles.graph}
                      id={`graph-container-${reportDate}`}
                      style={{ height: "300px", width: "100%" }} // Increase chart size
                    >
                      <Line data={data} options={options} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}