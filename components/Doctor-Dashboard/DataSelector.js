import React, { useState, useEffect } from "react";
import styles from "./DataSelector.module.css";
import axios from "axios";
import { useSampleInfo } from "./ContextProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DataSelector = () => {
  const [selected, setSelected] = useState({
    // immunity: "All",
    medications: [],
    vaccine: [],
    smoking: "All",
    exposure: [],
  });
  const { setSampleInfoList } = useSampleInfo();
  const [savedDataSets, setSavedDataSets] = useState([]);
  const [renamingId, setRenamingId] = useState(null);
  const [renamingName, setRenamingName] = useState("");
  const [selectedDataSetId, setSelectedDataSetId] = useState(null);

  useEffect(() => {
    // Fetch saved datasets from the database
    axios
      .get("/api/datasets")
      .then((response) => {
        setSavedDataSets(response.data);
      })
      .catch((error) => console.error("Error fetching datasets:", error));
  }, []);

  const handleSelect = (category, value) => {
    setSelected((prev) => {
      if (value === "All") {
        return { ...prev, [category]: value };
      } else {
        const newSelection =
          prev[category] === "All" ? [] : [...prev[category]];
        const index = newSelection.indexOf(value);
        if (index > -1) {
          newSelection.splice(index, 1);
        } else {
          newSelection.push(value);
        }
        return {
          ...prev,
          [category]: newSelection.length > 0 ? newSelection : "All",
        };
      }
    });
  };

  const isSelected = (category, value) =>
    selected[category] === "All" ||
    (Array.isArray(selected[category]) && selected[category].includes(value));

  const saveDataSet = () => {
    const newDataSet = {
      name: "New Data Set",
      criteria: { ...selected },
    };

    // Log the dataset before sending to ensure the criteria is an object
    console.log("New Data Set to save:", newDataSet);

    // Save dataset to the database
    axios
      .post("/api/datasets", newDataSet)
      .then((response) => {
        setSavedDataSets((prev) => [...prev, response.data]);
      })
      .catch((error) => {
        console.error("Error saving dataset:", error);
        alert("There was an error saving the dataset.");
      });
  };

  const renameDataSet = (id, newName) => {
    axios
      .put(`/api/datasets/${id}`, { name: newName }) // Only passing the name to update
      .then(() => {
        setSavedDataSets((prev) =>
          prev.map((dataSet) =>
            dataSet._id === id ? { ...dataSet, name: newName } : dataSet
          )
        );
        setRenamingId(null);
      })
      .catch((error) => console.error("Error renaming dataset:", error));
  };

  const deleteDataSet = (id) => {
    if (window.confirm("Are you sure you want to delete this dataset?")) {
      axios
        .delete(`/api/datasets/${id}`)
        .then(() => {
          setSavedDataSets((prev) =>
            prev.filter((dataSet) => dataSet._id !== id)
          );
        })
        .catch((error) => console.error("Error deleting dataset:", error));
    }
  };

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (selectedDataSetId) {
      const selectedDataSet = savedDataSets.find(
        (dataSet) => dataSet._id === selectedDataSetId
      );

      if (selectedDataSet) {
        // Store exposure in local storage
        localStorage.setItem("exposure", selectedDataSet.criteria.exposure);
        fetch("/api/patient-matching", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ criteria: selectedDataSet.criteria }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Matched patients:", data);

            // Extract block and slide info
            const extractedSampleInfo = data.map((patient) => ({
              block: patient.sampleInfo.block,
              slide: patient.sampleInfo.slide,
            }));

            // Set the sample info in context
            setSampleInfoList(extractedSampleInfo);

            // Show the toast with the matched patients length
            // toast.success(`Matched patients: ${data.length}`);
          })
          .catch((error) =>
            console.error("Error fetching patient data:", error)
          );
      }
    } else {
      // If no dataset is selected, clear the sample info list
      setSampleInfoList(null);
    }
  }, [selectedDataSetId, savedDataSets]);

  return (
    <div id="comparison-data-selector">
      <h1 className={styles.title}>Create comparison data.</h1>
      <p className={styles.subtitle}>Select Data Sets</p>
      <div className={styles.container}>
        {/* Medications Data */}
        <div className={styles.filterGroup}>
          <p className={styles.filterLabel}>Medications</p>
          <div className={styles.filterOptions}>
            {[
              // "All",
              // "Mono",
              // "Respiratory",
              // "Hepatitis",
              // "MMR",
              // "West Nile",
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
            ].map((item) => (
              <button
                key={item}
                className={`${styles.filterButton} ${
                  isSelected("medications", item) ? styles.active : ""
                }`}
                onClick={() => handleSelect("medications", item)}
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
              {/* <p>Yes</p> */}
              {[
                "covid19",
                "pertussis",
                "rsv",
                "varicella",
                "measles",
                "mumps",
                "rubella",
                "hepA",
                "hepB",
                "Influenza",
                // "mononucleosis",
                // "H1N5 AVIAN",
                // "west nile virus",
                // "Diabetes",
              ].map((item) => (
                <button
                  key={`yes-${item}`}
                  className={`${styles.filterButton} ${
                    isSelected("vaccine", item) ? styles.active : ""
                  }`}
                  onClick={() => handleSelect("vaccine", item)}
                >
                  {item}
                </button>
              ))}
            </div>
            {/* <br />
            <div className={styles.filterOptions}>
              <p>No</p>
              {["Mono", "Respiratory", "Hepatitis", "MMR", "West Nile"].map(
                (item) => (
                  <button
                    key={`no-${item}`}
                    className={`${styles.filterButton} ${
                      isSelected("vaccineNo", item) ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("vaccineNo", item)}
                  >
                    {item}
                  </button>
                )
              )}
            </div> */}
          </div>
        </div>
        <hr />
        <br />
        {/* Smoking Status */}
        <div className={styles.filterGroup}>
          <p className={styles.filterLabel}>Smoking Status</p>
          <div className={styles.filterOptions}>
            {["Yes", "No"].map((item) => (
              <button
                key={item}
                className={`${styles.filterButton} ${
                  isSelected("smoking", item) ? styles.active : ""
                }`}
                onClick={() => handleSelect("smoking", item)}
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
            {["200", "500"].map((item) => (
              <button
                key={item}
                className={`${styles.filterButton} ${
                  isSelected("exposure", item) ? styles.active : ""
                }`}
                onClick={() => handleSelect("exposure", item)}
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
                  checked={selectedDataSetId === dataSet._id}
                  onChange={() =>
                    setSelectedDataSetId(
                      selectedDataSetId === dataSet._id ? null : dataSet._id
                    )
                  }
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
