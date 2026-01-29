import React, { useState, useEffect } from "react";

const ViewPO = () => {
    const [viewPO, setViewPO] = useState([]);
    const [companyInfo, setCompanyInfo] = useState([]);


    useEffect(() => {
        const getPO = JSON.parse(localStorage.getItem("createPO")) || [];
        setViewPO(getPO);
        const getCompanyInfo = JSON.parse(localStorage.getItem("companyInfo")) || [];
        setCompanyInfo(getCompanyInfo);
    }, []);

    const getCompanyInfoById = (companyInfoId) => {
        return companyInfo.find((companyInfo) => companyInfo.id === Number(companyInfoId));
    };









    return (
        <div>
            <h1>View PO</h1>
            <table>
                <thead>
                    <tr>
                        <th>Order Id </th>
                        <th>Vendor / Company Name</th>
                        <th> Order Date</th>
                        <th> Order By </th>
                    </tr>
                </thead>
                <tbody>
                    {viewPO.map((viewPO) => (
                        <tr key={viewPO.id}>
                            <td>{viewPO.id}</td>
                            <td>{getCompanyInfoById(viewPO.companyInfoId)?.label}</td>
                            <td>{viewPO.poDate}</td>
                            <td>{viewPO.poBy}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default ViewPO;  