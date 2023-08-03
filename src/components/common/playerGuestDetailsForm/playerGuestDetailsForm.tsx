import { FormikProps } from 'formik';
import { useState } from 'react';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';
import { DeckCollectionState } from '../../../state/deckCollection/models/appDeckCollection.state';
import { FirebaseDeckDto } from '../../../models/dtos/firebaseStore/firebaseDeckCollection.model';
import { useUsers } from '../../../hooks/users/usersHook';
import PlayerGuestLinkedDetailsForm from '../playerGuestLinkedDetailsForm/playerGuestLinkedDetailsForm';
import { Loading } from '../loading/loading';

function PlayerGuestDetailsForm(
  { formik, save }:
  { formik: FormikProps<PlayerDetailsModel>, save: any},
) {
  const { getUserWithUserNameDecks, loading: usersLoading } = useUsers();
  const [playerDecks, setPlayerDecks] = useState<DeckCollectionState|undefined>(undefined);
  const [showUserIdForm, setShowUserIdForm] = useState<boolean>(false);

  const fetchUser = () => {
    if (formik.values.userId) {
      getUserWithUserNameDecks(formik.values.userId).then((userDeckCollection) => {
        setPlayerDecks(userDeckCollection);
        formik.setFieldValue('name', formik.values.userId);
        save(formik.values);
      }).catch((e) => {
        console.log('e', e);
      });
    }
  };

  const getPlayerWithUserIdForm = () => (playerDecks ? (
    <PlayerGuestLinkedDetailsForm formik={formik} playerDeckCollection={playerDecks} />
  )
    : (
      <form onSubmit={formik.handleSubmit}>
        <div className="form-floating">

          <label htmlFor="userId">
            userId
            <div className="PlayerDetails_UserIdContainer">
              <input
                type="text"
                id="userId"
                name="userId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userId as string}
                className="form-control"
                placeholder="rubio#1234"
              />
              <button
                type="button"
                aria-label="configButton"
                className="btn btn-link Player_ConfigButton"
                onClick={fetchUser}
              >
                <i className="bi bi-gear-fill" />
              </button>
            </div>
          </label>

          {
      formik.touched.userId && formik.errors.userId
      && <span className="app_font_error">{formik.errors.userId}</span>
    }
        </div>
      </form>
    ));

  return (
    <div>
      {!playerDecks && (
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="showUserIdForm"
          aria-label="Dark Mode"
          name="showUserIdForm"
          onChange={(e) => setShowUserIdForm(!showUserIdForm)}
          checked={showUserIdForm}
        />
      </div>
      )}

      {showUserIdForm ? (
        getPlayerWithUserIdForm()
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating">
            <label htmlFor="name">
              Player name
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="form-control"
                placeholder="rubio"
              />
            </label>
            {
          formik.touched.name && formik.errors.name
          && <span className="app_font_error">{formik.errors.name}</span>
        }
          </div>
          <div className="form-floating">

            <label htmlFor="deckName">
              Deck name
              <select
                className="form-select"
                id="deckName"
                aria-label="deckName"
                name="deckName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.deckName}
              >
                {playerDecks?.decks?.map((deck: FirebaseDeckDto) => (
                  <option value={deck.name}>deck.name</option>
                ))}
              </select>
            </label>
            {
          formik.touched.deckName && formik.errors.deckName
          && <span className="app_font_error">{formik.errors.deckName}</span>
        }
          </div>
          <div>
            <button
              disabled={!formik.dirty || !formik.isValid}
              className="btn btn-primary w-100"
              type="submit"
            >
              Save details
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
export default PlayerGuestDetailsForm;
