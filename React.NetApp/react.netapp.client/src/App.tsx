import "./App.css";
import { ListaTareas } from "./components/ListaTareas.tsx";
import { FormTareas } from "./components/FormTareas.tsx";
import { useEffect } from "react";
//import { useTareas } from "./hooks/useTareas.ts";
import { useTareas } from "./hooks/useTareas.ts";

function App() {
  const { tareas, loading, errorTareas, getTareas } = useTareas();

  useEffect(() => {
    getTareas();
  }, []);

  return (
    <div className="max-w-xl mx-auto min-h-dvh flex flex-col justify-evenly font-sans">
      <header className="flex flex-col justify-center mx-auto mt-2 gap-4">
        <h1 className="text-6xl">Gestor de tareas</h1>
        <p>Realizado utilizando React (TS), Tailwind y .Net</p>
      </header>
      <main className="mx-auto my-4 bg-white p-4 rounded-2xl flex flex-col gap-4">
        <FormTareas getTareas={getTareas} />
        {loading ? <p>Cargando...</p> : <ListaTareas tareas={tareas} getTareas={getTareas}/>}
        {errorTareas && <p>{errorTareas}</p>}
      </main>
      <footer className="mx-auto my-4 gap-4 text-white font-light">
        Creado por @LaraCV
      </footer>
    </div>
  );
}

export default App;
