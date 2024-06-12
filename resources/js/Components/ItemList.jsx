import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemId, setItemId] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [totalRows, setTotalRows] = useState(items.length);
    const [selectedItem, setSelectedItem] = useState(null); // Add this line
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async (searchQuery) => {
        try {
            const response = await axios.get("/items");
            const filteredItems = searchQuery
                ? response.data.Items.filter((item) =>
                      item.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                  )
                : response.data.Items;
            setItems(filteredItems);
            setTotalRows(filteredItems.length);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const handleEditItem = async (itemId) => {
        try {
            const response = await axios.get(`/items/${itemId}`);
            // Handle form submission and update logic
            const selectedItemData = response.data.Items;
            setSelectedItem(response.data.items); // Set the selected item data
            setItemName(selectedItemData.name); // Update the item name state
            setItemDescription(selectedItemData.description); // Update the item description state
            setItemId(selectedItemData.id);
            setShowEditModal(true);
        } catch (error) {
            console.error("Error editing item:", error);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await axios.delete(`/items/${itemId}`);
            setItems(items.filter((item) => item.id !== itemId));
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/items", {
                name: itemName,
                description: itemDescription,
            });
            setShowModal(false);
            fetchItems();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/items/${itemId}`, {
                name: itemName,
                description: itemDescription,
            });
            setShowEditModal(false);
            fetchItems();
        } catch (error) {
            console.error(error);
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const toggleeditModal = () => {
        setShowEditModal(!showEditModal);
    };

    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row.description,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
                        onClick={() => handleEditItem(row.id)}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDeleteItem(row.id)}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="container mx-auto">
            {showModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-2 max-w-sm">
                        <div className="text-right">
                            <button
                                onClick={toggleModal}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
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
                                    value={itemName}
                                    onChange={(e) =>
                                        setItemName(e.target.value)
                                    }
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
                                    value={itemDescription}
                                    onChange={(e) =>
                                        setItemDescription(e.target.value)
                                    }
                                ></textarea>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Add Item
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-2 max-w-sm">
                        <div className="text-right">
                            <button
                                onClick={toggleeditModal}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                Close
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit}>
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
                                    value={itemName}
                                    onChange={(e) =>
                                        setItemName(e.target.value)
                                    }
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
                                    value={itemDescription}
                                    onChange={(e) =>
                                        setItemDescription(e.target.value)
                                    }
                                ></textarea>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Update Item
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="rounded-lg p-4">
                <div className="flex justify-end">
                    <button
                        onClick={toggleModal}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Item
                    </button>
                </div>
                <div className="flex justify-end my-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search items..."
                            className="border border-gray-300 rounded-full text-sm focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 pl-10 sm:text-sm"
                            onChange={(e) => fetchItems(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={items}
                    pagination
                    highlightOnHover
                    paginationTotalRows={totalRows}
                    paginationPerPage={5}
                />
            </div>
        </div>
    );
};

export default ItemList;
