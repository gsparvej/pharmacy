
import './App.css';
import HomePage from './setup/companyInfo/homePage';
import AddCompanyInfo from './setup/companyInfo/addCompanyInfo';
import ViewCompanyInfo from './setup/companyInfo/viewCompanyInfo';
import ItemType from './setup/itemType/itemType';
import UOfM from './setup/unitOfMe/uOfM';
import CreateItemMaster from './setup/itemMaster/createItemMaster';
import ViewCreateItemMaster from './setup/itemMaster/viewCreateItemMaster';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndentForPurchase from './setup/po&stock/indent';
import CreatePO from './setup/po&stock/createPO';
import ViewIndentForPurchase from './setup/po&stock/viewIndent';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-company-info" element={<AddCompanyInfo />} />
          <Route path="/view-company-info" element={<ViewCompanyInfo />} />
          <Route path="/item-type" element={<ItemType />} />
          <Route path="/uofm" element={<UOfM />} />
          <Route path="/create-item-master" element={<CreateItemMaster />} />
          <Route path="/view-create-item-master" element={<ViewCreateItemMaster />} />
          <Route path="/indent-for-purchase" element={<IndentForPurchase />} />
          <Route path="/view-indent-for-purchase" element={<ViewIndentForPurchase />} />
          <Route path="/create-po" element={<CreatePO />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
