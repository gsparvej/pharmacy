import { useState } from "react";

const AddCompanyInfo = () => {
    const [companyInfo, setCompanyInfo] = useState({
        label: "",
        phone: "",
        address: "",
    });

    const handleChange = (e) => {
        setCompanyInfo({
            ...companyInfo,
            [e.target.name]: e.target.value,
        });
    };
    const handelSubmit = (e) => {
        e.preventDefault();
        const existingCompanyInfo = JSON.parse(localStorage.getItem("companyInfo")) || [];
        const newCompanyInfo = { ...companyInfo, id: Date.now() }
        existingCompanyInfo.push(newCompanyInfo);
        localStorage.setItem("companyInfo", JSON.stringify(existingCompanyInfo));
        alert("Company Info Added Successfully");
        console.log(companyInfo);
    };

    return (
        <div>
            <h1>Add Company Info</h1>
            <form onSubmit={handelSubmit}>
                <label> Company Name  : </label>
                <input type="text" name="label" onChange={handleChange} placeholder="Company Name" />
                <br />
                <label> Phone  : </label>
                <input type="text" name="phone" onChange={handleChange} placeholder="Phone" />
                <br />
                <label> Address  : </label>
                <input type="text" name="address" onChange={handleChange} placeholder="Address" />
                <button type="submit">Add Company Info</button>
            </form>
        </div>
    );
};

export default AddCompanyInfo;  