import React from "react"
import ReactDOM from "react-dom"
import ApolloClient, { gql } from "apollo-boost"
import { ApolloProvider, Query } from "react-apollo"
import Button from '@material-ui/core/Button';
import Demo from './demo';

import "./styles.css"

const client = new ApolloClient({
  uri: "https://graphtu.herokuapp.com/v1/graphql"
})

const CharactersQuery = () => {
  return (
    <Query
      query={gql`
        {
          profile {
            id
            name
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error!</p>

        return data.profile.map(character => {
          return <p key={character.id}>{character.name}</p>
        })
      }}
    </Query>
  )
}

function App() {
  return (
    <div className="App">
      <Demo />
      <CharactersQuery />
       <Button variant="contained" color="primary">
        Hello World
      </Button>  
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
)
