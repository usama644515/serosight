import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from './CustomGraph.module.css';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip, Legend);

const CustomGraph = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'High levels',
        data: [90, 80, 100, 75, 85, 95, 110, 100, 90],
        borderColor: 'brown',
        backgroundColor: 'rgba(165, 42, 42, 0.5)',
        fill: true,
        pointBackgroundColor: 'darkred',
        pointBorderColor: 'white',
        pointRadius: 5,
      },
      {
        label: 'Your levels',
        data: [70, 60, 80, 65, 75, 85, 90, 80, 70],
        borderColor: 'rgba(255, 255, 255, 1)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        fill: true,
        pointBackgroundColor: 'navy',
        pointBorderColor: 'white',
        pointRadius: 5,
      },
      {
        label: 'Average levels',
        data: [60, 50, 70, 55, 65, 75, 80, 70, 60],
        borderColor: 'rgba(240, 240, 255, 1)',
        backgroundColor: 'rgba(150, 150, 255, 0.5)',
        fill: true,
        pointBackgroundColor: 'navy',
        pointBorderColor: 'white',
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        type: 'category', // Use 'category' scale
        grid: {
          display: false,
        },
        ticks: {
          color: 'white',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <Line data={data} options={options} />
    </div>
  );
};

export default CustomGraph;
