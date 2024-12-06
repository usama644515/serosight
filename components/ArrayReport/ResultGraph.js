/* eslint-disable @next/next/no-img-element */
import styles from "./ResultGraph.module.css";
import { Doughnut } from "react-chartjs-2";
import { useState } from "react";
import SearchModal from "../Modals/SearchModal";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ResultGraph = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  // const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true); // Open modal when the button is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal when needed
  };
  // Chart data
  const chartData = {
    labels: ["Healthy", "At Risk", "Critical"],
    datasets: [
      {
        label: "Immunity Levels",
        data: [60, 30, 10], // Example data
        backgroundColor: ["#18206F", "#98A2FF", "#DFE2FF"],
        hoverBackgroundColor: ["#1A237E", "#7986CB", "#E8EAF6"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
          },
          color: "#18206F",
        },
      },
      tooltip: {
        backgroundColor: "#18206F",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderWidth: 1,
        borderColor: "#98A2FF",
      },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headercontent}>
          <h2>Most Recent Report</h2>
          <h1 className={styles.title}>Disease Group</h1>
          <h3>Disease Sub Group Name</h3>
        </div>
        <div className={styles.searchSection} onClick={openModal}>
          <img
            src="/images/search icon.png"
            alt=""
            className={styles.searchIcon}
          />
          <p className={styles.searchText}>Search for a Report</p>
        </div>
      </div>
      <div className={styles.content}>
        {/* Chart Section */}
        <div className={styles.chartContainer}>
          <div style={{ width: "100%", height: "300px" }}>
            <Doughnut data={chartData} options={chartOptions} />
          </div>
          <p className={styles.date}>8/9/2024</p>
        </div>
        <div className={styles.summary}>
          <h2>SUBGROUPNAME Result Overview</h2>
          <h3>
            Learn how your immunity results for SUB GROUP NAME compare to other
            patients who have tested.
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A
            praesentium voluptatibus ad iure. Nemo vel atque incidunt
            voluptatibus ipsa tempora?
          </p>
          <div className={styles.linebox}>
            <div className={styles.summaryline}></div>
          </div>
        </div>
      </div>
      {/* Modal for Sign In */}
      <SearchModal isOpen={isModalOpen} onRequestClose={closeModal} />{" "}
      {/* Modal gets the state and close function */}
    </div>
  );
};

export default ResultGraph;
