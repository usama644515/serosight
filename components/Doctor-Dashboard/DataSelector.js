import React, { useState, useEffect } from "react";
import styles from "./DataSelector.module.css";
import axios from "axios";
import { useSampleInfo } from "./ContextProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DataSelector = () => {
  const [selected, setSelected] = useState({
    medications: [],
    vaccine: [],
    actualInfection: [],
    disease: [],
    smoking: [],
    exposure: ["200", "500"], // Default all selected in exposure
  });
  const { setSampleInfoList, setExposureList, setDatasetNames, setDatasetPatientMap } = useSampleInfo();
  const [savedDataSets, setSavedDataSets] = useState([]);
  const [renamingId, setRenamingId] = useState(null);
  const [renamingName, setRenamingName] = useState("");
  const [selectedDataSetIds, setSelectedDataSetIds] = useState([]);
  const [patientDataMap, setPatientDataMap] = useState({});

  useEffect(() => {
    // Fetch saved datasets from the database
    axios
      .get("/api/datasets")
      .then((response) => {
        setSavedDataSets(response.data);
      })
      .catch((error) => console.error("Error fetching datasets:", error));
  }, []);

  const handleSelect = (category, value, allValues) => {
    setSelected((prev) => {
      let newSelection;
      if (value === "All") {
        // If "All" is selected, toggle between selecting all values and none
        newSelection =
          prev[category].length === allValues.length ? [] : [...allValues];
      } else {
        newSelection = [...prev[category]];
        const index = newSelection.indexOf(value);
        if (index > -1) {
          newSelection.splice(index, 1); // Deselect the value
        } else {
          newSelection.push(value); // Select the value
        }
      }
      return { ...prev, [category]: newSelection };
    });
  };

  const isSelected = (category, value) => {
    if (selected[category] === "None") {
      return value === "None";
    }
    return selected[category].includes(value);
  };

  const saveDataSet = () => {
    // Check if any filter is selected
    const isAnyFilterSelected = Object.values(selected).some(
      (selection) =>
        (Array.isArray(selection) && selection.length > 0) ||
        selection === "None"
    );

    if (!isAnyFilterSelected) {
      toast.error("Please select at least one filter before saving.");
      return;
    }

    // Ensure exposure is not empty
    if (selected.exposure.length === 0) {
      toast.error("At least one exposure option must be selected.");
      return;
    }

    const newDataSet = {
      name: "New Data Set",
      criteria: { ...selected },
    };

    console.log("New Data Set to save:", newDataSet);

    axios
      .post("/api/datasets", newDataSet)
      .then((response) => {
        setSavedDataSets((prev) => [...prev, response.data]);
        toast.success("Data set saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving dataset:", error);
        toast.error("There was an error saving the dataset.");
      });
  };

  const renameDataSet = (id, newName) => {
    axios
      .put(`/api/datasets/${id}`, { name: newName })
      .then(() => {
        setSavedDataSets((prev) =>
          prev.map((dataSet) =>
            dataSet._id === id ? { ...dataSet, name: newName } : dataSet
          )
        );
        setRenamingId(null);
        toast.success("Data set renamed successfully!");
      })
      .catch((error) => {
        console.error("Error renaming dataset:", error);
        toast.error("There was an error renaming the dataset.");
      });
  };

  const deleteDataSet = (id) => {
    if (window.confirm("Are you sure you want to delete this dataset?")) {
      axios
        .delete(`/api/datasets/${id}`)
        .then(() => {
          setSavedDataSets((prev) =>
            prev.filter((dataSet) => dataSet._id !== id)
          );
          toast.success("Data set deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting dataset:", error);
          toast.error("There was an error deleting the dataset.");
        });
    }
  };

  const handleDataSetSelection = (id, name) => {
    console.log("Selected Dataset ID:", id);
    console.log("Selected Dataset Name:", name);
  
    setSelectedDataSetIds((prev) => {
      const updatedIds = prev.includes(id)
        ? prev.filter((datasetId) => datasetId !== id)
        : [...prev, id];
      console.log("Updated Selected Dataset IDs:", updatedIds);
      return updatedIds;
    });
  
    if (!patientDataMap[id]) {
      console.log("Fetching patient data for dataset ID:", id);
      const selectedDataSet = savedDataSets.find((dataSet) => dataSet._id === id);
  
      if (selectedDataSet) {
        console.log("Selected Dataset Criteria:", selectedDataSet.criteria);
        fetch("/api/patient-matching", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ criteria: selectedDataSet.criteria }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Matched patients for dataset:", id, name, data);
            // store value in the state variable local
            setPatientDataMap((prev) => {
              const updatedPatientDataMap = { ...prev, [name]: data };
              console.log("Updated Patient Data Map:", updatedPatientDataMap);
              return updatedPatientDataMap;
            });
            // Store the patient data for this dataset in the provider
            setDatasetPatientMap((prev) => {
              const updatedDatasetPatientMap = { ...prev, [name]: data };
              console.log("Updated Dataset Patient Map in Provider:", updatedDatasetPatientMap);
              return updatedDatasetPatientMap;
            });
          })
          .catch((error) => {
            console.error("Error fetching patient data:", error);
          });
      } else {
        console.log("Dataset not found in savedDataSets:", id);
      }
    } else {
      console.log("Patient data already fetched for dataset ID:", id);
    }
  
    // Handle exposure values and dataset names
    const selectedDataSet = savedDataSets.find((dataSet) => dataSet._id === id);
    if (selectedDataSet) {
      const newExposure = selectedDataSet.criteria.exposure;
      const datasetName = selectedDataSet.name;
      console.log("Selected Dataset Exposure:", newExposure);
      console.log("Selected Dataset Name:", datasetName);
    
      setExposureList((prevMap) => {
        const newMap = new Map(prevMap);
    
        if (selectedDataSetIds.includes(id)) {
          console.log("Dataset is being unchecked. Removing dataset and exposure.");
          newMap.delete(datasetName);
        } else {
          console.log("Dataset is being checked. Adding dataset and exposure.");
          newMap.set(datasetName, newExposure);
        }
    
        console.log("Updated Exposure Map:", Object.fromEntries(newMap));
        return newMap;
      });
    
      setDatasetNames((prev) => {
        if (selectedDataSetIds.includes(id)) {
          const updatedDatasetNames = prev.filter((name) => name !== datasetName);
          console.log("Updated Dataset Names after removal:", updatedDatasetNames);
          return updatedDatasetNames;
        } else {
          if (!prev.includes(datasetName)) {
            const updatedDatasetNames = [...prev, datasetName];
            console.log("Updated Dataset Names after addition:", updatedDatasetNames);
            return updatedDatasetNames;
          }
          console.log("Dataset name already exists:", datasetName);
          return prev;
        }
      });
    } else {
      console.log("Dataset not found in savedDataSets for exposure/dataset name handling:", id);
    }
   
  };

  const compareAndMergePatientData = () => {
    const allPatients = selectedDataSetIds.flatMap(
      (id) => patientDataMap[id] || []
    );
    const uniquePatients = Array.from(
      new Set(allPatients.map(JSON.stringify))
    ).map(JSON.parse);
    console.log("Merged and unique patients:", uniquePatients);
    setSampleInfoList(uniquePatients);
  };

  useEffect(() => {
    if (selectedDataSetIds.length > 0) {
      compareAndMergePatientData();
    } else {
      setSampleInfoList([]);
    }
  }, [selectedDataSetIds, patientDataMap]);

  // Define all values for each category
  const medicationsOptions = [
    "None",
    "Plaquanil",
    "Methotrexate",
    "Otezla",
    "Arava",
    "tnf_alpha",
    "jak_kinase_inh",
    "il_23_inh",
    "il_6_inh",
    "il_17_inh",
    "orencia",
    "Imuran",
    "cellcept",
    "cytoxan",
    "prednisone",
    "benlysta",
    "rituxan",
  ];
  const vaccineOptions = [
    "None",
    "covid19",
    "pertussis",
    "rsv",
    "varicella",
    "measles",
    "mumps",
    "rubella",
    "hepA",
    "hepB",
    "influenza",
  ];
  const actualInfectionOptions = [
    "None",
    "covid19",
    "influenza",
    "rsv",
    "varicella",
    "measles",
    "mumps",
    "rubella",
    "hepA",
    "hepB",
    "mononucleosis",
    "h1n5Avian",
    "westNileVirus",
    "diabetes",
  ];
  const diseaseOptions = [
    "None",
    "rheumatoidArthritis",
    "psoriaticArthritis",
    "ankylosingSpondylitis",
    "lupus",
    "vasculitis",
    "sjogrens",
    "gout",
    "cadHeartDisease",
    "cancer",
  ];
  const smokingOptions = ["Yes", "No"];
  const exposureOptions = ["200", "500"];

  return (
    <div id="comparison-data-selector">
      <h1 className={styles.title}>Create comparison data.</h1>
      <p className={styles.subtitle}>Select Data Sets</p>
      <div className={styles.container}>
        {/* Medications Data */}
        <div className={styles.filterGroup}>
          <p className={styles.filterLabel}>Medications</p>
          <div className={styles.filterOptions}>
            <button
              key="medications-all"
              className={`${styles.filterButton} ${
                selected.medications.length === medicationsOptions.length
                  ? styles.active
                  : ""
              }`}
              onClick={() =>
                handleSelect("medications", "All", medicationsOptions)
              }
            >
              All
            </button>
            {medicationsOptions.map((item) => (
              <button
                key={item}
                className={`${styles.filterButton} ${
                  isSelected("medications", item) ? styles.active : ""
                }`}
                onClick={() =>
                  handleSelect("medications", item, medicationsOptions)
                }
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <hr />
        <br />
        {/* Vaccine Status */}
        <div className={styles.filterGroup}>
          <p className={styles.filterLabel}>Vaccine Status</p>
          <div>
            <div className={styles.filterOptions}>
              <button
                key="vaccine-all"
                className={`${styles.filterButton} ${
                  selected.vaccine.length === vaccineOptions.length
                    ? styles.active
                    : ""
                }`}
                onClick={() => handleSelect("vaccine", "All", vaccineOptions)}
              >
                All
              </button>
              {vaccineOptions.map((item) => (
                <button
                  key={`yes-${item}`}
                  className={`${styles.filterButton} ${
                    isSelected("vaccine", item) ? styles.active : ""
                  }`}
                  onClick={() => handleSelect("vaccine", item, vaccineOptions)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <br />
        {/* Actual infection*/}
        <div className={styles.filterGroup}>
          <p className={styles.filterLabel}>Actual Infection</p>
          <div>
            <div className={styles.filterOptions}>
              <button
                key="actualInfection-all"
                className={`${styles.filterButton} ${
                  selected.actualInfection.length ===
                  actualInfectionOptions.length
                    ? styles.active
                    : ""
                }`}
                onClick={() =>
                  handleSelect("actualInfection", "All", actualInfectionOptions)
                }
              >
                All
              </button>
              {actualInfectionOptions.map((item) => (
                <button
                  key={`yes-${item}`}
                  className={`${styles.filterButton} ${
                    isSelected("actualInfection", item) ? styles.active : ""
                  }`}
                  onClick={() =>
                    handleSelect(
                      "actualInfection",
                      item,
                      actualInfectionOptions
                    )
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <br />
        {/*Disease status*/}
        <div className={styles.filterGroup}>
          <p className={styles.filterLabel}>Disease Status</p>
          <div>
            <div className={styles.filterOptions}>
              <button
                key="disease-all"
                className={`${styles.filterButton} ${
                  selected.disease.length === diseaseOptions.length
                    ? styles.active
                    : ""
                }`}
                onClick={() => handleSelect("disease", "All", diseaseOptions)}
              >
                All
              </button>
              {diseaseOptions.map((item) => (
                <button
                  key={`yes-${item}`}
                  className={`${styles.filterButton} ${
                    isSelected("disease", item) ? styles.active : ""
                  }`}
                  onClick={() => handleSelect("disease", item, diseaseOptions)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <br />
        {/* Smoking Status */}
        <div className={styles.filterGroup}>
          <p className={styles.filterLabel}>Smoking Status</p>
          <div className={styles.filterOptions}>
            <button
              key="smoking-all"
              className={`${styles.filterButton} ${
                selected.smoking.length === smokingOptions.length
                  ? styles.active
                  : ""
              }`}
              onClick={() => handleSelect("smoking", "All", smokingOptions)}
            >
              All
            </button>
            {smokingOptions.map((item) => (
              <button
                key={item}
                className={`${styles.filterButton} ${
                  isSelected("smoking", item) ? styles.active : ""
                }`}
                onClick={() => handleSelect("smoking", item, smokingOptions)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        {/* Exposure */}
        <div className={styles.filterGroup}>
          <p className={styles.filterLabel}>Exposure</p>
          <div className={styles.filterOptions}>
            <button
              key="exposure-all"
              className={`${styles.filterButton} ${
                selected.exposure.length === exposureOptions.length
                  ? styles.active
                  : ""
              }`}
              onClick={() => handleSelect("exposure", "All", exposureOptions)}
            >
              All
            </button>
            {exposureOptions.map((item) => (
              <button
                key={item}
                className={`${styles.filterButton} ${
                  isSelected("exposure", item) ? styles.active : ""
                }`}
                onClick={() => handleSelect("exposure", item, exposureOptions)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Save Data Set */}
        <div className={styles.saveSection}>
          <button className={styles.saveButton} onClick={saveDataSet}>
            Save Data Set
          </button>
        </div>

        {/* Saved Data Sets */}
        <div className={styles.savedSection}>
          <h3 className={styles.savedTitle}>Saved Data Sets</h3>
          {savedDataSets.map((dataSet) => (
            <div key={dataSet._id} className={styles.savedItem}>
              <div>
                <input
                  type="checkbox"
                  id={`disease-${dataSet._id}-checkbox`}
                  className={styles.checkboxInput}
                  checked={selectedDataSetIds.includes(dataSet._id)}
                  onChange={() => handleDataSetSelection(dataSet._id,dataSet.name)}
                />
                <label
                  htmlFor={`disease-${dataSet._id}-checkbox`}
                  className={styles.checkboxLabel}
                ></label>
                {renamingId === dataSet._id ? (
                  <input
                    className={styles.dataSetNameInput}
                    value={renamingName}
                    onChange={(e) => setRenamingName(e.target.value)}
                    onBlur={() => renameDataSet(dataSet._id, renamingName)}
                  />
                ) : (
                  <h2
                    onDoubleClick={() => {
                      setRenamingId(dataSet._id);
                      setRenamingName(dataSet.name);
                    }}
                  >
                    {dataSet.name}
                  </h2>
                )}
                <p>Saved Active Data</p>
              </div>
              <button
                className={styles.deleteButton}
                onClick={() => deleteDataSet(dataSet._id)}
              >
                delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataSelector;