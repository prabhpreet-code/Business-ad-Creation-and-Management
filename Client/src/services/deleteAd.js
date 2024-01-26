import axios from "./axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const success = () => toast.success("Ad Deleted Successfully!");
const deleteAd = async (id) => {
  try {
    console.log(id);
    const response = await axios.delete(`/advertisement/${id}`, {
      withCredentials: true,
    });
    console.log(response);
    console.log(response.data);

    if (response.data.success === true) {
      success();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  } catch (err) {
    console.log(err);
  }
};
export default deleteAd;
