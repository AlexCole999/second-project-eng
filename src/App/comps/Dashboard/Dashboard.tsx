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

type Props = { name?: string }

export default function Dashboard({ }: Props) {

  return (

    <div className='Dashboard'>

      <div className="Dashboard__body">

        <Routes>
          <Route path="/second-project-eng/Profile" element={<Profile />} />
          <Route path="/second-project-eng/DeepSearch" element={<DeepSearch />} />
          <Route path="/second-project-eng/DeepSearch/:word" element={<DeepSearch />} />
          <Route path="/second-project-eng/MyWords" element={<MyWords />} />
          <Route path="/second-project-eng/Learn" element={<Learn />} />
          <Route path="/second-project-eng/Statistics" element={<Statistics />} />
          <Route path="/second-project-eng/Settings" element={<Settings />} />
          <Route path="/*" element={<Instruction />} />
        </Routes>

      </div>

    </div>

  )
}
