import { useState, useEffect } from "react";
import jag from "./assets/jag.jpeg";
import "./App.scss";
import { Project } from "./components/projects";

const Sparkle = ({ top, left }) => (
  <div
    className="sparkle"
    style={{
      top: `${top}px`,
      left: `${left}px`,
      animationDuration: `${Math.random() * 0.4 + 0.3}s`,
    }}
  ></div>
);

const SparkleWord = ({ children }) => {
  const [sparkles, setSparkles] = useState([]);

  const handleMouseOver = (e) => {
    const rect = e.target.getBoundingClientRect();
    const newSparkles = [];
    for (let i = 0; i < 20; i++) {
      // Increase the number of sparkles
      const angle = Math.random() * 2 * Math.PI; // Random angle
      const radius = Math.random() * 50; // Random radius
      const x = rect.width / 2 + radius * Math.cos(angle); // Calculate x position
      const y = rect.height / 2 + radius * Math.sin(angle); // Calculate y position
      newSparkles.push({
        id: Date.now() + i,
        top: y,
        left: x,
      });
    }
    setSparkles(newSparkles);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => prev.filter((s) => Date.now() - s.id < 600));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="sparkle-container" onMouseOver={handleMouseOver}>
      {children}
      {sparkles.map((sparkle) => (
        <Sparkle key={sparkle.id} top={sparkle.top} left={sparkle.left} />
      ))}
    </span>
  );
};

function handleDownload() {
  const pdfUrl = "src/assets/Overwatch.pdf"; // Replace with the actual path to your PDF file

  fetch(pdfUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Overwatch.pdf"); // Set desired file name here
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch((error) => console.error("Error downloading PDF:", error));
}

function App() {
  const projects = [
    {
      name: "E-Wallet",
      info: "Mindre projekt i studierna som gick ut på att ta emot och visa kort information",
      imgpath: "src/assets/ewallet.png",
      link: "https://cheery-cucurucho-16a4c8.netlify.app",
    },
    {
      name: "Kokbok",
      info: "Min egna lilla kokbok där jag sparar recept.",
      imgpath: "src/assets/kok.png",
      link: "https://bucolic-tartufo-956e58.netlify.app/",
    },
    {
      name: "Jumpman",
      info: "Kul litet spel, självklart egendesignat. Försök slå highscore!",
      imgpath: "src/assets/jumpandisplay.svg",
      link: "https://incomparable-sunburst-dea9c1.netlify.app",
    },
    {
      name: "Overwatch",
      info: "Fick i uppdrag att lyfta frontenden av ett larmsystem under min LIA, klicka på länken för att läsa mer om arbetet",
      imgpath: "src/assets/overwatch1.png",
      link: "src/assets/Overwatch.pdf",
    },
  ];

  const listOfProjects = projects.map((project) => {
    return (
      <Project
        name={project.name}
        info={project.info}
        imgPath={project.imgpath}
        link={project.link}
      />
    );
  });

  return (
    <>
      <header className="head">
        <h1 className="intro">
          Hej! <br />
          Carl Bergman här, <br />
          <SparkleWord>Webb utvecklare</SparkleWord>
        </h1>
        <img className="me" src={jag} alt="hej" />
      </header>
      <main className="main">
        <h2 className="portfolio__header">Några av mina projekt</h2>
        {listOfProjects}
      </main>
    </>
  );
}

export default App;
