import axios from "./axios";
const fetchOldData = async (id) => {
  try {
    console.log(id);
    const response = await axios.get(`/advertisement/${id}`, {
      withCredentials: true,
    });
    console.log(response);
    console.log(response.data);

    if (response.data.success === true) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};
export default fetchOldData;
