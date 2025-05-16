
import React, { createContext, useContext, ReactNode } from 'react';

// Define the context type
interface AccessibilityContextType {
  metrics: {
    readability?: {
      fleschKincaid?: number;
      automatedReadability?: number;
      colemanLiau?: number;
    };
  };
}

// Create the context with default values
const AccessibilityContext = createContext<AccessibilityContextType>({
  metrics: {
    readability: {
      fleschKincaid: 8.0,
      automatedReadability: 8.0,
      colemanLiau: 8.0
    }
  }
});

// Provider component
interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider = ({ children }: AccessibilityProviderProps) => {
  // The value that will be given to the context
  const value = {
    metrics: {
      readability: {
        fleschKincaid: 8.0,
        automatedReadability: 8.0, 
        colemanLiau: 8.0
      }
    }
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Custom hook to use the context
export const useAccessibility = () => useContext(AccessibilityContext);
