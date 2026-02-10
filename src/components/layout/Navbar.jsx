import "../../styles/navbar.css";

export default function Navbar() {
  const scrollTo = (index) => {
    window.scrollTo({
      top: index * window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <nav className="navbar">
      <span className="nav-item" onClick={() => scrollTo(0)}>
        Kezdőlap
      </span>
      <span className="nav-item" onClick={() => scrollTo(1)}>
        Kényelem
      </span>
      <span className="nav-item" onClick={() => scrollTo(2)}>
        Hangzás
      </span>
      <span className="nav-item" onClick={() => scrollTo(3)}>
        Valami
      </span>
      <span className="nav-item" onClick={() => scrollTo(4)}>
        Kinézet
      </span>
    </nav>
  );
}
