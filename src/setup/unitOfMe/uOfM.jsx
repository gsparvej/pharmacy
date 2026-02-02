import React, { useEffect, useState } from "react";
import { addUnitOfM, getAllUnitOfM } from "../apiService/unit/unitOfMservice";

const UOfM = () => {
    const [unitOfMeasurement, setUnitOfMeasurement] = useState({
        unitOfMeasurementName: "",
    });

    const [unitOfMeasurements, setUnitOfMeasurements] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fetchUnitOfMeasurements = async () => {
        try {
            const res = await getAllUnitOfM();
            setUnitOfMeasurements(res);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUnitOfMeasurements();
    }, [unitOfMeasurements])


    const handleAddUnitOfMeasurement = async (e) => {
        e.preventDefault();
        const res = await addUnitOfM(unitOfMeasurement);
        setUnitOfMeasurements(res);
        setUnitOfMeasurement({ unitOfMeasurementName: "" });
        setShowModal(false);
        fetchUnitOfMeasurements();
    };

    return (
        <div>
            <div>
                <h1>Unit of Measurement</h1>
                <button onClick={() => setShowModal(true)}>
                    + Add New
                </button>
            </div>


            {showModal && (
                <div>
                    <div>
                        <div>
                            <h2>Add Unit of Measurement</h2>
                            <button onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleAddUnitOfMeasurement}>
                            <div>
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={unitOfMeasurement.unitOfMeasurementName}
                                    onChange={(e) => setUnitOfMeasurement({ ...unitOfMeasurement, unitOfMeasurementName: e.target.value })}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div>
                                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Table */}
            <table>
                <thead>
                    <tr>
                        <th>Serial No</th>
                        <th>Unit Name</th>
                    </tr>
                </thead>
                <tbody>
                    {unitOfMeasurements.length > 0 ? (
                        unitOfMeasurements.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.unitOfMeasurementName}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" style={{ textAlign: "center" }}>No units found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UOfM;