import { useState } from "react";

const AnimalForm = ({ existingAnimal = {}, updateCallback }) => {
    const [name, setName] = useState(existingAnimal.name || "");

    const updating = Object.entries(existingAnimal).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            name
        }
        const url = "http://127.0.0.1:5000/" + (updating ? `update-animal/${existingAnimal.id}` : "enter-animal")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="name">Animal Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <button type="submit">{updating ? "Update" : "Create"}</button>
        </form>
    );
};

export default AnimalForm