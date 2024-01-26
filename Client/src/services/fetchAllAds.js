import axios from "./axios";
const fetchAllAds = async (location) => {
  try {
    const user = localStorage.getItem("user");
    const id = JSON.parse(user).id;
    console.log(id);
    if (location === undefined) return;
    const response = await axios.get(
      `/advertisement?target_audience=${location}&isStarted=false`,
      {
        withCredentials: true,
      }
    );
    console.log(response);
    console.log(response.data);

    if (response.data.success === true) {
      return response.data.advertisements;
    }
  } catch (err) {
    console.log(err);
  }
};
export default fetchAllAds;
