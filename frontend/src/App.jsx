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
      <button class="button-search" onClick={openCreateModal}>
        <svg class="svgIcon-search" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg>
        Find Animal
      </button>
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
