import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ImmunizationHistory.module.css";

export default function ImmunizationHistory() {
  const vaccines = [
    "Influenza",
    "Covid",
    "Hep A",
    "Hep B",
    "Hep C",
    "Measles",
    "Mumps",
    "Rubella",
    "Pertussis",
    "Epstein Barr",
    "West Nile",
    "Varicella",
    "RSV",
  ];

  const defaultImmunizationData = vaccines.map((vaccine) => ({
    name: vaccine,
    status: "Unknown",
    date: "",
  }));

  const defaultSmokingHistory = {
    doYouSmoke: "No",
    frequency: "",
  };

  const defaultMedicationData = vaccines.map((medication) => ({
    name: medication,
    status: "No",
    date: "",
  }));

  const [immunizationData, setImmunizationData] = useState(
    defaultImmunizationData
  );
  const [smokingHistory, setSmokingHistory] = useState(defaultSmokingHistory);
  const [medicationData, setMedicationData] = useState(defaultMedicationData);

  const handleImmunizationChange = (index, field, value) => {
    const updatedData = [...immunizationData];
    updatedData[index][field] = value;
    setImmunizationData(updatedData);
  };

  const handleMedicationChange = (index, field, value) => {
    const updatedData = [...medicationData];
    updatedData[index][field] = value;
    setMedicationData(updatedData);
  };

  const handleSmokingChange = (field, value) => {
    setSmokingHistory({ ...smokingHistory, [field]: value });
  };

  const fetchData = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in.");
      return;
    }

    try {
      const response = await axios.get(`/api/immunization`, {
        params: { userId },
      });

      if (response.status === 200 && response.data) {
        const { vaccineData, smokingHistory, medicationData } = response.data;
        setImmunizationData(vaccineData || defaultImmunizationData);
        setSmokingHistory(smokingHistory || defaultSmokingHistory);
        setMedicationData(medicationData || defaultMedicationData);
      } else {
        console.warn("No data found. Using default values.");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn("Data not found. Using default values.");
      } else {
        console.error("Error fetching data:", error);
      }
      setImmunizationData(defaultImmunizationData);
      setSmokingHistory(defaultSmokingHistory);
      setMedicationData(defaultMedicationData);
    }
  };

  const handleSaveChanges = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in.");
      return;
    }

    if (!immunizationData || !smokingHistory || !medicationData) {
      alert("All fields are required.");
      return;
    }

    const payload = {
      userId,
      vaccineData: immunizationData,
      smokingHistory,
      medicationHistory: medicationData,
    };

    try {
      const response = await axios.put("/api/immunization", payload);

      if (response.status === 200) {
        alert("Data updated successfully!");
      } else {
        alert("Failed to update data.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("An error occurred while saving changes.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1 className={styles.heading}>Immunization History</h1>
      </div>

      <div className={styles.innerContainer}>
        <h2 className={styles.title}>Vaccine History</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Vaccine Name</th>
              <th>Vaccine Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {immunizationData.map((vaccine, index) => (
              <tr key={vaccine.name}>
                <td>
                  <input
                    type="text"
                    className={styles.inputText}
                    value={vaccine.name}
                    onChange={(e) =>
                      handleImmunizationChange(index, "name", e.target.value)
                    }
                  />
                </td>
                <td>
                  <div className={styles.radioGroup}>
                    <label>
                      <input
                        type="radio"
                        name={`vaccine-${vaccine.name}`}
                        value="Yes"
                        checked={vaccine.status === "Yes"}
                        onChange={() =>
                          handleImmunizationChange(index, "status", "Yes")
                        }
                      />{" "}
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`vaccine-${vaccine.name}`}
                        value="No"
                        checked={vaccine.status === "No"}
                        onChange={() =>
                          handleImmunizationChange(index, "status", "No")
                        }
                      />{" "}
                      No
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`vaccine-${vaccine.name}`}
                        value="Unknown"
                        checked={vaccine.status === "Unknown"}
                        onChange={() =>
                          handleImmunizationChange(index, "status", "Unknown")
                        }
                      />{" "}
                      Unknown
                    </label>
                  </div>
                </td>
                <td>
                  <input
                    type="date"
                    className={styles.dateInput}
                    value={vaccine.date}
                    onChange={(e) =>
                      handleImmunizationChange(index, "date", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className={styles.title}>Smoking History</h2>
        <div className={styles.smokingHistory}>
          <label>
            Do you smoke?{" "}
            <input
              type="radio"
              name="doYouSmoke"
              value="Yes"
              onChange={(e) =>
                handleSmokingChange("doYouSmoke", e.target.value)
              }
              checked={smokingHistory.doYouSmoke === "Yes"}
            />{" "}
            Yes
            <input
              type="radio"
              name="doYouSmoke"
              value="No"
              onChange={(e) =>
                handleSmokingChange("doYouSmoke", e.target.value)
              }
              checked={smokingHistory.doYouSmoke === "No"}
            />{" "}
            No
          </label>
          {smokingHistory.doYouSmoke === "Yes" && (
            <div>
              <label>
                Smoking Frequency
                <input
                  type="text"
                  value={smokingHistory.frequency}
                  onChange={(e) =>
                    handleSmokingChange("frequency", e.target.value)
                  }
                />
              </label>
            </div>
          )}
        </div>

        <h2 className={styles.title}>Medication History</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Medication Name</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {medicationData.map((medication, index) => (
              <tr key={medication.name}>
                <td>
                  <input
                    type="text"
                    className={styles.inputText}
                    value={medication.name}
                    onChange={(e) =>
                      handleMedicationChange(index, "name", e.target.value)
                    }
                  />
                </td>
                <td>
                  <div className={styles.radioGroup}>
                    <label>
                      <input
                        type="radio"
                        name={`medication-${medication.name}`}
                        value="Yes"
                        onChange={() =>
                          handleMedicationChange(index, "status", "Yes")
                        }
                      />{" "}
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`medication-${medication.name}`}
                        value="No"
                        onChange={() =>
                          handleMedicationChange(index, "status", "No")
                        }
                      />{" "}
                      No
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`medication-${medication.name}`}
                        value="Unknown"
                        onChange={() =>
                          handleMedicationChange(index, "status", "Unknown")
                        }
                        defaultChecked
                      />{" "}
                      Unknown
                    </label>
                  </div>
                </td>
                <td>
                  <input
                    type="date"
                    className={styles.dateInput}
                    value={medication.date}
                    onChange={(e) =>
                      handleMedicationChange(index, "date", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.saveButtonContainer}>
        <button className={styles.saveButton} onClick={handleSaveChanges}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
