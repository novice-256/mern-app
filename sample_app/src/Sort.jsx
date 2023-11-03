import React, { useState } from "react";

export default function Sort() {
  const [data, setData] = useState([
    {
      team: "Barcelona",
      player: "Lionel Messi",
      goals: 35,
      manOfTheMatch: 8,
      rating: 9.8,
    },
    {
      team: "Barcelona",
      player: "Lionel Messi",
      goals: 35,
      manOfTheMatch: 8,
      rating: 9.8,
    },
    {
      team: "Real Madrid",
      player: "Karim Benzema",
      goals: 28,
      manOfTheMatch: 6,
      rating: 8.9,
    },
    {
      team: "Liverpool",
      player: "Mohamed Salah",
      goals: 31,
      manOfTheMatch: 7,
      rating: 9.5,
    },
    {
      team: "Manchester City",
      player: "Kevin De Bruyne",
      goals: 10,
      manOfTheMatch: 5,
      rating: 9.2,
    },
  ]);

  const [asc, setAsc] = useState(true);

  function sortByNum(property) {
    const sortedArray = [...data];
    if (asc) {
      sortedArray.sort((a, b) => b[property] - a[property]);
      setData(sortedArray);
      setAsc(!asc);
    } else {
      sortedArray.sort((a, b) => a[property] - b[property]);
      setData(sortedArray);
      setAsc(!asc);
    }
  }
  function sortByAlph() {
    const sortedArray = [...data];
    if (asc) {
      sortedArray.sort((a, b) => a.team.localeCompare(b.team));
      setData(sortedArray);
      setAsc(!asc);
    } else {
      sortedArray.sort((a, b) => b.team.localeCompare(a.team));
      setData(sortedArray);
      setAsc(!asc);
    }
  }

  const [selected, setSelected] = useState();
  return (
    <div>
      <fieldset>
        <legend>Teams</legend>
        <input
          type="radio"
          checked={selected === "Barcelona"}
          name="Barcelona"
          onChange={(e) => setSelected(e.target.value)}
          id=""
          value="Barcelona"
        />
        <label htmlFor="">Barcelona</label>

        <input
          type="radio"
          name="Liverpool"
          checked={selected === "Liverpool"}
          onChange={(e) => setSelected(e.target.value)}
          id=""
          value="Liverpool"
        />
        <label htmlFor="">Liverpool</label>

        <input
          type="radio"
          name="Real Madrid"
          checked={selected === "Real Madrid"}
          onChange={(e) => setSelected(e.target.value)}
          id=""
          value="Real Madrid"
        />
        <label htmlFor="">Real Madrid</label>
        <input
          type="radio"
          name=""
          checked={selected === ""}
          onChange={(e) => setSelected(e.target.value)}
          id=""
          value=""
        />
        <label htmlFor="">All</label>
      </fieldset>

      <table>
        <thead>
          <tr>
            <th onClick={sortByAlph}>Team</th>
            <th onClick={sortByAlph}>Player</th>
            <th onClick={() => sortByNum("goals")}>Goals</th>
            <th>Man of the Match</th>
            <th onClick={() => sortByNum("goals")}>Rating</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            if (item.team.match(selected)) {
              return (
                <tr key={index}>
                  <td>{item.team}</td>
                  <td>{item.player}</td>
                  <td>{item.goals}</td>
                  <td>{item.manOfTheMatch}</td>
                  <td>{item.rating}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
