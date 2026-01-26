import { useState } from "react";
import { useEffect } from "react";

const CreateItemMaster = () => {

    const [itemMaster, setItemMaster] = useState({
        companyInfoId: "",
        itemTypeId: "",
        unitOfMId: "",
        productName: "",
        genericName: "",
        roomNo: "",

    });
    const [companyInfos, setCompanyInfos] = useState([]);
    const [itemTypes, setItemTypes] = useState([]);
    const [unitOfMs, setUnitOfMs] = useState([]);

    useEffect(() => {
        const getCompanyInfos = JSON.parse(localStorage.getItem("companyInfo")) || [];
        setCompanyInfos(getCompanyInfos);
        const getItemTypes = JSON.parse(localStorage.getItem("itemTypes")) || [];
        setItemTypes(getItemTypes);
        const getUnitOfMs = JSON.parse(localStorage.getItem("unitOfMeasurements")) || [];
        setUnitOfMs(getUnitOfMs);
    }, []);

    const handleChange = (e) => {
        setItemMaster({
            ...itemMaster,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const existingItemMaster = JSON.parse(localStorage.getItem("itemMaster")) || [];
        const newItemMaster = { ...itemMaster, id: Date.now() }
        existingItemMaster.push(newItemMaster);
        localStorage.setItem("itemMaster", JSON.stringify(existingItemMaster));
        alert("Item Master Added Successfully");
        console.log(itemMaster);
    };







    return (
        <div>
            <h1>Create Item Master</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name : </label>
                    <input type="text" name="productName" onChange={handleChange} placeholder="Product Name" />
                </div>
                <div>
                    <label>Generic Name : </label>
                    <input type="text" name="genericName" onChange={handleChange} placeholder="Generic Name" />
                </div>
                <div>
                    <label>Company Info : </label>
                    <select name="companyInfoId" onChange={handleChange}>
                        <option value="">Select Company Info</option>
                        {companyInfos.map((companyInfo) => (
                            <option key={companyInfo.id} value={companyInfo.id}>
                                {companyInfo.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Item Type : </label>
                    <select name="itemTypeId" onChange={handleChange}>
                        <option value="">Select Item Type</option>
                        {itemTypes.map((itemType) => (
                            <option key={itemType.id} value={itemType.id}>
                                {itemType.itemTypeName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Unit Of M : </label>
                    <select name="unitOfMId" onChange={handleChange}>
                        <option value="">Select Unit Of M</option>
                        {unitOfMs.map((unitOfM) => (
                            <option key={unitOfM.id} value={unitOfM.id}>
                                {unitOfM.unitOfMeasurementName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Room No : </label>
                    <input type="text" name="roomNo" onChange={handleChange} placeholder="Room No" />
                </div>
                <button type="submit">Add Item Master</button>
            </form>
        </div>

    );
};

export default CreateItemMaster;    