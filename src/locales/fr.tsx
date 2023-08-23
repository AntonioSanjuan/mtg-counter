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
      noHistoricGames: 'Vous n\'avez pas encore d\'historique de parties',
      historicGame: {
        info: {
          gameName: 'Nom de la partie',
          status: {
            label: 'État',
            options: {
              finished: 'Terminée',
              ongoing: 'En cours',
            },
          },
          createdAt: 'Créée',
          finishedAt: 'Terminée à',
          duration: 'Durée en minutes',
        },
        actions: {
          changeView: 'Changer la vue',
        },
      },
    },
    deckCollection: {
      noDeckCollection: 'Vous n\'avez pas de decks enregistrés',
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
            label: 'Adresse e-mail de l\'utilisateur',
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
          label: 'Adresse e-mail de l\'utilisateur',
          placeholder: 'exemple@gmail.com',
        },
        password: {
          label: 'Mot de passe',
          placeholder: '****',
        },
        actions: {
          login: 'Se connecter',
          loginWithGoogle: 'Se connecter avec Google',
          goToSignUp: 'Vous n\'avez pas de compte ? Inscrivez-vous ici.',
        },
      },
    },
    signUp: {
      form: {
        email: {
          label: 'Adresse e-mail de l\'utilisateur',
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
          goToLogin: 'Vous avez déjà un compte ? Connectez-vous ici.',
        },
      },
    },
  },
  modals: {
    addDeckToCollection: {
      title: 'Ajouter un nouveau deck',
      form: {
        deckName: {
          label: 'Nom du deck',
          placeholder: 'Pinardos',
        },
        commanderName: {
          label: 'Commandant',
          placeholder: 'Saheeli',
        },
      },
      actions: {
        save: 'sauvegarder',
      },
    },
    gameSave: {
      title: 'Enregistrer la partie',
      form: {
        gameName: {
          label: 'Nom de la partie',
          placeholder: 'Maudits soldats',
        },
      },
      wantChooseWinnerQ: 'Sélectionnez le gagnant',
      actions: {
        restartAndSave: 'Enregistrer et redémarrer',
        restart: 'Redémarrer',
      },
    },
    gameRestart: {
      title: 'Redémarrer la partie',
      desc: 'Voulez-vous redémarrer la partie ?',
      actions: {
        restartAndSave: 'Enregistrer et redémarrer',
        restart: 'Redémarrer',
      },
    },
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
          goToDeckCollection: 'Vous n\'avez pas de decks. Cliquez ici pour en ajouter.',
        },
      },
      guest: {
        typeSelector: {
          anonymous: 'Anonyme',
          linked: 'Lier',
        },
        anonymous: {
          title: 'Configurer votre profil sans liaison d\'utilisateur',
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
            goToDeckCollection: 'Vous n\'avez pas de decks. Cliquez ici pour en ajouter.',
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
              error: 'Erreur lors de la liaison de l\'utilisateur',
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
