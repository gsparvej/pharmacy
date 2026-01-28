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
                        <td>
                            <div>View Company Info</div>
                            <Link to="/view-company-info">View Company Info</Link>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>Item Type</div>
                            <Link to="/item-type">Item Type</Link>
                        </td>
                        <td>
                            <div>Unit of Measurement</div>
                            <Link to="/uofm">Unit of Measurement</Link>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div>Create Item Master</div>
                            <Link to="/create-item-master">Create Item Master</Link>
                        </td>
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
                        <td>
                            <div>View Indent For Purchase</div>
                            <Link to="/view-indent-for-purchase">View Indent For Purchase</Link>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>Create PO</div>
                            <Link to="/create-po">Create PO</Link>
                        </td>
                        <td>
                            <div>View PO</div>
                            <Link to="/view-po">View PO</Link>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
};
export default HomePage;