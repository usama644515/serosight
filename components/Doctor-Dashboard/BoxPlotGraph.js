import React, { useRef, useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useSampleInfo } from "./ContextProvider";

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
        x0: index - 0.4, // Start at the left edge of the box
        x1: index + 0.4, // End at the right edge of the box
        y0: immunityLevel,
        y1: immunityLevel,
        xref: 'x',
        yref: 'y',
        line: {
          color: color, // Use the generated color
          width: 2,
          dash: 'solid',
        },
        label: {
          text: `Immunity: ${immunityLevel}`,
          showarrow: false,
          x: index + 0.5, // Position the label to the right of the line
          y: immunityLevel,
          font: { color: color, size: 12 }, // Use the same color for the label
        },
      };
    })
    .filter((annotation) => annotation !== null);
};

// Box plot graph component
const BoxPlotGraph = ({ globalData, patientData, showImmunityLines, selectedUser, reportDate, diseaseName,sampleInfoList }) => {
  const plotContainerRef = useRef(null); // Ref for the container div
  const [isPlotReady, setIsPlotReady] = useState(false); // State to track if the plot is ready
   const {DatasetNames, DatasetPatientMap } = useSampleInfo();

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

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    // Helper function to parse DD/MM/YYYY to YYYY-MM-DD
    const parseReportDate = (reportDate) => {
      const [day, month, year] = reportDate.split("/");
      return `${year}-${month}-${day}`; // Convert to YYYY-MM-DD
    };
    if (!plotContainerRef.current) {
      console.error(`Plot container not found.`);
      return;
    }

    // Capture the plot container using html2canvas
    html2canvas(plotContainerRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape");

      // Add title and header details
      pdf.setFontSize(18);
      pdf.setTextColor(33, 150, 243);
      pdf.text("Patient Immunity Report", 105, 20, { align: "center" });

      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Patient ID: ${selectedUser.userId}`, 20, 40);
      
     
      if (Object.keys(DatasetPatientMap).length > 0) {
        pdf.text(`DataSet Name: ${DatasetNames.join(", ")}`, 20, 50);
        const formattedDate = new Intl.DateTimeFormat("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date(parseReportDate(reportDate)));
        
        pdf.text(`Date: ${formattedDate}`, 20, 60);
      }else{
        const formattedDate = new Intl.DateTimeFormat("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date(parseReportDate(reportDate)));
        
        pdf.text(`Date: ${formattedDate}`, 20, 50);
      }

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
      pdf.save(`${selectedUser.userId}_report.pdf`);
    });
  };

  // Use useEffect to ensure the plot is fully rendered
  useEffect(() => {
    if (plotContainerRef.current) {
      setIsPlotReady(true); // Mark the plot as ready
    }
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Whisker and Box Plot Graph</h1>
      <div
        ref={plotContainerRef} // Attach the ref to the container
        style={{
          backgroundColor: '#00205B', // Set background color
          borderRadius: '15px', // Add border radius
          padding: '20px',
          display: 'inline-block',
        }}
      >
        <Plot
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
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handleDownloadPDF} // Pass the function reference, not the function call
          disabled={!isPlotReady} // Disable the button until the plot is ready
          style={{
            backgroundColor: '#004AAD',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Download Graph as PDF
        </button>
      </div>
    </div>
  );
};

export default BoxPlotGraph;