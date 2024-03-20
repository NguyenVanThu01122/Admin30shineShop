import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { AppProvider } from "./context";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();
root.render(
  //Provider cung cấp reduces store cho các component con, bằng cách bao bọc toàn bộ ứng dụng bên trong Provider và cho phép mọi component trong cây component truy cập đến store.
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <App />
    </AppProvider>
    <ToastContainer />
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
