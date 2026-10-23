import { createContext, useContext } from 'react';
import { portfolioData } from './mock';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  return (
    <DataContext.Provider value={portfolioData}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};