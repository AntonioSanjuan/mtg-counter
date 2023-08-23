export const TRANSLATIONS_EN = {
  common: {
    date: '{{val, datetime}}',
    dateTime: '{{val, datetime}}',
    error: 'An error has occurred',
  },
  layouts: {
    base: {
      topNav: {
        signOut: {
          title: 'Sign Out?',
          ok: 'Continue',
          cancel: 'Cancel',
        },
        actions: {
          logOut: 'Log out',
          logIn: 'Log in',
        },
      },
      sideNav: {
        sections: {
          newGame: 'New game',
          historic: 'Historic',
          deckCollection: 'Deck collection',
          settings: 'Settings',
        },
        info: {
          version: 'Version: ',
        },
      },
    },
  },
  views: {
    historic: {
      noHistoricGames: 'You do not have any game history yet',
      historicGame: {
        info: {
          gameName: 'Game Name',
          status: {
            label: 'Status',
            options: {
              finished: 'Finished',
              ongoing: 'Ongoing',
            },
          },
          createdAt: 'Created at',
          finishedAt: 'Finished at',
          duration: 'Duration in minutes',
        },
        actions: {
          changeView: 'Change view',
        },
      },
    },
    deckCollection: {
      noDeckCollection: 'You do not have any saved decks',
      deck: {
        info: {
          deckName: 'Deck: ',
          commanderDeckName: 'Commander: ',
        },
        stadistics: {
          title: 'Games',
          played: 'Played: ',
          winned: 'Won: ',
        },
      },
      actions: {
        addDeck: 'Add a new deck',
      },
    },
    profile: {
      info: {
        title: 'User Information',
        form: {
          email: {
            label: 'User email',
            placeholder: 'example@gmail.com',
          },
          userName: {
            label: 'Username',
            placeholder: 'rubio#1234',
          },
        },
      },
      settings: {
        title: 'User Settings',
        form: {
          darkMode: {
            label: 'Dark Mode',
          },
          language: {
            label: 'Language',
            options: {
              es: 'Spanish',
              en: 'English',
              fr: 'French',
            },
          },
        },
      },
    },
    login: {
      form: {
        email: {
          label: 'User email',
          placeholder: 'example@gmail.com',
        },
        password: {
          label: 'Password',
          placeholder: '****',
        },
        actions: {
          login: 'Log in',
          loginWithGoogle: 'Log in with Google',
          goToSignUp: "Don't have an account? Sign up here.",
        },
      },
    },
    signUp: {
      form: {
        email: {
          label: 'User email',
          placeholder: 'example@gmail.com',
        },
        userName: {
          label: 'Username',
          placeholder: 'rubio#1234',
        },
        password: {
          label: 'Password',
          placeholder: '****',
        },
        actions: {
          signUp: 'Sign up',
          signUpWithGoogle: 'Sign up with Google',
          goToLogin: 'Already have an account? Log in here.',
        },
      },
    },
  },
  modals: {
    addDeckToCollection: {
      title: 'Add a new deck',
      form: {
        deckName: {
          label: 'Deck name',
          placeholder: 'Pinardos',
        },
        commanderName: {
          label: 'Commander',
          placeholder: 'Saheeli',
        },
      },
      actions: {
        save: 'Save',

      },
    },
    gameSave: {
      title: 'Save game',
      form: {
        gameName: {
          label: 'Game name',
          placeholder: 'Cursed Soldiers',
        },
      },
      wantChooseWinnerQ: 'Select the winner',
      actions: {
        restartAndSave: 'Save and restart',
        restart: 'Restart',
      },
    },
    gameRestart: {
      title: 'Restart game',
      desc: 'Do you want to restart the game?',
      actions: {
        restartAndSave: 'Save and restart',
        restart: 'Restart',

      },
    },
    gameSettings: {
      title: 'Configure the game',
      form: {
        players: {
          label: 'Players',
        },
        lifes: {
          label: 'Initial lives',
        },
      },
      actions: {
        restart: 'Restart',
      },
    },
    loading: {
      title: 'LOADING...',
    },
    playerDetails: {
      owner: {
        title: 'Configure your profile',
        form: {
          userName: {
            label: 'Username',
            placeholder: 'rubio#1234',
          },
          deckName: {
            label: 'Deck name',
            options: {
              default: 'Select a deck',
            },
          },
        },
        actions: {
          goToDeckCollection: 'You have no decks. Add them here',
        },
      },
      guest: {
        typeSelector: {
          anonymous: 'Anonymous',
          linked: 'Link',
        },
        anonymous: {
          title: 'Configure your profile without linking a user',
          form: {
            playerName: {
              label: 'Player name',
              placeholder: 'Faku',
            },
            deckName: {
              label: 'Deck name',
              placeholder: 'Vampires',
            },
          },
          actions: {
            goToDeckCollection: 'You have no decks. Add them here',
          },
        },
        linked: {
          title: 'Configure your profile linked to a user',
          form: {
            playerName: {
              label: 'Player name',
              placeholder: 'Faku',
            },
            deckName: {
              label: 'Deck name',
              options: {
                default: 'Select a deck',
              },
            },
          },
          actions: {
            unlink: 'Unlink',
          },
        },
        linking: {
          title: 'Link your profile with a user',
          form: {
            userName: {
              label: 'Username',
              placeholder: 'rubio#1234',
              error: 'Error linking user',
            },
          },
          actions: {
            unlink: 'Unlink',
          },
        },
      },
      commonActions: {
        saveDetails: 'Save',
      },
    },
  },
};
