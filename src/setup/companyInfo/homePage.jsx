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
                    </tr>
                    <br />
                    <tr>
                        <td>
                            <div>Item Type</div>
                            <Link to="/item-type">Item Type</Link>
                        </td>
                        <br />
                        <td>
                            <div>Unit of Measurement</div>
                            <Link to="/uofm">Unit of Measurement</Link>
                        </td>
                    </tr>
                    <br />
                    <tr>
                        <td>
                            <div>Create Item Master</div>
                            <Link to="/create-item-master">Create Item Master</Link>
                        </td>
                        <br />
                        <td>
                            <div>View Item Master</div>
                            <Link to="/view-create-item-master">View Item Master</Link>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>Indent For Purchase</div>
                            <Link to="/indent-for-purchase">Indent For Purchase</Link>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
};
export default HomePage;