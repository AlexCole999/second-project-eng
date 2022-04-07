import React from 'react'
import './Nav.scss'
import { AiFillAccountBook } from "react-icons/ai";
import { FiList } from "react-icons/fi";
import { FiZoomIn } from "react-icons/fi";
import { FiPlay } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import { FiSliders } from "react-icons/fi";
import { FiChevronsRight } from "react-icons/fi";
import { BsQuestionLg } from "react-icons/bs";
import { NavLink } from "react-router-dom";

type Props = {}

export default function Nav({ }: Props) {
  function openCloseTrigger() {
    let navElem = document.querySelector('.Nav');
    let navTrigger = document.querySelector('.Nav__trigger');
    navElem.classList.toggle('Nav_opened');
    navTrigger.classList.toggle('Nav__trigger_opened');
  }
  return (
    <div className='Nav'>
      <div className="Nav__body">
        <div className="Nav__top">
          <div className="Nav__trigger" onClick={openCloseTrigger}>
            <div ><FiChevronsRight size={25} /></div>
          </div>
          <div className="User">
            <div className="User__photo"></div>
          </div>
          <div className="Nav__search">
            <input placeholder="..." type="input" />
          </div>
          <NavLink to={"/second-project-eng/DeepSearch"} className="Navbar-right-elem" title="Продвинутый поиск">
            <div className="Nav__elem">
              <div className="Nav__elemicon"><FiZoomIn size={40} /></div>
              <div className="Nav__elemtext">Поиск</div>
            </div>
          </NavLink>
          <NavLink to={"/second-project-eng/MyWords"} className="Navbar-right-elem" title="Добавленные слова">
            <div className="Nav__elem">
              <div className="Nav__elemicon"><FiList size={40} /></div>
              <div className="Nav__elemtext">Мои слова</div>
            </div>
          </NavLink>
          <NavLink to={"/second-project-eng/Learn"} className="Navbar-right-elem" title="Учить">
            <div className="Nav__elem">
              <div className="Nav__elemicon"><FiPlay size={40} /></div>
              <div className="Nav__elemtext">Учить</div>
            </div>
          </NavLink>
          <NavLink to={"/second-project-eng/Statistics"} className="Navbar-right-elem" title="Статистика">
            <div className="Nav__elem">
              <div className="Nav__elemicon"><FiTrendingUp size={40} /></div>
              <div className="Nav__elemtext">Статистика</div>
            </div>
          </NavLink>
          <NavLink to={"/second-project-eng/Settings"} className="Navbar-right-elem" title="Настройки">
            <div className="Nav__elem">
              <div className="Nav__elemicon"><FiSliders size={40} /></div>
              <div className="Nav__elemtext">Настройки</div>
            </div>
          </NavLink>
        </div>
        <div className="Nav__bottom">
          <NavLink to={"/second-project-eng/Instruction"} className="Navbar-right-elem" title="F.A.Q.">
            <div className="Nav__elem">
              <div className="Nav__elemicon"><BsQuestionLg size={40} /></div>
              <div className="Nav__elemtext">Краткая инструкция</div>
            </div>
          </NavLink>
        </div>
      </div>
    </div >
  )
}