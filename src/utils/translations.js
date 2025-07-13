/**
 * @file translation.js
 * @description Contains translations for the website in English, Italian, and Polish, covering various sections such as navbar, RSVP, registry, and more.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

const translations = {
  // ENGLISH <---------------------------------------------------------------------------------------
  en: {
    couple: {
      her: "Karolina",
      him: "Emanuele",
      footer_her: "Karolina",
      footer_him: "Emanuele",
    },
    navbar: {
      welcome: "Welcome",
      save_the_date: "Save the Date",
      schedule: "Wedding Timeline",
      info: "Details",
      rsvp: "RSVP",
      registry: "Registry",
      music: "Playlist",
    },
    welcome_section: {
      small_text: "The wedding of...",
      days: "Days",
      day: "Day",
      hours: "Hours",
      hour: "Hours",
      minutes: "Minutes",
      minute: "Minute",
      seconds: "Seconds",
      second: "second",
      button: "Save the Date",
    },
    saveTheDate_section: {
      title: "SAVE",
      title_cursive: "The Date",
      date: "26th of July 2025",
      place: "in Kolonia Łobudzice, Poland",
      story_1: "We Met",
      story_2: "We Got Engaged",
      story_3_future: "We Will Marry",
      story_3_past: "We Got Married",
    },
    schedule_section: {
      title: {
        main: "WEDDING",
        sub: "Timeline",
      },
      description:
        "The wedding celebration will start on Saturday, 26th of July, and end on Sunday, 27th of July 2025.",
      day_1: {
        title: "Day 1",
        events: {
          ceremony: {
            time: "4:00 PM",
            title: "Ceremony Begins",
          },
          dinner: {
            time: "6:00 PM",
            title: "Dinner Served",
          },
          dance: {
            time: "6:00 PM",
            title: "First Dance",
          },
          photo: {
            time: "8:00 - 11:00 PM",
            title: "Photo Booth",
          },
          pig: {
            time: "12:00 AM",
            title: "Special Dish",
          },
          cake_cutting: {
            time: "22:30 PM",
            title: "Cake Cutting",
          },
          games: {
            time: "12:30 AM",
            title: "Party Games",
          },
          party: {
            time: "All Night",
            title: "Eat, Drink, Dance, Repeat!",
          },
        },
      },
      day_2: {
        title: "Day 2",
        events: {
          after: {
            time: "3:00 PM",
            title: "After Party Starts",
          },
          vespa: {
            time: "3:00 - 8:00 PM",
            title: "Vespa Bar",
          },
          party_continues: {
            time: "All Day",
            title: "Eat, Drink, Dance, Repeat!",
          },
          end: {
            time: "9:00 PM",
            title: "The End",
          },
        },
      },
    },
    info_section: {
      title: {
        main: "THE",
        sub: "Details",
      },
      details: {
        when_where: "When & Where",
        dates: [
          {
            bold: true,
            text: "Dates: ",
          },
          "Saturday, 26th of July & Sunday, 27th of July 2025.",
        ],
        location: [
          {
            bold: true,
            text: "Location: ",
          },
          'Venue "Przy Patykach", Kolonia Łobudzice 18c, 97-425, Poland.',
        ],
        button_loc: "SEE THE VENUE",
      },
      accommodations: {
        title: "Accommodations",
        description_1: [
          "For our international guests, we are pleased to offer accommodation at the venue's hotel on the ",
          {
            bold: true,
            text: "Friday 25th of July, Saturday 26th of July, and Sunday 27th of July.",
          },
        ],
        breakfast: [
          { bold: true, text: "Breakfast" },
          " is included with your stay and will be served from ",
          { bold: true, text: "9 AM to 12 PM" },
          " each morning.",
        ],
        checkout: [
          { bold: true, text: "Hotel/Apartment Checkout:" },
          " The checkout is on Monday at 11:00 AM, please have your breakfast before then.",
        ],
      },
      travel_transport: {
        title: "Travel & Transportation",
        description_1: [
          "For our international guests, we will provide transportation from the airport to the venue on Friday, 25th of July, and from the venue to the airport on Monday, 28th of July.",
        ],
        description_2: [
          {
            bold: true,
            text: "Before booking your travel, please contact us to let us know the time and the airport that works best for you. We will then organize a group transport that fits the majority. Please do it before the 26th of May 2025.",
          },
        ],
        description_3: [
          "The closest airports are Katowice Airport (KTW), Warsaw Modlin Airport (WMI), and Warsaw Chopin Airport (WAW).",
        ],
        description_4: [
          "We will try our best to accommodate everyone. If you cannot land/depart at the same day/time as everyone else, we will help you organize another way of getting to and from the venue.",
        ],
        transport_details: {
          arrival: {
            title: "Friday 25th of July",
            desc1: [
              { bold: true, text: "Warsaw Airport (WAW):" },
              " Bus leaves around 7:30PM - Karolina will be waiting at the arrivals.",
            ],
            desc2: [
              { bold: true, text: "Katowice Airport:" },
              " Bus leaves around 5:00PM - Emanuele will be waiting at the arrivals.",
            ],
          },
          departure: {
            title: "Monday 28th of July",
            desc1: [
              { bold: true, text: "" },
              " Buses for both airports leave at 12:00 PM",
            ],
          },
        },
      },
      contact: {
        title: "Contact Us",
        // Email added on the front end
        // numbers added on the front end
      },
    },
    rsvp_section: {
      top_title: "RSVP",
      title: { main: "Confirm your", sub: "Attendance" },
      description_1: [
        { bold: true, text: "Please RSVP by the 26th of May 2025!" },
        " Simply search for your name on the form and confirm your attendance.",
      ],
      description_2:
        "Please leave us a note if you have any special requests, dietary restrictions, or if there’s anything else you’d like to discuss. We want to make sure everyone is comfortable and has an amazing time!",
      label: "Search your name in the guests list",
      placeholder: "Search for your name",
      no_found: "No guests found with this name",
      multiple_guests_1: {
        hi: "Hi ",
        you: " You, ",
        and: " and ",
        are_invited:
          ", are warmly invited to join us on our special day. Celebrating with all of you will make it unforgettable!",
      },
      multiple_guests_2:
        "Select who is attending the wedding. We hope all of you can make it.",
      single_guest_1: {
        hi: "Hi ",
        are_invited:
          " you are warmly invited to join us on our special day. Celebrating with you will make it unforgettable!",
      },
      single_guest_2: "Are you attending the wedding?",
      answers: { yes: "Yes", no: "No", unknown: "Don't know yet" },
      note_placeholder: "Would you like to leave a note?",
      rsvp_success: {
        thanks: "Thank you!",
        submitted: " Your RSVP has been submitted.",
        change_by: [
          "Remember that you can change the attendance any time before the ",
          { bold: true, text: "26th of May 2025" },
          ".",
        ],
      },
      error_enter_name: "Please enter your answer before submitting",
      error_submitting: "Error submitting RSVP. Please try again.",
      button: {
        submit: "Send RSVP",
        loading: "Loading...",
      },
    },
    registry_section: {
      title: { main: "GIFT", sub: "Registry" },
      description_1:
        "Your presence at our wedding is truly the greatest gift we could ask for!",
      description_2:
        "However, if you wish to honor us with a gift, we would greatly appreciate a monetary contribution to help us build our future together.",
      description_3:
        "In lieu of flowers, alcohol, and other physical gifts, we would be delighted to receive scratch cards or lottery tickets as a fun and exciting way to celebrate our new beginning.",
      description_4:
        "We kindly ask our international guests to consider sending their gift via a bank transfer. To access our bank details, please click the button below and enter the password that’s on your invitation. As always, feel free to contact us directly if you have any questions!",
      button: "Access Bank Details",
      thanks: "THANK YOU!",
      error_from_api: "There is a problem. Try again later or contact us",
      error_incorrect_password: "Incorrect password",
      error_insert_password: "Insert password",
      account_holder: "Beneficiary: ",
      iban: "IBAN: ",
      bank_name: "Bank address: ",
      bic: "BIC / SWIFT: ",
      sort_code: "Sort Code: ",
      account_number: "Account Number: ",
      eur: "Eur",
      gbp: "Pound",
      pln: "Polish Zlotych",
      toast_copied: "Copied to clipboard",
      toast_error: "Couldn't copy it",
      dialog_title: {
        before: "Enter the password",
        after: "The password is correct",
      },
      placeholder: "Enter password",
      submit_button: { submit: "Submit", loading: "Checking..." },
      copy_all: "Copy All",
    },
    music_section: {
      title: { main: "OUR", sub: "Playlist" },
      description:
        "Add your favorite party songs to our playlist and help us shape the perfect soundtrack for our wedding! ",
      placeholder: "Enter the song name",
      small_note:
        "* Some songs can't be played here, but you can still add them to the playlist.",
      toast_success: {
        title: "Song added to the playlist",
        description: "Would you like to add another song?",
      },
      toast_error: {
        title: "Unable to add the song",
        description:
          "We're sorry, but something went wrong on our end. Please try again later.",
      },
    },
    footer: {
      text_1: "Website created with ",
      text_2: "by ",
      text_3: "Photos by",
    },
    not_found: {
      message: "The page you are looking for does not exist.",
      button: "Go Back",
    },
  },

  // ITALIAN <---------------------------------------------------------------------------------------
  it: {
    couple: {
      her: "Karolina",
      him: "Emanuele",
      footer_her: "Karolina",
      footer_him: "Emanuele",
    },
    navbar: {
      welcome: "Vetrina",
      save_the_date: "Segna la Data",
      schedule: "Timeline Matrimonio",
      info: "Dettagli",
      rsvp: "Conferma la Presenza",
      registry: "Lista Nozze",
      music: "Playlist",
    },
    welcome_section: {
      small_text: "Il matrimonio di...",
      days: "Giorni",
      day: "Giorno",
      hours: "Ore",
      hour: "Ora",
      minutes: "Minuti",
      minute: "Minuto",
      seconds: "Secondi",
      second: "secondo",
      button: "Segna la Data",
    },
    saveTheDate_section: {
      title: "SEGNA",
      title_cursive: "La Data",
      date: "26 Luglio 2025",
      place: "a Kolonia Łobudzice, Polonia",
      story_1: "Ci Siamo Conosciuti",
      story_2: "Ci Siamo Fidanzati",
      story_3_future: "Ci Sposiamo",
      story_3_past: "Ci Siamo Sposati",
    },
    schedule_section: {
      title: {
        main: "TIMELINE",
        sub: "Matrimonio",
      },
      description:
        "I festeggiamenti per il matrimonio inizieranno sabato 26 luglio e termineranno domenica 27 luglio 2025.",
      day_1: {
        title: "Giorno 1",
        events: {
          ceremony: {
            time: "16:00",
            title: "Inizio della Cerimonia",
          },
          dinner: {
            time: "18:00",
            title: "Cena Servita",
          },
          dance: {
            time: "18:00",
            title: "Primo Ballo",
          },
          photo: {
            time: "20:00 - 23:00",
            title: "Cabina Fotografica",
          },
          pig: {
            time: "00:00",
            title: "Piatto Speciale",
          },
          cake_cutting: {
            time: "22:30",
            title: "Taglio della Torta",
          },
          games: {
            time: "00:30",
            title: "Animazione con Giochi di Gruppo",
          },
          party: {
            time: "Tutta la notte",
            title: "Mangia, Bevi, Balla, Ripeti!",
          },
        },
      },
      day_2: {
        title: "Giorno 2",
        events: {
          after: {
            time: "15:00",
            title: "Inizia L'After!",
          },
          vespa: {
            time: "15:00 - 20:00",
            title: "Vespa Bar",
          },
          party_continues: {
            time: "Tutta la Giornata",
            title: "Mangia, Bevi, Balla, Ripeti!",
          },
          end: {
            time: "21:00",
            title: "Finita La Commedia!",
          },
        },
      },
    },
    info_section: {
      title: {
        main: "I",
        sub: "Dettagli",
      },
      details: {
        when_where: "Quando e Dove",
        dates: [
          { bold: true, text: "Date: " },
          "Sabato 26 e Domenica 27 Luglio 2025",
        ],
        location: [
          {
            bold: true,
            text: "Location: ",
          },
          'Agriturismo "Przy Patykach", Kolonia Łobudzice 18c, 97-425, Polonia',
        ],
        button_loc: "VISITA IL LOCALE",
      },
      accommodations: {
        title: "Alloggi",
        description_1: [
          "Per i nostri ospiti internazionali, offriamo alloggio in hotel per ",
          {
            bold: true,
            text: "Venerdì 25, Sabato 26 e Domenica 27 Luglio.",
          },
        ],
        breakfast: [
          { bold: true, text: "La colazione" },
          " è inclusa con il soggiorno e verrà servita dalle ",
          { bold: true, text: "9:00 alle 12:00" },
          " ogni mattina.",
        ],
        checkout: [
          { bold: true, text: "Hotel/Appartamenti Checkout:" },
          " Il checkout é il Lunedí alle 11:00, perfavore fate colazione prima.",
        ],
      },
      travel_transport: {
        title: "Viaggio",
        description_1: [
          "Per i nostri ospiti internazionali, forniremo il trasporto dall'aeroporto alla location venerdì 25 luglio e dalla location all'aeroporto lunedì 28 luglio.",
        ],
        description_2: [
          {
            bold: true,
            text: "Prima di prenotare il viaggio, vi preghiamo di contattarci e comunicarci l’orario e l’aeroporto che meglio si adattano al vostro programma. Organizzeremo quindi un trasporto di gruppo che soddisfi la maggioranza. Vi preghiamo di farlo entro il 26 maggio 2025.",
          },
        ],
        description_3: [
          "Gli aeroporti più vicini sono l'Aeroporto di Katowice (KTW), l'Aeroporto di Varsavia Modlin (WMI) e l'Aeroporto di Varsavia Chopin (WAW).",
        ],
        description_4: [
          "Faremo del nostro meglio per accontentare tutti. Se non riuscite ad arrivare o partire nello stesso giorno e/o orario degli altri, vi aiuteremo a organizzare un altro modo per raggiungere e lasciare la location.",
        ],
        transport_details: {
          arrival: {
            title: "Venerdí 25 Luglio",
            desc1: [
              { bold: true, text: "Aereoporto di Varsavia (WAW):" },
              " Le navette partono intorno le 19:30 - Karolina vi aspetterá agli arrivi.",
            ],
            desc2: [
              { bold: true, text: "Aereoporto di Katowice:" },
              " Le navette partono intorno le 17:00 - Emanuele vi aspetterá agli arrivi.",
            ],
          },
          departure: {
            title: "Lunedí 28 luglio",
            desc1: [
              { bold: true, text: "" },
              " Le navette per entrambi gli aereoporti partono alle 12:00.",
            ],
          },
        },
      },
      contact: {
        title: "Contattaci",
        // Email added on the front end
        // numbers added on the front end
      },
    },
    rsvp_section: {
      top_title: "RSVP",
      title: { main: "Conferma la tua", sub: "Presenza" },
      description_1: [
        {
          bold: true,
          text: "Vi preghiamo di confermare la vostra presenza entro il 26 maggio 2025!",
        },
        "  Basta cercare il vostro nome nell'apposito campo e confermare la partecipazione.",
      ],
      description_2:
        "Vi preghiamo di lasciarci un messaggio se avete richieste speciali, restrizioni alimentari o qualsiasi altra cosa di cui vorreste parlarci. Vogliamo assicurarci che tutti siano a proprio agio e si divertano al massimo!",
      label: "Cerca il tuo nome nella lista",
      placeholder: "Digita il tuo nome",
      no_found: "Nessun invitato trovato con questo nome",
      multiple_guests_1: {
        hi: "Ciao",
        you: " Tu ",
        and: " e ",
        are_invited:
          ", siete calorosamente invitati a partecipare al nostro giorno speciale. Festeggiare con tutti voi lo renderà indimenticabile!",
      },
      multiple_guests_2:
        "Seleziona chi parteciperà al matrimonio. Speriamo possiate venire tutti.",
      single_guest_1: {
        hi: "Ciao ",
        are_invited:
          " Con grande piacere, ti invitiamo a partecipare al nostro giorno speciale. La tua presenza lo renderà indimenticabile!",
      },
      single_guest_2: "Parteciperai al matrimonio?",
      answers: { yes: "Sì", no: "No", unknown: "Non lo so" },
      note_placeholder: "Vuoi lasciare un messaggio?",
      rsvp_success: {
        thanks: "Grazie!",
        submitted: " La tua conferma è stata inviata.",
        change_by: [
          "Ricorda che puoi cambiare la tua partecipazione entro il ",
          { bold: true, text: "26 Maggio 2025" },
          ".",
        ],
      },
      error_enter_name: "Per favore inserisci la tua risposta prima di inviare",
      error_submitting: "Errore nell'invio della conferma. Per favore riprova.",
      button: {
        submit: "Conferma",
        loading: "Un Momento...",
      },
    },
    registry_section: {
      title: { main: "LISTA", sub: "Nozze" },
      description_1:
        "La vostra presenza al nostro matrimonio è davvero il regalo più grande che potremmo desiderare!",
      description_2:
        "Tuttavia, se desiderate onorarci con un regalo, vi saremmo immensamente grati per un contributo monetario che ci aiuti a costruire il nostro futuro insieme.",
      description_3:
        "In alternativa a fiori, liquori e altri regali materiali, saremmo felici di ricevere gratta e vinci o biglietti della lotteria come modo divertente ed emozionante per celebrare il nostro nuovo inizio.",
      description_4:
        "Chiediamo gentilmente ai nostri ospiti internazionali di considerare l’opzione di inviare il regalo tramite bonifico bancario. Per accedere ai nostri dati bancari, cliccate sul pulsante qui sotto e inserite la password indicata nell’invito. Come sempre, non esitate a contattarci direttamente se avete domande!",
      button: "Accedi Dettagli Bancari",
      thanks: "GRAZIE!",
      error_from_api:
        "Si è verificato un problema. Riprova più tardi o contattaci",
      error_incorrect_password: "Password errata",
      error_insert_password: "Inserisci la password",
      account_holder: "Beneficiario: ",
      iban: "IBAN: ",
      bank_name: "Intestato a: ",
      bic: "BIC / SWIFT: ",
      sort_code: "Codice Sort: ",
      account_number: "Numero di conto: ",
      eur: "Euro",
      gbp: "Sterlina",
      pln: "Zloty",
      toast_copied: "Copiato negli appunti",
      toast_error: "Non è stato possibile copiare",
      dialog_title: {
        before: "Inserisci la password",
        after: "La password è corretta",
      },
      placeholder: "Inserisci la password",
      submit_button: { submit: "Invia", loading: "Verifica in corso..." },
      copy_all: "Copia tutto",
    },
    music_section: {
      title: { main: "LA", sub: "Playlist" },
      description:
        "Aggiungi le tue canzoni preferite alla nostra playlist e aiutaci a creare la colonna sonora perfetta per il nostro matrimonio!",
      placeholder: "Nome della canzone",
      small_note:
        "* Alcune canzoni non possono essere riprodotte qui, ma puoi comunque aggiungerle alla playlist.",
      toast_success: {
        title: "Canzone aggiunta alla playlist",
        description: "Vuoi aggiungerne un'altra?",
      },
      toast_error: {
        title: "Impossibile aggiungere la canzone alla playlist!",
        description:
          "Siamo spiacenti, ma qualcosa è andato storto da parte nostra. Per favore, riprova più tardi.",
      },
    },
    footer: {
      text_1: "Sito creato con ",
      text_2: "da ",
      text_3: "Fotografie da",
    },
    not_found: {
      message: "La pagina che stai cercando non esiste.",
      button: "Torna Indietro",
    },
  },

  // POLISH <---------------------------------------------------------------------------------------
  pl: {
    couple: {
      her: "Karoliny",
      him: "Emanuela",
      footer_her: "Karoline",
      footer_him: "Emanuela",
    },
    navbar: {
      welcome: "Witamy",
      save_the_date: "Zarezerwuj Datę",
      schedule: "Harmonogram Przyjęcia",
      info: "Szczegóły",
      rsvp: "RSVP",
      registry: "Lista Prezentów",
      music: "Playlista",
    },
    welcome_section: {
      small_text: "Ślub...",
      days: "dni",
      day: "dzień",
      hours: "godziny",
      hour: "godzina",
      minutes: "minuty",
      minute: "Minuta",
      seconds: "sekundy",
      second: "sekunda",
      button: "Zarezerwuj Datę",
    },
    saveTheDate_section: {
      title: "ZAREZERWUJ", //DATĘ
      title_cursive: "Datę",
      date: "26 lipca 2025 roku",
      place: 'na sali "Przy Patykach" w Kolonii Łobudzice, Zelów',
      story_1: "Spotkaliśmy Się",
      story_2: "Zaręczyliśmy Się",
      story_3_future: "Weźmiemy Ślub",
      story_3_past: "Pobraliśmy Się",
    },
    schedule_section: {
      title: {
        main: "HARMONOGRAM",
        sub: "Przyjęcia",
      },
      description:
        "Ślub oraz wesele odbędą się 26 lipca 2025 roku. Następnego dnia serdecznie zapraszamy na poprawiny!",
      day_1: {
        title: "Dzień 1",
        events: {
          ceremony: {
            time: "16:00",
            title: "Ceremonia Ślubu",
          },
          dinner: {
            time: "18:00",
            title: "Uroczysty Obiad",
          },
          dance: {
            time: "18:00",
            title: "Pierwszy Taniec",
          },
          photo: {
            time: "20:00 - 23:00",
            title: "Fotobudka",
          },
          pig: {
            time: "00:00",
            title: "Danie Specjalne",
          },
          cake_cutting: {
            time: "22:30",
            title: "Tort",
          },
          games: {
            time: "00:30",
            title: "Oczepiny",
          },
          party: {
            time: "Do Białego Rana",
            title: "Jedzenie, Picie, i Zabawa!",
          },
        },
      },
      day_2: {
        title: "Dzień 2",
        events: {
          after: {
            time: "15:00",
            title: "Rozpoczęcie Poprawin",
          },
          vespa: {
            time: "15:00 - 20:00",
            title: "Bar Vespa",
          },
          party_continues: {
            time: "Cały Dzień",
            title: "Jedzenie, Picie, i Zabawa!",
          },
          end: {
            time: "21:00",
            title: "Koniec",
          },
        },
      },
    },
    info_section: {
      title: {
        main: "WIĘCEJ",
        sub: "Szczegółów",
      },
      details: {
        when_where: "Kiedy i Gdzie",
        dates: [
          {
            bold: true,
            text: "Daty: ",
          },
          "Sobota, 26 Lipca & Niedziela, 27 Lipca 2025 roku",
        ],
        location: [
          {
            bold: true,
            text: "Lokalizacja: ",
          },
          'Sala "Przy Patykach", Kolonia Łobudzice 18c, 97-425',
        ],
        button_loc: "ZOBACZ LOKALIZACJĘ",
      },
      accommodations: {
        title: "Zakwaterowanie",
        description_1: [
          "Dla naszych zagranicznych gości oferujemy zakwaterowanie w hotelu przy sali w dniach: ",
          {
            bold: true,
            text: "Piątek, 25 lipca, Sobota, 26 lipca i Niedziela, 27 lipca.",
          },
          "",
        ],
        breakfast: [
          { bold: true, text: "Śniadanie" },
          " jest wliczone w cenę pobytu i będzie serwowane od ",
          { bold: true, text: "9:00 do 12:00" },
          " każdego ranka.",
        ],
        checkout: [{ bold: true, text: "" }, ""],
      },
      travel_transport: {
        title: "Transport",
        description_1: [
          "Naszym międzynarodowym gościom zapewniamy transport z lotniska na salę w piątek 25 lipca oraz z sali na lotnisko w poniedziałek 28 lipca.",
        ],
        description_2: [
          {
            bold: true,
            text: "",
          },
        ],
        description_3: [""],
        description_4: [
          "Dołożymy wszelkich starań, aby zadowolić każdego. Jeśli nie możesz wylądować/wylecieć tego samego dnia/godziny co wszyscy inni, pomożemy Ci zorganizować inny sposób dotarcia na miejsce i z powrotem.",
        ],
        transport_details: {
          arrival: {
            title: "Friday 25th of July",
            desc1: [
              { bold: true, text: "Warsaw Airport (WAW):" },
              "Bus leaves around 7:30PM - Karolina will be waiting at the arrivals.",
            ],
            desc2: [
              { bold: true, text: "Katowice Airport:" },
              "Bus leaves around 5:00PM - Emanuele will be waiting at the arrivals.",
            ],
          },
          departure: {
            title: "",
            desc1: [{ bold: true, text: "" }, ""],
          },
        },
      },
      contact: {
        title: "Skontaktuj się z Nami",
        // Email added on the front end
        // numbers added on the front end
      },
    },
    rsvp_section: {
      top_title: "RSVP",
      title: { main: "Potwierdź Swoją", sub: "Obecność" },
      description_1: [
        {
          bold: true,
          text: "Prosimy o potwierdzenie obecności do 26 maja 2025 roku!",
        },
        " Wpisz swoje imię i nazwisko w formularzu obok i potwierdź swoją obecność.",
      ],
      description_2:
        "Zostaw nam wiadomość, jeśli masz jakieś specjalne życzenia, ograniczenia dietetyczne lub jeśli jest coś jeszcze, co chciałbyś z Nami omówić. Zależy nam na tym, aby każdy czuł się komfortowo i świetnie się bawił!",
      label: "Wyszukaj swoje imię na liście gości",
      placeholder: "Wyszukaj swoje imię",
      no_found: "Nie znaleziono osoby o tym imieniu i nazwisku na liście gości",
      multiple_guests_1: {
        hi: "Cześć ",
        you: "! Ty, ",
        and: " i ",
        are_invited:
          ", jesteście serdecznie zaproszeni na nasz wyjątkowy dzień. Nie możemy się doczekać by świętować razem z Wami!",
      },
      multiple_guests_2:
        "Wybierz, kto weźmie udział w weselu. Mamy nadzieję, że wszyscy będziecie mogli przyjść.",
      single_guest_1: {
        hi: "Cześć",
        are_invited:
          " Cieszymy się, że jesteś na naszej liście gości. Nie możemy się doczekać by świętować razem z Tobą!",
      },
      single_guest_2: "Czy weźmiesz udział w weselu?",
      answers: { yes: "Tak", no: "Nie", unknown: "Jeszcze nie wiem" },
      note_placeholder: "Chcesz zostawić wiadomość?",
      rsvp_success: {
        thanks: "Dziękujemy!",
        submitted: " Twoje potwierdzenie zostało przesłane.",
        change_by: [
          "Pamiętaj, że możesz zmienić swoją obecność do ",
          { bold: true, text: "26 maja 2025 roku" },
          ".",
        ],
      },
      error_enter_name: "Proszę podać odpowiedź przed wysłaniem",
      error_submitting: "Błąd podczas wysyłania RSVP. Spróbuj ponownie.",
      button: {
        submit: "Potwierdź Obecność",
        loading: "Ładowanie...",
      },
    },
    registry_section: {
      title: { main: "LISTA", sub: "Prezentów" },
      description_1:
        "Wasza obecność w tym wyjątkowym dniu będzie dla Nas największym prezentem!",
      description_2:
        "Jeśli jednak chcielibyście obdarować nas w tym najważniejszym dla nas dniu, będziemy wdzięczni o wsparcie finansowe na budowę naszej wspólnej przyszłości.",
      description_3:
        "Zamiast kwiatów, alkoholu i innych prezentów fizycznych, serdecznie prosimy o zdrapki lub losy na loterię!",
      description_4:
        "Uprzejmie prosimy naszych gości z zagranicy o rozważenie przesłania prezentu przelewem bankowym. Aby uzyskać dostęp do danych bankowych, kliknij poniższy przycisk i wprowadź hasło znajdujące się w zaproszeniu. Jak zawsze, jeśli masz jakiekolwiek pytania, skontaktuj się z nami bezpośrednio!",
      button: "Dostęp do danych przelewu",
      thanks: "DZIĘKUJEMY!",
      error_from_api:
        "Wystąpił problem. Spróbuj ponownie później lub skontaktuj się z nami",
      error_incorrect_password: "Nieprawidłowe hasło",
      error_insert_password: "Wprowadź hasło",
      account_holder: "Odbiorca: ",
      iban: "IBAN: ",
      bank_name: "Adres: ",
      bic: "BIC / SWIFT: ",
      sort_code: "Sort code: ",
      account_number: "Numer konta: ",
      eur: "Euro",
      gbp: "Funt",
      pln: "Złoty",
      toast_copied: "Skopiowano do schowka",
      toast_error: "Nie udało się skopiować",
      dialog_title: { before: "Wprowadź hasło", after: "Hasło jest poprawne" },
      placeholder: "Wprowadź hasło",
      submit_button: { submit: "Wyślij", loading: "Sprawdzanie..." },
      copy_all: "Kopiuj wszystko",
    },
    music_section: {
      title: { main: "NASZA", sub: "Playlista" },
      description:
        "Dodaj swoje ulubione piosenki do naszej playlisty i pomóż nam stworzyć idealną ścieżkę dźwiękową na nasze wesele!",
      placeholder: "Wpisz nazwę utworu",
      small_note:
        "* Niektóre piosenki nie mogą być odtworzone, ale nadal możesz je dodać do naszej playlisty.",
      toast_success: {
        title: "Piosenka dodana do playlisty",
        description: "Czy chcesz dodać kolejną piosenkę?",
      },
      toast_error: {
        title: "Nie udało się dodać piosenki",
        description:
          "Przepraszamy, coś poszło nie tak. Spróbuj ponownie później.",
      },
    },
    footer: {
      text_1: "Strona stworzona z ",
      text_2: "przez ",
      text_3: "Fotografie autorstwa",
    },
    not_found: {
      message: "Strona, której szukasz, nie istnieje.",
      button: "Wróć",
    },
  },
};

export default translations;
