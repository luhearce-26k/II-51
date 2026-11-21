// src/services/studentService.js

// Importamos el cliente de Supabase ya configurado
// Ajustar la ruta según el proyecto
// Ejemplo:
// import { supabase } from "../supabaseClient";
import { supabase } from "./supabaseClient";

/*
  ============================================================
  studentService.js
  ============================================================

  Propósito:
  Centralizar todas las operaciones de base de datos
  relacionadas con la tabla "cursos".

  ¿Por qué es importante?
  - Evita mezclar lógica de base de datos con la UI (React)
  - Hace el código más ordenado y reutilizable
  - Permite replicar fácilmente para otras tablas
    (curso, profesores, productos, etc.)
*/

/*
  ------------------------------------------------------------
  Nombre de la tabla
  ------------------------------------------------------------
  Se define como constante para no repetir texto en todo el código
*/
const TABLA_NOMBRE = "cursos";
const COLUMNAS_MOSTRAR = "id, nombre, apellido, correo, carrera, fechaNac";

/*
  ------------------------------------------------------------
  mapCursoPayload
  ------------------------------------------------------------
  Esta función recibe un objeto curso y devuelve
  solo los campos necesarios para la base de datos.

  ¿Para qué sirve?
  - Evitar enviar datos innecesarios
  - Limpiar valores (trim)
  - Estandarizar inserts y updates
*/
const mapCursoPayload = (curso) => ({
  nombre: curso.nombre?.trim() || "",
  apellido: curso.apellido?.trim() || "",
  correo: curso.correo?.trim() || "",
  carrera: curso.carrera?.trim() || "",
  fechaNac: curso.fechaNac || null,
});


/*
  ------------------------------------------------------------
  Obtener cursos
  ------------------------------------------------------------
  Permite obtener todos los cursos.

  Parámetro opcional:
  - search: texto para filtrar por nombre o apellido
*/
export const obtenerCursos = async (search = "") => {
  // Creamos la consulta base
  let query = supabase
    .from(TABLA_NOMBRE)
    .select(COLUMNAS_MOSTRAR)
    .order("id", { ascending: true });

  const term = search.trim();

  // Si hay texto, aplicamos filtro
  if (term) {
    query = query.or(`nombre.ilike.%${term}%,apellido.ilike.%${term}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error al cargar cursos:", error);
    throw new Error("No se pudieron cargar los cursos");
  }

  return data;
};

/*
  ------------------------------------------------------------
  Obtener curso por ID
  ------------------------------------------------------------
  Útil para:
  - Editar
  - Ver detalles
*/
export const obtenerCursoPorId = async (id) => {
  const { data, error } = await supabase
    .from(TABLA_NOMBRE)
    .select(COLUMNAS_MOSTRAR)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error al obtener curso:", error);
    throw new Error("No se pudo obtener el curso");
  }

  return data;
};

/*
  ------------------------------------------------------------
  Crear curso
  ------------------------------------------------------------
  Inserta un nuevo registro en la base de datos
*/
export const crearCurso = async (curso) => {
  const payload = mapCursoPayload(curso);

  const { data, error } = await supabase
    .from(TABLA_NOMBRE)
    .insert([payload])
    .select(COLUMNAS_MOSTRAR)
    .single();

  if (error) {
    console.error("Error al crear curso:", error);
    throw new Error("No se pudo crear el curso");
  }

  return data;
};

/*
  ------------------------------------------------------------
  Actualizar curso
  ------------------------------------------------------------
  Actualiza un registro existente
*/
export const actualizarCurso = async (id, curso) => {
  const payload = mapCursoPayload(curso);

  const { data, error } = await supabase
    .from(TABLA_NOMBRE)
    .update(payload)
    .eq("id", id)
    .select(COLUMNAS_MOSTRAR)
    .single();

  if (error) {
    console.error("Error al actualizar curso:", error);
    throw new Error("No se pudo actualizar el curso");
  }

  return data;
};

/*
  ------------------------------------------------------------
  Eliminar curso
  ------------------------------------------------------------
  Elimina un registro por ID
*/
export const eliminarCurso = async (id) => {
  const { error } = await supabase
    .from(TABLA_NOMBRE)
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error al eliminar curso:", error);
    throw new Error("No se pudo eliminar el curso");
  }

  return true;
};

/*
  ------------------------------------------------------------
  Guardar curso (create o update)
  ------------------------------------------------------------
  Esta función decide automáticamente si:
  - Crear (si no tiene id)
  - Actualizar (si ya tiene id)

  Esto simplifica mucho el código en React
*/
export const guardarCurso = async (curso) => {
  if (curso.id) {
    return await actualizarCurso(curso.id, curso);
  }

  return await crearCurso(curso);
};

/*
  ============================================================
  ¿Cómo reutilizar este archivo?
  ============================================================

  Para otra tabla (ejemplo: curso):

  1. Cambiar TABLE_NAME:
     const TABLE_NAME = "curso";

  2. Cambiar map:
     const mapCoursePayload = (course) => ({
       nombre: course.nombre,
       creditos: course.creditos
     });

  3. Cambiar campos en select:
     .select("id, nombre, creditos")

  4. Renombrar funciones:
     getCourses, createCourse, etc.

  Esto permite crear servicios rápidamente y mantener orden.
*/