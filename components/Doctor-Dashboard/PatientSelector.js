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
import {
  faChevronDown,
  faChevronUp,
  faSync,
} from "@fortawesome/free-solid-svg-icons"; // Added faSync for refresh icon

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
  // Static global data for testing
  const globalData = {
    Influenza: [
      { level: 5, patients: 10 },
      { level: 15, patients: 20 },
      { level: 25, patients: 30 },
      { level: 35, patients: 40 },
      { level: 45, patients: 50 },
      { level: 55, patients: 60 },
      { level: 65, patients: 70 },
      { level: 75, patients: 80 },
      { level: 85, patients: 90 },
      { level: 95, patients: 100 },
      { level: 105, patients: 110 },
      { level: 115, patients: 120 },
      { level: 125, patients: 130 },
      { level: 135, patients: 140 },
      { level: 145, patients: 150 },
      { level: 155, patients: 160 },
      { level: 165, patients: 170 },
      { level: 175, patients: 180 },
      { level: 185, patients: 190 },
      { level: 195, patients: 200 },
    ],
    Respiratory: [
      { level: 10, patients: 15 },
      { level: 20, patients: 25 },
      { level: 30, patients: 35 },
      { level: 40, patients: 45 },
      { level: 50, patients: 55 },
      { level: 60, patients: 65 },
      { level: 70, patients: 75 },
      { level: 80, patients: 85 },
      { level: 90, patients: 95 },
      { level: 100, patients: 105 },
      { level: 110, patients: 115 },
      { level: 120, patients: 125 },
      { level: 130, patients: 135 },
      { level: 140, patients: 145 },
      { level: 150, patients: 155 },
      { level: 160, patients: 165 },
      { level: 170, patients: 175 },
      { level: 180, patients: 185 },
      { level: 190, patients: 195 },
      { level: 200, patients: 205 },
    ],
    MMR: [
      { level: 5, patients: 5 },
      { level: 15, patients: 15 },
      { level: 25, patients: 25 },
      { level: 35, patients: 35 },
      { level: 45, patients: 45 },
      { level: 55, patients: 55 },
      { level: 65, patients: 65 },
      { level: 75, patients: 75 },
      { level: 85, patients: 85 },
      { level: 95, patients: 95 },
      { level: 105, patients: 105 },
      { level: 115, patients: 115 },
      { level: 125, patients: 125 },
      { level: 135, patients: 135 },
      { level: 145, patients: 145 },
      { level: 155, patients: 155 },
      { level: 165, patients: 165 },
      { level: 175, patients: 175 },
      { level: 185, patients: 185 },
      { level: 195, patients: 195 },
    ],
    Hepatitis: [
      { level: 10, patients: 10 },
      { level: 20, patients: 20 },
      { level: 30, patients: 30 },
      { level: 40, patients: 40 },
      { level: 50, patients: 50 },
      { level: 60, patients: 60 },
      { level: 70, patients: 70 },
      { level: 80, patients: 80 },
      { level: 90, patients: 90 },
      { level: 100, patients: 100 },
      { level: 110, patients: 110 },
      { level: 120, patients: 120 },
      { level: 130, patients: 130 },
      { level: 140, patients: 140 },
      { level: 150, patients: 150 },
      { level: 160, patients: 160 },
      { level: 170, patients: 170 },
      { level: 180, patients: 180 },
      { level: 190, patients: 190 },
      { level: 200, patients: 200 },
    ],
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [expandedReports, setExpandedReports] = useState({}); // Track which reports are expanded
  const [diseases, setDiseases] = useState([]); // Diseases will be dynamically populated based on reports

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
            // Extract unique diseases from reports
            const uniqueDiseases = [
              ...new Set(response.data.map((report) => report.diseaseName)),
            ];
            setDiseases(
              uniqueDiseases.map((disease) => ({
                name: disease,
                data: globalData[disease] || [], // Use static global data for the chart
              }))
            );
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
        data: disease.data.map((item) => item.patients), // Use patient counts for the chart
        borderColor: `hsl(${disease.name.length * 50}, 70%, 50%)`, // Static color based on disease name
        borderWidth: 2,
        tension: 0.4,
        fill: true, // Fill the area under the line
      }));

    setGraphData(updatedGraphData);
  }, [selectedDiseases, diseases]);

  const handleReportChange = (reportDate) => {
    setSelectedReports((prev) =>
      prev.includes(reportDate)
        ? prev.filter((item) => item !== reportDate)
        : [...prev, reportDate]
    );
  };

  const handleDownloadPDF = (reportDate, diseaseName) => {
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
      pdf.text(`Selected Diseases: ${diseaseName}`, 20, 60);
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(reportDate));
  
      // Use the formattedDate in your PDF
      pdf.text(`Date: ${formattedDate}`, 20, 70);
  
      // Add a horizontal line separator
      pdf.setDrawColor(33, 150, 243); // Blue color
      pdf.setLineWidth(0.5);
      pdf.line(20, 80, 280, 80);
  
      // Add the graph image
      const imgWidth = 160; // Adjusted width for better fit
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 20, 90, imgWidth, imgHeight);
  
      // Add a footer
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100); // Gray color
      pdf.text("Generated by ImmunoMap", 105, 200, { align: "center" });
  
      // Save the PDF
      pdf.save(`${selectedUser.name}_${diseaseName}_report.pdf`);
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

    // Ensure immunityLevel is a number
    const immunityLevel = Number(report.immunityLevel);
    if (isNaN(immunityLevel)) return []; // Return empty array if immunityLevel is not a number

    // Get the global data for the disease
    const diseaseData = globalData[report.diseaseName];
    if (!diseaseData) return [];

    // Check if immunityLevel matches exactly with any value in globalData
    const exactMatchIndex = diseaseData.findIndex(
      (item) => item.level === immunityLevel
    );

    if (exactMatchIndex !== -1) {
      // If exact match is found, place the annotation line at that index
      return [
        {
          type: "line",
          mode: "vertical",
          scaleID: "x",
          value: exactMatchIndex,
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
    }

    // Find the closest values in the global data
    let closestLowerValue = -Infinity;
    let closestHigherValue = Infinity;

    for (const item of diseaseData) {
      if (item.level <= immunityLevel && item.level > closestLowerValue) {
        closestLowerValue = item.level;
      }
      if (item.level >= immunityLevel && item.level < closestHigherValue) {
        closestHigherValue = item.level;
      }
    }

    // If no valid closest values are found, return an empty array
    if (closestLowerValue === -Infinity || closestHigherValue === Infinity)
      return [];

    // Calculate the index for the annotation line
    const lowerIndex = diseaseData.findIndex(
      (item) => item.level === closestLowerValue
    );
    const higherIndex = diseaseData.findIndex(
      (item) => item.level === closestHigherValue
    );

    // If no valid indices are found, return an empty array
    if (lowerIndex === -1 || higherIndex === -1) return [];

    // Calculate the position for the annotation line
    const difference = closestHigherValue - closestLowerValue;
    if (difference === 0) return []; // Avoid division by zero

    const annotationPosition =
      lowerIndex + (immunityLevel - closestLowerValue) / difference;

    console.log("Annotation Position:", annotationPosition); // Debugging

    return [
      {
        type: "line",
        mode: "vertical",
        scaleID: "x",
        value: annotationPosition,
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

  const getChartDataForReport = (reportDate) => {
    const report = patientData.find((r) => r.reportDate === reportDate);
    if (!report) return { labels: [], datasets: [] };

    const diseaseData = globalData[report.diseaseName];
    if (!diseaseData) return { labels: [], datasets: [] };

    const labels = diseaseData.map((item) => item.level);
    const datasets = [
      {
        label: report.diseaseName,
        data: diseaseData.map((item) => item.patients),
        borderColor: `hsl(${report.diseaseName.length * 50}, 70%, 50%)`,
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ];

    return { labels, datasets };
  };

  const getChartOptionsForReport = (reportDate) => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: { color: "white" },
        },
        annotation: {
          annotations: getAnnotationForReport(reportDate),
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
            text: "Number of Patients",
            color: "white",
          },
          grid: { color: "rgba(255, 255, 255, 0.1)" },
          ticks: { color: "white" },
        },
      },
    };
  };

  // Function to handle refresh
  const handleRefresh = () => {
    localStorage.removeItem("selectedUser"); // Remove selectedUser from local storage
    window.location.reload(); // Reload the page
  };

  return (
    <div className={styles.container} id = "patient-data-selector">
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
                      onClick={() => handleDownloadPDF(reportDate,report?.diseaseName)}
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
                      <Line
                        data={getChartDataForReport(reportDate)}
                        options={getChartOptionsForReport(reportDate)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Refresh Button */}
      <button className={styles.refreshButton} onClick={handleRefresh}>
        <FontAwesomeIcon icon={faSync} className={styles.largeIcon} />
      </button>
    </div>
  );
}
