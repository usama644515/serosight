/* eslint-disable @next/next/no-img-element */
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
          {
            name: "HIV",
            description:
              "HIV is a virus that causes AIDS by infecting and destroying immune cells. ",
          },
          {
            name: "HPV",
            description:
              "HPV virus is a viral infection that causes skin or mucous membrane growths.",
          },
          {
            name: "HBV",
            description:
              "Hepatitis B is a serious liver infection caused by the hepatitis B virus (HBV).",
          },
          {
            name: "Chlamydia",
            description:
              "Chlamydia is a virus that can cause genital pain and discharge.",
          },
          {
            name: "Gonorrhea",
            description:
              "Gonorrhea is a virus that can cause urinary pain, swelling, and discharge.",
          },
          {
            name: "Syphilis",
            description:
              "This virus manifests as sores on the genitals, rectum or mouth.",
          },
        ],
      },
      {
        name: "Pediatrics",
        details: [
          {
            name: "HAV",
            description:
              "HAV is a contagious liver infection caused typically spread through contaminated food.",
          },
          {
            name: "Rotavirus",
            description:
              "Rotavirus is a very contagious virus that causes diarrhea.",
          },
          {
            name: "Pertussis",
            description:
              "A viral whooping cough is a highly contagious respiratory tract infection.",
          },
          {
            name: "Polio Virus",
            description:
              "An illness caused by a virus  affects nerves in the spinal cord or brain stem. ",
          },
          {
            name: "Tetanus",
            description:
              "A serious  disease of the nervous system caused by bacterium.",
          },
          {
            name: "Meningococcal A",
            description:
              "A bacterial infection that causes meningitis and sepsis.",
          },
          {
            name: "H Influenza B",
            description:
              "A bacterial infections from mild to severe causing various symptoms.",
          },
          {
            name: "Pneumococcal",
            description:
              "A bacterial infection that can cause pneumonia, meningitis and sepsis,",
          },
          {
            name: "Diphtheria",
            description:
              "A serious bacterial infection of mucous membranes within the nose and throat.",
          },
        ],
      },
      {
        name: "Respiratory",
        details: [
          {
            name: "Influenza",
            description: "A viral infection of the nose, throat and lungs.",
          },
          {
            name: "SARS",
            description:
              "Severe acute respiratory syndrome is a contagious and sometimes fatal viral illness.",
          },
          {
            name: "RSV",
            description:
              "Respiratory syncytial virus (RSV) causes infections of the lungs and respiratory tract. ",
          },
          {
            name: "Varicella",
            description:
              "Chickenpox is an illness caused by the varicella-zoster virus.",
          },
          { name: "Influenza", description: "Flu virus infection tracking." },
          { name: "SARS", description: "Severe acute respiratory syndrome." },
          { name: "RSV", description: "Respiratory syncytial virus." },
          { name: "Varicella", description: "Chickenpox monitoring." },
        ],
      },
      {
        name: "COVID",
        details: [
          {
            name: "COVID + Strains",
            description: "A virus causes a mild cold to death.",
          },
          {
            name: "Delta/ Wuhan",
            description:
              "The newest COVID strand, this virus is now the most dominant variant.",
          },
          {
            name: "Omicron BA1",
            description: "A sub variant of the COVID virus with 39 mutation.",
          },
          {
            name: "Omicron BA2",
            description: "A sub variant of the COVID virus with 31 mutation.",
          },
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
          {
            name: "Blood Tests",
            description: "Pregnancy-related diagnostics.",
          },
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
          {
            name: "Malaria Prevention",
            description: "Prophylactic treatment.",
          },
        ],
      },
      {
        name: "RH",
        details: [
          {
            name: "Fertility Tests",
            description: "Reproductive health checkups.",
          },
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
        <div className={styles.hightlight}>
          <div>
            <img
              src="/images/protein.png"
              alt="Protein"
              className={styles.hightlightImage}
            />
            <h4>Protein</h4>
          </div>
          <div>
            <img
              src="/images/bacteria.png"
              alt="Bacteria"
              className={styles.hightlightImage}
            />
            <h4>Bacteria</h4>
          </div>
          <div>
            <img
              src="/images/allergy.png"
              alt="Allergy"
              className={styles.hightlightImage}
            />
            <h4>Allergy</h4>
          </div>
          <div>
            <img
              src="/images/virus.png"
              alt="Virus"
              className={styles.hightlightImage}
            />
            <h4>Virus</h4>
          </div>
          <div>
            <img
              src="/images/parasite.png"
              alt="Parasite"
              className={styles.hightlightImage}
            />
            <h4>Parasite</h4>
          </div>
        </div>
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

      {selectedItem && (
        <div className={styles.infoSection}>
          <h2>Monitoring</h2>
          <h3>{selectedItem.name || selectedItem}</h3>
          <div className={styles.rowSlider}>
            {Array.isArray(selectedItem.details) ? (
              selectedItem.details.map((detail, i) => (
                <div key={i} className={styles.infoBox}>
                  {/* <h4>Box {i + 1}</h4> */}
                  <div>
                    <strong>{detail.name}:</strong>
                    <img
                      src="/images/virus.png"
                      alt="icon"
                      className={styles.infoBoxIcon}
                    />
                  </div>
                  <p>{detail.description}</p>
                </div>
              ))
            ) : (
              <div className={styles.infoBox}>
                <strong>Details:</strong>
                <p>{selectedItem.details}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveSection;
