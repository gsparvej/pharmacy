import { useEffect, useState } from "react";

const ItemType = () => {

    const [itemType, setItemType] = useState({
        itemTypeName: "",

    });

    const [itemTypes, setItemTypes] = useState([]);

    useEffect(() => {
        const fetchItemTypes = JSON.parse(localStorage.getItem("itemTypes")) || [];
        setItemTypes(fetchItemTypes);
    }, [])
    const handleAddItemType = (e) => {
        e.preventDefault();
        const existingItemTypes = JSON.parse(localStorage.getItem("itemTypes")) || [];

        const newItemTypes = { ...itemType, id: Date.now() };
        existingItemTypes.push(newItemTypes);
        localStorage.setItem("itemTypes", JSON.stringify(existingItemTypes));
        setItemTypes(existingItemTypes);
        setItemType({ itemTypeName: "" });
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