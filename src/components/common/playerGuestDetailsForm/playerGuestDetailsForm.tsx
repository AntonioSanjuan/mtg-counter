import { FormikProps, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { use } from 'i18next';
import * as Yup from 'yup';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';
import { DeckCollectionState } from '../../../state/deckCollection/models/appDeckCollection.state';
import { useUsers } from '../../../hooks/users/usersHook';
import PlayerGuestLinkedDetailsForm from '../playerGuestLinkedDetailsForm/playerGuestLinkedDetailsForm';
import PlayerGuestAnonymousDetailsForm from '../playerGuestAnonymousDetailsForm/playerGuestAnonymousDetailsForm';
import PlayerGuestLinkForm from '../playerGuestLinkForm/playerGuestLinkForm';
import { Loading } from '../loading/loading';

function PlayerGuestDetailsForm(
  { submit, playerDetails }:
  { submit: any, playerDetails: PlayerDetailsModel},
) {
  useEffect(() => {
    tryToLinkPlayer();
  }, []);

  const { getUserByUserNameDecks, loading: usersLoading } = useUsers();
  const [playerDecks, setPlayerDecks] = useState<DeckCollectionState|undefined>(undefined);
  const [showPlayerLinkForm, setShowPlayerLinkForm] = useState<boolean>(!!playerDetails.userId);

  const isValidPlayerLink = (): boolean => !!(playerDetails.userId && playerDecks);

  const tryToLinkPlayer = () => {
    if (formik.values.userId) {
      getUserByUserNameDecks(formik.values.userId).then((userDeckCollection) => {
        setPlayerDecks(userDeckCollection);
        submit({
          userId: formik.values.userId,
          name: formik.values.userId,
          deckName: '',
        } as PlayerDetailsModel);
      }).catch((e) => {
        console.log('e', e);
      });
    }
  };

  const unlinkPlayer = () => {
    if (playerDetails.userId) {
      setPlayerDecks(undefined);
      submit({
        userId: null,
        name: '',
        deckName: '',
      } as PlayerDetailsModel);
    }
  };

  const getPlayerGuestForm = () => (showPlayerLinkForm ? (
    getPlayerGuestLinkForm()
  ) : (
    <PlayerGuestAnonymousDetailsForm
      submit={submit}
      playerDetails={playerDetails}
    />
  ));

  const getPlayerGuestLinkForm = () => (isValidPlayerLink() ? (
    <PlayerGuestLinkedDetailsForm
      formik={formik}
      playerDeckCollection={playerDecks as DeckCollectionState}
      unLinkPlayer={unlinkPlayer}
    />
  ) : (
    <PlayerGuestLinkForm
      formik={formik}
      linkPlayer={tryToLinkPlayer}
    />
  ));

  return (
    <div>
      {usersLoading && (<Loading />)}
      {!isValidPlayerLink() && (
        <div className="PlayerDetails_UserIdContainer">
          <button
            type="button"
            aria-label="PlayerGuest_AnonymousButton"
            disabled={!showPlayerLinkForm}
            className="btn btn-secondary"
            onClick={() => setShowPlayerLinkForm(false)}
          >
            Anonymous
          </button>
          <button
            type="button"
            aria-label="PlayerGuest_LinkButton"
            disabled={showPlayerLinkForm}
            className="btn btn-secondary"
            onClick={() => setShowPlayerLinkForm(true)}
          >
            Linked
          </button>

        </div>
      )}

      {getPlayerGuestForm()}
    </div>
  );
}
export default PlayerGuestDetailsForm;
