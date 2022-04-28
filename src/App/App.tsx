import React from 'react'
import './App.scss'
import Nav from './Nav/Nav';
import Dashboard from './Dashboard/Dashboard';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './API/firebase/firebaseConfig';

const app = initializeApp(firebaseConfig);

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
