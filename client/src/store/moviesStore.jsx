// /store/moviesStore.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
const initialMovies = {
  Blockbuster_movies: [
    "tt0111161", // The Shawshank Redemption
    "tt0068646", // The Godfather
    "tt0468569", // The Dark Knight
    "tt0109830", // Forrest Gump
    "tt0137523", // Fight Club
    "tt1375666", // Inception
    "tt0120737", // The Lord of the Rings: The Fellowship of the Ring
    "tt0133093", // The Matrix
    "tt0110912", // Pulp Fiction
    "tt0816692",
    "tt0167260", // Interstellar
    "tt0080684", // Star Wars: Episode V - The Empire Strikes Back
    "tt4154796", // Avengers: Endgame
    "tt4154756", // Avengers: Infinity War
    "tt4633694", // Spider-Man: Into the Spider-Verse
    "tt7286456", // Joker
    "tt1853728", // Django Unchained
    "tt0993846", // The Wolf of Wall Street
    "tt0120815", // Saving Private Ryan
    "tt0088763", // Back to the Future
  ],
  Action_movies: [
    "tt1392190", // Mad Max: Fury Road
    "tt2911666", // John Wick
    "tt0095016", // Die Hard
    "tt0172495", // Gladiator
    "tt0848228", // The Avengers
    "tt0371746", // Iron Man
    "tt10872600", // Spider-Man: No Way Home
    "tt3501632", // Thor: Ragnarok
    "tt1431045", // Deadpool
    "tt3315342", // Logan
    "tt1877830", // The Batman
    "tt4154796", // Avengers: Endgame
    "tt4154756", // Avengers: Infinity War
    "tt1211837", // Doctor Strange
    "tt1825683", // Black Panther
    "tt9376612", // Shang-Chi and the Legend of the Ten Rings
    "tt0232500", // The Fast and the Furious
    "tt2820852", // Furious 7
    "tt4633694", // Spider-Man: Into the Spider-Verse
    "tt1630029", // Avatar: The Way of Water
  ],
  Comedy_movies: [
    "tt1119646", // The Hangover
    "tt0829482", // Superbad
    "tt0838283", // Step Brothers
    "tt1478338", // Bridesmaids
    "tt0357413", // Anchorman
    "tt0109686", // Dumb and Dumber
    "tt1232829", // 21 Jump Street
    "tt3104988", // Crazy Rich Asians
    "tt0405422", // The 40-Year-Old Virgin
    "tt0942385", // Tropic Thunder
    "tt1156398", // Zombieland
    "tt2704998", // Game Night
    "tt1981677", // Pitch Perfect
    "tt1723121", // We're the Millers
    "tt1499658", // Horrible Bosses
    "tt2278388", // The Grand Budapest Hotel
    "tt2283362", // Jumanji: Welcome to the Jungle
    "tt0377092", // Mean Girls
    "tt0356150", // EuroTrip
    "tt1637725", // Ted
  ],
  Drama_movies: [
    "tt0111161", // The Shawshank Redemption
    "tt0109830", // Forrest Gump
    "tt0137523", // Fight Club
    "tt0268978", // A Beautiful Mind
    "tt0454921", // The Pursuit of Happyness
    "tt0119217", // Good Will Hunting
    "tt0120689", // The Green Mile
    "tt0169547", // American Beauty
    "tt0068646", // The Godfather
    "tt0071562", // The Godfather Part II
    "tt0108052", // Schindler's List
    "tt2024544", // 12 Years a Slave
    "tt0469494", // There Will Be Blood
    "tt1285016", // The Social Network
    "tt7286456", // Joker
    "tt2582802", // Whiplash
    "tt6751668", // Parasite
    "tt3783958", // La La Land
    "tt4975722", // Moonlight
    "tt9770150", // Nomadland
  ],
  Horror_movies: [
    "tt7784604", // Hereditary
    "tt1457767", // The Conjuring
    "tt0081505", // The Shining
    "tt8772262", // Midsommar
    "tt0102926", // The Silence of the Lambs
    "tt0084787", // The Thing
    "tt4263482", // The Witch
    "tt3065204", // The Conjuring 2
    "tt2321549", // The Babadook
    "tt1179904", // Paranormal Activity
    "tt1259528", // The Cabin in the Woods
    "tt3322940", // Annabelle
    "tt6644200", // A Quiet Place
    "tt5814060", // The Nun
    "tt4913966", // The Curse of La Llorona
    "tt6857112", // Us
    "tt0482606", // The Strangers
    "tt0365748", // Shaun of the Dead
    "tt5052448", // Get Out
    "tt0084516", // Poltergeist
  ],
  SciFi_movies: [
    "tt0133093", // The Matrix
    "tt1375666", // Inception
    "tt0816692", // Interstellar
    "tt0083658", // Blade Runner
    "tt0088247", // The Terminator
    "tt0120915", // Star Wars: Episode I - The Phantom Menace
    "tt2488496", // Star Wars: The Force Awakens
    "tt4154796", // Avengers: Endgame
    "tt0499549", // Avatar
    "tt1630029", // Avatar: The Way of Water
    "tt1454468", // Gravity
    "tt2543164", // Arrival
    "tt1856101", // Blade Runner 2049
    "tt11866324", // Dune
    "tt0080684", // The Empire Strikes Back
    "tt0076759", // Star Wars: A New Hope
    "tt0369610", // Jurassic World
    "tt6105098", // The Wandering Earth
    "tt2316204", // Alien: Covenant
    "tt0114369", // Se7en
  ],
  Animation_movies: [
    "tt4633694", // Spider-Man: Into the Spider-Verse
    "tt2294629", // Frozen
    "tt2096673", // Inside Out
    "tt1979388", // Frozen II
    "tt2380307", // Coco
    "tt3915174", // Puss in Boots: The Last Wish
    "tt0245429", // Spirited Away
    "tt4154796", // Big Hero 6
    "tt0317219", // Finding Nemo
    "tt0266543", // Finding Dory
    "tt1049413", // Up
    "tt2948356", // Zootopia
    "tt0892769", // How to Train Your Dragon
    "tt2294629", // Shrek
    "tt0110357", // The Lion King
    "tt0103639", // Aladdin
    "tt0126029", // Shrek 2
    "tt1453405", // Monsters University
    "tt0435761", // Toy Story 3
    "tt2096673", // Toy Story 4
  ],
  Romance_movies: [
    "tt0109830", // Forrest Gump
    "tt0120338", // Titanic
    "tt0332280", // The Notebook
    "tt3783958", // La La Land
    "tt1825683", // Crazy Rich Asians
    "tt0102926", // Pretty Woman
    "tt0234215", // Moulin Rouge!
    "tt0414387", // Pride & Prejudice
    "tt2209418", // The Fault in Our Stars
    "tt0338013", // Eternal Sunshine of the Spotless Mind
    "tt0108160", // Sleepless in Seattle
    "tt0117509", // Jerry Maguire
    "tt0112573", // Braveheart
    "tt0087332", // Sixteen Candles
    "tt0147800", // 10 Things I Hate About You
    "tt2294629", // Beauty and the Beast
    "tt1293847", // Dear John
    "tt0414387", // Sense and Sensibility
    "tt0053291", // Some Like It Hot
    "tt0107048", // Groundhog Day
  ],
  Thriller_movies: [
    "tt0114369", // Se7en
    "tt0137523", // Fight Club
    "tt1130884", // Shutter Island
    "tt0266697", // Kill Bill: Vol. 1
    "tt0102926", // The Silence of the Lambs
    "tt0167404", // The Sixth Sense
    "tt0209144", // Memento
    "tt0360486", // Collateral
    "tt0110413", // Léon: The Professional
    "tt0114369", // Heat
    "tt0114369", // The Departed
    "tt2267998", // Gone Girl
    "tt0387764", // The Bourne Ultimatum
    "tt0169547", // American Beauty
    "tt0120586", // American History X
    "tt7286456", // Joker
    "tt1853728", // Django Unchained
    "tt0167404", // Unbreakable
    "tt0482571", // The Prestige
    "tt0816692", // Interstellar
  ],
  Mystery_movies: [
    "tt2267998", // Gone Girl
    "tt1130884", // Shutter Island
    "tt1375666", // Inception
    "tt0137523", // Fight Club
    "tt0209144", // Memento
    "tt0167404", // The Sixth Sense
    "tt0482571", // The Prestige
    "tt1853728", // Prisoners
    "tt0110413", // Léon: The Professional
    "tt1375666", // Tenet
    "tt2543164", // Arrival
    "tt0480249", // I Am Legend
    "tt0816692", // Interstellar
    "tt1375666", // Paprika
    "tt0114369", // Se7en
    "tt0114369", // Zodiac
    "tt0137523", // The Game
    "tt0209144", // Mulholland Drive
    "tt0167404", // Mystic River
    "tt1375666", // Oldboy
  ],
  // ... add all other categories (Drama_movies, Horror_movies, etc)
};
// --- keep your existing initialMovies (IDs only) declared above this line ---

