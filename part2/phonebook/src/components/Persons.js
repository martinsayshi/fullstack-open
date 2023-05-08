import Person from "./Person";

const Persons = ({ filteredPersons, remove }) => {
  return (
    <ul>
      {filteredPersons.map((person) => (
        <div>
          <Person key={person.name} person={person} />
          <button onClick={remove}>Delete</button>
        </div>
      ))}
    </ul>
  );
};

export default Persons;
