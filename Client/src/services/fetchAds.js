import axios from "./axios";
const fetchAds = async () => {
  try {
    const user = localStorage.getItem("user");
    const id = JSON.parse(user).id;
    console.log(id);
    const response = await axios.get(`/advertisement?createdBy=${id}`, {
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
export default fetchAds;
