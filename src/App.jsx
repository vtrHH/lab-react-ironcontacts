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
            <button onClick={() => this.removeContacts(person.id)}>
              Delete
            </button>
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
    const alphabeticallySortedPeople = [...this.state.people];
    alphabeticallySortedPeople.sort((a, b) => (a.name > b.name ? 1 : -1));
    this.setState({ people: alphabeticallySortedPeople });
  };

  // Sort by Popularity
  sortByPopularity = () => {
    const sortedPeopleByPopularity = [...this.state.people];
    sortedPeopleByPopularity.sort((a, b) => b.popularity - a.popularity);
    this.setState({ people: sortedPeopleByPopularity });
  };

  // Delete Contacts
  removeContacts = (id) => {
    // Copying the array
    const peopleToMaintain = [...this.state.people];
    // Get index of Person to remove
    const index = peopleToMaintain.findIndex((person) => person.id === id);
    // Remove Person
    if (peopleToMaintain !== -1) {
      peopleToMaintain.splice(index, 1);
      this.setState({ people: peopleToMaintain });
    }
  };

  render() {
    return (
      <div>
        <div>
          <button onClick={this.addRandomContact}>Add Random Contact</button>
          <button onClick={this.sortAlphabetically}>Sort by name</button>
          <button onClick={this.sortByPopularity}>Sort by popularity</button>
        </div>
        <table>
          <head>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </head>
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
