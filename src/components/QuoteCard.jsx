function QuoteCard({ status, quote, onRetry }) {
  return (
    <section className="card" aria-live="polite">
      {status === "loading" && <p className="message"> Loading a quote...</p>}

      {status === "error" && (
        <div className="message">
          <p>Could not load a quote. Check your connection and try again</p>
          <button onClick={onRetry}> Try again</button>
        </div>
      )}

      {status === "success" && (
        <figure>
          <blockquote>
            <p className="quote">{quote.quote}</p>
          </blockquote>
          <figcaption className="author">{quote.author}</figcaption>
        </figure>
      )}
    </section>
  );
}

export default QuoteCard;
