import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repository, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Front-end com ReactJs${Date.now()}`,
      url: `http://api.github/users/viniclefer/repos${Date.now()}`,
      techs: [`ReactJs, React Native, NodeJs${Date.now()}`]
    });

    const newRepo = response.data;

    setRepositories([...repository, newRepo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repositories = repository.filter(repos => repos.id !== id);

    setRepositories(repositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
