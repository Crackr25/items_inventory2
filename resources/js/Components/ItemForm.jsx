import React, { useState } from "react";
import axios from "axios";

const ItemForm = () => {
    const [showModal, setShowModal] = useState(false);
    const [name, setItemName] = useState("");
    const [description, setItemDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/items", {
                name,
                description,
            });
            setShowModal(false);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div>
            <div className="flex justify-end">
                <button onClick={toggleModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Item
                </button>
            </div>
            {showModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-2 max-w-sm">
                        <div className="text-right">
                            <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                Close
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="itemName"
                                >
                                    Item Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="itemName"
                                    type="text"
                                    placeholder="Item Name"
                                    value={name}
                                    onChange={(e) => setItemName(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="itemDescription"
                                >
                                    Item Description
                                </label>
                                <textarea
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="itemDescription"
                                    rows="3"
                                    placeholder="Item Description"
                                    value={description}
                                    onChange={(e) => setItemDescription(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="flex items-center justify-between">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Add Item
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemForm;

