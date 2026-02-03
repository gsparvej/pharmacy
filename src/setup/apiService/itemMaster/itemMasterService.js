import axios from "axios";


export const getAllItemMaster = async () => {
    try {
        const res = await axios.get("http://localhost:5000/api/itemMaster/all");
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

export const saveItemMaster = async (itemMaster) => {
    try {
        const res = await axios.post("http://localhost:5000/api/itemMaster/add", itemMaster);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
