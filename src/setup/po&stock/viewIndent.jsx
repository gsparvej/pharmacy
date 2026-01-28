import { useEffect, useState } from "react";

const ViewIndentForPurchase = () => {

    const [indent, setIndent] = useState([]);
    const [companyInfo, setCompanyInfo] = useState([]);
    const [itemMaster, setItemMaster] = useState([]);
    const [unitOfM, setUnitOfM] = useState([]);

    useEffect(() => {
        const getIndent = JSON.parse(localStorage.getItem("indentForPurchase")) || [];
        setIndent(getIndent);
        const getCompanyInfo = JSON.parse(localStorage.getItem("companyInfo")) || [];
        setCompanyInfo(getCompanyInfo);
        const getItemMaster = JSON.parse(localStorage.getItem("itemMaster")) || [];
        setItemMaster(getItemMaster);
        const getUnitOfM = JSON.parse(localStorage.getItem("unitOfMeasurements")) || [];
        setUnitOfM(getUnitOfM);
        console.log(getIndent);
    }, []);

    const getCompanyInfoById = (companyInfoId) => {
        return companyInfo.find((companyInfo) => companyInfo.id === Number(companyInfoId));
    };
    const getItemMasterById = (itemMasterId) => {
        return itemMaster.find((itemMaster) => itemMaster.id === Number(itemMasterId));
    };
    const getUnitOfMById = (unitOfMId) => {
        return unitOfM.find((unitOfM) => unitOfM.id === Number(unitOfMId));
    };



    return (
        <div>
            <h1>View Indent For Purchase</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Generic Name</th>
                        <th>Vendor / Company Name</th>
                        <th>Unit Of Measurement</th>
                        <th>Quantity </th>
                        <th>Indent Date</th>
                        <th>Indent By</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {indent.map((indent) => (
                        <tr key={indent.id}>
                            <td>{getItemMasterById(indent.itemMasterId)?.productName}</td>
                            <td>{getItemMasterById(indent.itemMasterId)?.genericName}</td>
                            <td>{getCompanyInfoById(indent.companyInfoId)?.label}</td>
                            <td>{getUnitOfMById(indent.unitOfMId)?.unitOfMeasurementName}</td>
                            <td>{indent.quantity}</td>
                            <td>{indent.indentDate}</td>
                            <td>{indent.indentBy}</td>
                            <td>{indent.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewIndentForPurchase;
