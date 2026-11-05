import { useState, useEffect } from "react";
import QuoteCard from "./components/QuoteCard";
import FavoritesList from "./components/FavouritesList";
import { useFetch } from "./hooks/useFetch";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./App.css";

const API_URL = "https://dummyjson.com/quotes/random";

const COPY_LABELS = {
  idle: "Copy",
  copied: "Copied!",
  failed: "Copy failed",
};

function App() {
  const { data: currentQuote, status, refetch } = useFetch(API_URL);
  const [favorites, setFavorites] = useLocalStorage("favorite-quotes", []);
  const [copyStatus, setCopyStatus] = useState("idle");

  // Put the Copy button back to normal after 2 seconds
  useEffect(() => {
    if (copyStatus === "idle") return;
    const timerId = setTimeout(() => setCopyStatus("idle"), 2000);
    return () => clearTimeout(timerId);
  }, [copyStatus]);

  async function handleCopy() {
    if (!currentQuote) return;
    try {
      await navigator.clipboard.writeText(
        `"${currentQuote.quote}" — ${currentQuote.author}`,
      );
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  function toggleFavorite() {
    if (!currentQuote) return;
    setFavorites((prev) =>
      prev.some((fav) => fav.id === currentQuote.id)
        ? prev.filter((fav) => fav.id !== currentQuote.id)
        : [...prev, currentQuote],
    );
  }

  function removeFavorite(id) {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  }

  // Derived values: calculated on every render, never stored in state
  const hasQuote = status === "success" && currentQuote !== null;
  const isSaved =
    hasQuote && favorites.some((fav) => fav.id === currentQuote.id);

  return (
    <main className="app">
      <h1 className="title">Quote Generator</h1>

      <QuoteCard status={status} quote={currentQuote} onRetry={refetch} />

      <div className="actions">
        <button onClick={refetch} disabled={status === "loading"}>
          New quote
        </button>
        <button className="secondary" onClick={handleCopy} disabled={!hasQuote}>
          {COPY_LABELS[copyStatus]}
        </button>
        <button
          className="secondary"
          onClick={toggleFavorite}
          disabled={!hasQuote}
          aria-pressed={isSaved}
        >
          {isSaved ? "Saved ✓" : "Save"}
        </button>
      </div>

      <FavoritesList favorites={favorites} onRemove={removeFavorite} />
    </main>
  );
}

export default App;
