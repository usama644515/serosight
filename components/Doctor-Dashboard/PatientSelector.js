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
} from "@fortawesome/free-solid-svg-icons";

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

  const diseaseMapping = [
    { name: "Fiducial", type: "control" },
    { name: "10x_Spotting_Buffer", type: "control" },
    { name: "Human_IgM_Isotype_Control_0.1", type: "control" },
    { name: "Human_IgG_Isotype_Control_0.1", type: "control" },
    { name: "PBS", type: "control" },
    { name: "EMPTY", type: "control" },
    { name: "Fiducial", type: "control" },
    { name: "Antigen1", type: "common cold" },
    { name: "hCoV.229E.S1+S2", type: "common cold" },
    { name: "hCoV.OC43.S1", type: "common cold" },
    { name: "hCoV.OC43.S1+S2", type: "common cold" },
    { name: "LA2-94/2013", type: "rsv" },
    { name: "TH-10526/2014", type: "rsv" },
    { name: "SARS-CoV-2_NP", type: "covid" },
    { name: "SARS-CoV-2.S1+S2.ECD", type: "covid" },
    { name: "SARS-CoV-2.S1", type: "covid" },
    { name: "SARS-CoV-2.S1.RBD", type: "covid" },
    { name: "SARS-CoV-2.S1.XBB.1.5", type: "covid" },
    { name: "SARS.CoV2.S1.RBD.XBB.1.5", type: "covid" },
    { name: "SARS.CoV2.S-ECD.trimer.XBB.1.5", type: "covid" },
    { name: "SARS.CoV2.S1.RBD.BA.2.86", type: "covid" },
    { name: "SARS.CoV2.S1.RBD.JN.1", type: "covid" },
    { name: "FluB_Phu/HA0", type: "flu" },
    { name: "Flu.H3N2.A/Darwin/HA", type: "flu" },
    { name: "Flu.H1N1.A/Wis.Victoria/HA", type: "flu" },
    { name: "Human_IgM_Isotype_Control_0.3", type: "control" },
    { name: "Flu.H1N2.A/Victoria/HA", type: "flu" },
    { name: "Flu.H3N2.A/Mass/HA", type: "flu" },
    { name: "Human_IgG_Isotype_Control_0.3", type: "control" },
    { name: "EBV_p18_GST", type: "epstein bar" },
    { name: "EBV-EA", type: "epstein bar" },
    { name: "MuV.Miyahara_HN", type: "mumps" },
    { name: "MuV.Miyahara_F0", type: "mumps" },
    { name: "RuV_E1", type: "rubella" },
    { name: "RuV_E1-E2", type: "rubella" },
    { name: "RuV_C", type: "rubella" },
    { name: "MeV_H", type: "measles" },
    { name: "MeV_H.full_length", type: "measles" },
    { name: "MeV_F0", type: "measles" },
    { name: "VZV_Oka.B", type: "shingles" },
    { name: "VZV_Oka.HHV-3_gE", type: "shingles" },
    { name: "VZV_Oka.gH-gL", type: "shingles" },
    { name: "WNV_E.Full", type: "west nile" },
    { name: "WNV_Pre-M", type: "west nile" },
    { name: "WNV.NY99_E.Domain_III", type: "west nile" },
    { name: "WNV.Santa-Greece-2010_E.Domain_III", type: "west nile" },
    { name: "WNV.NY99_NS1", type: "west nile" },
    { name: "HAV_5-164", type: "hepatitis A" },
    { name: "HAV_722-830", type: "hepatitis A" },
    { name: "a-Hu_IgG_0.3", type: "control" },
    { name: "HAV_1392-1521", type: "hepatitis A" },
    { name: "HBVc", type: "hepatitis B" },
    { name: "a-Hu_IgM_0.3", type: "control" },
    { name: "HBVe", type: "hepatitis B" },
    { name: "HBV_surfaceAg_ad", type: "hepatitis B" },
    { name: "a-Hu_IgG_0.1", type: "control" },
    { name: "Native_Bordetella_pertussis_toxin/ptxD", type: "pertussis" },
    {
      name: "Recombinant_B._pertussis_pertactin_autotransporter_protein",
      type: "pertussis",
    },
    { name: "a-Hu_IgM_0.1", type: "control" },
    { name: "Native_Bordetella_pertussis_filamentous", type: "pertussis" },
    { name: "Recombinant_B._pertussis_Fimbriae_2/3", type: "pertussis" },
    { name: "SARS.CoV2.S-ECD.trimer.JN.1", type: "covid" },
    { name: "FluB_Aus/HA1", type: "flu" },
    { name: "Human_IgM_Isotype_Control_0.03", type: "control" },
    { name: "Flu.H3N2.A/Thai/HA", type: "flu" },
    { name: "Human_IgG_Isotype_Control_0.03", type: "control" },
    { name: "Flu.H5N1.A/Vietnam/1194/2004/HA", type: "flu" },
    { name: "EBV-EBNA1", type: "epstein bar" },
    { name: "Streptavidin_AF555", type: "die" },
    { name: "Streptavidin_AF647", type: "die" },
    { name: "Streptavidin_AF790", type: "die" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [expandedReports, setExpandedReports] = useState({});
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("selectedUser");
      if (storedUser) {
        setSelectedUser(JSON.parse(storedUser));
      }
    }
  }, []);

  // useEffect(() => {
  //   if (selectedUser) {
  //     const fetchReports = async () => {
  //       try {
  //         const response = await axios.get(
  //           `/api/report?patientId=${selectedUser.userId}`
  //         );
  //         if (response.data.length === 0) {
  //           setPatientData([]);
  //         } else {
  //           setPatientData(response.data);
  //           const uniqueDiseases = [
  //             ...new Set(response.data.map((report) => report.diseaseName)),
  //           ];
  //           setDiseases(
  //             uniqueDiseases.map((disease) => ({
  //               name: disease,
  //               data: globalData[disease] || [],
  //             }))
  //           );
  //         }
  //       } catch (error) {
  //         console.error("Error fetching reports:", error);
  //       }
  //     };
  //     fetchReports();
  //   }
  // }, [selectedUser]);

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

  // const handleUserClick = (user) => {
  //   const selected = {
  //     name: `${user.patientName}`,
  //     userId: user.patientId,
  //   };
  //   setSelectedUser(selected);
  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("selectedUser", JSON.stringify(selected));
  //   }
  //   setSearchResults([]);
  //   setSearchTerm("");
  // };

  // const handleUserClick = async (user) => {
  //   const selected = {
  //     name: `${user.patientName}`,
  //     userId: user.patientId,
  //     slide: user.sampleInfo?.slide,  // Assuming sampleInfo is part of the user object
  //     block: user.sampleInfo?.block,  // Assuming sampleInfo is part of the user object
  //   };

  //   setSelectedUser(selected);

  //   // Fetch append data using the slide and block from the selected user
  //   if (selected.slide && selected.block) {
  //     try {
  //       const response = await axios.get(
  //         `/api/getAppendData?slide=${selected.slide}&block=${selected.block}`
  //       );

  //       if (response.data.length > 0) {
  //         // Set append data or process as needed
  //         console.log("Append Data:", response.data);
  //       } else {
  //         console.log("No matching append data found");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching append data:", error);
  //     }
  //   }

  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("selectedUser", JSON.stringify(selected));
  //   }

  //   setSearchResults([]);
  //   setSearchTerm("");
  // };

  useEffect(() => {
    if (selectedUser) {
      const fetchAppendData = async () => {
        try {
          const { slide, block } = selectedUser;

          if (slide && block) {
            const response = await axios.get(
              `/api/getAppendData?slide=${slide}&block=${block}`
            );

            if (response.data.length === 0) {
              setPatientData([]);
              setDiseases([]);
            } else {
              setPatientData(response.data);

              // Map names to their types and filter for unique types
              const diseaseTypes = [
                ...new Set(
                  response.data
                    .map(
                      (item) =>
                        diseaseMapping.find((map) => map.name === item.Name)
                          ?.type
                    )
                    .filter(Boolean) // Remove undefined values
                ),
              ];

              setDiseases(
                diseaseTypes.map((type) => ({
                  type,
                  data: patientData.filter((item) =>
                    diseaseMapping.some(
                      (map) => map.name === item.Name && map.type === type
                    )
                  ),
                }))
              );
            }
          } else {
            console.error("Slide and Block are required to fetch Append data.");
          }
        } catch (error) {
          console.error("Error fetching append data:", error);
        }
      };

      fetchAppendData();
    }
  }, [selectedUser]);

  const handleUserClick = (user) => {
    const selected = {
      name: `${user.patientName}`,
      userId: user.patientId,
      slide: user.sampleInfo?.slide,
      block: user.sampleInfo?.block,
    };

    setSelectedUser(selected);

    if (typeof window !== "undefined") {
      localStorage.setItem("selectedUser", JSON.stringify(selected));
    }
  };

  // const handleDiseaseChange = (disease) => {
  //   const isAlreadySelected = selectedDiseases.some(
  //     (item) => item.name === disease.name
  //   );
  //   if (isAlreadySelected) {
  //     setSelectedDiseases((prev) =>
  //       prev.filter((item) => item.name !== disease.name)
  //     );
  //   } else {
  //     setSelectedDiseases((prev) => [...prev, disease]);
  //   }
  // };

  // Function to get unique names for a specific type
  const getUniqueNamesByType = (type) => {
    // Filter the array to include only items with the given type
    const filtered = diseaseMapping.filter((disease) => disease.type === type);

    // Use a Set to store unique names
    const uniqueNames = new Set(filtered.map((disease) => disease.name));

    // Convert the Set back to an array
    return Array.from(uniqueNames);
  };

  // Example: Get unique names for "control"

  const handleDiseaseChange = (disease) => {
    console.log(selectedDiseases.length);
    console.log(disease.data);

    // Get unique names by disease type
    const uniqueNames = getUniqueNamesByType(disease.type);
    console.log("Unique Names:", uniqueNames);

    // Local variable to store API data
    let apiData = [];

    // Trigger the API call and handle the response later
    axios
      .post("/api/getDataByNames", { uniqueNames })
      .then((response) => {
        apiData = response.data.data; // Store the API data in the local variable
        console.log("Filtered Data:", apiData);

        // Prepare data for the graph
        const graphData = uniqueNames.reduce((acc, name) => {
          // Filter apiData by the current name
          const filteredData = apiData.filter((item) => item.Name === name);

          // Group levels and their counts
          const levelData = filteredData.reduce((levelAcc, item) => {
            const level = item.Value; // Assuming "Value" represents the level
            if (levelAcc[level]) {
              levelAcc[level].patients += 1; // Increment patient count
            } else {
              levelAcc[level] = { level: parseInt(level, 10), patients: 1 };
            }
            return levelAcc;
          }, {});

          // Convert levelData object into an array
          const levelArray = Object.values(levelData);

          // Add to the result map under the disease type
          acc[name] = levelArray;

          return acc;
        }, {});

        console.log("Graph Data:", { [disease.type]: graphData });
        console.log("Graph Data:", graphData);

        // Update selected reports with graphData
        const diseaseName = disease.type;
        setSelectedReports((prev) => {
          const exists = prev.some((report) => report.name === diseaseName);

          if (exists) {
            // Remove the disease if already selected
            return prev.filter((report) => report.name !== diseaseName);
          } else {
            // Add the disease and its data
            return [
              ...prev,
              { name: diseaseName, data: graphData, uniqueNames },
            ];
          }
        });
      })
      .catch((error) => {
        console.error(
          "Error fetching data:",
          error.response?.data || error.message
        );
      });
  };

  const handleReportChange = (reportDate) => {
    setSelectedReports((prev) =>
      prev.includes(reportDate)
        ? prev.filter((item) => item !== reportDate)
        : [...prev, reportDate]
    );
  };

  useEffect(() => {
    const updatedGraphData = diseases
      .filter((disease) =>
        selectedDiseases.some((d) => d.name === disease.name)
      )
      .map((disease) => ({
        label: disease.name,
        data: disease.data.map((item) => item.patients),
        borderColor: `hsl(${disease.name.length * 50}, 70%, 50%)`,
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      }));

    setGraphData(updatedGraphData);
  }, [selectedDiseases, diseases]);

  const handleDownloadPDF = (reportDate, diseaseName) => {
    const input = document.getElementById(`graph-container-${reportDate}`);

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape");

      pdf.setFontSize(18);
      pdf.setTextColor(33, 150, 243);
      pdf.text("Patient Immunity Report", 105, 20, { align: "center" });

      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Patient ID: ${selectedUser.userId}`, 20, 40);
      pdf.text(`Patient Name: ${selectedUser.name}`, 20, 50);

      pdf.text(`Selected Diseases: ${diseaseName}`, 20, 60);
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(reportDate));

      pdf.text(`Date: ${formattedDate}`, 20, 70);

      pdf.setDrawColor(33, 150, 243);
      pdf.setLineWidth(0.5);
      pdf.line(20, 80, 280, 80);

      const imgWidth = 160;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 20, 90, imgWidth, imgHeight);

      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text("Generated by ImmunoMap", 105, 200, { align: "center" });

      pdf.save(`${selectedUser.name}_${diseaseName}_report.pdf`);
    });
  };

  const toggleReportGraph = (reportDate) => {
    setExpandedReports((prev) => ({
      ...prev,
      [reportDate]: !prev[reportDate],
    }));
  };

  const getAnnotationForReport = (reportDate) => {
    const report = patientData.find((r) => r.reportDate === reportDate);
    if (!report) return [];

    const immunityLevel = Number(report.immunityLevel);
    if (isNaN(immunityLevel)) return [];

    const diseaseData = globalData[report.diseaseName];
    if (!diseaseData) return [];

    const exactMatchIndex = diseaseData.findIndex(
      (item) => item.level === immunityLevel
    );

    if (exactMatchIndex !== -1) {
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

    if (closestLowerValue === -Infinity || closestHigherValue === Infinity)
      return [];

    const lowerIndex = diseaseData.findIndex(
      (item) => item.level === closestLowerValue
    );
    const higherIndex = diseaseData.findIndex(
      (item) => item.level === closestHigherValue
    );

    if (lowerIndex === -1 || higherIndex === -1) return [];

    const difference = closestHigherValue - closestLowerValue;
    if (difference === 0) return [];

    const annotationPosition =
      lowerIndex + (immunityLevel - closestLowerValue) / difference;

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

  const getChartDataForReport = (data,uniqueNames) => {
    console.log("Data 1:", data);
    console.log("Unique Names 1:", uniqueNames);
    if (!uniqueNames || uniqueNames.length === 0) {
      return { labels: [], datasets: [] };
    }

    // Extract the levels (x-axis labels) from the first disease's data
    const labels = data[uniqueNames[0]]?.map((item) => item.level) || [];

    // Build datasets for each disease
    const datasets = uniqueNames
      .map((diseaseName, index) => {
        const diseaseData = data[diseaseName];
        if (!diseaseData) return null; // Skip if no data for the disease

        return {
          label: diseaseName,
          data: diseaseData.map((item) => item.patients),
          borderColor: `hsl(${index * 50}, 70%, 50%)`, // Unique color for each dataset
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        };
      })
      .filter((dataset) => dataset !== null); // Remove null entries

    return { labels, datasets };
  };

  const getChartOptionsForReport = (data, uniqueNames) => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: { color: "white" },
        },
        // annotation: {
        //   annotations: selectedReports.includes(reportDate)
        //     ? getAnnotationForReport(reportDate)
        //     : [],
        // },
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

  const handleRefresh = () => {
    localStorage.removeItem("selectedUser");
    window.location.reload();
  };

  const filteredReports = patientData.filter((report) =>
    selectedDiseases.some((disease) => disease.name === report.diseaseName)
  );

  return (
    <div className={styles.container} id="patient-data-selector">
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
                    {user.patientName}
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
                  <span className={styles.checkboxText}>{disease.type}</span>
                </div>
              ))}
            </div>
          </div>
          {/* <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Patient Report Selection</h3>
            {patientData.length === 0 ? (
              <p className={styles.noReport}>No Report Found</p>
            ) : (
              <div className={styles.checkboxGroup}>
                {filteredReports.map((report, idx) => {
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
          </div> */}
        </div>

        <div className={styles.patientData}>
          <h3 className={styles.sectionTitle}>Patient Data</h3>
          <div className={styles.list}>
            {selectedReports.map((report, idx) => {
              const { name, data, uniqueNames } = report;

              return (
                <div key={idx} className={styles.item}>
                  <div className={styles.reportHeader}>
                    <span>
                      <span
                        className={styles.dropdownIcon}
                        onClick={() => toggleReportGraph(name)}
                      >
                        <FontAwesomeIcon
                          icon={
                            expandedReports[name] ? faChevronUp : faChevronDown
                          }
                        />
                      </span>
                      <span>{name}</span>
                    </span>
                    <button
                      className={styles.button}
                      onClick={() => handleDownloadPDF(reportDate, name)}
                    >
                      Download PDF
                    </button>
                  </div>
                  {expandedReports[name] && (
                    <div
                      className={styles.graph}
                      id={`graph-container-${name}`}
                      style={{ height: "300px", width: "100%" }} // Increase chart size
                    >
                      <Line
                        data={getChartDataForReport(data, uniqueNames)}
                        options={getChartOptionsForReport(data, uniqueNames)}
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
