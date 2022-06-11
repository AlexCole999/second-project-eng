import React from 'react'
import './App.scss'
import Nav from './Nav/Nav';
import Dashboard from './Dashboard/Dashboard';


type Props = {}

export default function App({ }: Props) {

  return (

    <div className="App">

      <div className="App__body">
        <Nav />
        <Dashboard />
      </div>

    </div>
  )
}
