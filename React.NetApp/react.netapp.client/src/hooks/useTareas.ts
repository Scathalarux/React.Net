import { useCallback, useState } from "react";
import { getListadoTareas } from "../services/tareas";

export function useTareas() {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorTareas, setErrorTareas] = useState<null | string>(null);

  const getTareas = useCallback(async () => {
    console.log("mostrando listado tareas");
    try {
      setLoading(true);
      setErrorTareas(null);
      const listadoTareas = await getListadoTareas();
      setTareas(listadoTareas);
    } catch (e) {
      console.log(e);
      setErrorTareas("No se han podido cargar correctamente las tareas");
    } finally {
      setLoading(false);
    }
  }, []);

  return { getTareas, tareas, loading, errorTareas };
}
