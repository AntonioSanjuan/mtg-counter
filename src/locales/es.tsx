export const TRANSLATIONS_ES = {
  common: {
    date: '{{val, datetime}}',
    dateTime: '{{val, datetime}}',
    error: 'Ha habido un error',
  },
  layouts: {
    base: {
      topNav: {
        actions: {
          logOut: 'cerrar sesión',
          logIn: 'iniciar sesión',
        },
      },
      sideNav: {
        sections: {
          newGame: 'Nueva partida',
          historic: 'Histórico',
          deckCollection: 'Colección de mazos',
          settings: 'Ajustes',
        },
        info: {
          version: 'Versión: ',
        },
      },
    },
  },
  views: {
    historic: {
      noHistoricGames: 'No tienes historico de partidas aún',
      historicGame: {
        info: {
          gameName: 'Nombre de la partida',
          status: {
            label: 'Estado',
            options: {
              finished: 'Finalizada',
              ongoing: 'En curso',
            },
          },
          createdAt: 'Creada',
          finishedAt: 'Finalizada',
          duration: 'Duración en minutos',
        },
        actions: {
          changeView: 'Cambiar vista',
        },
      },
    },
    deckCollection: {
      noDeckCollection: 'No tienes mazos guardados',
      deck: {
        info: {
          deckName: 'Mazo: ',
          commanderDeckName: 'Comandante: ',
        },
        stadistics: {
          title: 'Partidas',
          played: 'Jugadas: ',
          winned: 'Ganadas: ',
        },
      },
      actions: {
        addDeck: 'Añade un nuevo mazo',
      },
    },
    profile: {
      info: {
        title: 'Información de usuario',
        form: {
          email: {
            label: 'Email del usuario',
            placeholder: 'ejemplo@gmail.com',
          },
          userName: {
            label: 'Nombre de usuario',
            placeholder: 'rubio#1234',
          },
        },
      },
      settings: {
        title: 'Ajustes de usuario',
        form: {
          darkMode: {
            label: 'Modo oscuro',
          },
          language: {
            label: 'Idioma',
            options: {
              es: 'Español',
              en: 'Inglés',
              fr: 'Frances',
            },
          },
        },
      },
    },
    login: {
      form: {
        email: {
          label: 'Email del usuario',
          placeholder: 'ejemplo@gmail.com',
        },
        password: {
          label: 'Contraseña',
          placeholder: '****',
        },
        actions: {
          login: 'Iniciar sesión',
          loginWithGoogle: 'Iniciar sesión con Google',
          goToSignUp: '¿No tienes cuenta? Regístrate aqui.',
        },
      },
    },
    signUp: {
      form: {
        email: {
          label: 'Email del usuario',
          placeholder: 'ejemplo@gmail.com',
        },
        userName: {
          label: 'Nombre de usuario',
          placeholder: 'rubio#1234',
        },
        password: {
          label: 'Contraseña',
          placeholder: '****',
        },
        actions: {
          signUp: 'Registrate',
          signUpWithGoogle: 'Registrate con Google',
          goToLogin: '¿Ya tienes cuenta? Inicia sesion aqui.',
        },
      },
    },
  },
  modals: {
    addDeckToCollection: {
      title: 'Añadir nuevo mazo',
      form: {
        deckName: {
          label: 'Nombre del mazo',
          placeholder: 'Pinardos',
        },
        commanderName: {
          label: 'Comandante',
          placeholder: 'Saheeli',
        },
      },
      actions: {
        save: 'Guardar',
      },
    },
    gameSave: {
      title: 'Guardar partida',
      form: {
        gameName: {
          label: 'Nombre de la partida',
          placeholder: 'Malditos soldados',
        },
      },
      wantChooseWinnerQ: 'Selecciona al ganador',
      actions: {
        restartAndSave: 'Guardar y reiniciar',
        restart: 'Reiniciar',
      },
    },
    gameRestart: {
      title: 'Reiniciar partida',
      desc: '¿Quieres reiniciar la partida?',
      actions: {
        restartAndSave: 'Guardar y reiniciar',
        restart: 'Reiniciar',

      },
    },
    gameSettings: {
      title: 'Configura la partida',
      form: {
        players: {
          label: 'Jugadores',
        },
        lifes: {
          label: 'Vidas iniciales',
        },
      },
      actions: {
        restart: 'Reiniciar',
      },
    },
    loading: {
      title: 'CARGANDO...',
    },
    playerDetails: {
      owner: {
        title: 'Configura tu perfil',
        form: {
          userName: {
            label: 'Nombre de usuario',
            placeholder: 'rubio#1234',
          },
          deckName: {
            label: 'Nombre del mazo',
            options: {
              default: 'Selecciona un mazo',
            },
          },
        },
        actions: {
          goToDeckCollection: 'No tienes decks, Para añadirlos pulsa aqui',
        },
      },
      guest: {
        typeSelector: {
          anonymous: 'Anónimo',
          linked: 'Vincular',
        },
        anonymous: {
          title: 'Configura tu perfil sin vincular un usuario',
          form: {
            playerName: {
              label: 'Nombre del jugador',
              placeholder: 'Faku',
            },
            deckName: {
              label: 'Nombre del mazo',
              placeholder: 'Vampiros',
            },
          },
          actions: {
            goToDeckCollection: 'No tienes decks, Para añadirlos pulsa aqui',
          },
        },
        linked: {
          title: 'Configura tu perfil vinculado a un usuario',
          form: {
            playerName: {
              label: 'Nombre del jugador',
              placeholder: 'Faku',
            },
            deckName: {
              label: 'Nombre del mazo',
              options: {
                default: 'Selecciona un mazo',
              },
            },
          },
          actions: {
            unlink: 'Desvincular',
          },
        },
        linking: {
          title: 'Vincular tu perfil con un usuario',
          form: {
            userName: {
              label: 'Nombre de usuario',
              placeholder: 'rubio#1234',
              error: 'Error vinculando usuario',

            },
          },
          actions: {
            unlink: 'Desvincular',
          },
        },
      },
      commonActions: {
        saveDetails: 'Guardar',
      },
    },
  },
};
