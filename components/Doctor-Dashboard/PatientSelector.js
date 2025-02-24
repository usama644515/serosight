import React, { useState, useEffect } from "react";
import styles from "./PatientSelector.module.css";
import axios from "axios";
import { useSampleInfo } from "./ContextProvider";
import { CircularProgress } from "@mui/material"; // Using Material-UI for the loader
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
    // { name: "Fiducial", type: "control" },
    // { name: "10x_Spotting_Buffer", type: "control" },
    // { name: "Human_IgM_Isotype_Control_0.1", type: "control" },
    // { name: "Human_IgG_Isotype_Control_0.1", type: "control" },
    // { name: "PBS", type: "control" },
    // { name: "EMPTY", type: "control" },
    // { name: "Fiducial", type: "control" },
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
    // { name: "Human_IgM_Isotype_Control_0.3", type: "control" },
    { name: "Flu.H1N2.A/Victoria/HA", type: "flu" },
    { name: "Flu.H3N2.A/Mass/HA", type: "flu" },
    // { name: "Human_IgG_Isotype_Control_0.3", type: "control" },
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
    // { name: "a-Hu_IgG_0.3", type: "control" },
    { name: "HAV_1392-1521", type: "hepatitis A" },
    { name: "HBVc", type: "hepatitis B" },
    // { name: "a-Hu_IgM_0.3", type: "control" },
    { name: "HBVe", type: "hepatitis B" },
    { name: "HBV_surfaceAg_ad", type: "hepatitis B" },
    // { name: "a-Hu_IgG_0.1", type: "control" },
    { name: "Native_Bordetella_pertussis_toxin/ptxD", type: "pertussis" },
    {
      name: "Recombinant_B._pertussis_pertactin_autotransporter_protein",
      type: "pertussis",
    },
    // { name: "a-Hu_IgM_0.1", type: "control" },
    { name: "Native_Bordetella_pertussis_filamentous", type: "pertussis" },
    { name: "Recombinant_B._pertussis_Fimbriae_2/3", type: "pertussis" },
    { name: "SARS.CoV2.S-ECD.trimer.JN.1", type: "covid" },
    { name: "FluB_Aus/HA1", type: "flu" },
    // { name: "Human_IgM_Isotype_Control_0.03", type: "control" },
    { name: "Flu.H3N2.A/Thai/HA", type: "flu" },
    // { name: "Human_IgG_Isotype_Control_0.03", type: "control" },
    { name: "Flu.H5N1.A/Vietnam/1194/2004/HA", type: "flu" },
    { name: "EBV-EBNA1", type: "epstein bar" },
    // { name: "Streptavidin_AF555", type: "die" },
    // { name: "Streptavidin_AF647", type: "die" },
    // { name: "Streptavidin_AF790", type: "die" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [expandedReports, setExpandedReports] = useState({});
  const [diseases, setDiseases] = useState([]);
  const [loadingDiseases, setLoadingDiseases] = useState(false);
  const { sampleInfoList } = useSampleInfo();

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
    console.log("provider sampleInfoList", sampleInfoList);
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
      date: user.sampleInfo?.date,
      // immunity: user.sampleInfo?.immunity,
    };

    setSelectedUser(selected);
    console.log(selectedUser);

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

  const handleDiseaseChange = (disease, isChecked) => {
    console.log(selectedDiseases.length);
    console.log(disease.data);

    if (isChecked) {
      console.log(`Checkbox for ${disease.type} checked`);

      const uniqueNames = getUniqueNamesByType(disease.type);
      console.log("Unique Names:", uniqueNames);

      // Set the loading state for the specific disease
      setLoadingDiseases(true);

      let apiData = [];

      axios
        .post("/api/getDataByNames", { uniqueNames })
        .then((response) => {
          apiData = response.data.data;
          console.log("API Data before filtering:", apiData);

          axios
            .get("/api/getAllPatients")
            .then((patientResponse) => {
              const allPatients = patientResponse.data.data;
              console.log("All Patients Data:", allPatients);

              apiData = apiData.filter((item) =>
                allPatients.some(
                  (patient) =>
                    String(patient.sampleInfo.block) === String(item.Block) &&
                    String(patient.sampleInfo.slide) === String(item.Slide)
                )
              );

              console.log("Filtered API Data based on allPatients:", apiData);

              // Check if sampleInfoList (dataset) exists and has data
              if (sampleInfoList && sampleInfoList.length > 0) {
                console.log("sampleInfoList:", sampleInfoList);

                apiData = apiData.filter((item) => {
                  return sampleInfoList.some(
                    (sample) =>
                      String(sample.block) === String(item.Block) &&
                      String(sample.slide) === String(item.Slide)
                  );
                });

                console.log(
                  "Filtered API Data based on sampleInfoList:",
                  apiData
                );
              }

              // Process apiData: filter out non-positive values, subtract background, and calculate averages per patient per Name
              let processedData = {};

              // Group apiData by patient block and slide
              allPatients.forEach((patient) => {
                const matchedData = apiData.filter(
                  (item) =>
                    String(item.Block) === String(patient.sampleInfo.block) &&
                    String(item.Slide) === String(patient.sampleInfo.slide)
                );

                if (matchedData.length > 0) {
                  if (!processedData[patient.patientId]) {
                    processedData[patient.patientId] = {};
                  }

                  matchedData.forEach((item) => {
                    const name = item.Name;
                    const value = parseFloat(item.Value);
                    const background = parseFloat(item.Background);

                    if (value > 0) {
                      const finalValue = value - background;

                      if (!processedData[patient.patientId][name]) {
                        processedData[patient.patientId][name] = {
                          total: 0,
                          count: 0,
                        };
                      }

                      processedData[patient.patientId][name].total +=
                        finalValue;
                      processedData[patient.patientId][name].count += 1;
                    }
                  });
                }
              });

              // Convert processedData to store averages per patient per Name
              let patientAverages = Object.keys(processedData).map(
                (patientId) => {
                  const nameAverages = Object.keys(
                    processedData[patientId]
                  ).map((name) => ({
                    Name: name,
                    AverageValue:
                      processedData[patientId][name].count > 0
                        ? processedData[patientId][name].total /
                          processedData[patientId][name].count
                        : 0,
                  }));

                  return {
                    PatientId: patientId,
                    Averages: nameAverages,
                  };
                }
              );

              console.log(
                "Processed API Data with Averages Per Patient and Name:",
                patientAverages
              );
              // Step 1: Extract unique names from processed patientAverages
              const uniqueNames = [
                ...new Set(
                  patientAverages.flatMap((p) => p.Averages.map((a) => a.Name))
                ),
              ];

              // Step 2: Process graphData based on patientAverages
              const graphData = uniqueNames.reduce((acc, name) => {
                // Filter out relevant data for this name
                const filteredData = patientAverages.flatMap((p) =>
                  p.Averages.filter((a) => a.Name === name).map(
                    (a) => a.AverageValue
                  )
                );

                // Step 3: Group by immunity level
                const levelData = filteredData.reduce((levelAcc, avgValue) => {
                  const level = Math.round(avgValue / 10) * 10; // Round to nearest 10
                  if (levelAcc[level]) {
                    levelAcc[level].patients += 1;
                  } else {
                    levelAcc[level] = {
                      level: level,
                      patients: 1,
                    };
                  }
                  return levelAcc;
                }, {});

                // Step 4: Store the processed data
                acc[name] = Object.values(levelData);
                return acc;
              }, {});

              // Output graphData
              console.log("Formatted Immunity Data for Graph:", graphData);

              // console.log("Graph Data:", { [disease.type]: graphData });

              const diseaseName = disease.type;
              setSelectedReports((prev) => [
                ...prev,
                { name: diseaseName, data: graphData, uniqueNames },
              ]);

              // Remove loading state after data is fetched
              setLoadingDiseases(false);
            })
            .catch((error) => {
              console.error("Error fetching all patients:", error);
              setLoadingDiseases(false);
            });
        })
        .catch((error) => {
          console.error(
            "Error fetching data:",
            error.response?.data || error.message
          );
          setLoadingDiseases(false);
        });
    } else {
      console.log(`Checkbox for ${disease.type} unchecked`);
      setSelectedReports((prev) =>
        prev.filter((report) => report.name !== disease.type)
      );
      setLoadingDiseases(false);
    }
  };

  const handleReportChange = (reportDate) => {
    setSelectedReport((prev) =>
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

  const toggleReportGraph = (reportDate) => {
    setExpandedReports((prev) => ({
      ...prev,
      [reportDate]: !prev[reportDate],
    }));
  };

  const getChartDataForReport = (data, uniqueNames) => {
    if (!uniqueNames || uniqueNames.length === 0) {
      return { labels: [], datasets: [] };
    }

    const rangeStep = 1400;
    const maxLevel = Math.max(
      ...data[uniqueNames[0]].map((item) => item.level)
    );
    const labels = [];
    for (let i = 0; i <= maxLevel; i += rangeStep) {
      labels.push(`[${i}, ${i + rangeStep}]`);
    }

    const datasets = uniqueNames
      .map((diseaseName, index) => {
        const diseaseData = data[diseaseName];
        if (!diseaseData) return null;

        const rangeData = labels.map((label) => {
          const [start, end] = label
            .replace("[", "")
            .replace("]", "")
            .split(", ")
            .map(Number);

          return diseaseData
            .filter((item) => item.level >= start && item.level < end)
            .reduce((sum, item) => sum + item.patients, 0);
        });

        return {
          label: diseaseName,
          data: rangeData,
          borderColor: `hsl(${index * 50}, 70%, 50%)`,
          borderWidth: 2,
          tension: 0.4,
          fill: false,
        };
      })
      .filter((dataset) => dataset !== null);

    return { labels, datasets };
  };

  //   const getAnnotationForReport = (uniqueNames, patientData) => {
  //     console.error("function is running..............");

  //     // Validate inputs
  //     if (!Array.isArray(uniqueNames) || uniqueNames.length === 0) {
  //       console.error("Unique names are missing or not an array");
  //       return [];
  //     }
  //     if (!Array.isArray(patientData) || patientData.length === 0) {
  //       console.error("Patient data is missing or not an array");
  //       return [];
  //     }

  //     const rangeStep = 1400; // Step size for grouping immunity levels

  //     // Map uniqueNames to their corresponding average immunity range
  //     const nameValues = uniqueNames
  //       .map((name) => {
  //         // Filter patientData for the current name
  //         const matchingData = patientData.filter((item) => item.Name === name);
  //         console.log(`Matching Data for ${name}:`, matchingData);

  //         if (matchingData.length === 0) {
  //           console.warn(`No matching data found for name: ${name}`);
  //           return null;
  //         }

  //         // Extract and log immunity levels
  //         const immunityLevels = matchingData.map((item) =>
  //           Number(item.Value || 0)
  //         );
  //         console.log(`Immunity Levels for ${name}:`, immunityLevels);

  //         // Calculate the average immunity level
  //         const averageValue =
  //           immunityLevels.reduce((sum, value) => sum + value, 0) /
  //           matchingData.length;
  //         console.log(`Average Immunity for ${name}:`, averageValue);

  //         // Determine the range for this immunity level
  //         const rangeIndex = Math.floor(averageValue / rangeStep);
  //         const lowerBound = rangeIndex * rangeStep;
  //         const upperBound = (rangeIndex + 1) * rangeStep;
  //         const rangeMidpoint = (lowerBound + upperBound) / 2;

  //         return {
  //           name,
  //           avgValue: rangeMidpoint,
  //           labelRange: `[${lowerBound}, ${upperBound}]`,
  //         };
  //       })
  //       .filter((item) => item !== null);
  // console.log('final',nameValues);
  //     // Generate annotation lines based on the calculated ranges
  //     return nameValues.map(({ name, avgValue, labelRange }, index) => ({

  //       type: "line",
  //       mode: "vertical",
  //       scaleID: "x",
  //       value: avgValue,
  //       borderColor: `hsl(${index * 50}, 70%, 50%)`, // Dynamic color for differentiation
  //       borderWidth: 2,
  //       label: {
  //         content: `${name}: ${labelRange}`,
  //         enabled: true,
  //         position: "top",
  //         backgroundColor: "black",
  //         color: "white",
  //       },
  //     }));
  //   };

  //   // Example usage in getChartOptionsForReport
  //   const getChartOptionsForReport = (data, uniqueNames,patientData) => {

  //     return {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       plugins: {
  //         legend: {
  //           display: true,
  //           labels: { color: "white" },
  //         },
  //         annotation: {
  //           // annotations,
  //           annotations: selectedReport.includes(selectedUser.date)
  //             ? getAnnotationForReport(uniqueNames, patientData)
  //             : [],
  //         },
  //       },
  //       scales: {
  //         x: {
  //           title: {
  //             display: true,
  //             text: "Immunity Level",
  //             color: "white",
  //           },
  //           grid: { display: false },
  //           ticks: { color: "white" },
  //         },
  //         y: {
  //           title: {
  //             display: true,
  //             text: "Number of Patients",
  //             color: "white",
  //           },
  //           grid: { color: "rgba(255, 255, 255, 0.1)" },
  //           ticks: { color: "white" },
  //         },
  //       },
  //     };
  //   };

  const getAnnotationForReport = (immunityLevels, uniqueNames, data) => {
    if (!Array.isArray(immunityLevels)) {
      immunityLevels = [immunityLevels];
    }

    return immunityLevels
      .map((immunity, index) => {
        const immunityLevel = Number(immunity);
        if (isNaN(immunityLevel)) {
          console.error("Immunity level is not a number:", immunity);
          return null;
        }

        const uniqueName = uniqueNames[index % uniqueNames.length];
        const diseaseData = data[uniqueName];
        if (!diseaseData) {
          console.error("No disease data found for unique name:", uniqueName);
          return null;
        }

        const rangeStep = 1400;
        const rangeIndex = Math.floor(immunityLevel / rangeStep);
        const labelRange = `[${rangeIndex * rangeStep}, ${
          (rangeIndex + 1) * rangeStep
        }]`;

        return {
          id: `${uniqueName}-annotation`,
          type: "line",
          mode: "vertical",
          scaleID: "x",
          value: labelRange,
          borderColor: `hsl(${index * 50}, 70%, 50%)`, // Same color as the curve line
          borderWidth: 2,
          label: {
            content: `Immunity: ${immunityLevel}`,
            enabled: true,
            position: "top",
            backgroundColor: `hsl(${index * 50}, 70%, 50%)`, // Matching background color
            color: "white",
          },
        };
      })
      .filter((annotation) => annotation !== null);
  };

  const getChartOptionsForReport = (data, uniqueNames, patientData) => {
    const immunityLevels = getimmunitylevel(uniqueNames, patientData);
    const annotations = selectedReport.includes(selectedUser.date)
      ? getAnnotationForReport(immunityLevels, uniqueNames, data)
      : [];

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: { color: "white" },
          onClick: (e, legendItem, legend) => {
            const chart = legend.chart;
            const datasetIndex = legendItem.datasetIndex;

            // Toggle dataset and annotation visibility together
            if (chart.isDatasetVisible(datasetIndex)) {
              chart.hide(datasetIndex);
              const datasetLabel = chart.data.datasets[datasetIndex].label;
              const annotationId = `${datasetLabel}-annotation`;
              if (chart.options.plugins.annotation.annotations[annotationId]) {
                chart.options.plugins.annotation.annotations[
                  annotationId
                ].display = false;
              }
            } else {
              chart.show(datasetIndex);
              const datasetLabel = chart.data.datasets[datasetIndex].label;
              const annotationId = `${datasetLabel}-annotation`;
              if (chart.options.plugins.annotation.annotations[annotationId]) {
                chart.options.plugins.annotation.annotations[
                  annotationId
                ].display = true;
              }
            }
            chart.update();
          },
        },
        annotation: {
          annotations: Object.fromEntries(
            annotations.map((annotation) => [
              annotation.id,
              { ...annotation, display: true },
            ])
          ),
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

  const getimmunitylevel = (uniqueNames, patientData) => {
    console.error("function is running..............");

    // Validate inputs
    if (!Array.isArray(uniqueNames) || uniqueNames.length === 0) {
      console.error("Unique names are missing or not an array");
      return [];
    }
    if (!Array.isArray(patientData) || patientData.length === 0) {
      console.error("Patient data is missing or not an array");
      return [];
    }

    const rangeStep = 1400; // Step size for grouping immunity levels

    // Map uniqueNames to their corresponding average immunity range
    const avgValues = uniqueNames
      .map((name) => {
        // Filter patientData for the current name
        const matchingData = patientData.filter((item) => item.Name === name);

        if (matchingData.length === 0) {
          console.warn(`No matching data found for name: ${name}`);
          return null;
        }

        // Extract immunity levels
        const immunityLevels = matchingData.map((item) =>
          Number(item.Value  || 0)
        );
console.log('selectedPatient',immunityLevels);
        // Calculate the average immunity level
        const averageValue =
          immunityLevels.reduce((sum, value) => sum + value, 0) /
          matchingData.length;

        // Determine the range midpoint for this immunity level
        const rangeIndex = Math.floor(averageValue / rangeStep);
        const lowerBound = rangeIndex * rangeStep;
        const upperBound = (rangeIndex + 1) * rangeStep;
        const rangeMidpoint = (lowerBound + upperBound) / 2;

        return rangeMidpoint;
      })
      .filter((value) => value !== null);

    console.log("Final avgValues:", avgValues);
    return avgValues; // Return only the array of avgValue values
  };

  // Example usage
  // const uniqueNames = ["LA2-94/2013", "TH-10526/2014"];
  // const data = {
  //   "LA2-94/2013": [
  //     { level: 1400, patients: 1500 },
  //     { level: 2800, patients: 1000 },
  //     // Add more data here
  //   ],
  //   "TH-10526/2014": [
  //     { level: 1400, patients: 1200 },
  //     { level: 2800, patients: 800 },
  //     // Add more data here
  //   ],
  // };

  // const chartData = getChartDataForReport(data, uniqueNames);
  // const chartOptions = getChartOptionsForReport(data, uniqueNames);

  // console.log("Chart Data:", chartData);
  // console.log("Chart Options:", chartOptions);

  const handleDownloadPDF = (reportDate, diseaseName) => {
    // Helper function to parse DD/MM/YYYY to YYYY-MM-DD
    const parseReportDate = (reportDate) => {
      const [day, month, year] = reportDate.split("/");
      return `${year}-${month}-${day}`; // Convert to YYYY-MM-DD
    };

    try {
      // Reformat the date for the element ID
      const sanitizedDate = reportDate.replace(/\//g, "-");
      const input = document.getElementById(`graph-container-${diseaseName}`);

      // Check if the element exists
      if (!input) {
        console.error(
          `Element with ID graph-container-${diseaseName} not found.`
        );
        return;
      }

      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape");

        // Add title and header details
        pdf.setFontSize(18);
        pdf.setTextColor(33, 150, 243);
        pdf.text("Patient Immunity Report", 105, 20, { align: "center" });

        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        pdf.text(`Patient ID: ${selectedUser.userId}`, 20, 40);
        pdf.text(`Patient Name: ${selectedUser.name}`, 20, 50);
        pdf.text(`Selected Diseases: ${diseaseName}`, 20, 60);

        // Convert and format the date
        const formattedDate = new Intl.DateTimeFormat("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date(parseReportDate(reportDate)));

        pdf.text(`Date: ${formattedDate}`, 20, 70);

        // Add separator line
        pdf.setDrawColor(33, 150, 243);
        pdf.setLineWidth(0.5);
        pdf.line(20, 80, 280, 80);

        // Add the chart as an image
        const imgWidth = 160;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 20, 90, imgWidth, imgHeight);

        // Add footer text
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100);
        pdf.text("Generated by ImmunoMap", 105, 200, { align: "center" });

        // Save the PDF
        pdf.save(`${selectedUser.name}_${diseaseName}_report.pdf`);
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
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
                    onChange={(e) =>
                      handleDiseaseChange(disease, e.target.checked)
                    }
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
                        {selectedUser.date}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div> */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Patient Report Selection</h3>
            {patientData.length === 0 ? (
              <p className={styles.noReport}>No Report Found</p>
            ) : (
              <div className={styles.checkboxContainer2}>
                <input
                  type="checkbox"
                  id={`report`}
                  className={styles.checkboxInput}
                  onChange={() => handleReportChange(selectedUser.date)}
                />
                <label
                  htmlFor={`report`}
                  className={styles.checkboxLabel}
                ></label>
                <span className={styles.checkboxText2}>
                  {selectedUser.date}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.patientData}>
          <h3 className={styles.sectionTitle}>Patient Data</h3>
          <div className={styles.list}>
            {selectedReports.map((report, idx) => {
              const { name, data, uniqueNames } = report;

              return (
                <div key={idx} className={styles.item}>
                  <>
                    <div className={styles.reportHeader}>
                      <span>
                        <span
                          className={styles.dropdownIcon}
                          onClick={() => toggleReportGraph(name)}
                        >
                          <FontAwesomeIcon
                            icon={
                              expandedReports[name]
                                ? faChevronUp
                                : faChevronDown
                            }
                          />
                        </span>
                        <span>{name}</span>
                      </span>
                      <button
                        className={styles.button}
                        onClick={() =>
                          handleDownloadPDF(selectedUser.date, name)
                        }
                      >
                        Download PDF
                      </button>
                    </div>
                    {expandedReports[name] && (
                      <div
                        className={styles.graph}
                        id={`graph-container-${name}`}
                        style={{ height: "300px", width: "100%" }}
                      >
                        <Line
                          data={getChartDataForReport(data, uniqueNames)}
                          options={getChartOptionsForReport(
                            data,
                            uniqueNames,
                            patientData
                          )}
                        />
                      </div>
                    )}
                  </>
                </div>
              );
            })}
          </div>
          {loadingDiseases ? (
            <div className={styles.loader}>
              <CircularProgress />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* Refresh Button */}
      <button className={styles.refreshButton} onClick={handleRefresh}>
        <FontAwesomeIcon icon={faSync} className={styles.largeIcon} />
      </button>
    </div>
  );
}
