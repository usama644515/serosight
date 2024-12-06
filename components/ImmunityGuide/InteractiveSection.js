import React, { useState } from "react";
import styles from "./InteractiveSection.module.css"; // Import CSS module

const sections = [
  {
    title: "Monitoring",
    subTitle: "(long term)",
    children: [
      {
        name: "STD",
        details: [
          { name: "HIV", description: "Human Immunodeficiency Virus." },
          { name: "HPV", description: "Human Papillomavirus infection." },
          { name: "HBV", description: "Hepatitis B Virus." },
        ],
      },
      {
        name: "Pediatrics",
        details: [
          { name: "Growth Tracking", description: "Height and weight trends." },
          { name: "Vaccines", description: "Childhood immunization schedule." },
        ],
      },
      {
        name: "Respiratory",
        details: [
          { name: "Influenza", description: "Flu virus infection tracking." },
          { name: "SARS", description: "Severe acute respiratory syndrome." },
          { name: "RSV", description: "Respiratory syncytial virus." },
          { name: "Varicella", description: "Chickenpox monitoring." },
        ],
      },
      {
        name: "COVID",
        details: [
          { name: "Post-COVID Care", description: "Ongoing health metrics." },
          { name: "Vaccination", description: "Vaccine efficacy tracking." },
        ],
      },
    ],
  },
  {
    title: "Diagnostic",
    subTitle: "(one-time)",
    children: [
      {
        name: "OB",
        details: [
          { name: "Ultrasound", description: "Prenatal imaging services." },
          { name: "Blood Tests", description: "Pregnancy-related diagnostics." },
        ],
      },
      {
        name: "Allergy",
        details: [
          { name: "Pollen", description: "Seasonal allergy detection." },
          { name: "Food Allergies", description: "Identifying food triggers." },
        ],
      },
      {
        name: "World Travel",
        details: [
          { name: "Vaccinations", description: "Required travel vaccines." },
          { name: "Malaria Prevention", description: "Prophylactic treatment." },
        ],
      },
      {
        name: "RH",
        details: [
          { name: "Fertility Tests", description: "Reproductive health checkups." },
          { name: "Hormonal Panel", description: "Hormonal balance testing." },
        ],
      },
    ],
  },
];

const InteractiveSection = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className={styles.container}>
      <div className={styles.diagram}>
        <div className={styles.mainCircle}>OUR Health Insight Packages</div>
        <div className={styles.subCircles}>
          {sections.map((section, index) => (
            <div key={index} className={styles.branch}>
              <div
                className={styles.subCircle}
                onClick={() => handleClick(section.title)}
              >
                {section.title} <br /> {section.subTitle}
              </div>
              <div className={styles.subLine}></div>
              <div className={styles.children}>
                {section.children.map((child, i) => (
                  <div
                    key={i}
                    className={styles.childCircle}
                    onClick={() => handleClick(child)}
                  >
                    {child.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.infoSection}>
        {selectedItem && (
          <div className={styles.infoBox}>
            <h3>{selectedItem.name || selectedItem}</h3>
            {Array.isArray(selectedItem.details) ? (
              <ul>
                {selectedItem.details.map((detail, i) => (
                  <li key={i}>
                    <strong>{detail.name}:</strong> {detail.description}
                  </li>
                ))}
              </ul>
            ) : (
              <p>{selectedItem.details}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveSection;
