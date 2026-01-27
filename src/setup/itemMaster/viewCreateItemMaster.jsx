
import { useEffect, useState } from "react";

const ViewCreateItemMaster = () => {

    const [itemMaster, setItemMaster] = useState([]);
    const [companyInfos, setCompanyInfos] = useState([]);
    const [itemTypes, setItemTypes] = useState([]);
    const [unitOfMs, setUnitOfMs] = useState([]);
    const [search, setSearch] = useState(null);


    useEffect(() => {
        const getItemMaster = JSON.parse(localStorage.getItem("itemMaster")) || [];
        setItemMaster(getItemMaster);
        const getCompanyInfos = JSON.parse(localStorage.getItem("companyInfo")) || [];
        setCompanyInfos(getCompanyInfos);
        const getItemTypes = JSON.parse(localStorage.getItem("itemTypes")) || [];
        setItemTypes(getItemTypes);
        const getUnitOfMs = JSON.parse(localStorage.getItem("unitOfMeasurements")) || [];
        setUnitOfMs(getUnitOfMs);

        console.log(getItemMaster);
    }, []);

    const getCompanyInfoById = (companyInfoId) => {
        return companyInfos.find((companyInfo) => companyInfo.id === Number(companyInfoId));
    };
    const getItemTypeById = (itemTypeId) => {
        return itemTypes.find((itemType) => itemType.id === Number(itemTypeId));
    };
    const getUnitOfMById = (unitOfMId) => {
        return unitOfMs.find((unitOfM) => unitOfM.id === Number(unitOfMId));
    };

    const filteredItemMaster = itemMaster.filter((itemMaster) => {
        if (search === null) {
            return true;
        }
        const companyName = getCompanyInfoById(itemMaster.companyInfoId)?.label;

        return companyName.toLowerCase().includes(search.toLowerCase());
    });


    return (
        <div>
            <h1>View Create Item Master</h1>
            <input type="text" placeholder="Search by Company Name" onChange={(e) => setSearch(e.target.value)} />
            <table>
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
                            <td>{getItemTypeById(itemMaster.itemTypeId)?.itemTypeName}</td>
                            <td>{itemMaster.genericName}</td>
                            <td>{getCompanyInfoById(itemMaster.companyInfoId)?.label}</td>
                            <td>{getUnitOfMById(itemMaster.unitOfMId)?.unitOfMeasurementName}</td>
                            <td>{itemMaster.roomNo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default ViewCreateItemMaster;    