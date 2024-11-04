import "./main.page.scss";
import { Canvas } from "@react-three/fiber";
import Navbar from "../../components/Navbar/navbar.component";
import Home from "../Home/home.page";
import Background from "../../components/Background/background.component";
import { useLocation } from "react-router-dom";
import Earth from "../../components/Earth/earth.component";
import FullScreenLoading from "@/components/FullScreenLoading/full-screen-loading.component";

export default function MainPage({ content }) {
  const location = useLocation().pathname;

  return (
    <section className="main-section">
      {/*<Background content={location == "/" ? <Earth /> : null} />*/}
      <Navbar />
      <section className="content-section">{content}</section>
      <FullScreenLoading />
    </section>
  );
}
