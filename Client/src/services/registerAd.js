import axios from "./axios";
import sendFileToIPFS from "../utils/sendFileToIpfs";

const registerAd = async (form, data) => {
  try {
    const hash = await sendFileToIPFS(form.getValues("multimedia"));
    data.multimedia = hash;

    const response = await axios.post("/advertisement", data, {
      withCredentials: true,
    });

    if (response.data.success === true) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};
export default registerAd;
