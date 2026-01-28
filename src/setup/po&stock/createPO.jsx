import React, { useState, useEffect } from "react";

const CreatePO = () => {

    const [createPO, setCreatePO] = useState({
        companyInfoId: "",
        indentForPurchaseId: "",
        poDate: "",
        poBy: "",
        itemMasterId: "",


    });
    const [companyInfo, setCompanyInfo] = useState([]);
    const [indentForPurchase, setIndentForPurchase] = useState([]);
    const [itemMaster, setItemMaster] = useState([]);

    useEffect(() => {
        const getCompanyInfo = JSON.parse(localStorage.getItem("companyInfo")) || [];
        setCompanyInfo(getCompanyInfo);
        const getIndentForPurchase = JSON.parse(localStorage.getItem("indentForPurchase")) || [];
        setIndentForPurchase(getIndentForPurchase);
        const getItemMaster = JSON.parse(localStorage.getItem("itemMaster")) || [];
        setItemMaster(getItemMaster);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "companyInfoId") {
            setCreatePO((prev) => ({
                ...prev,
                companyInfoId: value,
                indentForPurchaseId: "", // Reset indent
            }));
            return;
        }
        setCreatePO((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const existingPO = JSON.parse(localStorage.getItem("createPO")) || [];
        const newPO = { ...createPO, id: Date.now() };
        existingPO.push(newPO);
        localStorage.setItem("createPO", JSON.stringify(existingPO));


        const updatedIndents = indentForPurchase.map((indent) => {
            if (String(indent.companyInfoId) === String(createPO.companyInfoId)) {
                return {
                    ...indent,
                    status: "ORDERED"
                };
            }
            return indent;
        });
        localStorage.setItem("indentForPurchase", JSON.stringify(updatedIndents));


        alert("PO Created Successfully");
        console.log(createPO);
        setCreatePO({
            companyInfoId: "",
            indentForPurchaseId: "",
            poDate: "",
            poBy: "",
        });
    };

    const filteredCompany = createPO.companyInfoId
        ? indentForPurchase.filter((indent) => String(indent.companyInfoId) === String(createPO.companyInfoId))
        : [];

    const getItemName = (itemMasterId) => {
        const item = itemMaster.find(item => String(item.id) === String(itemMasterId));
        return item ? item.productName : "-";
    };




    return (
        <div>
            <h1>Pharmacy Order Placement </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label> Select Vendor / Company :</label>
                    <select
                        name="companyInfoId"
                        value={createPO.companyInfoId}
                        onChange={handleChange}
                    >
                        <option value="">Select Company / Vendor</option>
                        {companyInfo.map((company) => (
                            <option key={company.id} value={company.id}>
                                {company.label}
                            </option>
                        ))}
                    </select>
                </div>





                {/* --- Show all indents for selected company --- */}
                {createPO.companyInfoId && (
                    <div>
                        <h3>Indent List</h3>
                        {filteredCompany.length === 0 ? (
                            <p>No indent found for this company</p>
                        ) : (
                            <table border="1" width="50%">
                                <thead>
                                    <tr>
                                        <th>Indent ID</th>
                                        <th>Product</th>
                                        <th>Quantity</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCompany.map(indent => (
                                        <tr key={indent.id}>
                                            <td>{indent.id}</td>
                                            <td>{getItemName(indent.itemMasterId)}</td>

                                            <td>{indent.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}








                <div>
                    <label>PO Date : </label>
                    <input type="date" name="poDate" onChange={handleChange} />
                </div>
                <div>
                    <label>PO By : </label>
                    <input type="text" name="poBy" onChange={handleChange} />
                </div>
                <button type="submit">Create PO</button>
            </form>
        </div>
    );
};
export default CreatePO;    