import "./about.page.scss";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function About() {
  return (
    <section className="about-section">
      <div className="about-description">
        <div className="about-description-title">WHO WE ARE</div>
        <div className="about-description-content">
          We are people passionate about space, stars, rockets and everything in
          between.
        </div>
        <div className="about-description-spacer"></div>
        <div className="about-description-scroller">
          Meet the board
          <KeyboardArrowDownIcon />
        </div>
      </div>
      <div className="about-board">
        <div className="about-board-title">Meet the board</div>
        <div className="about-board-items">
          {[1, 1, 1, 1, 2, 3, 4, 5].map((_, index) => (
            <div className="about-board-item" key={`board member: ${index}`}>
              <img
                className="about-board-item-image"
                src={
                  "https://blog.texasbar.com/files/2011/12/housto-bankruptcy-attorney-adam-schachter1.jpg"
                }
              />
              <div className="about-board-item-info">
                <span className="about-board-item-name">Charbel Assaker</span>
                <span className="about-board-item-role">Website Designer</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
