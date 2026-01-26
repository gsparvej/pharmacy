import { Link } from "react-router-dom";


const HomePage = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <div>Add New Company Info</div>
                            <Link to="/add-company-info">Add New Company Info</Link>
                        </td>
                        <br />
                        <td>
                            <div>View Company Info</div>
                            <Link to="/view-company-info">View Company Info</Link>
                        </td>
                        <br />
                        <td>
                            <div>Item Type</div>
                            <Link to="/item-type">Item Type</Link>
                        </td>
                        <br />
                        <td>
                            <div>Unit of Measurement</div>
                            <Link to="/uofm">Unit of Measurement</Link>
                        </td>
                        <br />
                        <td>
                            <div>Create Item Master</div>
                            <Link to="/create-item-master">Create Item Master</Link>
                        </td>
                        <br />
                        <td>
                            <div>View Create Item Master</div>
                            <Link to="/view-create-item-master">View Create Item Master</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
export default HomePage;