import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteItem } from '../store/listSlice';


const Home = () => {
    const [inputValue, setInputValue] = useState('');
    const items = useSelector((state) => state.list.items);
    const dispatch = useDispatch();

    const handleAdd = () => {
      if (inputValue.trim()) {
        dispatch(addItem(inputValue));
        setInputValue('');
      }
    };

    const handleDelete = (index) => {
      dispatch(deleteItem(index));
    };

    return (
        <>
            <div className="container mx-auto p-4">
                <header className="mb-4 text-center">
                    <h1 className="text-4xl font-bold text-gray-800">Prakash Kadam</h1>
                    <a href="mailto:prakashkadam1211@gmail.com" className="text-blue-500 hover:underline">prakashkadam1211@gmail.com</a>
                    <p className="text-gray-600">Phone Number: 960727341 </p>
                </header>
                <div className="mb-4 flex justify-center">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="border rounded p-2 mr-2 w-64"
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Add Item
                    </button>
                </div>
                <ul>
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="border p-2 mb-2 flex justify-between items-center bg-white rounded shadow"
                        >
                            {item}
                            <button
                                onClick={() => handleDelete(index)}
                                className="bg-red-500 text-white p-1 rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Home;
