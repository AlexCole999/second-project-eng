class CreateNewBase {

  baseWithNewGameWord(oldbase, selectedLanguage, wordForGame, newGameWord) {

    const currentBaseWords = JSON.parse(JSON.stringify(oldbase));
    let newBaseWords = currentBaseWords;

    newBaseWords[wordForGame] = currentBaseWords[wordForGame]
      ? {
        ...currentBaseWords[wordForGame],
        gameword: newGameWord
      }
      : {
        word: wordForGame,
        translates: [{ language: selectedLanguage, translate: newGameWord }],
        gameword: newGameWord
      };

    return newBaseWords

  }

  baseWithNewTranslateForWord(oldbase, selectedLanguage, wordForTranslateAppend, newTranslate) {

    const currentBaseWords = JSON.parse(JSON.stringify(oldbase));
    let newBaseWords = currentBaseWords;

    newBaseWords[wordForTranslateAppend] = currentBaseWords[wordForTranslateAppend]
      ? {
        ...currentBaseWords[wordForTranslateAppend],
        translates: [...currentBaseWords[wordForTranslateAppend]['translates'].filter(x => x.translate !== newTranslate), { language: selectedLanguage, translate: newTranslate }]
      }
      : {
        word: wordForTranslateAppend,
        translates: [{ language: selectedLanguage, translate: newTranslate }]
      };

    return newBaseWords

  }

  baseWithDeletedTranslateForWord(oldbase, word, translateForDelete) {

    const currentBaseWords = JSON.parse(JSON.stringify(oldbase));
    let newBaseWords = currentBaseWords;

    let translatesArrayLength = currentBaseWords[word]['translates'].length

    if (translatesArrayLength > 1) {
      newBaseWords[word] = {
        ...currentBaseWords[word],
        translates: currentBaseWords[word]['translates'].filter(x => x.translate !== translateForDelete)
      }
    }

    if (translatesArrayLength == 1) {
      delete newBaseWords[word];
    }

    return newBaseWords

  }

  baseWithDeletedWord(oldbase, word) {

    const currentBaseWords = JSON.parse(JSON.stringify(oldbase));
    let newBaseWords = currentBaseWords;

    delete newBaseWords[word];

    return newBaseWords

  }

  baseWithDeletedGameWord(oldbase, word) {

    const currentBaseWords = JSON.parse(JSON.stringify(oldbase));
    let newBaseWords = currentBaseWords;

    delete newBaseWords[word]['gameword']

    return newBaseWords

  }

}

const createNewBase = new CreateNewBase();

export default createNewBase;