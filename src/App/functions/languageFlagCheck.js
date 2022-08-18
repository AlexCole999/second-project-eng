import us from '../source/flags/us.svg'
import de from '../source/flags/de.svg';
import fr from '../source/flags/fr.svg';
import es from '../source/flags/es.svg';
import it from '../source/flags/it.svg';
import nl from '../source/flags/nl.svg';
import pl from '../source/flags/pl.svg';
import bg from '../source/flags/bg.svg';

const languageFlagCheck = (language) => {

  let src =
    language == 'de-ru' ? de
      : language == 'fr-ru' ? fr
        : language == 'es-ru' ? es
          : language == 'it-ru' ? it
            : language == 'nl-ru' ? nl
              : language == 'pl-ru' ? pl
                : language == 'bg-ru' ? bg
                  : language == 'en-ru' ? us
                    : ""

  return src

}

export default languageFlagCheck