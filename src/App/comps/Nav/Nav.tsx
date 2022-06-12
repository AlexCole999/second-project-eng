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

  const nav = useRef();
  const navtrigger = useRef(null)

  function openCloseNavTrigger(): void {

    let mainTranslateWord = document.getElementsByClassName('NavSearch__searchedMainWord')[0];

    mainTranslateWord.classList.toggle('NavSearch__searchedMainWord_closed');
    nav.current.classList.toggle('Nav_closed');
    navtrigger.current.classList.toggle('Nav__trigger_closed');

  }

  return (
    <div className='Nav' ref={nav}>

      <div className="Nav__body">

        <div className="Nav__top">

          <div className="Nav__trigger" ref={navtrigger} onClick={openCloseNavTrigger}>

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

            <div className="Nav__elem">

              <div className="Nav__elemicon">
                <FiZoomIn size={40} />
              </div>

              <div className="Nav__elemtext">
                Продвинутый поиск
              </div>

            </div>
          </NavLink>

          <NavLink
            to={"/second-project-eng/Learn"}
            title="Учить">

            <div className="Nav__elem">

              <div className="Nav__elemicon">
                <FiPlay size={40} />
              </div>

              <div className="Nav__elemtext">
                Играть
              </div>

            </div>
          </NavLink>

          <NavLink
            to={"/second-project-eng/MyWords"}
            title="Добавленные слова">

            <div className="Nav__elem">

              <div className="Nav__elemicon">
                <FiList size={40} />
              </div>

              <div className="Nav__elemtext">
                Мои слова
              </div>

            </div>
          </NavLink>

          <NavLink
            to={"/second-project-eng/Statistics"}
            title="Статистика">

            <div className="Nav__elem">

              <div className="Nav__elemicon">
                <FiTrendingUp size={40} />
              </div>

              <div className="Nav__elemtext">
                Статистика
              </div>

            </div>
          </NavLink>

          <NavLink
            to={"/second-project-eng/Settings"}
            title="Настройки">

            <div className="Nav__elem">

              <div className="Nav__elemicon">
                <FiSliders size={40} />
              </div>

              <div className="Nav__elemtext">
                Настройки
              </div>

            </div>
          </NavLink>

        </div>

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

      </div>

    </div >

  )
}