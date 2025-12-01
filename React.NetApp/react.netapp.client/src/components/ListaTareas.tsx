import { Tarea } from "./Tarea.tsx";

type ListaTareasProps = {
  tareas: Tarea[];
  getTareas: () => void;
};

export function ListaTareas({ tareas ,getTareas}: ListaTareasProps) {
  return (
    <div className="bg-white p-4 rounded-2xl flex flex-col gap-4">
      {tareas.length !== 0 ? (
        tareas.map((tarea) => {
          return <Tarea key={tarea.id} tarea={tarea} getTareas={getTareas}/>;
        })
      ) : (
        <p>Aún no hay tareas pendientes...</p>
      )}
    </div>
  );
}
