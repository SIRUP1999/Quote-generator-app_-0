const FavouritesList = ({ favorites, onRemove }) => {
  return (
    <section className="favourites">
      <h2>Favourites ({favorites.length})</h2>

      {favorites.length === 0 ? (
        <p className="empty"> No favourites yet. Save a quote you like!.</p>
      ) : (
        <ul className="favourites_list">
          {favorites.map((fav) => (
            <li key={fav.id} className="favorite">
              <p className="favourite__text">"{fav.quote}"</p>
              <p className="favourite__author">"{fav.author}"</p>
              <button
                className="secondary"
                onClick={() => onRemove(fav.id)}
                aria-label={`Remove quote by ${fav.author}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default FavouritesList;
