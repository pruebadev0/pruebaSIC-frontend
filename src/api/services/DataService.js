import axios from 'axios';
import { API_URL_SIC } from '../../Constants';

class DataService {
  getComputadores() {
    return axios.get(`${API_URL_SIC}/computadores`);
  }

  crearEncuesta(encuesta) {
    return axios.post(`${API_URL_SIC}/encuestas`, encuesta);
  }

  getEncuestasUsuario(username) {
    return axios.get(`${API_URL_SIC}/encuestas/${username}`);
  }

  borrarEncuesta(id) {
    return axios.delete(`${API_URL_SIC}/encuestas/${id}`);
  }
}

export default new DataService();