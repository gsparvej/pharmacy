import React, { useEffect, useState } from "react";
import { getAllCompany } from "../apiService/company/companyService";
const ViewCompanyInfo = () => {

    const [companyInfo, setCompanyInfo] = useState([]);


    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await getAllCompany();
                setCompanyInfo(res);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCompanies();
    }, []);

    return (
        <div>
            <h1>View Company Info</h1>
            <table>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {companyInfo.map((company) => (
                        <tr key={company.id}>
                            <td>{company.label}</td>
                            <td>{company.phone}</td>
                            <td>{company.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewCompanyInfo;