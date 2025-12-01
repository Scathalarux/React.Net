import { dateFormatter } from "../utils.ts";
import { deleteTarea } from "../services/tareas.ts";
import { useState } from "react";

export type Tarea = {
  id: number;
  descripcion: string;
  fecha_registro: string;
};

type TareaProps = {
  tarea: Tarea;
  getTareas: () => void;
};

export function Tarea({ tarea, getTareas }: TareaProps) {
  const [errorDeleteTarea, setErrorDeleteTarea] = useState<string | null>(null);

  const deleteTarea = async (id: number) => {
    const response = await fetch(`/api/tarea/tarea/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log(await response);
      setErrorDeleteTarea(null);

      getTareas();
    } else {
      setErrorDeleteTarea("No se ha podido eliminar la tarea");
    }
  };

  const handleClick = () => {
    deleteTarea(tarea.id);
  };

  return (
    <div className="flex flex-col p-4 border border-blue-300 rounded-2xl">
      <h5 className="font-mono">{tarea.descripcion}</h5>
      <div className="flex justify-between items-center gap-x-10">
        <span className="text-xs text-gray-500">
          {dateFormatter(tarea.fecha_registro)}
        </span>
        <button
          className="px-3 py-2 bg-red-800 text-white rounded-2xl"
          onClick={handleClick}
        >
          Eliminar
        </button>
      </div>
      {errorDeleteTarea !== null ? (
        <p className="text-xs text-red-800">{errorDeleteTarea}</p>
      ) : (
        ""
      )}
    </div>
  );
}
