function BookingsControls({ currentView, onChange }) {
  return (
    <div>
      <button
        className={currentView === "LIST" ? "active" : ""}
        onClick={() => onChange("LIST")}
      >
        List
      </button>
      <button
        className={currentView === "CHART" ? "active" : ""}
        onClick={() => onChange("CHART")}
      >
        Chart
      </button>
    </div>
  );
}

export default BookingsControls;
