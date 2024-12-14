
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/notes";

export const retrieveNote = async (noteId, password) => {
  const response = await axios.get(`${API_BASE_URL}/${noteId}/retrieve/`, {
    params: { password },
  });
  return response;
};

export const createNote = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/create/`, data);
  return response;
};




