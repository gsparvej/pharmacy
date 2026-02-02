import axios from "axios";


export const getAllItemMaster = async () => {
    try {
        const res = await axios.get("http://localhost:5000/api/itemMaster/all");
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

