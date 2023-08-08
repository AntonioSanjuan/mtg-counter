import { FormikProps } from 'formik';
import { useState } from 'react';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';
import { DeckCollectionState } from '../../../state/deckCollection/models/appDeckCollection.state';
import { useUsers } from '../../../hooks/users/usersHook';
import PlayerGuestLinkedDetailsForm from '../playerGuestLinkedDetailsForm/playerGuestLinkedDetailsForm';
import PlayerGuestAnonymousDetailsForm from '../playerGuestAnonymousDetailsForm/playerGuestAnonymousDetailsForm';
import PlayerGuestLinkForm from '../playerGuestLinkForm/playerGuestLinkForm';

function PlayerGuestDetailsForm(
  { formik, save, playerUserId }:
  { formik: FormikProps<PlayerDetailsModel>, save: any, playerUserId: string | null},
) {
  const { getUserByUserNameDecks, loading: usersLoading } = useUsers();
  const [playerDecks, setPlayerDecks] = useState<DeckCollectionState|undefined>(undefined);
  const [isPlayerGuestLinkForm, setIsPlayerGuestLinkForm] = useState<boolean>(!!playerUserId);

  const isValidPlayerLink = (): boolean => !!(playerUserId && playerDecks);

  const linkPlayer = () => {
    if (playerUserId) {
      getUserByUserNameDecks(playerUserId).then((userDeckCollection) => {
        setPlayerDecks(userDeckCollection);
        formik.setFieldValue('name', playerUserId);
        save(formik.values);
      }).catch((e) => {
        console.log('e', e);
      });
    }
  };

  const unlinkPlayer = () => {
    if (playerUserId) {
      setPlayerDecks(undefined);
      formik.setFieldValue('name', '');
      save(formik.values);
    }
  };

  const getPlayerGuestForm = () => (isPlayerGuestLinkForm ? (
    getPlayerGuestLinkForm()
  ) : (
    <PlayerGuestAnonymousDetailsForm formik={formik} />
  ));

  const getPlayerGuestLinkForm = () => (isValidPlayerLink() ? (
    <PlayerGuestLinkedDetailsForm
      formik={formik}
      playerDeckCollection={playerDecks as DeckCollectionState}
    />
  ) : (
    <PlayerGuestLinkForm
      formik={formik}
      isValidPlayerLink={isValidPlayerLink()}
      linkPlayer={linkPlayer}
    />
  ));

  return (
    <div>
      {!isValidPlayerLink() && (
        <div className="PlayerDetails_UserIdContainer">
          <button
            type="button"
            aria-label="PlayerGuest_AnonymousButton"
            disabled={!isPlayerGuestLinkForm}
            className="btn btn-secondary"
            onClick={() => setIsPlayerGuestLinkForm(false)}
          >
            Anonymous
          </button>
          <button
            type="button"
            aria-label="PlayerGuest_LinkButton"
            disabled={isPlayerGuestLinkForm}
            className="btn btn-secondary"
            onClick={() => setIsPlayerGuestLinkForm(true)}
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
