import { createContext, useState } from "react";
// Initiate Context
type AppContextType = {
  saveUser: any;
  setSaveUser: any;
  saveProducts: any;
  setSaveProducts: any;
  saveBrands: any;
  setSaveBrands: any;
  saveListOrder: any;
  setListOrder: any;
  saveListEvaluate:any
  setListEvaluate:any
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

// Provide Context
const AppProvider = ({ children }: any) => {
  const [saveUser, setSaveUser] = useState([]);
  const [saveProducts, setSaveProducts] = useState([]);
  const [saveBrands, setSaveBrands] = useState([]);
  const [saveListOrder, setListOrder] = useState([]);
  const [saveListEvaluate, setListEvaluate] = useState([]);

  return (
    <AppContext.Provider
      value={{
        saveUser,
        setSaveUser,
        saveProducts,
        setSaveProducts,
        saveBrands,
        setSaveBrands,
        saveListOrder,
        setListOrder,
        saveListEvaluate,
        setListEvaluate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, createContext };
