import React, { createContext, useContext, useState } from 'react'

const ResultContext = createContext()
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1'

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('Elon Musk')

  const getResults = async (type) => {
    setLoading(true)
    const response = await fetch(`${baseUrl}${type}`, {
      method: 'GET',
      headers: {
        'x-user-agent': 'desktop',
        'x-rapidapi-host': 'google-search3.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_KEY
      }
    })

    const data = await response.json()
    console.log({ type, data })

    if (type.includes('/news')) {
      // console.log({data});
      setResults(data.entries)
    } else if (type.includes('/images')) {
      setResults(data.image_results)
    } else {
      setResults(data.results)
    }

    setLoading(false)
  }

  return (
    <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
      {children}
    </ResultContext.Provider>
  )
}

export const useResultContext = () => useContext(ResultContext)
