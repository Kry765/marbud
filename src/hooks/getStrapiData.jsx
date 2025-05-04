export const getStrapiData = async ({ endpoint, fetchData }) => {
  try {
    //REQUEST RENDER
    // const res = await fetch(`https://marbudapi.onrender.com/api/${endpoint}`);
    const res = await fetch(`http://localhost:1337/api/${endpoint}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return fetchData ? fetchData(data.data) : data.data;
  } catch (err) {
    console.error(`Błąd pobierania danych z ${endpoint}:`, err);
    throw err;
  }
};
