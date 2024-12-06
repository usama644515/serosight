/* eslint-disable @next/next/no-img-element */
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Filler,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js';
  
  import { Doughnut, Line } from 'react-chartjs-2';
  import styles from './Overview2.module.css';
  
  // Register Chart.js components
  ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Filler,
    Tooltip,
    Legend,
    ArcElement
  );
  
  const Overview2 = () => {
    const doughnutData1 = {
      labels: ['Lost Immunity', 'Remaining Immunity'],
      datasets: [
        {
          data: [81, 19],
          backgroundColor: ['#A52A2A', '#E6E6E6'],
          borderWidth: 0,
        },
      ],
    };
  
    const doughnutData2 = {
      labels: ['Lost Immunity', 'Remaining Immunity'],
      datasets: [
        {
          data: [55, 45],
          backgroundColor: ['#A52A2A', '#E6E6E6'],
          borderWidth: 0,
        },
      ],
    };
  
    const lineData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Immunity',
          data: [20, 40, 60, 80, 100],
          borderColor: '#FFFFFF',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          pointBackgroundColor: '#FFFFFF',
          fill: true,
        },
      ],
    };
  
    return (
      <div className={styles.container}>
      <div className={styles.card} style={{ backgroundColor: '#98A2FF' }}>
        <img src="/images/graph-icon.png" alt="" className={styles.graphicon} />
        <h1>3 of 4</h1>
        <p style={{ color: 'white' }}>
          of the population ages 24-26 share immunity patterns similar to you
        </p>
      </div>

      <div className={styles.card} style={{ height: '150px' }}>
        <Doughnut data={doughnutData1} className={styles.chart} />
        <p className={styles.chartLabel}>
          <span className={styles.bold}>81%</span> lost FLU immunity after 6
          months
        </p>
      </div>

      <div
        className={styles.card}
        style={{ backgroundColor: '#18206F', color: 'white' }}
      >
        <h2>Recommended Vaccine</h2>
        <p style={{ color: 'white' }}>
          based on your comprehensive immunity results
        </p>
        <Line data={lineData} className={styles.lineChart} />
        <p style={{ color: 'white' }}>COVID-19</p>
      </div>

      <div className={styles.card} style={{ height: '150px' }}>
        <Doughnut data={doughnutData2} className={styles.chart} />
        <p className={styles.chartLabel}>
          <span className={styles.bold}>55%</span> lost OMICRON immunity after 2
          months
        </p>
      </div>
    </div>
    );
  };
  
  export default Overview2;
  