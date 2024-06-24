import { useState } from "react";
import "./projects.scss";

export function Project(props) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <article
      className="project"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={props.imgPath} // Replace with your image path
        alt="Hoverable Image"
        className="hoverable-image"
      />
      <div className={`overlay ${hovered ? "show" : ""}`}>
        <h2>{props.name}</h2>
        <p className="project__text">{props.info}</p>
        <a rel="stylesheet" href={props.link} target="_blank">
          <button className="project__button">Till sidan</button>
        </a>
      </div>
    </article>
  );
}
