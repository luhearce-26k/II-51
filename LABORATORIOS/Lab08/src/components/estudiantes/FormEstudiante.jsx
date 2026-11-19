
function FormEstudiante({ form, handleChange, handleSubmit, handleCancel }) {
  return (
    <div>
      <h2>{form.id ? "Editar estudiante" : "Agregar estudiante"}</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
          />

          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
          />

          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={form.correo}
            onChange={handleChange}
          />

          <input
            type="text"
            name="carrera"
            placeholder="Carrera"
            value={form.carrera}
            onChange={handleChange}
          />

          <input
            type="date"
            name="fechaNac"
            value={form.fechaNac}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button type="submit" className="btn btn-primary">
            {form.id ? "Actualizar" : "Agregar"}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-danger"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormEstudiante;
