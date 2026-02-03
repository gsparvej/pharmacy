
import { useEffect, useState } from "react";
import { getAllItemMaster } from "../apiService/itemMaster/itemMasterService";
import { getAllCompany } from "../apiService/company/companyService";
import { getAllItemType } from "../apiService/type/itemTypeService";
import { getAllUnitOfM } from "../apiService/unit/unitOfMservice";

const ViewCreateItemMaster = () => {

    const [itemMaster, setItemMaster] = useState([]);
    const [companyInfos, setCompanyInfos] = useState([]);
    const [itemTypes, setItemTypes] = useState([]);
    const [unitOfMs, setUnitOfMs] = useState([]);
    const [search, setSearch] = useState(null);


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



    useEffect(() => {
        const getItemMaster = async () => {
            try {
                const res = await getAllItemMaster();
                setItemMaster(res);
            } catch (err) {
                console.error(err);
            }
        };
        getItemMaster();
        getAllCompanyInfos();
        getAllItemTypes();
        getAllUnitOfMs();

    }, []);



    // const getCompanyInfoById = (companyInfoId) => {
    //     return companyInfos.find((companyInfo) => companyInfo.id === Number(companyInfoId));
    // };
    // const getItemTypeById = (itemTypeId) => {
    //     return itemTypes.find((itemType) => itemType.id === Number(itemTypeId));
    // };
    // const getUnitOfMById = (unitOfMId) => {
    //     return unitOfMs.find((unitOfM) => unitOfM.id === Number(unitOfMId));
    // };



    const filteredItemMaster = itemMaster.filter((itemMaster) => {
        if (search === null) {
            return true;
        }
        const companyName = itemMaster.companyInfoId?.label || "";

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
                            <td>{itemMaster.itemTypeId?.itemTypeName}</td>
                            <td>{itemMaster.genericName}</td>
                            <td>{itemMaster.companyInfoId?.label}</td>
                            <td>{itemMaster.unitOfMId?.unitOfMeasurementName}</td>
                            <td>{itemMaster.roomNo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default ViewCreateItemMaster;    