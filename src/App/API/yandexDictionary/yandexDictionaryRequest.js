import yandexDictionaryKey from './yandexDictionaryKey';

const yandexDictionaryRequest = (language, word) => {

  return (
    axios.get(
      'https://dictionary.yandex.net/api/v1/dicservice.json/lookup'
      + '?key='
      + yandexDictionaryKey
      + '&lang='
      + language
      + '&text='
      + word)
  )

}

export default yandexDictionaryRequest;
