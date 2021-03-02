import logo from './logo.svg';
import './App.css';
import React from 'react';
import contacts from './contacts.json';

let people = contacts.slice(0, 5);

function App() {
  return (
    <div className="App">
      <Display />
    </div>
  );
}

class Display extends React.Component {
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
        <tr key={person.name}>
          <td>
            <img
              className="person-picture"
              src={person.pictureUrl}
              alt={person.name}
            />
          </td>
          <td>{person.name}</td>
          <td>{person.popularity}</td>
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
    return this.state.people.sort(function (a, b) {
      let nameA = this.state.people.name.toLowerCase();
      let nameB = this.state.people.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  // Sort by Popularity

  render() {
    return (
      <div>
        <button onClick={this.addRandomContact}>Add Random Contact</button>
        <button onClick={this.sortAlphabetically}>Sort by name</button>
        <button>Sort by popularity</button>
        <table>
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
