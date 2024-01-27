import axios from "./axios";
const fetchOldData = async (id) => {
  try {
    const response = await axios.get(`/advertisement/${id}`, {
      withCredentials: true,
    });


    if (response.data.success === true) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};
export default fetchOldData;
