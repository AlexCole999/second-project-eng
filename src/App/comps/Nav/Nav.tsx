import './Nav.scss'
import React from 'react'
import { useRef } from 'react'
import NavSearch from './NavSearch/NavSearch';
import NavUser from './NavUser/NavUser';

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

  let navIsClosed = localStorage.getItem('navIsClosed');

  const nav = useRef();
  const navtrigger = useRef(null)

  function openCloseNavTrigger(): void {

    let mainTranslateWord = document.getElementsByClassName('NavSearch__searchedMainWord')[0];

    mainTranslateWord.classList.toggle('NavSearch__searchedMainWord_closed');
    nav.current.classList.toggle('Nav_closed');
    navtrigger.current.classList.toggle('Nav__trigger_closed');

    navIsClosed =
      navIsClosed == null
        ? 'true'
        : navIsClosed == 'true'
          ? 'false'
          : 'true'
    localStorage.setItem('navIsClosed', navIsClosed)

  }

  return (

    <div className={`Nav ${navIsClosed == 'true' ? 'Nav_closed' : ''}`} ref={nav} >

      <div className="Nav__body">

        <NavTop />
        <NavBottom />

      </div>

    </div >

  )

  function NavTop() {

    return (

      <div className="Nav__top">

        <div className={`Nav__trigger ${navIsClosed == 'true' ? 'Nav__trigger_closed' : ''}`} ref={navtrigger} onClick={openCloseNavTrigger}>

          <div >
            <FiChevronsRight size={25} />
          </div>

        </div>

        <NavLink
          to={"/second-project-eng/Profile"}
          title="Профиль">

          <NavUser />

        </NavLink>

        <NavSearch />

        <NavLink
          to={"/second-project-eng/DeepSearch"}
          title="Продвинутый поиск">

          <NavElem icon={<FiZoomIn size={40} />} text={'text'} />

        </NavLink>

        <NavLink
          to={"/second-project-eng/Learn"}
          title="Учить">

          <NavElem icon={<FiPlay size={40} />} text={'text'} />

        </NavLink>

        <NavLink
          to={"/second-project-eng/MyWords"}
          title="Добавленные слова">

          <NavElem icon={<FiList size={40} />} text={'text'} />

        </NavLink>

        <NavLink
          to={"/second-project-eng/Statistics"}
          title="Статистика">

          <NavElem icon={<FiTrendingUp size={40} />} text={'text'} />

        </NavLink>

        <NavLink
          to={"/second-project-eng/Settings"}
          title="Настройки">

          <NavElem icon={<FiSliders size={40} />} text={'text'} />

        </NavLink>

      </div>

    )

  }

  function NavElem(props) {
    return (
      <div className="Nav__elem">

        <div className="Nav__elemicon">
          {props.icon}
        </div>

        <div className="Nav__elemtext">
          {props.text}
        </div>

      </div>
    )
  }

  function NavBottom() {

    return (

      <div className="Nav__bottom">

        <NavLink
          to={"/second-project-eng/Instruction"}
          title="F.A.Q.">

          <div className="Nav__elem">

            <div className="Nav__elemicon">
              <BsQuestionLg size={40} />
            </div>

            <div className="Nav__elemtext">
              Краткая инструкция
            </div>

          </div>
        </NavLink>

      </div>

    )

  }

}