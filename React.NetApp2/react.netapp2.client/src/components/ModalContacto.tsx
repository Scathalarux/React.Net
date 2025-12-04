import { useEffect, useState, type ChangeEvent } from "react";
import type { Contacto } from "../App";
import { validarContacto } from "../utils/validarContacto";
import { InputLabel } from "./InputLabel";

type ModalContactoProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  addContacto: (contacto: Contacto) => void;
  contactoEdit: Contacto | null;
  setContactoEdit: (contacto: Contacto | null) => void;
  editContacto: (contacto: Contacto) => void;
  cerrarModal: () => void;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
};

const ModalContactoDefault = {
  id: 0,
  nombre: "",
  email: "",
  telefono: "",
};

export function ModalContacto({
  showModal,
  cerrarModal,
  addContacto,
  contactoEdit,
  editContacto,
  isEdit,
  setIsEdit,
}: ModalContactoProps) {
  const [newContacto, setNewContacto] =
    useState<Contacto>(ModalContactoDefault);
  const [erroresContacto, setErroresContacto] = useState<string | null>(null);

  useEffect(() => {
    if (contactoEdit !== null) {
      setNewContacto(contactoEdit);
    } else {
      setNewContacto(ModalContactoDefault);
    }
  }, [contactoEdit]);

  const handleChange = (event: ChangeEvent) => {
    setNewContacto({ ...newContacto, [event.target.name]: event.target.value });
    setErroresContacto(null);
  };

  const guardarContacto = () => {
    const errores = validarContacto(newContacto);
    if (errores === null) {
      setErroresContacto(null);
    } else {
      setErroresContacto(errores.message);
    }

    if (newContacto.id === 0) {
      if (errores !== null) {
        return;
      } else {
        addContacto(newContacto);
      }
    } else {
      if (errores !== null) {
        return;
      } else {
        editContacto(newContacto);
      }
    }
    setNewContacto(ModalContactoDefault);
    setIsEdit(false);
    cerrarModal();
  };

  return (
    <>
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="false"
        className={`${
          !showModal ? "hidden" : ""
        } bg-sky-200/60 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full mx-auto my-10 max-w-2xl max-h-full">
          <div className="relative bg-sky-100 border rounded-xl shadow-sm p-4 md:p-6">
            <div className="flex items-center justify-between border-b pb-4 md:pb-5">
              <h3 className="text-lg font-medium ">
                {newContacto.id === 0 ? "Añadir contacto" : "Editar contacto"}
              </h3>
              <button
                type="button"
                onClick={cerrarModal}
                className="text-body bg-transparent hover:bg-sky-800 hover:text-white rounded-xl text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18 17.94 6M18 18 6.06 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="space-y-4 md:space-y-6 py-4 md:py-6">
              <div className="flex flex-col justify-evenly items-center">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                  <div className="mt-2 m-auto">
                    <InputLabel
                      onChange={handleChange}
                      type={"text"}
                      nombre={"nombre"}
                      id={"nombre"}
                      labelText={"Nombre"}
                      disabled={newContacto.id != 0 && !isEdit}
                      value={newContacto.nombre}
                    />
                    <InputLabel
                      onChange={handleChange}
                      type={"email"}
                      nombre={"email"}
                      id={"email"}
                      labelText={"Email"}
                      disabled={newContacto.id != 0 && !isEdit}
                      value={newContacto.email}
                    />
                    <InputLabel
                      onChange={handleChange}
                      type={"text"}
                      nombre={"telefono"}
                      id={"telefono"}
                      labelText={"Telefono"}
                      disabled={newContacto.id != 0 && !isEdit}
                      value={newContacto.telefono}
                    />
                  </div>
                  {erroresContacto && (
                    <div className="text-red-900">{erroresContacto}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center border-t space-x-4 pt-4 md:pt-5">
              {((newContacto.id == 0 && !isEdit) ||
                (newContacto.id != 0 && isEdit)) && (
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  onClick={() => guardarContacto()}
                  className="text-white bg-green-800 box-border border border-transparent hover:bg-green-700 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-xl text-sm px-4 py-2.5 focus:outline-none"
                >
                  Guardar
                </button>
              )}
              <button
                data-modal-hide="default-modal"
                type="button"
                onClick={cerrarModal}
                className="text-body bg-red-800  text-white box-border border-medium hover:bg-red-700 focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-xl text-sm px-4 py-2.5 focus:outline-none"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
