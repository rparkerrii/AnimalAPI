import { useEffect, useState } from 'react'
import AnimalList from "./AnimalList.jsx";
import './App.css'
import AnimalForm from './AnimalForm.jsx';

function App() {
  const [animal, setAnimal] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentAnimal, setCurrentAnimal] = useState({})


  useEffect(() => {
    fetchAnimal()
  }, []);
  
  const fetchAnimal = async () => {
    const response = await fetch("http://127.0.0.1:5000/animal-info")
    const data = await response.json()
    setAnimal(data.animal)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentAnimal({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (animal) => {
    if (isModalOpen) return
    setCurrentAnimal(animal)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchAnimal()
  }

  return (
    <>
      <AnimalList animal={animal} updateAnimal={openEditModal} updateCallback={onUpdate} />
      <button onClick={openCreateModal}>Enter Animal Name</button>
      {isModalOpen && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <AnimalForm existingAnimal={currentAnimal} updateCallback={onUpdate} />
        </div>
      </div>
      }
    </>
  );
}

export default App;
