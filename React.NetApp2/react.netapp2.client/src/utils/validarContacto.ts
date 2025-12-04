import type { Contacto } from "../App";

export function validarContacto(contacto: Contacto) {
  if (contacto.nombre === "") {
    return new Error("El nombre es obligatorio");
  }
  if (contacto.email === "") {
    return new Error("El email es obligatorio");
  }
  if (contacto.telefono === "") {
    return new Error("El telefono es obligatorio");
  }

  if (contacto.nombre.length < 3) {
    return new Error("El nombre debe tener más de 3 caracteres");
  }

  return null;
}
