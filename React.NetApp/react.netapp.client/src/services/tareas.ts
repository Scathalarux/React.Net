export const getListadoTareas = async () => {
  try {
    const response = await fetch("/api/tarea/listaTareas");
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
    throw new Error("No se ha podido obtener el listado de tareas");
  }
};

export const addTarea = async (descripcion: string) => {
  try {
    const response = await fetch("/api/tarea/tarea", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        descripcion: descripcion,
        fecha_registro: new Date(),
      }),
    });
    return response;
  } catch (e) {
    console.log(e);
    throw new Error("No se ha podido añadir la tarea");
  }
};

export const deleteTarea = async (id: number) => {
  try {
    await fetch(`/api/tarea/tarea/${id}`, {
      method: "DELETE",
    });
  } catch (e) {
    console.log(e);
    throw new Error("No se ha podido borrar la tarea");
  }
};
