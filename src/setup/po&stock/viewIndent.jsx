import { useEffect, useState } from "react";

const ViewIndentForPurchase = () => {

    const [indent, setIndent] = useState([]);
    const [companyInfo, setCompanyInfo] = useState([]);
    const [itemMaster, setItemMaster] = useState([]);
    const [search, setSearch] = useState(null);
    const [itemTypes, setItemTypes] = useState([]);
    const [uofm, setUofm] = useState([]);

    useEffect(() => {
        const getIndent = JSON.parse(localStorage.getItem("indentForPurchase")) || [];
        setIndent(getIndent);
        const getCompanyInfo = JSON.parse(localStorage.getItem("companyInfo")) || [];
        setCompanyInfo(getCompanyInfo);
        const getItemMaster = JSON.parse(localStorage.getItem("itemMaster")) || [];
        setItemMaster(getItemMaster);
        const getItemTypes = JSON.parse(localStorage.getItem("itemType")) || [];
        setItemTypes(getItemTypes);
        const getUofm = JSON.parse(localStorage.getItem("unitOfMeasurements")) || [];
        setUofm(getUofm);
    }, []);



    return (
        <div>
            <h1>View Indent For Purchase</h1>
        </div>
    );
};

export default ViewIndentForPurchase;
