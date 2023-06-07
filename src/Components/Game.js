import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AverageKills from './AverageKills';


class Game extends Component {
  state = {
    witchControlled: true,
    villagers: [],
    newVillager: {
      name: '',
      ageOfDeath: '',
      yearOfDeath: '',
    },
  };

  componentDidMount() {
    const villagers = [
      { id: 1, name: 'Villager 1', ageOfDeath: 10, yearOfDeath: 12 },
      { id: 2, name: 'Villager 2', ageOfDeath: 13, yearOfDeath: 17 },
      { id: 3, name: 'Villager 3', ageOfDeath: 8, yearOfDeath: 11 },
      { id: 4, name: "semoga LULUS Amin", ageOfDeath: 100, yearOfDeath:100},
    ];

    this.setState({ villagers });
  }


  // PUT
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      newVillager: {
        ...prevState.newVillager,
        [name]: value,
      },
    }));
  };

  handleAddVillager = () => {
    const { newVillager, villagers } = this.state;
    if (newVillager.name && newVillager.ageOfDeath && newVillager.yearOfDeath) {
      const id = Math.max(...villagers.map((villager) => villager.id)) + 1;
      const updatedVillagers = [...villagers, { ...newVillager, id }];
      this.setState({
        villagers: updatedVillagers,
        newVillager: {
          name: '',
          ageOfDeath: '',
          yearOfDeath: '',
        },
      });
    }
  };


  // GET
  getVillager = (id) => {
    const { villagers } = this.state;
    return villagers.find((villager) => villager.id === id);
  };

  editVillager = (id, updatedVillager) => {
     
    
    const { villagers } = this.state;
    const updatedList = villagers.map((villager) => {
      if (villager.id === id) {
        return { ...villager, ...updatedVillager };
      }
      return villager;
    });

    this.setState({ villagers: updatedList });
  };


  // POST;Delete
  handleDeleteVillager = (id) => {
    const { villagers } = this.state;
    const updatedList = villagers.filter((villager) => villager.id !== id);
    this.setState({ villagers: updatedList });
  };

  calculateAverageKills = () => {
    const { villagers } = this.state;
    const totalYears = villagers.reduce(
      (sum, villager) => sum + (villager.yearOfDeath - villager.ageOfDeath),
      3
    );
    const averageKills = totalYears / villagers.length;
    return averageKills;
  };

  render() {
    const { witchControlled, villagers, newVillager } = this.state;

    return (
      <div className="container">
        <h1>Witch Saga: Return of badeasaputro@gmail.com</h1>
        <p>Current village status: {witchControlled ? 'Witch Lose / Witch Winner' : 'badeasaputro@gmail.com'}</p>

        <Router>
          <Switch>
            <Route exact path="/">
              <VillagersList
                villagers={villagers}
                newVillager={newVillager}
                handleInputChange={this.handleInputChange}
                handleAddVillager={this.handleAddVillager}
                getVillager={this.getVillager}
                editVillager={this.editVillager}
                handleDeleteVillager={this.handleDeleteVillager}
                calculateAverageKills={this.calculateAverageKills}
              />
            </Route>
            {/* add / tambah more Routes */}

            <Route path="/average-kills">
              <AverageKills averageKills={this.calculateAverageKills()} />
            </Route>

          </Switch>
        </Router>
      </div>
    );
  }
}

const VillagersList = ({
  villagers,
  newVillager,
  handleInputChange,
  handleAddVillager,
  // getVillager,
  editVillager,
  handleDeleteVillager,
  // calculateAverageKills,
}) => {
  return (
    <div>
      <h2>Villagers List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age of Death</th>
            <th>Year of Death</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {villagers.map((villager) => (
            <tr key={villager.id}>
              <td>{villager.name}</td>
              <td>{villager.ageOfDeath}</td>
              <td>{villager.yearOfDeath}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm ml-2"
                  onClick={() => {
                    const newName = prompt("Enter the updated name:");
                    const newAgeOfDeath = parseInt(prompt("Enter the updated age of death:"));
                    const newYearOfDeath = parseInt(prompt("Enter the updated year of death:"));

                    if (newName && !isNaN(newAgeOfDeath) && !isNaN(newYearOfDeath)) {
                      const updatedVillager = {
                        ...villager,
                        name: newName,
                        ageOfDeath: newAgeOfDeath,
                        yearOfDeath: newYearOfDeath,
                      };
                      editVillager(villager.id, updatedVillager);
                    }
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm ml-2"
                  onClick={() => handleDeleteVillager(villager.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>

        {/* PUT */}
        <h3>Add New Villager</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newVillager.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="ageOfDeath"
          placeholder="Age of Death"
          value={newVillager.ageOfDeath}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="yearOfDeath"
          placeholder="Year of Death"
          value={newVillager.yearOfDeath}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary" onClick={handleAddVillager}>
          Add Villager
        </button>
      </div>
      <Link to="/average-kills" className="btn btn-primary">
        Calculate Average Kills
      </Link>
    </div>
  );
};

export default Game;
