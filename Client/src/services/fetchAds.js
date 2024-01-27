import axios from "./axios";
const fetchAds = async () => {
  try {
    const user = localStorage.getItem("user");
    const id = JSON.parse(user).id;
    const response = await axios.get(`/advertisement?createdBy=${id}`, {
      withCredentials: true,
    });

    if (response.data.success === true) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};
export default fetchAds;
