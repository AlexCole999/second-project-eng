import React from 'react'
import './App.scss'
import Nav from './Nav/Nav';
import Dashboard from './Dashboard/Dashboard';
import Footer from './Footer/Footer';

type Props = {}

export default function App({ }: Props) {
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