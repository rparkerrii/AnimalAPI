import React from "react"

const AnimalList = ({ animal, updateAnimal, updateCallback }) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete-animal/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    }

    return <div>
        <h2>Animals</h2>
        <table>
            <thead>
                <tr>
                    <th>Animal Name</th>
                    <th>Top Speed</th>
                    <th>Height</th>
                    <th>Weight</th>
                    <th>Life Span</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {animal.map((animal) => (
                    <tr key={animal.id}>
                        <td>{animal.name}</td>
                        <td>{animal.topSpeed}</td>
                        <td>{animal.height}</td>
                        <td>{animal.weight}</td>
                        <td>{animal.lifeSpan}</td>
                        <td>
                            <button onClick={() => updateAnimal(animal)}>Update</button>
                            <button onClick={() => onDelete(animal.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default AnimalList