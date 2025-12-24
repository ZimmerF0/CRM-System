export function TodoForm() {
  return (
    <div className="input-text">
      <input
        type="text"
        placeholder="Add todo item"
        minLength={2}
        maxLength={64}
        // value={input}
        // onChange={e => setInput(e.target.value)}
      />
      <button 
      className="btn"
      onClick={() => {

      }}
      >
        Add
      </button>
    </div>
  );
}