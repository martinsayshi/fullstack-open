import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMessage, setMessage] = useState("");
  const [msgClass, setMsgClass] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const taken = persons.some((person) => person.name === personObject.name);
    if (taken) {
      return alert(`${personObject.name} is already added to the phonebook`);
    }

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setMsgClass("success");
      setMessage(`Added ${returnedPerson.name}`);

      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setNewName("");
      setNewNumber("");
    });
  };

  const remove = (id) => {
    const person = persons.find((person) => person.id === id);
    const changedPersons = [...persons];
    personService
      .remove(id)
      .then(() => {
        setPersons(changedPersons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        setMsgClass("error");
        setMessage(`${person.name} was already removed from the server`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    const filtered = [...persons].filter((person) =>
      person.name.toLowerCase().includes(event.target.value)
    );
    setPersons(filtered);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} className={msgClass} />
      <Filter handleSearch={handleSearch} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person
            key={person.id}
            person={person}
            remove={() => remove(person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
//
