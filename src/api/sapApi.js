const API_URL = 'http://localhost:3001/api';

export const login = async (companyDB, username, password) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyDB, username, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('sessionId', data.sessionId);
      localStorage.setItem('companyDB', companyDB);
      localStorage.setItem('username', username);
    }
    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  try {
    await fetch(`${API_URL}/logout`, { method: 'POST' });
  } catch (error) {}
  localStorage.removeItem('sessionId');
  localStorage.removeItem('companyDB');
  localStorage.removeItem('username');
};

export const getItems = async (page = 1, search = '') => {
  const sessionId = localStorage.getItem('sessionId');
  if (!sessionId) return { success: false, error: 'No session' };
  
  const limit = 10;
  const skip = (page - 1) * limit;
  
  let url = `${API_URL}/items?top=${limit}&skip=${skip}`;
  if (search) url += `&search=${search}`;
  
  try {
    const res = await fetch(url, {
      headers: { 'Cookie': `B1SESSION=${sessionId}` }
    });
    const data = await res.json();
    return { success: true, items: data.items || data, page, limit, total: data.total || 0 };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getItem = async (code) => {
  const sessionId = localStorage.getItem('sessionId');
  if (!sessionId) return { success: false, error: 'No session' };
  
  try {
    const res = await fetch(`${API_URL}/items/${code}`, {
      headers: { 'Cookie': `B1SESSION=${sessionId}` }
    });
    const data = await res.json();
    return { success: true, item: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const addBarcode = async (code, barCode, uomEntry = 1) => {
  const sessionId = localStorage.getItem('sessionId');
  if (!sessionId) return { success: false, error: 'No session' };
  
  try {
    const res = await fetch(`${API_URL}/items/${code}/barcode`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Cookie': `B1SESSION=${sessionId}`
      },
      body: JSON.stringify({ barCode, uomEntry })
    });
    return await res.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const checkSession = async () => {
  const sessionId = localStorage.getItem('sessionId');
  if (!sessionId) return false;
  try {
    const res = await fetch(`${API_URL}/check`, {
      headers: { 'Cookie': `B1SESSION=${sessionId}` }
    });
    const data = await res.json();
    return data.active === true;
  } catch {
    return false;
  }
};

export const getCurrentUser = () => {
  return {
    username: localStorage.getItem('username') || 'Usuario',
    companyDB: localStorage.getItem('companyDB') || ''
  };
};