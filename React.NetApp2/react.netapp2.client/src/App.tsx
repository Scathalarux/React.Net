import { useEffect, useState } from "react";
import "./App.css";
import { ModalContacto } from "./components/ModalContacto";
import { TablaContactos } from "./components/TablaContactos";
import { useContacto } from "./hooks/useContacto";
import { FiltrosDefault, type FiltrosType } from "./utils/filtros";
import { Filtros } from "./components/Filtros";
import { Paginacion } from "./components/Paginacion";

export type Contacto = {
  id?: number;
  nombre: string;
  email: string;
  telefono: string;
};

function App() {
  const [contactoEdit, setContactoEdit] = useState<null | Contacto>(null);
  const [showModal, setShowModal] = useState(false);
  const [filtros, setFiltros] = useState<FiltrosType>(FiltrosDefault);
  const [isEdit, setIsEdit] = useState(false);
  const {
    addContacto,
    getContactos,
    editContacto,
    deleteContacto,
    contactos,
    erroresContactos,
    setErroresContactos,
    isLoading,
    metadata,
  } = useContacto();

  const cerrarModal = () => {
    setContactoEdit(null);
    setShowModal(!showModal);
  };
  useEffect(() => {
    if (metadata != undefined) {
      const metadataParsed = JSON.parse(metadata);
      setFiltros({
        ...filtros,
        TotalPages: metadataParsed.TotalPages,
        TotalCount: metadataParsed.TotalCount,
        PageSize: metadataParsed.PageSize,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactos]);

  useEffect(() => {
    getContactos(filtros);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseAlert = () => {
    setErroresContactos(null);
  };

  return (
    <div className="container mx-auto font-sans">
      <h1 className="text-7xl my-5">Gestor de contactos</h1>
      <div className="my-10 bg-sky-50 p-10 rounded-2xl shadow-2xl">
        <div>
          <h2 className="text-3xl">Lista de contactos</h2>
        </div>
        <Filtros
          getContactos={getContactos}
          filtros={filtros}
          setFiltros={setFiltros}
        />
        <div className="flex flex-col">
          <button
            type="button"
            data-modal-target="default-modal"
            data-modal-toggle="default-modal"
            onClick={() => setShowModal(!showModal)}
            className="bg-green-800 text-sm hover:bg-green-700 hover:cursor-pointer text-white px-3 py-2 rounded-xl self-end my-3 border border-green-600/20 shadow-md"
          >
            Nuevo contacto
          </button>
          <ModalContacto
            key={null}
            showModal={showModal}
            setShowModal={setShowModal}
            cerrarModal={cerrarModal}
            addContacto={addContacto}
            contactoEdit={contactoEdit}
            setContactoEdit={setContactoEdit}
            editContacto={editContacto}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
          {erroresContactos && (
            <div
              className="flex items-start my-5 bg-orange-100 border-t-4 border-orange-500 rounded-md text-teal-900 px-4 py-3 shadow-md"
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <svg
                    className="fill-current h-6 w-6 text-orange-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>

                <div>
                  <p className="font-bold">Error</p>
                  <p className="text-sm">{erroresContactos}</p>
                </div>
              </div>
              <span
                onClick={handleCloseAlert}
                className="closebtn hover:cursor-pointer px-2"
              >
                &times;
              </span>
            </div>
          )}
          <div className="relative overflow-x-auto bg-sky-900 shadow-xs rounded-xl border">
            {isLoading ? (
              <div className="flex justify-center">
                <span className="p-5 text-white">Cargando...</span>
              </div>
            ) : contactos.length !== 0 ? (
              <>
                <TablaContactos
                  contactos={contactos}
                  setContactoEdit={setContactoEdit}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  deleteContacto={deleteContacto}
                  setIsEdit={setIsEdit}
                />
                <Paginacion
                  filtros={filtros}
                  setFiltros={setFiltros}
                  getContactos={getContactos}
                />
              </>
            ) : (
              <p className="text-xs p-5">No hay resultados...</p>
            )}
            {erroresContactos && (
              <p className="text-red-800">{erroresContactos}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
