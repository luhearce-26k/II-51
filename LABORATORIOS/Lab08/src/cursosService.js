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
  relacionadas con la tabla "cursoss".

  ¿Por qué es importante?
  - Evita mezclar lógica de base de datos con la UI (React)
  - Hace el código más ordenado y reutilizable
  - Permite replicar fácilmente para otras tablas
    (cursos, profesores, productos, etc.)
*/

/*
  ------------------------------------------------------------
  Nombre de la tabla
  ------------------------------------------------------------
  Se define como constante para no repetir texto en todo el código
*/
const TABLA_NOMBRE = "cursoss";
const COLUMNAS_MOSTRAR = "id, nombre, apellido, correo, carrera, fechaNac";

/*
  ------------------------------------------------------------
  mapCursoPayload
  ------------------------------------------------------------
  Esta función recibe un objeto cursos y devuelve
  solo los campos necesarios para la base de datos.

  ¿Para qué sirve?
  - Evitar enviar datos innecesarios
  - Limpiar valores (trim)
  - Estandarizar inserts y updates
*/
const mapCursoPayload = (cursos) => ({
  nombre: cursos.nombre?.trim() || "",
  apellido: cursos.apellido?.trim() || "",
  correo: cursos.correo?.trim() || "",
  carrera: cursos.carrera?.trim() || "",
  fechaNac: cursos.fechaNac || null,
});


/*
  ------------------------------------------------------------
  Obtener cursoss
  ------------------------------------------------------------
  Permite obtener todos los cursoss.

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
    console.error("Error al cargar cursoss:", error);
    throw new Error("No se pudieron cargar los cursoss");
  }

  return data;
};

/*
  ------------------------------------------------------------
  Obtener cursos por ID
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
    console.error("Error al obtener cursos:", error);
    throw new Error("No se pudo obtener el cursos");
  }

  return data;
};

/*
  ------------------------------------------------------------
  Crear cursos
  ------------------------------------------------------------
  Inserta un nuevo registro en la base de datos
*/
export const crearCurso = async (cursos) => {
  const payload = mapCursoPayload(cursos);

  const { data, error } = await supabase
    .from(TABLA_NOMBRE)
    .insert([payload])
    .select(COLUMNAS_MOSTRAR)
    .single();

  if (error) {
    console.error("Error al crear cursos:", error);
    throw new Error("No se pudo crear el cursos");
  }

  return data;
};

/*
  ------------------------------------------------------------
  Actualizar cursos
  ------------------------------------------------------------
  Actualiza un registro existente
*/
export const actualizarCurso = async (id, cursos) => {
  const payload = mapCursoPayload(cursos);

  const { data, error } = await supabase
    .from(TABLA_NOMBRE)
    .update(payload)
    .eq("id", id)
    .select(COLUMNAS_MOSTRAR)
    .single();

  if (error) {
    console.error("Error al actualizar cursos:", error);
    throw new Error("No se pudo actualizar el cursos");
  }

  return data;
};

/*
  ------------------------------------------------------------
  Eliminar cursos
  ------------------------------------------------------------
  Elimina un registro por ID
*/
export const eliminarCurso = async (id) => {
  const { error } = await supabase
    .from(TABLA_NOMBRE)
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error al eliminar cursos:", error);
    throw new Error("No se pudo eliminar el cursos");
  }

  return true;
};

/*
  ------------------------------------------------------------
  Guardar cursos (create o update)
  ------------------------------------------------------------
  Esta función decide automáticamente si:
  - Crear (si no tiene id)
  - Actualizar (si ya tiene id)

  Esto simplifica mucho el código en React
*/
export const guardarCurso = async (cursos) => {
  if (cursos.id) {
    return await actualizarCurso(cursos.id, cursos);
  }

  return await crearCurso(cursos);
};

/*
  ============================================================
  ¿Cómo reutilizar este archivo?
  ============================================================

  Para otra tabla (ejemplo: cursos):

  1. Cambiar TABLE_NAME:
     const TABLE_NAME = "cursos";

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