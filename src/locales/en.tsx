export const TRANSLATIONS_EN = {
  common: {
    date: '{{val, datetime}}',
    dateTime: '{{val, datetime}}',
    error: 'An error has occurred',
  },
  layouts: {
    base: {
      topNav: {
        actions: {
          logOut: 'Log Out',
          logIn: 'Log In',
        },
      },
      sideNav: {
        sections: {
          newGame: 'New Game',
          historic: 'Historic',
          deckCollection: 'Deck Collection',
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
      noHistoricGames: "You don't have any game history yet",
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
          createdAt: 'Created At',
          finishedAt: 'Finished At',
          duration: 'Duration in minutes',
        },
        actions: {
          changeView: 'Change View',
        },
      },
    },
    deckCollection: {
      noDeckCollection: "You don't have any saved decks",
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
        addDeck: 'Add a New Deck',
      },
    },
    profile: {
      info: {
        title: 'User Information',
        form: {
          email: {
            label: 'User Email',
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
          label: 'User Email',
          placeholder: 'example@gmail.com',
        },
        password: {
          label: 'Password',
          placeholder: '****',
        },
        actions: {
          login: 'Log In',
          loginWithGoogle: 'Log In with Google',
          goToSignUp: "Don't have an account? Sign up here.",
        },
      },
    },
    signUp: {
      form: {
        email: {
          label: 'User Email',
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
          signUp: 'Sign Up',
          signUpWithGoogle: 'Sign Up with Google',
          goToLogin: 'Already have an account? Log in here.',
        },
      },
    },
    home: {},
  },
  modals: {
    gameSettings: {
      title: 'Configure the Game',
      form: {
        players: {
          label: 'Players',
        },
        lifes: {
          label: 'Initial Lives',
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
        title: 'Configure Your Profile',
        form: {
          userName: {
            label: 'Username',
            placeholder: 'rubio#1234',
          },
          deckName: {
            label: 'Deck Name',
            options: {
              default: 'Select a Deck',
            },
          },
        },
        actions: {
          goToDeckCollection: "You don't have decks. To add them, click here",
        },
      },
      guest: {
        typeSelector: {
          anonymous: 'Anonymous',
          linked: 'Link',
        },
        anonymous: {
          title: 'Configure Your Profile without Linking a User',
          form: {
            playerName: {
              label: 'Player Name',
              placeholder: 'Faku',
            },
            deckName: {
              label: 'Deck Name',
              placeholder: 'Vampires',
            },
          },
          actions: {
            goToDeckCollection: "You don't have decks. To add them, click here",
          },
        },
        linked: {
          title: 'Configure Your Profile Linked to a User',
          form: {
            playerName: {
              label: 'Player Name',
              placeholder: 'Faku',
            },
            deckName: {
              label: 'Deck Name',
              options: {
                default: 'Select a Deck',
              },
            },
          },
          actions: {
            unlink: 'Unlink',
          },
        },
        linking: {
          title: 'Link Your Profile with a User',
          form: {
            userName: {
              label: 'Username',
              placeholder: 'rubio#1234',
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
