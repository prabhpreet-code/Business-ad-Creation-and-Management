import axios from "./axios";
const fetchAllAds = async (location) => {
  try {
    if (location === undefined) return;
    const response = await axios.get(
      `/advertisement?target_audience=${location}&isStarted=true`,
      {
        withCredentials: true,
      }
    );

    if (response.data.success === true) {
      return response.data.advertisements;
    }
  } catch (err) {
    console.log(err);
  }
};
export default fetchAllAds;
