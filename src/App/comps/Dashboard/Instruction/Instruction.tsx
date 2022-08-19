import React from 'react'
import './Instruction.scss'
import { NavLink } from "react-router-dom";
import { FiList, FiZoomIn, FiPlay, FiTrendingUp, FiSliders, FiUserX } from "react-icons/fi";
import { FaMicrophone, FaKeyboard, FaFlagCheckered } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsQuestionLg } from "react-icons/bs";
import { RiTranslate } from "react-icons/ri"

type Props = {}

export default function Instruction({ }: Props) {

  function InstructionTitle({ title }) {
    return (
      <div className='Instruction__title'>
        {title}
      </div>
    )
  }

  function InstructionSubtitle({ subtitle }) {
    return (
      <div className='Instruction__subtitle'>
        {subtitle}
      </div>
    )
  }

  function InstructionElem({ direction, icon, title, text }) {
    return (
      <div className='Instruction__elem'>
        <NavLink to={direction}>{icon}</NavLink>
        <div className='Instruction__elemtext'>
          <b>{title}:</b>
          <div>{text}</div>
        </div>
      </div>
    )
  }

  return (
    <div className='Instruction'>

      <InstructionTitle title='Инструкция' />

      <InstructionSubtitle subtitle='Профиль' />

      <InstructionElem
        direction='/Profile'
        icon={<FiUserX size={60} color='black' />}
        title='Профиль'
        text='Нажмите на кнопку входа слева вверху, чтобы зайти в свой профиль. Все данные будут сохраняться в индивидуальной базе, будет доступна личная статистика и список слов'
      />

      <InstructionSubtitle subtitle='Поиск переводов' />

      <InstructionElem
        direction='/DeepSearch'
        icon={<FaMicrophone size={60} color='black' />}
        title='Голосовой ввод'
        text='Нажмите и удерживайте кнопку голосового ввода, скажите слово в слух, затем отпустите кнопку.Строка поиска заполнится сказанным словом, произойдет поиск переводов.(Примечание: По умолчанию распознаватель текста настроен на идентификацию английской речи, однако вы можете изменить это во вкладке настроек. Независимо от количества произнесенных слов определяться будет только самое последнее)'
      />

      <InstructionElem
        direction={''}
        icon={<FaKeyboard size={60} color='black' />}
        title='Текстовый ввод'
        text='Ниже кнопки голосового ввода находится поле текстового ввода. Введите слово в текстовом формате, чтобы найти перевод'
      />

      <InstructionElem
        direction={''}
        icon={<RiTranslate size={60} color='black' />}
        title='Быстрый результат'
        text='Для отображения самого популярного перевода непосредственно в панели поиска - раскройте панель меню (кликните на две направленные горизонтально вправо стрелки, расположенные выше и левее иконки входа в аккаунт). Результат поиска будет отображен ниже панели текстового ввода. (Примечание: доступно только при ширине экрана больше 550 пикселей. Поверните экран горизонтально для отображения быстрого результата, либо воспользуйтесь вкладкой Продвинутого поиска)'
      />

      <InstructionElem
        direction={''}
        icon={<AiFillCheckCircle size={60} color='black' />}
        title='Кнопки быстрого добавления'
        text='Ниже строки быстрого результата отобразятся кнопки управления словом. Добавьте перевод в базу, кликнув на кнопку с отображением галочки. Добавьте слово в игровые, кликнув по иконке с изображением "play" (Примечание:При повторном нажатии на кнопку с галочкой перевод удалится, однако, если в базе слов есть иные переводы - она останется зеленой, сообщая о наличии слова в базе)'
      />

      <InstructionElem
        direction={''}
        icon={<FaFlagCheckered size={60} color='black' />}
        title='Языковая панель'
        text='Для выбора языка раскройте панель языков (кликните на две направленные вертикально вниз стрелки под флагом выбранного языка и выберите интересующий вас язык. Для смены направления перевода нажмите на кнопку, расположенную между кнопкой открытия языковой панели и флагом языка'
      />

      <InstructionSubtitle subtitle='Кнопки навигации' />

      <InstructionElem
        direction={"/DeepSearch"}
        icon={<FiZoomIn size={60} color='black' />}
        title='Продвинутый поиск'
        text='Откройте вкладку, чтобы увидеть все варианты переводов введенного слова, информацию о примерах и частоте их использования'
      />

      <InstructionElem
        direction={"/Learn"}
        icon={<FiPlay size={60} color='black' />}
        title='Игра'
        text='Откройте вкладку, чтобы выбрать одну из игр для изучения слов'
      />

      <InstructionElem
        direction={"/MyWords"}
        icon={<FiList size={60} color='black' />}
        title='База слов'
        text='Откройте вкладку, чтобы увидеть все ранее добавленные слова, удалить слова, удалить отедльные переводы слов или выбрать новое слово для игр'
      />

      <InstructionElem
        direction={"/Statistics"}
        icon={<FiTrendingUp size={60} color='black' />}
        title='Статистика'
        text='Откройте вкладку, чтобы увидеть количество добавленных слов, переводов, а так же сыгранных и успешно завершенных игр'
      />

      <InstructionElem
        direction={"/Settings"}
        icon={<FiSliders size={60} color='black' />}
        title='Настройки'
        text='Откройте вкладку, чтобы изменить цветовой режим и некоторые расширенные параметры поиска'
      />

      <InstructionElem
        direction={"/Instruction"}
        icon={<BsQuestionLg size={60} color='black' />}
        title='Инструкция'
        text='Откройте вкладку, чтобы снова увидеть данную инструкцию'
      />

    </div>

  );

};