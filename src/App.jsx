import logo from './logo.svg';
import './App.css';
import React from 'react';
import contacts from './contacts.json';

let people = contacts.slice(0, 5);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people
    };
  }

  // Displaying contacts
  renderTableData = () => {
    return this.state.people.map((person) => {
      return (
        <tr key={person.id}>
          <td>
            <img
              className="person-picture"
              src={person.pictureUrl}
              alt={person.name}
            />
          </td>
          <td>{person.name}</td>
          <td>{person.popularity}</td>
          <td>
            <button onClick={this.deleteContacts}>Delete</button>
          </td>
        </tr>
      );
    });
  };

  // Add New Random Contact
  addRandomContact = () => {
    let newPeopleArray = [...this.state.people];
    let restOfPeople = contacts.slice(5);
    const randomIndex = Math.floor(Math.random() * restOfPeople.length);
    let randomPerson = restOfPeople[randomIndex];
    if (!newPeopleArray.includes(randomPerson)) {
      restOfPeople.splice(randomPerson);
      newPeopleArray.push(randomPerson);
      this.setState({ people: newPeopleArray });
    }
  };

  // Sort by Name --> in progress

  sortAlphabetically = () => {
    const people = this.state.people;
    const alphabeticallySortedPeople = [...people];
    alphabeticallySortedPeople.sort((a, b) => (a.name > b.name ? 1 : -1));
    this.setState({ people: alphabeticallySortedPeople });
  };

  // Sort by Popularity
  sortByPopularity = () => {
    const people = this.state.people;
    const sortedPeopleByPopularity = [...people];
    sortedPeopleByPopularity.sort((a, b) => a.popularity - b.popularity);
    this.setState({ people: sortedPeopleByPopularity });
  };

  // Delete Contacts
  deleteContacts = (event) => {
    // Copying the array
    const people = this.state.people;
    const peopleToRemove = [...people];
    // Get index of Person to remove ---> not working
    peopleToRemove.map((person, index) => {
      const indexOfPersonToRemove = peopleToRemove.findIndex(
        (person) => person.id
      );
      console.log(indexOfPersonToRemove);

      // Remove Person
      if (indexOfPersonToRemove !== -1) {
        peopleToRemove.splice(indexOfPersonToRemove, 1);
        this.setState({ people: peopleToRemove });
      }
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.addRandomContact}>Add Random Contact</button>
        <button onClick={this.sortAlphabetically}>Sort by name</button>
        <button onClick={this.sortByPopularity}>Sort by popularity</button>
        <table>
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
