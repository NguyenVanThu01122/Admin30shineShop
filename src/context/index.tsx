import { createContext, useState } from "react";
import { TypeColumns } from "../pages/OrderManagement/ListOrder/types";
import { TypeBrands } from "../service/brand";
import { getListOrderType } from "../service/order";
import { TypeProducts } from "../service/product";
import { TypeUsers } from "../service/user";
// Initiate Context
type AppContextType = {
  saveUser: TypeUsers[];
  setSaveUser: React.Dispatch<React.SetStateAction<any>>;
  saveProducts: TypeProducts[];
  setSaveProducts: React.Dispatch<React.SetStateAction<any>>;
  saveBrands: TypeBrands[];
  setSaveBrands: React.Dispatch<React.SetStateAction<any>>;
  saveListOrder: getListOrderType[];
  setListOrder: React.Dispatch<React.SetStateAction<any>>;
  saveListEvaluate: TypeColumns[];
  setListEvaluate: React.Dispatch<React.SetStateAction<any>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

// Provide Context
const AppProvider = ({ children }: { children: React.ReactNode }) => {
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
