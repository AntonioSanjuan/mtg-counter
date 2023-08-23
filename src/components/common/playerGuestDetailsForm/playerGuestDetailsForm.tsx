import { FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { use } from 'i18next';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
        <div className="btn-group PlayerDetails_UserIdContainer" role="group" aria-label="Basic outlined example">
          <button
            type="button"
            className={!isPlayerGuestLinkForm ? 'btn btn-outline-primary active' : 'btn btn-outline-primary'}
            onClick={() => setIsPlayerGuestLinkForm(false)}
          >
            {t('modals.playerDetails.guest.typeSelector.anonymous')}
          </button>
          <button
            type="button"
            className={isPlayerGuestLinkForm ? 'btn btn-outline-primary active' : 'btn btn-outline-primary'}
            onClick={() => setIsPlayerGuestLinkForm(true)}
          >
            {t('modals.playerDetails.guest.typeSelector.linked')}
          </button>
        </div>
      )}

      {getPlayerGuestForm()}
    </div>
  );
}
export default PlayerGuestDetailsForm;
