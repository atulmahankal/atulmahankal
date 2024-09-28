import React, { useEffect, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import axios from 'axios';

const ExperiencePage = () => {
  const [sheetData, setSheetData] = useState([]);

  const env = import.meta.env;
  const apiKey = env.VITE_GCP_API_KEY;
  const datasheetId = env.VITE_APP_DATASHEET_ID;
  const sheetName = "Experience";
  const baseURL = `https://sheets.googleapis.com/v4/spreadsheets/${datasheetId}/values/${sheetName}?alt=json&key=${apiKey}`;

  const fetchSheetData = async () => {
    try {
      const response = await axios.get(`${baseURL}`);

      // Exclude the first row (typically headers) using .slice(1)
      let dataWithoutHeaders = response.data.values.slice(1);

      // Reverse the data array to show most recent entries first
      dataWithoutHeaders = dataWithoutHeaders.reverse();

      // Save data to sessionStorage as JSON string
      sessionStorage.setItem('sheetData', JSON.stringify(dataWithoutHeaders));

      setSheetData(dataWithoutHeaders);
    } catch (error) {
      console.error('Error fetching sheet data:', error);
    }
  };

  useEffect(() => {
    // Check if data is already stored in sessionStorage
    const cachedData = sessionStorage.getItem('sheetData');
    if (cachedData) {
      setSheetData(JSON.parse(cachedData)); // Parse the cached data from JSON
      // setLoading(false); // Stop loading
    } else {
      fetchSheetData(); // Fetch data if not in sessionStorage
    }
    // fetchSheetData(); // Fetch data when the component loads
  }, []);

  return (
    <MainLayout>
      <div className="flex justify-between w-full">
        <ol>
          { sheetData.length === 0 ? (
            <li className="loading-blink">
              <p className='border-b'><b>XXXXXXXXXXXX</b>, XXXXX</p>
              <p className='pb-3'>
                <small>XXXXX XXXX - XXXXX XXXX</small><br />
                XXXXXXXXXXXXXXX
              </p>
            </li>
          ) : (
            sheetData.map((row, index) => (
              <li key={ index }>
                <p className='border-b'><b>{ row[2] }</b>, { row[3] }</p>
                <p className='pb-3'>
                  <small>{ row[0] } - { row[1] }</small><br />
                  { row[4] }
                </p>
              </li>
            ))
          ) }
        </ol>
      </div>
    </MainLayout>
  );
}

export default ExperiencePage