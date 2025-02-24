import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const url = import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:3000/graphql'

const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>,
)
