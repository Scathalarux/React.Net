import { FiltrosDefault, type FiltrosType } from "../utils/filtros";

type FiltrosProps = {
  getContactos: (value: FiltrosType | null) => void;
  filtros: FiltrosType;
  setFiltros: (value: FiltrosType) => void;
};

export function Filtros({ getContactos, filtros, setFiltros }: FiltrosProps) {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (filtros.Nombre == "" && filtros.Email == "" && filtros.Telefono == "") {
      getContactos(null);
    } else {
      getContactos(filtros);
    }
  };

  const handleChange = (event) => {
    setFiltros({
      ...filtros,
      [event.target.name]: event.target.value,
    });
  };

  const handleReset = () => {
    setFiltros(FiltrosDefault);
    getContactos(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className=" bg-gray-300 p-4 my-4 rounded-xl border border-gray-400/20 shadow-md
      "
    >
      <div className="flex justify-start gap-5 flex-wrap">
        <div className="flex flex-col">
          <label htmlFor="Nombre">Nombre</label>
          <input
            type="text"
            name="Nombre"
            id="Nombre"
            onChange={handleChange}
            className="bg-white px-3 py-2 my-2 rounded-xl"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="Nombre">Email</label>
          <input
            type="text"
            name="Email"
            id="Email"
            onChange={handleChange}
            className="bg-white px-3 py-2 my-2 rounded-xl"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="Nombre">Teléfono</label>
          <input
            type="text"
            name="Telefono"
            id="Telefono"
            onChange={handleChange}
            className="bg-white px-3 py-2 my-2 rounded-xl"
          />
        </div>
      </div>
      <div className="flex justify-start items-center space-x-4 pt-4 md:pt-5">
        <button
          type="submit"
          className="text-white bg-sky-900 box-border border border-transparent hover:bg-sky-800 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-xl text-sm px-4 py-2.5 focus:outline-none"
        >
          Filtrar
        </button>
        <button
          type="reset"
          className="text-body bg-gray-500  text-white box-border border-medium hover:bg-gray-600 focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-xl text-sm px-4 py-2.5 focus:outline-none"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
