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
}

const createNewBase = new CreateNewBase();

export default createNewBase;