import React from 'react'
import './App.scss'
import firebaseConfig from '../API/firebase/firebaseConfig';
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
