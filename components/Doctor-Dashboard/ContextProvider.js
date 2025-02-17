import React, { createContext, useState, useContext } from "react";

const SampleInfoContext = createContext();

export const SampleInfoProvider = ({ children }) => {
  const [sampleInfoList, setSampleInfoList] = useState([]);

  return (
    <SampleInfoContext.Provider value={{ sampleInfoList, setSampleInfoList }}>
      {children}
    </SampleInfoContext.Provider>
  );
};

export const useSampleInfo = () => useContext(SampleInfoContext);