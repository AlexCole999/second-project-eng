import React from 'react'
import './Nav.scss'
import { AiFillAccountBook } from "react-icons/ai";
import { NavLink } from "react-router-dom";

type Props = {}

export default function Nav({ }: Props) {
  return (
    <div className='Nav'>
      <div className="Nav__body">
        <NavLink to={"/second-project-eng/DeepSearch"} className="Navbar-right-elem" title="Продвинутый поиск">
          <div className="Nav__elem">
            <div className="Nav__elemicon"><AiFillAccountBook size={35} /></div>
            <div className="Nav__elemtext">Поиск</div>
          </div>          </NavLink>
        <NavLink to={"/second-project-eng/MyWords"} className="Navbar-right-elem" title="Добавленные слова">
          <div className="Nav__elem">
            <div className="Nav__elemicon"><AiFillAccountBook size={35} /></div>
            <div className="Nav__elemtext">Мои слова</div>
          </div>          </NavLink>
        <NavLink to={"/second-project-eng/Contacts"} className="Navbar-right-elem" title="Учить">
          <div className="Nav__elem">
            <div className="Nav__elemicon"><AiFillAccountBook size={35} /></div>
            <div className="Nav__elemtext">Учить</div>
          </div>          </NavLink>
        <NavLink to={"/second-project-eng/Learn"} className="Navbar-right-elem" title="Статистика">
          <div className="Nav__elem">
            <div className="Nav__elemicon"><AiFillAccountBook size={35} /></div>
            <div className="Nav__elemtext">Статистика</div>
          </div>
        </NavLink>
        <NavLink to={"/second-project-eng/Statistics"} className="Navbar-right-elem" title="F.A.Q.">
          <div className="Nav__elem">
            <div className="Nav__elemicon"><AiFillAccountBook size={35} /></div>
            <div className="Nav__elemtext">F.A.Q.</div>
          </div>
        </NavLink>
      </div>
    </div>
  )
}