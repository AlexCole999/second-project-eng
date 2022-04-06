import React from 'react'
import './Dashboard.scss'
import { Routes, Route } from "react-router-dom";
import DeepSearch from './DeepSearch/DeepSearch';
import Instruction from './Instruction/Instruction';
import Learn from './Learn/Learn';
import MyWords from './MyWords/MyWords';
import Statistics from './Statistics/Statistics';
import Settings from './Settings/Settings';


type Props = { name?: string }

export default function Dashboard({ }: Props) {
  return (
    <div className='Dashboard'>
      <div className="Dashboard__body">
        <Routes>
          <Route path="/second-project-eng/DeepSearch" element={<DeepSearch />}>
          </Route>
          <Route path="/second-project-eng/MyWords" element={<MyWords />}>
          </Route>
          <Route path="/second-project-eng/Learn" element={<Learn />}>
          </Route>
          <Route path="/second-project-eng/Statistics" element={<Statistics />}>
          </Route>
          <Route path="/second-project-eng/Settings" element={<Settings />}>
          </Route>
          <Route path='*' element={<Instruction />}>
          </Route>
        </Routes>
      </div>
    </div>
  )
}
