import React, { useRef } from 'react';
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

// Function to calculate immunity levels
const getImmunityLevel = (uniqueNames, patientData) => {
  return uniqueNames
    .map((name) => {
      const matchingData = patientData.filter((item) => item.Name === name);
      if (matchingData.length === 0) return null;

      const filteredData = matchingData.filter((item) => Number(item.Value) !== 0);
      const immunityLevels = filteredData.map(
        (item) => Number(item.Value || 0) - Number(item.Background || 0)
      );

      const averageValue =
        immunityLevels.reduce((sum, value) => sum + value, 0) /
        (filteredData.length || 1);

      return Math.round(averageValue); // Round to the nearest integer
    })
    .filter((value) => value !== null);
};

// Function to generate annotations for the box plot
const getAnnotationForReport = (immunityLevels, uniqueNames) => {
  return immunityLevels
    .map((immunity, index) => {
      const immunityLevel = Number(immunity);
      if (isNaN(immunityLevel)) return null;

      const uniqueName = uniqueNames[index % uniqueNames.length];
      const color = `hsl(${index * 50}, 70%, 50%)`; // Generate a color for each line
      return {
        type: 'line',
        x0: 0,
        x1: 1,
        y0: immunityLevel,
        y1: immunityLevel,
        xref: 'paper',
        yref: 'y',
        line: {
          color: color, // Use the generated color
          width: 2,
          dash: 'solid',
        },
        label: {
          text: `Immunity: ${immunityLevel}`,
          showarrow: false,
          x: 1.05, // Position the label to the right of the line
          y: immunityLevel,
          font: { color: color, size: 12 }, // Use the same color for the label
        },
      };
    })
    .filter((annotation) => annotation !== null);
};

// Box plot graph component
const BoxPlotGraph = ({ globalData, patientData, showImmunityLines }) => {
  const plotRef = useRef(null);

  // Convert data into traces for Plotly
  const traces = Object.keys(globalData).map((disease, index) => {
    const color = `hsl(${index * 50}, 70%, 50%)`; // Generate a color for each box plot
    return {
      y: globalData[disease],
      type: "box",
      name: disease,
      boxpoints: "outliers",
      marker: { color: color }, // Use the generated color for the box plot
      line: { color: color }, // Use the same color for the box plot lines
    };
  });

  // Get immunity levels and annotations
  const uniqueNames = Object.keys(globalData);
  const immunityLevels = getImmunityLevel(uniqueNames, patientData);
  const annotations = showImmunityLines ? getAnnotationForReport(immunityLevels, uniqueNames) : [];

  // Function to download the graph as PNG
  const downloadGraph = () => {
    if (plotRef.current) {
      plotRef.current.downloadImage({
        format: 'png',
        filename: 'box_plot_graph',
      });
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Whisker and Box Plot Graph</h1>
      <div
        style={{
          backgroundColor: '#00205B', // Set background color
          borderRadius: '15px', // Add border radius
          padding: '20px',
          display: 'inline-block',
        }}
      >
        <Plot
          ref={plotRef}
          data={traces}
          layout={{
            title: "Disease Severity Distribution",
            yaxis: { title: "Severity Level", color: 'white' }, // Set axis text color to white
            xaxis: { title: "Diseases", color: 'white' }, // Set axis text color to white
            showlegend: false,
            autosize: true,
            margin: {
              l: 50, // Left margin
              r: 10, // Right margin
              b: 50, // Bottom margin
              t: 50, // Top margin
              pad: 4,
            },
            width: 800,
            height: 400,
            shapes: annotations, // Add the annotations (immunity lines)
            paper_bgcolor: '#00205B', // Set plot background color
            plot_bgcolor: '#00205B', // Set plot area background color
            font: { color: 'white' }, // Set global font color
          }}
          style={{ width: "100%", height: "400px", borderRadius: '15px' }} // Add border radius to the plot
        />
      </div>
      {/* <div style={{ marginTop: '20px' }}>
        <button
          onClick={downloadGraph}
          style={{
            backgroundColor: '#004AAD',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Download Graph as PNG
        </button>
      </div> */}
    </div>
  );
};

export default BoxPlotGraph;