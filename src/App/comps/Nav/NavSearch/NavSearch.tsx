import './NavSearch.scss';
import React from 'react';
import { useState, useRef } from 'react';
import debounce from './../../../functions/debounce';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from "react-icons/ai";
import SearchedMainWord from './SearchedMainWord/SearchedMainWord';
import LanguagesPanel from './LanguagesPanel/LanguagesPanel';
import yandexDictionaryRequest from './../../../Api/yandexDictionary/yandexDictionaryRequest';

type Props = {}

export default function NavSearch({ }: Props) {

  const dispatch = useDispatch();

  const [inputstate, setinputstate] = useState('')

  const selectedLanguage = useSelector(state => state.selectedLanguage)

  const inputsearch = useRef(null);

  function yandexDictionaryInputRequest() {
    yandexDictionaryRequest(selectedLanguage, inputsearch.current.value)
      .then(response => {
        dispatch({ type: "GET_TRANSLATES_FROM_YANDEX_DICTIONARY", payload: response.data.def });
      })
  }

  const debouncedYandexDictionaryInputRequest = debounce(yandexDictionaryInputRequest, 500)

  return (

    <div className="NavSearch">

      <div className='NavSearch__inputElem'>

        <input placeholder="..." type="input"
          ref={inputsearch}
          onChange={(e) => {

            if (e.target.value.match(/[a-zA-Zа-яА-Я]+$/)) {
              debouncedYandexDictionaryInputRequest();
            }

            if (e.target.value == 0) {
              dispatch({ type: "GET_TRANSLATES_FROM_YANDEX_DICTIONARY", payload: {} });
            }

            setinputstate(e.target.value)

          }} />

        <InputDeleteButton display={inputstate ? true : false} />

      </div>

      <SearchedMainWord />

      <LanguagesPanel inputsearch={inputsearch} />

    </div>
  )

  function InputDeleteButton({ display }) {
    return (
      display
        ? <div className='NavSearch__inputDeleteButton' onClick={() => {
          dispatch({ type: "GET_TRANSLATES_FROM_YANDEX_DICTIONARY", payload: {} });
          inputsearch.current.value = "";
          setinputstate('');
        }}>
          <AiOutlineClose className='NavSearch__inputDeleteButtonIcon' />
        </div>
        : ''
    )
  }

}


