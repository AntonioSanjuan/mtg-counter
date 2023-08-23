export const TRANSLATIONS_FR = {
  common: {
    date: '{{val, datetime}}',
    dateTime: '{{val, datetime}}',
    error: 'Une erreur s\'est produite',
  },
  layouts: {
    base: {
      topNav: {
        actions: {
          logOut: 'Déconnexion',
          logIn: 'Connexion',
        },
      },
      sideNav: {
        sections: {
          newGame: 'Nouvelle partie',
          historic: 'Historique',
          deckCollection: 'Collection de decks',
          settings: 'Paramètres',
        },
        info: {
          version: 'Version : ',
        },
      },
    },
  },
  views: {
    historic: {
      noHistoricGames: "Vous n'avez pas encore d'historique de parties",
      historicGame: {
        info: {
          gameName: 'Nom de la partie',
          status: {
            label: 'Statut',
            options: {
              finished: 'Terminée',
              ongoing: 'En cours',
            },
          },
          createdAt: 'Créé à',
          finishedAt: 'Terminé à',
          duration: 'Durée en minutes',
        },
        actions: {
          changeView: 'Changer de vue',
        },
      },
    },
    deckCollection: {
      noDeckCollection: "Vous n'avez pas de decks enregistrés",
      deck: {
        info: {
          deckName: 'Deck : ',
          commanderDeckName: 'Commandant : ',
        },
        stadistics: {
          title: 'Parties',
          played: 'Jouées : ',
          winned: 'Gagnées : ',
        },
      },
      actions: {
        addDeck: 'Ajouter un nouveau deck',
      },
    },
    profile: {
      info: {
        title: 'Informations utilisateur',
        form: {
          email: {
            label: 'Email de l\'utilisateur',
            placeholder: 'exemple@gmail.com',
          },
          userName: {
            label: 'Nom d\'utilisateur',
            placeholder: 'rubio#1234',
          },
        },
      },
      settings: {
        title: 'Paramètres utilisateur',
        form: {
          darkMode: {
            label: 'Mode sombre',
          },
          language: {
            label: 'Langue',
            options: {
              es: 'Espagnol',
              en: 'Anglais',
              fr: 'Français',
            },
          },
        },
      },
    },
    login: {
      form: {
        email: {
          label: 'Email de l\'utilisateur',
          placeholder: 'exemple@gmail.com',
        },
        password: {
          label: 'Mot de passe',
          placeholder: '****',
        },
        actions: {
          login: 'Connexion',
          loginWithGoogle: 'Connexion avec Google',
          goToSignUp: 'Pas de compte ? Inscrivez-vous ici.',
        },
      },
    },
    signUp: {
      form: {
        email: {
          label: 'Email de l\'utilisateur',
          placeholder: 'exemple@gmail.com',
        },
        userName: {
          label: 'Nom d\'utilisateur',
          placeholder: 'rubio#1234',
        },
        password: {
          label: 'Mot de passe',
          placeholder: '****',
        },
        actions: {
          signUp: 'S\'inscrire',
          signUpWithGoogle: 'S\'inscrire avec Google',
          goToLogin: 'Déjà un compte ? Connectez-vous ici.',
        },
      },
    },
    home: {},
  },
  modals: {
    gameSettings: {
      title: 'Configurer la partie',
      form: {
        players: {
          label: 'Joueurs',
        },
        lifes: {
          label: 'Vies initiales',
        },
      },
      actions: {
        restart: 'Redémarrer',
      },
    },
    loading: {
      title: 'CHARGEMENT...',
    },
    playerDetails: {
      owner: {
        title: 'Configurer votre profil',
        form: {
          userName: {
            label: 'Nom d\'utilisateur',
            placeholder: 'rubio#1234',
          },
          deckName: {
            label: 'Nom du deck',
            options: {
              default: 'Sélectionnez un deck',
            },
          },
        },
        actions: {
          goToDeckCollection: "Vous n'avez pas de decks. Pour les ajouter, cliquez ici",
        },
      },
      guest: {
        typeSelector: {
          anonymous: 'Anonyme',
          linked: 'Lien',
        },
        anonymous: {
          title: 'Configurer votre profil sans lier d\'utilisateur',
          form: {
            playerName: {
              label: 'Nom du joueur',
              placeholder: 'Faku',
            },
            deckName: {
              label: 'Nom du deck',
              placeholder: 'Vampires',
            },
          },
          actions: {
            goToDeckCollection: "Vous n'avez pas de decks. Pour les ajouter, cliquez ici",
          },
        },
        linked: {
          title: 'Configurer votre profil lié à un utilisateur',
          form: {
            playerName: {
              label: 'Nom du joueur',
              placeholder: 'Faku',
            },
            deckName: {
              label: 'Nom du deck',
              options: {
                default: 'Sélectionnez un deck',
              },
            },
          },
          actions: {
            unlink: 'Dissocier',
          },
        },
        linking: {
          title: 'Lier votre profil à un utilisateur',
          form: {
            userName: {
              label: 'Nom d\'utilisateur',
              placeholder: 'rubio#1234',
            },
          },
          actions: {
            unlink: 'Dissocier',
          },
        },
      },
      commonActions: {
        saveDetails: 'Enregistrer',
      },
    },
  },
};
