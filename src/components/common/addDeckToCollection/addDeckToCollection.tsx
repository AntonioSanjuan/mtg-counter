import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import './addDeckToCollection.scss';

import { useTranslation } from 'react-i18next';
import { useAlert } from '../../../hooks/alert/alertHook';
import { FirebaseDeckDto } from '../../../models/dtos/firebaseStore/firebaseDeckCollection.model';
import { useDeckCollection } from '../../../hooks/deckCollection/deckCollectionHook';
import { selectDeckCollection } from '../../../state/deckCollection/deckCollection.selectors';
import { DeckCollectionState } from '../../../state/deckCollection/models/appDeckCollection.state';
import { useAppSelector } from '../../../hooks/state/appStateHook';

function AddDeckToCollection() {
  const { closeAlert } = useAlert();
  const deckCollection = useAppSelector<DeckCollectionState>(selectDeckCollection);
  const { updateDeckCollection } = useDeckCollection();
  const { t } = useTranslation();

  const alreadyExistsDeckWithName = ((value?: string) => !deckCollection.decks.find((deck) => deck.name === value));

  const formik: FormikProps<FirebaseDeckDto> = useFormik<FirebaseDeckDto>({
    initialValues: {
      name: '',
      commanderName: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().test('already-exist', 'DeckName already exists', alreadyExistsDeckWithName).min(3),
      commanderName: Yup.string().required(),
    }),
    onSubmit: (values, { resetForm }) => {
      resetForm();
      handleSubmit(values).then(() => {
        closeAlert();
      });
    },
  });

  const handleSubmit = async (form: FirebaseDeckDto) => {
    const newDeckCollection = { ...deckCollection };
    newDeckCollection.decks.push(form);
    await updateDeckCollection(newDeckCollection.id, newDeckCollection);
  };

  return (
    <div className="AddDeckToCollection_MainContainer">
      <h3 className="app_font_xl">
        {t('modals.addDeckToCollection.title')}
      </h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-floating">

          <label htmlFor="name">
            <p className="app_font_l app_font_noMargin">
              {t('modals.addDeckToCollection.form.deckName.label')}
            </p>
            <input
              type="text"
              id="name"
              name="name"
              aria-label="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="form-control"
              placeholder={t('modals.addDeckToCollection.form.deckName.placeholder')}
            />
          </label>
          {
          formik.touched.name && formik.errors.name
          && <span className="app_font_error">{formik.errors.name}</span>
        }
        </div>
        <div className="form-floating">

          <label htmlFor="commanderName">
            <p className="app_font_l app_font_noMargin">{t('modals.addDeckToCollection.form.commanderName.label')}</p>
            <input
              type="text"
              id="commanderName"
              name="commanderName"
              aria-label="commanderName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.commanderName}
              className="form-control"
              placeholder={t('modals.addDeckToCollection.form.commanderName.placeholder')}
            />
          </label>
          {
          formik.touched.commanderName && formik.errors.commanderName
          && <span className="app_font_error">{formik.errors.commanderName}</span>
        }
        </div>
        <div>
          <button
            disabled={!formik.dirty || !formik.isValid}
            className="btn btn-primary w-100"
            aria-label="saveNewDeck"
            type="submit"
          >
            {t('modals.addDeckToCollection.actions.save')}
          </button>
        </div>
      </form>
    </div>

  );
}
export default AddDeckToCollection;
