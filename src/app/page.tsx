"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Item {
  ID: number;
  Name: string;
  Diem: number;
  Khoa: number;
}

const Home = () => {
  const [ID, setID] = useState<Item[]>([]);
  const [newName, setNewName] = useState("");
  const [newDiem, setNewDiem] = useState("");
  const [newKhoa, setNewKhoa] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/sinhvien");
      setID(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleAddItem = async () => {
    try {
      await axios.post("http://localhost:5000/sinhvien", {
        Name: newName,
        Diem: newDiem,
        Khoa: newKhoa,
      });
      fetchItems();
      setNewName("");
      setNewDiem("");
      setNewKhoa("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div className="container">
      <h1>Employee List</h1>
      <div className="form-container">
        <h2>Add Employee</h2>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="input-field"
          placeholder="Enter new name"
        />
        <input
          type="number"
          value={newDiem}
          onChange={(e) => setNewDiem(e.target.value)}
          className="input-field"
          placeholder="Enter new Diem"
        />
        <input
          type="number"
          value={newKhoa}
          onChange={(e) => setNewKhoa(e.target.value)}
          className="input-field"
          placeholder="Enter new Khoa"
        />
        <button onClick={handleAddItem} className="button">
          Add
        </button>
      </div>
      <ul>
        {ID.map((ID) => (
          <li key={ID.ID}>
            ID: {ID.ID}, Name: {ID.Name}, Diem: {ID.Diem}, Khoa: {ID.Khoa}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;