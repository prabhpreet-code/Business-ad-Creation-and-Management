import axios from "./axios";
import sendFileToIPFS from "../utils/sendFileToIpfs";

const updateData = async (id, form, data) => {
  try {
    if (form.getValues("multimedia") != undefined) {
      const hash = await sendFileToIPFS(form.getValues("multimedia"));
      data.multimedia = hash;
    }

    const response = await axios.put(`/advertisement/${id}`, data, {
      withCredentials: true,
    });

    if (response.data.success === true) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};
export default updateData;
