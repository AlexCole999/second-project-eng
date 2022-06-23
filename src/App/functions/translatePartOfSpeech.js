const translatePartOfSpeech = (string) => {

  return (
    string === "noun" ? "Существительное"
      : string === "verb" ? "Глагол"
        : string === "adjective" ? "Прилагательное"
          : string === "pronoun" ? "Местоимение"
            : string === "adverb" ? "Наречие"
              : string === "preposition" ? "Предлог"
                : string === "foreign word" ? "Иностранное слово"
                  : string === "participle" ? "Причастие"
                    : string === "particle" ? "Частица"
                      : string === "interjection" ? "Междометие"
                        : string === "numeral" ? "Числительное"
                          : string === "predicative" ? "Предикатив"
                            : string === "conjunction" ? "Союз"
                              : string === "parenthetic" ? "Вводное"
                                : string
  )

}

export default translatePartOfSpeech;