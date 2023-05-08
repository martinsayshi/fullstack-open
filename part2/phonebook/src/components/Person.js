const Person = ({ person, remove }) => (
  <li>
    {person.name} {person.number}
    <button onClick={remove}>Delete</button>
  </li>
);

export default Person;
