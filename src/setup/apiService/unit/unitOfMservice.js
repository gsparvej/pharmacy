import axios from "axios";

export const addUnitOfM = async (unitOfM) => {
    const res = await axios.post("http://localhost:5000/api/unitOfM/save", unitOfM);
    return res.data;
};

export const getAllUnitOfM = async () => {
    const res = await axios.get("http://localhost:5000/api/unitOfM/all");
    return res.data;
};