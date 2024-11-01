import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
    const [runs, setRuns] = useState([]);
    const [newRun, setNewRun] = useState({ id: '', book: '', pages: '', author: '', startedOn: '', completedOn: '' });
    const [updateRunId, setUpdateRunId] = useState(null);
    const [updateRun, setUpdateRun] = useState({ book: '', pages: '', author: '', startedOn: '', completedOn: '' });

    useEffect(() => {
        fetchRuns();
    }, []);

    const fetchRuns = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/lib');
            setRuns(response.data);
        } catch (error) {
            console.error('Error fetching runs:', error);
        }
    };

    const addRun = async () => {
        try {
            await axios.post('http://localhost:8080/api/lib', newRun);
            fetchRuns(); // Update list after new book 
            setNewRun({ id: '', book: '', pages: '', author: '', startedOn: '', completedOn: '' }); // Clear entry fields
        } catch (error) {
            console.error('Error adding run:', error);
        }
    };

    const deleteRun = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/lib/${id}`);
            fetchRuns(); // Update list after deleting
        } catch (error) {
            console.error('Error deleting run:', error);
        }
    };

    const updateRunDetails = async () => {
        try {
            await axios.put(`http://localhost:8080/api/lib/${updateRunId}`, updateRun);
            fetchRuns(); // update list after updating
            setUpdateRunId(null); // Make update fields empty
            setUpdateRun({ book: '', pages: '', author: '', startedOn: '', completedOn: '' }); // make update fields empty
        } catch (error) {
            console.error('Error updating run:', error);
        }
    };

    return (
        <div>
            <h1>Book List</h1>
            <div>
                <h2>Add a New Book</h2>
                <input 
                    type="number" 
                    placeholder="ID" 
                    value={newRun.id} 
                    onChange={(e) => setNewRun({ ...newRun, id: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Book" 
                    value={newRun.book} 
                    onChange={(e) => setNewRun({ ...newRun, book: e.target.value })} 
                />
                <input 
                    type="number" 
                    placeholder="Pages" 
                    value={newRun.pages} 
                    onChange={(e) => setNewRun({ ...newRun, pages: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Author" 
                    value={newRun.author} 
                    onChange={(e) => setNewRun({ ...newRun, author: e.target.value })} 
                />
                <input 
                    type="datetime-local" 
                    placeholder="Started On" 
                    value={newRun.startedOn} 
                    onChange={(e) => setNewRun({ ...newRun, startedOn: e.target.value })} 
                />
                <input 
                    type="datetime-local" 
                    placeholder="Completed On" 
                    value={newRun.completedOn} 
                    onChange={(e) => setNewRun({ ...newRun, completedOn: e.target.value })} 
                />
                <button onClick={addRun}>Add Book</button>
            </div>

            <h2>Current Books</h2>
            <ul>
                {runs.map(run => (
                    <li key={run.id}>
                        ID: {run.id}, Book: {run.book}, Pages: {run.pages}, Author: {run.author}, Started On: {run.startedOn}, Completed On: {run.completedOn}, Version: {run.version}
                        <button onClick={() => { setUpdateRunId(run.id); setUpdateRun(run); }}>Update</button>
                        <button onClick={() => deleteRun(run.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {updateRunId && (
                <div>
                    <h2>Update Book</h2>
                    <input 
                        type="text" 
                        placeholder="Book" 
                        value={updateRun.book} 
                        onChange={(e) => setUpdateRun({ ...updateRun, book: e.target.value })} 
                    />
                    <input 
                        type="number" 
                        placeholder="Pages" 
                        value={updateRun.pages} 
                        onChange={(e) => setUpdateRun({ ...updateRun, pages: e.target.value })} 
                    />
                    <input 
                        type="text" 
                        placeholder="Author" 
                        value={updateRun.author} 
                        onChange={(e) => setUpdateRun({ ...updateRun, author: e.target.value })} 
                    />
                    <input 
                        type="datetime-local" 
                        placeholder="Started On" 
                        value={updateRun.startedOn} 
                        onChange={(e) => setUpdateRun({ ...updateRun, startedOn: e.target.value })} 
                    />
                    <input 
                        type="datetime-local" 
                        placeholder="Completed On" 
                        value={updateRun.completedOn} 
                        onChange={(e) => setUpdateRun({ ...updateRun, completedOn: e.target.value })} 
                    />
                    <button onClick={updateRunDetails}>Update Book</button>
                </div>
            )}
        </div>
    );
};

export default BookList;