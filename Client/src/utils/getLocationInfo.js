import axios from "axios";
export const  getLocationInfo=async(latitude, longitude)=> {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${
    import.meta.env.VITE_GEOCODING_API
  }`;
  const response = await axios.get(url);

  return response.data.results[0].components.country;
}
