import React from 'react'
import './Instruction.scss'
import { FiList } from "react-icons/fi";
import { FiZoomIn } from "react-icons/fi";
import { FiPlay } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import { FiSliders } from "react-icons/fi";
import { BsQuestionLg } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { FiUserX } from 'react-icons/fi';
import { FaMicrophone } from "react-icons/fa";
import { FiChevronsRight, FiRotateCw } from "react-icons/fi";
import { AiFillCheckCircle, AiFillPlayCircle } from "react-icons/ai";

type Props = {}

export default function Instruction({ }: Props) {

  return (
    <div className='Instruction'>

      <div style={{ fontSize: '35px', fontWeight: 'bolder', textAlign: 'center', marginBottom: '15px', marginTop: '15px' }}>
        Инструкция
      </div>

      <div style={{ fontSize: '25px', fontWeight: 'bolder', textAlign: 'center', marginBottom: '15px', marginTop: '15px' }}>
        Профиль
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <NavLink to={"/Profile"}>
          <FiUserX size={60} color='black' />
        </NavLink>
        <div style={{ display: 'inline-block', fontStyle: 'italic', marginLeft: '10px' }}><b>Профиль:</b> нажмите на кнопку входа слева вверху, чтобы зайти в свой профиль. Все данные будут сохраняться в индивидуальной базе, будет доступна личная статистика и список слов</div>
      </div>

      <div style={{ fontSize: '25px', fontWeight: 'bolder', textAlign: 'center', marginBottom: '15px', marginTop: '15px' }}>
        Поиск переводов
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <NavLink to={"/DeepSearch"}>
          <FaMicrophone size={60} color='black' />
        </NavLink>
        <div style={{ display: 'inline-block', fontStyle: 'italic', marginLeft: '10px' }}><b>Голосовой ввод:</b> нажмите и удерживайте кнопку голосового ввода, скажите слово в слух, затем отпустите кнопку.Строка поиска заполнится сказанным словом, произойдет поиск переводов.(Примечание: По умолчанию распознаватель текста настроен на идентификацию английской речи, однако вы можете изменить это во вкладке настроек. Независимо от количества произнесенных слов определяться будет только самое последнее)</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <div style={{ display: 'inline-block', fontStyle: 'italic', marginLeft: '10px' }}><b>Текстовый ввод:</b> ниже кнопки голосового ввода находится поле текстового ввода. Введите слово в текстовом формате, чтобы найти перевод</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <div style={{ display: 'inline-block', fontStyle: 'italic', marginLeft: '10px' }}><b>Быстрый результат:</b> для отображения самого популярного перевода непосредственно в панели поиска - раскройте панель меню (кликните на две направленные горизонтально вправо стрелки, расположенные выше и левее иконки входа в аккаунт: <FiChevronsRight />). Результат поиска будет отображен ниже панели текстового ввода. (Примечание: доступно только при ширине экрана больше 550 пикселей. Поверните экран горизонтально для отображения быстрого результата, либо воспользуйтесь вкладкой Продвинутого поиска)</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <div style={{ display: 'inline-block', fontStyle: 'italic', marginLeft: '10px' }}><b>Кнопки быстрого добавления:</b> ниже быстрого результата отобразятся кнопки управления словом: <AiFillCheckCircle />, <AiFillPlayCircle />. Добавьте перевод в базу, кликнув на кнопку с отображением галочки. Добавьте слово в игровые, кликнув по иконке с изображением "play" (Примечание:При повторном нажатии на кнопку с галочкой перевод удалится, однако, если в базе слов есть иные переводы - она останется зеленой, сообщая о наличии слова в базе)</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <div style={{ display: 'inline-block', fontStyle: 'italic', marginLeft: '10px' }}><b>Языковая панель:</b> для выбора языка раскройте панель языков (кликните на две направленные вертикально вниз стрелки под флагом выбранного языка:<FiChevronsRight style={{ rotate: '90deg' }} />) и выберите интересующий вас язык. Для смены направления перевода нажмите на кнопку, расположенную между кнопкой открытия языковой панели и флагом языка: <FiRotateCw /></div>
      </div>

      <div style={{ fontSize: '25px', fontWeight: 'bolder', textAlign: 'center', marginBottom: '15px', marginTop: '15px' }}>
        Кнопки навигации
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <NavLink to={"/DeepSearch"}>
          <FiZoomIn size={60} color='black' />
        </NavLink>
        <div style={{ display: 'inline-block', fontStyle: 'italic', marginLeft: '10px' }}><b>Продвинутый поиск:</b> откройте вкладку, чтобы увидеть все варианты переводов введенного слова, информацию о примерах и частоте их использования</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <NavLink to={"/Learn"} title="">
          <FiPlay size={60} color='black' />
        </NavLink>
        <div style={{ display: 'inline-block', fontStyle: 'italic', marginLeft: '10px' }}><b>Игра:</b> откройте вкладку, чтобы выбрать одну из игр для изучения слов</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <NavLink to={"/MyWords"}>
          <FiList size={60} color='black' />
        </NavLink>
        <div style={{ display: 'inline-block', fontStyle: 'italic', marginLeft: '10px' }}><b>База слов:</b> откройте вкладку, чтобы увидеть все ранее добавленные слова, удалить слова, удалить отедльные переводы слов или выбрать новое слово для игр</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <NavLink to={"/Statistics"}>
          <FiTrendingUp size={60} color='black' />
        </NavLink>
        <div style={{ display: 'inline-block', fontStyle: 'italic', marginLeft: '10px' }}><b>Статистика:</b> откройте вкладку, чтобы увидеть количество добавленных слов, переводов, а так же сыгранных и успешно завершенных игр</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <NavLink to={"/Settings"}>
          <FiSliders size={60} color='black' />
        </NavLink>
        <div style={{ display: 'inline-block', fontStyle: 'italic', marginLeft: '10px' }}>
          <b>
            Настройки:
          </b> откройте вкладку, чтобы изменить цветовой режим и некоторые расширенные параметры поиска
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <NavLink to={"/Instruction"}>
          <BsQuestionLg size={60} color='black' />
        </NavLink>
        <div style={{ display: 'inline-block', fontStyle: 'italic', marginLeft: '10px' }}><b>Инструкция</b> откройте вкладку, чтобы снова увидеть данную инструкцию</div>
      </div>

    </div>
  );
};