function BuscarEstudiante({ search, setSearch, handleSearch, handleClearSearch }) {
  return (
    <div>
      <h2>Consulta de estudiantes</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar por nombre o apellido"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch}>
          Buscar
        </button>

        <button onClick={handleClearSearch}>
          Limpiar
        </button>
      </div>
    </div>
  );
}

export default BuscarEstudiante;