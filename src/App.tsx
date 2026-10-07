import { useMemo, useState } from "react";
import posterAube from "./assets/aube.svg";
import posterMemoire from "./assets/memoire.svg";
import posterOrbite from "./assets/orbite.svg";

const films = [
  { id: 1, title: "Après l’aube", genre: "Drame", time: "18 h 10", available: true, poster: posterAube },
  { id: 2, title: "La mémoire des murs", genre: "Documentaire", time: "19 h 30", available: false, poster: posterMemoire },
  { id: 3, title: "Orbite 9", genre: "Science-fiction", time: "21 h 00", available: true, poster: posterOrbite },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredFilms = useMemo(
    () => films.filter((film) => film.title.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const toggleFavorite = (id: number) => {
    setFavorites((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
    );
  };

  return (
    <>
      <a className="skip-link" href="#main">Aller au contenu principal</a>

      <header className="topbar">
        <button
          type="button"
          className="brand"
          aria-label="CinéScope, réinitialiser la recherche"
          onClick={() => setQuery("")}
        >
          CinéScope
        </button>
        <nav className="menu" aria-label="Navigation principale">
          <a href="#programme" aria-label="Programme, aller à la liste des films">Programme</a>
          <a href="#infos" aria-label="Informations, aller aux informations pratiques">Informations</a>
        </nav>
      </header>

      <main id="main" className="page">
        <h1>Films à l’affiche</h1>
        <p className="intro">Découvrez la programmation de cette semaine.</p>

        <label htmlFor="search" className="sr-only">Rechercher un film</label>
        <input
          id="search"
          type="search"
          className="search"
          placeholder="Rechercher un film"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <p className="sr-only" role="status" aria-live="polite">
          {filteredFilms.length} film{filteredFilms.length > 1 ? "s" : ""} trouvé{filteredFilms.length > 1 ? "s" : ""}
        </p>

        <section id="programme" aria-labelledby="programme-title">
          <h2 id="programme-title" className="sr-only">Programme</h2>

          {filteredFilms.length === 0 ? (
            <p>Aucun film ne correspond à votre recherche.</p>
          ) : (
            <ul className="film-grid">
              {filteredFilms.map((film) => (
                <li key={film.id} className="film-card">
                  <img src={film.poster} alt={`Affiche du film ${film.title}`} />
                  <div className="film-content">
                    <p className={`status ${film.available ? "status-available" : "status-unavailable"}`}>
                      <span className="status-dot" aria-hidden="true" />
                      {film.available ? "Places disponibles" : "Complet"}
                    </p>
                    <h3>
                      <button
                        type="button"
                        className="film-select"
                        aria-pressed={selected === film.title}
                        onClick={() => setSelected(film.title)}
                      >
                        {film.title}
                      </button>
                    </h3>
                    <p>{film.genre} · {film.time}</p>
                    <button
                      type="button"
                      className="favorite"
                      aria-pressed={favorites.includes(film.id)}
                      aria-label={`Ajouter ${film.title} aux favoris`}
                      onClick={() => toggleFavorite(film.id)}
                    >
                      <span aria-hidden="true">{favorites.includes(film.id) ? "★" : "☆"}</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <p className="selection" role="status" aria-live="polite">
          {selected && `Film sélectionné : ${selected}`}
        </p>
      </main>
    </>
  );
}