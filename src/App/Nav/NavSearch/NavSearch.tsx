import React from 'react'
import debounce from './../../../functions/debounce';
import './NavSearch.scss';

type Props = {}

const debouncedRequest = debounce(yandexDictionaryRequest, 500)

function yandexDictionaryRequest(input: string): void {
  if (input) {
    if (input.match(/\w+$/)) {
      fetch
        ('https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=\dict.1.1.20210811T164421Z.dc92c34aa55f8bde.11d283af044e951db1e180d89d183eafd3dac943&lang=en-ru&text=' + input)
        .then(x => x.json())
        .then(x => console.log(x));
    }
  }
}

export default function NavSearch({ }: Props) {
  return (
    <div className="NavSearch">
      <input placeholder="..."
        type="input"
        onChange={
          (e) => {
            debouncedRequest(e.target.value);
          }} />
    </div>
  )
}
