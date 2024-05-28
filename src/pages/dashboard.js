import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteItem } from '../store/listSlice';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';


const Dashboard = () => {
  const [noteInput, setNoteInput] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const notes = useSelector((state) => state.list.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&daily=temperature_2m_max&timezone=auto');
        const data = response.data;
        setWeatherData({
          avgTemp: data.daily.temperature_2m_max.reduce((a, b) => a + b, 0) / data.daily.temperature_2m_max.length,
          avgRainfall: Math.random() * 100, // Dummy data for rainfall
          avgHumidity: Math.random() * 100, // Dummy data for humidity
          currentTemp: data.daily.temperature_2m_max[0],
          tempData: data.daily.temperature_2m_max,
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchWeatherData();
  }, []);

  const handleAddNote = () => {
    if (noteInput.trim()) {
      dispatch(addItem(noteInput));
      setNoteInput('');
    }
  };

  const handleDeleteNote = (index) => {
    dispatch(deleteItem(index));
  };

  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Average Temperature',
        data: weatherData.tempData || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-white shadow rounded p-4">
            <h3 className="font-bold text-gray-700">Avg Temp of Week</h3>
            <p className="text-gray-500">{weatherData.avgTemp?.toFixed(2)}°C</p>
          </div>
          <div className="bg-white shadow rounded p-4">
            <h3 className="font-bold text-gray-700">Avg Rainfall of Week</h3>
            <p className="text-gray-500">{weatherData.avgRainfall?.toFixed(2)}mm</p>
          </div>
          <div className="bg-white shadow rounded p-4">
            <h3 className="font-bold text-gray-700">Avg Humidity of Week</h3>
            <p className="text-gray-500">{weatherData.avgHumidity?.toFixed(2)}%</p>
          </div>
          <div className="bg-white shadow rounded p-4">
            <h3 className="font-bold text-gray-700">Current Temp</h3>
            <p className="text-gray-500">{weatherData.currentTemp?.toFixed(2)}°C</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="max-w-2xl mx-auto">
            <Bar data={barData} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Notepad</h2>
          <div className="mb-4 flex justify-center">
            <input
              type="text"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              className="border rounded p-2 mr-2 w-64"
            />
            <button
              onClick={handleAddNote}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
              Add Note
            </button>
          </div>
          <ul>
            {notes.map((note, index) => (
              <li
                key={index}
                className="border p-2 mb-2 flex justify-between items-center bg-white rounded shadow"
              >
                {note}
                <button
                  onClick={() => handleDeleteNote(index)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
