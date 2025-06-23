import {apiClient} from "./api";

const url = "/thermo";

export const getLotes = async () => {
  try {
    const response = await apiClient.get(url + "/lotes");
    return response.data;
  } catch (error) {
    console.error("Error al obtener extrusion en el front:", error);
    throw error;
  }
};

export const getLastProcess = async ({lote}: {lote: string}) => {
  try {
    const params = {
      lote,
    };

    const response = await apiClient.get(url + "/last-process", {params});
    return response.data;
  } catch (error) {
    console.error("Error al obtener extrusion en el front:", error);
    throw error;
  }
};

export const getNextProcess = async ({lote}: {lote: string}) => {
  try {
    const params = {
      lote,
    };

    const response = await apiClient.get(url + "/next-process", {params});
    return response.data;
  } catch (error) {
    console.error("Error al obtener extrusion en el front:", error);
    throw error;
  }
};
