import React from 'react'
import './Nav.scss'
import { AiFillAccountBook } from "react-icons/ai";
import { NavLink } from "react-router-dom";

type Props = {}

export default function Nav({ }: Props) {
  return (
    <div className='Nav'>
      <div className="Nav__body">
        <div className="Nav__top">
          <NavLink to={"/second-project-eng/DeepSearch"} className="Navbar-right-elem" title="Искать слова">
            <div className="Nav__elem"><AiFillAccountBook size={50} title="1" /></div>
          </NavLink>
          <NavLink to={"/second-project-eng/MyWords"} className="Navbar-right-elem" title="Искать слова">
            <div className="Nav__elem"><AiFillAccountBook size={50} title="1" /></div>
          </NavLink>
          <NavLink to={"/second-project-eng/Contacts"} className="Navbar-right-elem" title="Искать слова">
            <div className="Nav__elem"><AiFillAccountBook size={50} title="1" /></div>
          </NavLink>
          <NavLink to={"/second-project-eng/Learn"} className="Navbar-right-elem" title="Искать слова">
            <div className="Nav__elem"><AiFillAccountBook size={50} title="1" /></div>
          </NavLink>
        </div>
        <div className='Nav__bottom'>
          <NavLink to={"/second-project-eng/Statistics"} className="Navbar-right-elem" title="Искать слова">
            <div className="Nav__elem"><AiFillAccountBook size={50} title="1" /></div>
            <div>Nav</div>
          </NavLink>
        </div>
      </div>
    </div>
  )
}