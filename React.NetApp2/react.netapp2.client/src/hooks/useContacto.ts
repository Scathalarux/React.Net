import { useState } from "react";
import type { Contacto } from "../App";
import type { FiltrosType } from "../utils/filtros";

export function useContacto() {
  const [contactos, setContactos] = useState([]);
  const [erroresContactos, setErroresContactos] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState<null | string>();

  const getContactos = async (filtros: FiltrosType | null) => {
    setIsLoading(true);
    let cadenaFiltros = "";
    for (const prop in filtros) {
      if (filtros[prop] != "") {
        cadenaFiltros += `${prop}=${filtros[prop]}&`;
      }
    }
    cadenaFiltros = cadenaFiltros.slice(0, -1);

    const result = await fetch(`/api/contacto/lista?${cadenaFiltros}`, {
      method: "GET",
    });

    if (result.ok) {
      const metadata = result.headers.get("X-Pagination");
      const json = await result.json();

      setContactos(json);
      setMetadata(metadata);
    } else {
      setErroresContactos("No se han podido obtener los contactos");
    }
    setIsLoading(false);
  };

  const addContacto = async (contacto: Contacto) => {
    setIsLoading(true);
    const result = await fetch("/api/contacto/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        nombre: contacto.nombre,
        email: contacto.email,
        telefono: contacto.telefono,
      }),
    });

    if (result.ok) {
      //console.log(await result.json());
      getContactos(null);
    } else if (result.status == 400) {
      setErroresContactos(
        `No se ha podido añadir el nuevo contacto por los siguientes errores: ${await result.json()}`
      );
    } else {
      setErroresContactos(`No se ha podido añadir el nuevo contacto.`);
    }
    setIsLoading(false);
  };

  const editContacto = async (contacto: Contacto) => {
    setIsLoading(true);
    const result = await fetch("/api/contacto/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        id: contacto.id,
        nombre: contacto.nombre,
        email: contacto.email,
        telefono: contacto.telefono,
      }),
    });

    if (result.ok) {
      //console.log(await result.json());
      getContactos(null);
    } else if (result.status == 400) {
      setErroresContactos(
        `No se ha podido modificar el contacto por los siguientes errores: ${await result.json()}`
      );
    } else {
      setErroresContactos(`No se ha podido modificar el contacto.`);
    }
    setIsLoading(false);
  };

  const deleteContacto = async (contacto: Contacto) => {
    setIsLoading(true);
    const result = await fetch(`/api/contacto/delete/${contacto.id}`, {
      method: "DELETE",
    });

    if (result.ok) {
      //console.log(await result.json());
      getContactos(null);
    } else {
      setErroresContactos(`No se ha podido eliminar el contacto.`);
    }
    setIsLoading(false);
  };

  return {
    addContacto,
    getContactos,
    editContacto,
    deleteContacto,
    contactos,
    erroresContactos,
    setErroresContactos,
    isLoading,
    metadata,
  };
}
