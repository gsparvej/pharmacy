import { useEffect, useState } from "react";
import { addItemType, getAllItemType } from "../apiService/type/itemTypeService";




const ItemType = () => {

    const [itemType, setItemType] = useState({
        itemTypeName: "",

    });

    const [itemTypes, setItemTypes] = useState([]);

    const fetchItemTypes = async () => {
        try {
            const res = await getAllItemType();
            setItemTypes(res);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchItemTypes();
    }, []);



    const handleAddItemType = async (e) => {
        e.preventDefault();

        const res = await addItemType(itemType);
        console.log(res);
        setItemType({ itemTypeName: "" });
        fetchItemTypes();
    };




    return (
        <div>
            <h1>Item Type</h1>
            <form onSubmit={handleAddItemType}>
                <input type="text" value={itemType.itemTypeName} onChange={(e) => setItemType({ ...itemType, itemTypeName: e.target.value })} placeholder="Item Type Name" />
                <button type="submit">Add Item Type</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Item Type Name</th>

                    </tr>
                </thead>
                <tbody>
                    {itemTypes.map((itemType) => (
                        <tr key={itemType.id}>
                            <td>{itemType.itemTypeName}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default ItemType;    