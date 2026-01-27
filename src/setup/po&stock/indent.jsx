
import React, { useState, useEffect } from "react";

const IndentForPurchase = () => {

    // --- STATE ---
    const [indentForPurchase, setIndentForPurchase] = useState({
        itemMasterId: "",
        quantity: "",
        indentDate: "",
        indentBy: "",
        status: "",
        companyInfoId: ""
    });

    const [itemMasters, setItemMasters] = useState([]);
    const [companyInfos, setCompanyInfos] = useState([]);


    // --- EFFECT: LOAD DATA ---
    useEffect(() => {
        // Direct LocalStorage Calls (No imports)
        const loadedItemMasters = JSON.parse(localStorage.getItem("itemMaster")) || [];
        setItemMasters(loadedItemMasters);

        const loadedCompanyInfos = JSON.parse(localStorage.getItem("companyInfo")) || [];
        setCompanyInfos(loadedCompanyInfos);
    }, []);

    // --- HANDLERS ---
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Reset Item if Company changes
        if (name === "companyInfoId") {
            setIndentForPurchase((prev) => ({
                ...prev,
                companyInfoId: value,
                itemMasterId: "", // Reset item
            }));
            return;
        }

        setIndentForPurchase((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!indentForPurchase.itemMasterId || !indentForPurchase.quantity) {
            alert("Please fill in all required fields.");
            return;
        }

        // Load existing Indents directly
        const existingIndents = JSON.parse(localStorage.getItem("indentForPurchase")) || [];
        const newIndent = { ...indentForPurchase, id: Date.now(), status: "Indent" };

        // Save back to LocalStorage
        existingIndents.push(newIndent);
        localStorage.setItem("indentForPurchase", JSON.stringify(existingIndents));

        alert("Indent For Purchase Created Successfully");

        // Reset Form
        setIndentForPurchase({
            itemMasterId: "",
            quantity: "",
            indentDate: "",
            indentBy: "",
            status: "",
            companyInfoId: ""
        });
    };

    // --- DERIVED STATE ---
    const filteredItems = indentForPurchase.companyInfoId
        ? itemMasters.filter((item) => String(item.companyInfoId) === String(indentForPurchase.companyInfoId))
        : [];

    return (
        <div>
            <h1> Create Indent For Purchase</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Select Company/Vendor: </label>
                    <select
                        name="companyInfoId"
                        value={indentForPurchase.companyInfoId}
                        onChange={handleChange}
                    >
                        <option value="">-- Select Company --</option>
                        {companyInfos.map((company) => (
                            <option key={company.id} value={company.id}>
                                {company.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label> Product Name: </label>
                    <select
                        name="itemMasterId"
                        value={indentForPurchase.itemMasterId}
                        onChange={handleChange}
                        disabled={!indentForPurchase.companyInfoId}
                    >
                        <option value="">-- Select Product --</option>
                        {filteredItems.map((itemMaster) => (
                            <option key={itemMaster.id} value={itemMaster.id}>
                                {itemMaster.productName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Quantity : </label>
                    <input
                        type="number"
                        name="quantity"
                        value={indentForPurchase.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                    />
                </div>
                <div>
                    <label>Indent Date : </label>
                    <input
                        type="date"
                        name="indentDate"
                        value={indentForPurchase.indentDate}
                        onChange={handleChange}
                        placeholder="Indent Date"
                    />
                </div>
                <div>
                    <label>Indent By : </label>
                    <input
                        type="text"
                        name="indentBy"
                        value={indentForPurchase.indentBy}
                        onChange={handleChange}
                        placeholder="Indent By"
                    />
                </div>
                <button type="submit">Indent For Purchase</button>
            </form>
        </div>
    );
};

export default IndentForPurchase;
