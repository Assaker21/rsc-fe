import MainPage from "./pages/Main/main.page";
import { Outlet } from "react-router-dom";
import { MainContextProvider } from "./contexts/main.context";
import { ThemeProvider } from "./components/ThemeProvider/theme-provider";
import "./App.scss";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MainContextProvider>
        <MainPage content={<Outlet />} />
      </MainContextProvider>
    </ThemeProvider>
  );
}
