import React, {useEffect, useState} from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response=>{
      setRepositories(response.data);
    })
  },[]);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: "http://github.com/...",
      techs: [
      "Node.js",
      "..."
      ],
	    likes: 0
    });
    const project = response.data;

    setRepositories([...repositories, project]);
  }

  async function handleRemoveRepository(id) {
    const selectedRespository = repositories.findIndex(repository => repository.id === id)
    
    let newRepositories = [...repositories]
    newRepositories.splice(selectedRespository,1);
    setRepositories([...newRepositories]);
    
    
     api.delete(`repositories/${id}`);


  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (<li key={repository.title}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
