import { FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { use } from 'i18next';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';
import { DeckCollectionState } from '../../../state/deckCollection/models/appDeckCollection.state';
import { useUsers } from '../../../hooks/users/usersHook';
import PlayerGuestLinkedDetailsForm from '../playerGuestLinkedDetailsForm/playerGuestLinkedDetailsForm';
import PlayerGuestAnonymousDetailsForm from '../playerGuestAnonymousDetailsForm/playerGuestAnonymousDetailsForm';
import PlayerGuestLinkForm from '../playerGuestLinkForm/playerGuestLinkForm';
import { Loading } from '../loading/loading';

function PlayerGuestDetailsForm(
  { formik, save, playerUserId }:
  { formik: FormikProps<PlayerDetailsModel>, save: any, playerUserId: string | null},
) {
  const { getUserByUserNameDecks, loading: usersLoading } = useUsers();
  const [playerDecks, setPlayerDecks] = useState<DeckCollectionState|undefined>(undefined);
  const [isPlayerGuestLinkForm, setIsPlayerGuestLinkForm] = useState<boolean>(!!playerUserId);

  const isValidPlayerLink = (): boolean => !!(playerUserId && playerDecks);

  useEffect(() => {
    linkPlayer(false);
  }, []);

  const linkPlayer = (submitChanges = true) => {
    if (formik.values.userId) {
      getUserByUserNameDecks(formik.values.userId).then((userDeckCollection) => {
        setPlayerDecks(userDeckCollection);
        if (submitChanges) {
          save({
            ...formik.values,
            userId: formik.values.userId,
            name: formik.values.userId,
          } as PlayerDetailsModel);
        }
      }).catch((e) => {
        console.log('e', e);
      });
    }
  };

  const unlinkPlayer = () => {
    if (playerUserId) {
      setPlayerDecks(undefined);
      save({
        userId: null,
        name: '',
        deckName: '',
      } as PlayerDetailsModel);
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
      unLinkPlayer={unlinkPlayer}
    />
  ) : (
    <PlayerGuestLinkForm
      formik={formik}
      linkPlayer={linkPlayer}
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
