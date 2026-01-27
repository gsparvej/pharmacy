
// Utility to handle LocalStorage operations safely

export const getFromStorage = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error(`Error reading ${key} from localStorage`, error);
        return [];
    }
};

export const saveToStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving ${key} to localStorage`, error);
    }
};

// Typed helpers
export const getIndents = () => getFromStorage('indentForPurchase');
export const saveIndents = (data) => saveToStorage('indentForPurchase', data);

export const getItemMasters = () => getFromStorage('itemMaster');
export const getCompanyInfos = () => getFromStorage('companyInfo');
export const getItemTypes = () => getFromStorage('itemTypes');

export const getPurchaseOrders = () => getFromStorage('purchaseOrders');
export const savePurchaseOrders = (data) => saveToStorage('purchaseOrders', data);
