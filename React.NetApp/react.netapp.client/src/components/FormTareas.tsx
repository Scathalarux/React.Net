import { useState } from "react";

const TAMANIO_INPUT = 50;

type FormTareasProps = {
  getTareas: () => void;
};

export function FormTareas({ getTareas }: FormTareasProps) {
  const [newTarea, setNewTarea] = useState<string | undefined>("");
  const [errorNewTarea, setErrorNewTarea] = useState<null | string>(null);

  const addTareaNueva = async (descripcion: string) => {
    const response = await fetch("/api/tarea/tarea", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        descripcion: descripcion,
        fecha_registro: new Date(),
      }),
    });
    if (response.ok) {
      console.log(await response.json());
      setNewTarea("");
      setErrorNewTarea(null);

      getTareas();
    } else {
      setErrorNewTarea("No se ha podido añadir la nueva tarea");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //Obtener la descripción de la nueva tarea
    const { descripcion } = Object.fromEntries(new FormData(event.target));
    console.log(descripcion);
    if (descripcion === "") {
      setErrorNewTarea("No se puede añadir una tarea sin descripción.");
      return;
    }

    //añadir la tarea a la base de datos
    addTareaNueva(descripcion.toString());
  };

  const handleChange = (event) => {
    const descripcionTarea = event.target.value;
    setNewTarea(descripcionTarea);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="form flex items-center justify-center gap-10"
      >
        <input
          name="descripcion"
          className="border border-transparent border-b-blue-900 focus:outline-hidden p-2"
          type="text"
          value={newTarea}
          placeholder="Introduce la descripción de la tarea"
          size={TAMANIO_INPUT}
          onChange={handleChange}
        />

        <button className="px-3 py-2 bg-sky-800 text-white rounded-2xl">
          Añadir
        </button>
      </form>
      {errorNewTarea && <p className="text-red-900 text-xs">{errorNewTarea}</p>}
    </>
  );
}