const MoviesContext = createContext(null);
const CACHE_KEY = "moviesCacheV1";
const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours
// const OMDB_KEY = import.meta.env.VITE_OMDB_KEY; // if CRA: process.env.REACT_APP_OMDB_KEY

const OMDB_KEY =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_OMDB_KEY) ||
  (typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_OMDB_KEY) ||
  "";
function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed;
  } catch {
    return null;
  }
}

function saveCache(data) {
  try {
    const record = { savedAt: Date.now(), data };
    localStorage.setItem(CACHE_KEY, JSON.stringify(record));
  } catch {}
}

function isFresh(cache) {
  if (!cache || !cache.savedAt) return false;
  return Date.now() - cache.savedAt < CACHE_MAX_AGE_MS;
}

export function MoviesProvider({ children }) {
  console.log("OMDB_KEY:", OMDB_KEY);
  // Start with IDs so app can boot; we’ll replace with detailed objects as soon as possible
  const [movies, setMovies] = useState(initialMovies);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchByIds = useCallback(async (ids = []) => {
    // Fetch details for each IMDb ID; fallback if anything fails
    const results = await Promise.all(
      ids.map(async (id) => {
        try {
          if (!OMDB_KEY) throw new Error("OMDb API key missing");
          const res = await fetch(
            `https://www.omdbapi.com/?i=${id}&apikey=${OMDB_KEY}`
          );
          const data = await res.json();
          console.log("Fetched:", id, data);
          if (!data || data.Response === "False") {
            console.warn("OMDb returned an error for", id, data?.Error);
          }
          if (data && data.Response !== "False") {
            return {
              imdbID: data.imdbID,
              Title: data.Title,
              Poster: data.Poster && data.Poster !== "N/A" ? data.Poster : null,
              Year: data.Year,
              Type: data.Type,
            };
          }
        } catch (err) {
          console.error("OMDb fetch failed for", id, err);
        }
        // Fallback minimal object so UI still renders a card
        return { imdbID: id, Title: id, Poster: null };
      })
    );
    return results.filter(Boolean);
  }, []);

  const buildDetailedMovies = useCallback(async () => {
    // Turn every category’s ID array into an array of detailed objects
    const entries = await Promise.all(
      Object.entries(initialMovies).map(async ([key, ids]) => {
        const detailed = await fetchByIds(ids);
        return [key, detailed];
      })
    );
    return Object.fromEntries(entries);
  }, [fetchByIds]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 1) Try cache
      const cached = loadCache();
      if (isFresh(cached)) {
        setMovies(cached.data);
        return;
      }
      // 2) Otherwise fetch and cache
      const detailed = await buildDetailedMovies();
      setMovies(detailed);
      saveCache(detailed);
    } catch (e) {
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  }, [buildDetailedMovies]);

  useEffect(() => {
    // On provider mount, rehydrate immediately (fast UI), then fetch if needed
    const cached = loadCache();
    if (cached?.data) {
      setMovies(cached.data); // instant paint from cache (even if stale)
      setLoading(false);
      // if stale, refresh in the background
      if (!isFresh(cached)) refresh();
    } else {
      // no cache -> fetch
      refresh();
    }
  }, [refresh]);

  return (
    <MoviesContext.Provider value={{ movies, loading, error, refresh }}>
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  const ctx = useContext(MoviesContext);
  if (!ctx) throw new Error("useMovies must be used inside MoviesProvider");
  return ctx;
}
