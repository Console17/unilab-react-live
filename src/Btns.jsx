const Btns = ({ addCard, clearCards, toggleCards }) => {
  return (
    <div className="btns-div">
      <div className="main-bts">
        <button className="add-btn" onClick={addCard}>
          Add Item
        </button>
        <button className="clear-btn" onClick={clearCards}>
          Clear
        </button>
      </div>
      <button onClick={toggleCards}>Toggle Cards</button>
    </div>
  );
};

export default Btns;
