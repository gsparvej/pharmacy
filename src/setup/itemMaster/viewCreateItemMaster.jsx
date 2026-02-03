import { useEffect, useState } from "react";
import { getAllItemMaster, saveItemMaster } from "../apiService/itemMaster/itemMasterService";
import { getAllCompany } from "../apiService/company/companyService";
import { getAllItemType } from "../apiService/type/itemTypeService";
import { getAllUnitOfM } from "../apiService/unit/unitOfMservice";

const ViewCreateItemMaster = () => {

    const [itemMaster, setItemMaster] = useState([]);
    const [companyInfos, setCompanyInfos] = useState([]);
    const [itemTypes, setItemTypes] = useState([]);
    const [unitOfMs, setUnitOfMs] = useState([]);
    const [search, setSearch] = useState(null);

    // Form State
    const [itemInfo, setItemInfo] = useState({
        productName: "",
        genericName: "",
        roomNo: "",
        companyInfoId: "",
        itemTypeId: "",
        unitOfMId: ""
    });

    const getAllCompanyInfos = async () => {
        try {
            const res = await getAllCompany();
            setCompanyInfos(res);
        } catch (err) {
            console.error(err);
        }
    };
    const getAllItemTypes = async () => {
        try {
            const res = await getAllItemType();
            setItemTypes(res);
        } catch (err) {
            console.error(err);
        }
    };
    const getAllUnitOfMs = async () => {
        try {
            const res = await getAllUnitOfM();
            setUnitOfMs(res);
        } catch (err) {
            console.error(err);
        }
    };

    const getItemMaster = async () => {
        try {
            const res = await getAllItemMaster();
            setItemMaster(res);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getItemMaster();
        getAllCompanyInfos();
        getAllItemTypes();
        getAllUnitOfMs();

    }, []);


    const filteredItemMaster = itemMaster.filter((itemMaster) => {
        if (search === null) {
            return true;
        }
        const companyName = itemMaster.companyInfoId?.label || "";

        return companyName.toLowerCase().includes(search.toLowerCase());
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Construct payload as expected by backend (nested objects with id)
            // But checking backend controller, it extracts id like: const company_id = companyInfoId?.id || null;
            // So we need to send { companyInfoId: { id: 1 }, ... } OR change backend.
            // Based on user request, let's try to match existing pattern or just send IDs if backend supports it.
            // Backend line 16: const company_id = companyInfoId?.id || null;
            // It explicitly looks for .id. So we must send an object.

            const payload = {
                productName: itemInfo.productName,
                genericName: itemInfo.genericName,
                roomNo: itemInfo.roomNo,
                companyInfoId: { id: itemInfo.companyInfoId },
                itemTypeId: { id: itemInfo.itemTypeId },
                unitOfMId: { id: itemInfo.unitOfMId }
            };

            await saveItemMaster(payload);
            alert("Item Master Created Successfully!");

            // Generate report or refresh
            getItemMaster();

            // Reset form
            setItemInfo({
                productName: "",
                genericName: "",
                roomNo: "",
                companyInfoId: "",
                itemTypeId: "",
                unitOfMId: ""
            });

        } catch (error) {
            console.error(error);
            alert("Failed to create Item Master");
        }
    };


    return (
        <div>
            <h1>View Create Item Master</h1>

            <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
                <h3>Create New Item</h3>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    <input
                        type="text"
                        name="productName"
                        placeholder="Product Name"
                        value={itemInfo.productName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="genericName"
                        placeholder="Generic Name"
                        value={itemInfo.genericName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="roomNo"
                        placeholder="Room No"
                        value={itemInfo.roomNo}
                        onChange={handleChange}
                    />

                    <select name="companyInfoId" value={itemInfo.companyInfoId} onChange={handleChange} required>
                        <option value="">Select Company</option>
                        {companyInfos.map((comp) => (
                            <option key={comp.id} value={comp.id}>{comp.label}</option>
                        ))}
                    </select>

                    <select name="itemTypeId" value={itemInfo.itemTypeId} onChange={handleChange} required>
                        <option value="">Select Item Type</option>
                        {itemTypes.map((type) => (
                            <option key={type.id} value={type.id}>{type.itemTypeName || type.name || type.label}</option>
                        ))}
                    </select>

                    <select name="unitOfMId" value={itemInfo.unitOfMId} onChange={handleChange} required>
                        <option value="">Select Unit</option>
                        {unitOfMs.map((unit) => (
                            <option key={unit.id} value={unit.id}>{unit.unitOfMeasurementName || unit.unit || unit.label}</option>
                        ))}
                    </select>

                    <button type="submit" style={{ gridColumn: 'span 3', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                        Create Item Master
                    </button>
                </form>
            </div>

            <input type="text" placeholder="Search by Company Name" onChange={(e) => setSearch(e.target.value)} style={{ padding: '10px', width: '100%', marginBottom: '10px' }} />
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Item Type</th>
                        <th>Generic Name</th>
                        <th>Company Name</th>
                        <th>Unit Of Measurement</th>
                        <th>Room No</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItemMaster.map((itemMaster) => (
                        <tr key={itemMaster.id}>
                            <td>{itemMaster.productName}</td>
                            <td>{itemMaster.itemTypeId?.itemTypeName || itemMaster.itemTypeId?.label}</td>
                            <td>{itemMaster.genericName}</td>
                            <td>{itemMaster.companyInfoId?.label}</td>
                            <td>{itemMaster.unitOfMId?.unitOfMeasurementName || itemMaster.unitOfMId?.label}</td>
                            <td>{itemMaster.roomNo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default ViewCreateItemMaster;    