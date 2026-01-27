
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';


const IndentForPurchase = () => {

    const [indentForPurchase, setIndentForPurchase] = useState({
        itemMasterId: "",
        quantity: "",
        indentDate: "",
        indentBy: "",
        status: "",

    });



    const [itemMasters, setItemMasters] = useState([]);
    const [companyInfos, setCompanyInfos] = useState([]);
    const [itemTypes, setItemTypes] = useState([]);
    // State to hold extra details for the selected item
    const [selectedItemDetails, setSelectedItemDetails] = useState(null);

    useEffect(() => {
        const getItemMasters = JSON.parse(localStorage.getItem("itemMaster")) || [];
        setItemMasters(getItemMasters);

        const getCompanyInfos = JSON.parse(localStorage.getItem("companyInfo")) || [];
        setCompanyInfos(getCompanyInfos);

        const getItemTypes = JSON.parse(localStorage.getItem("itemTypes")) || [];
        setItemTypes(getItemTypes);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setIndentForPurchase({
            ...indentForPurchase,
            [name]: value,
        });

        // If Item Master changes, find its details (Item Type mostly, since Company is already known)
        if (name === "itemMasterId") {
            const selectedItem = itemMasters.find(item => item.id == value);
            if (selectedItem) {
                // Find related item type
                const type = itemTypes.find(t => t.id == selectedItem.itemTypeId);

                setSelectedItemDetails({
                    itemTypeName: type ? type.itemTypeName : "Unknown Type",
                    stock: selectedItem.stock
                });

                setIndentForPurchase(prev => ({
                    ...prev,
                    itemMasterId: value,
                    status: "Indent",
                    itemTypeId: selectedItem.itemTypeId
                }));
            } else {
                setSelectedItemDetails(null);
            }
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const existingIndentForPurchase = JSON.parse(localStorage.getItem("indentForPurchase")) || [];
        const newIndentForPurchase = { ...indentForPurchase, id: Date.now() }
        existingIndentForPurchase.push(newIndentForPurchase);
        localStorage.setItem("indentForPurchase", JSON.stringify(existingIndentForPurchase));
        alert("Indent For Purchase Created Successfully");
        console.log(indentForPurchase);
    };

    // Filter items based on selected company
    const filteredItems = indentForPurchase.companyInfoId
        ? itemMasters.filter(item => item.companyInfoId == indentForPurchase.companyInfoId)
        : [];

    return (
        <div>
            <h1>Indent For Purchase</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Select Company/Vendor: </label>
                    <select name="companyInfoId" value={indentForPurchase.companyInfoId} onChange={handleChange}>
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
                    <select name="itemMasterId" value={indentForPurchase.itemMasterId} onChange={handleChange} disabled={!indentForPurchase.companyInfoId}>
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
                    <input type="number" name="quantity" onChange={handleChange} placeholder="Quantity" />
                </div>
                <div>
                    <label>Indent Date : </label>
                    <input type="date" name="indentDate" onChange={handleChange} placeholder="Indent Date" />
                </div>
                <div>
                    <label>Indent By : </label>
                    <input type="text" name="indentBy" onChange={handleChange} placeholder="Indent By" />
                </div>
                <button type="submit">Indent For Purchase</button>
            </form>

        </div>
    );
};

export default IndentForPurchase;


