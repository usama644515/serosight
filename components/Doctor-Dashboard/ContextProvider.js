import React, { createContext, useState, useContext } from "react";

const SampleInfoContext = createContext();

export const SampleInfoProvider = ({ children }) => {
  const [sampleInfoList, setSampleInfoList] = useState([]);
  const [DatasetPatientMap, setDatasetPatientMap] = useState([]);
  const [ExposureList, setExposureList] = useState([]);
  const [DatasetNames, setDatasetNames] = useState([]);

  return (
    <SampleInfoContext.Provider
      value={{ sampleInfoList, setSampleInfoList, ExposureList, setExposureList,DatasetNames,setDatasetNames,setDatasetPatientMap,DatasetPatientMap }}
    >
      {children}
    </SampleInfoContext.Provider>
  );
};

export const useSampleInfo = () => useContext(SampleInfoContext);