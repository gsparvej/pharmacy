
import React from 'react';
import { useIndentForm } from './useIndentForm';

const IndentForPurchase = () => {
    const {
        formState,
        handleChange,
        handleSubmit,
        lists,
        selectedItemDetails
    } = useIndentForm();

    const { companyInfos, itemMasters } = lists;

    return (
        <div>
            <h1>Indent For Purchase</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Select Company/Vendor: </label>
                    <select
                        name="companyInfoId"
                        value={formState.companyInfoId}
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
                        value={formState.itemMasterId}
                        onChange={handleChange}
                        disabled={!formState.companyInfoId}
                    >
                        <option value="">-- Select Product --</option>
                        {itemMasters.map((itemMaster) => (
                            <option key={itemMaster.id} value={itemMaster.id}>
                                {itemMaster.productName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Display Linked Info */}
                {selectedItemDetails && (
                    <div style={{ padding: '10px', background: '#eef', marginBottom: '10px' }}>
                        <p><strong>Item Type:</strong> {selectedItemDetails.itemTypeName}</p>
                    </div>
                )}

                <div>
                    <label>Quantity : </label>
                    <input
                        type="number"
                        name="quantity"
                        value={formState.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                    />
                </div>
                <div>
                    <label>Indent Date : </label>
                    <input
                        type="date"
                        name="indentDate"
                        value={formState.indentDate}
                        onChange={handleChange}
                        placeholder="Indent Date"
                    />
                </div>
                <div>
                    <label>Indent By : </label>
                    <input
                        type="text"
                        name="indentBy"
                        value={formState.indentBy}
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
