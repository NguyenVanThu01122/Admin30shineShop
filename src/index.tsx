import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { applyMiddleware, compose, createStore } from "redux";
import App from "./App";
import { AppProvider } from "./context";
import "./index.css";
import { rootReducers } from "./redux/reducers";
import reportWebVitals from "./reportWebVitals";
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //Cấu hình Redux DevTools, một công cụ giúp theo dõi trạng thái và các actions trong ứng dụng.
const myStore = createStore(rootReducers, composeEnhancers(applyMiddleware())); // Tạo Redux store bằng cách kết hợp các reducers và middleware.
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();
root.render(
  //Provider cung cấp reduces store cho các component con, bằng cách bao bọc toàn bộ ứng dụng bên trong Provider và cho phép mọi component trong cây component truy cập đến store.
  <QueryClientProvider client={queryClient}>
    <Provider store={myStore}>
      <AppProvider>
        <App />
      </AppProvider>
    </Provider>
    <ToastContainer />
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
