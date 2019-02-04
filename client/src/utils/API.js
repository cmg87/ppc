import axios from "axios";

export default {
  createFactory: data => {
    let body = {
      name: data.name,
      children: data.children
    };
    return axios.post("/api/createFactory", body);
  },

  getFactory: () => axios.get("/api/getFactory"),

  deleteFactory: data => {
    let body = {
      id: data.id
    };
    axios.delete("/api/deleteFactory", body);
  },

  deleteAll: data => {
    axios.delete("/api/deleteAll");
  }
};
