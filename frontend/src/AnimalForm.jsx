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
            <div className="input-container">
                <input
                    placeholder="Search for animal..." 
                    name="text" 
                    className="input"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button className="button-enter" type="submit">
                    <div className="button-enter-box">
                        <span className="button-enter-elem">
                            <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                                <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                            </svg>
                        </span>
                    </div>
                </button>
            </div>
        </form>
    );
};

export default AnimalForm