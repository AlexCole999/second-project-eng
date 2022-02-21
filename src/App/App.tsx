import React from 'react'
import './App.scss'
import Nav from './Nav/Nav';
import Dashboard from './Dashboard/Dashboard';
import Footer from './Footer/Footer';


export default function App() {
  let num = 5;
  return (
    <div className="App">
      <div className="App__body">
        <Nav />
        <Dashboard />
        <Footer />
      </div>
    </div>
  )
}
