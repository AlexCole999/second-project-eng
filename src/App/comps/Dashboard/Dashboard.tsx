import './Dashboard.scss'
import React from 'react'
import { Routes, Route } from "react-router-dom";
import DeepSearch from './DeepSearch/DeepSearch';
import Instruction from './Instruction/Instruction';
import Learn from './Learn/Learn';
import MyWords from './MyWords/MyWords';
import Statistics from './Statistics/Statistics';
import Settings from './Settings/Settings';
import Profile from './Profile/Profile';

type Props = {}

export default function Dashboard({ }: Props) {

  return (

    <div className='Dashboard'>

      <div className="Dashboard__body">

        <Routes>
          <Route path="/Profile" element={<Profile />} />
          <Route path="/DeepSearch" element={<DeepSearch />} />
          <Route path="/DeepSearch/:word" element={<DeepSearch />} />
          <Route path="/MyWords" element={<MyWords />} />
          <Route path="/Learn" element={<Learn />} />
          <Route path="/Statistics" element={<Statistics />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/*" element={<Instruction />} />
        </Routes>

      </div>

    </div>

  )
}
