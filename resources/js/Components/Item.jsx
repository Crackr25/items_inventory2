import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemList from "@/Components/ItemList";

const ItemPage = () => {
    const [items, setItems] = useState([]);

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

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("/items");
                setItems(response.data.Items);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
        fetchItems();
        return () => {
            // Cleanup logic, if any
        };
    }, []);

    return (
        <div className="container mx-auto">
            <div className=" rounded-lg p-4">
                <ItemList items={items} />
            </div>
        </div>
    );
};

export default ItemPage;
