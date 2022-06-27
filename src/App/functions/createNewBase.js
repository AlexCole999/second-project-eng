class CreateNewBase {


  console() { console.log('it works') }


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

}

const createNewBase = new CreateNewBase();

export default createNewBase;