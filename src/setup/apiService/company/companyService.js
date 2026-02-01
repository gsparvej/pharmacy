
import axios from "axios";

export const addCompany = async (companyInfo) => {
    const res = await axios.post("http://localhost:5000/api/company/add", companyInfo);
    return res.data;
};

export const getAllCompany = async () => {
    const res = await axios.get("http://localhost:5000/api/company/all");
    return res.data;
};
