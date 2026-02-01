
import axios from "axios";

export const addItemType = async (itemType) => {
    const res = await axios.post("http://localhost:5000/api/itemType/save", itemType);
    return res.data;
};


export const getAllItemType = async () => {
    const res = await axios.get("http://localhost:5000/api/itemType/all");
    return res.data;
};