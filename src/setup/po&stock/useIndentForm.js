
import { useState, useEffect } from "react";
import {
    getIndents,
    saveIndents,
    getItemMasters,
    getCompanyInfos,
    getItemTypes
} from "../../utils/storage";

export const useIndentForm = () => {
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
    const [itemTypes, setItemTypes] = useState([]);
    const [selectedItemDetails, setSelectedItemDetails] = useState(null);

    // Load Data on Mount
    useEffect(() => {
        setItemMasters(getItemMasters());
        setCompanyInfos(getCompanyInfos());
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;


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

        const existingIndents = getIndents();
        const newIndent = { ...indentForPurchase, id: Date.now(), status: "Indent" };

        saveIndents([...existingIndents, newIndent]);
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
        setSelectedItemDetails(null);
    };

    // Derive Filtered Items
    const filteredItems = indentForPurchase.companyInfoId
        ? itemMasters.filter((item) => String(item.companyInfoId) === String(indentForPurchase.companyInfoId))
        : [];

    return {
        formState: indentForPurchase,
        handleChange,
        handleSubmit,
        lists: {
            companyInfos,
            itemMasters: filteredItems,
            allItemMasters: itemMasters
        },
        selectedItemDetails
    };
};
