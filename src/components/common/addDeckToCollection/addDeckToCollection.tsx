import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import './addDeckToCollection.scss';

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
    console.log('🚀 ~ original:', newDeckCollection);
    await updateDeckCollection(newDeckCollection.id, newDeckCollection);
  };

  return (
    <div className="AddDeckToCollection_MainContainer">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-floating">

          <label htmlFor="name">
            Deck name
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="form-control"
              placeholder="Vampires!"
            />
          </label>
          {
          formik.touched.name && formik.errors.name
          && <span className="app_font_error">{formik.errors.name}</span>
        }
        </div>
        <div className="form-floating">

          <label htmlFor="commanderName">
            Commander name
            <input
              type="text"
              id="commanderName"
              name="commanderName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.commanderName}
              className="form-control"
              placeholder="Markov"
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
            type="submit"
          >
            Save new deck
          </button>
        </div>
      </form>
    </div>

  );
}
export default AddDeckToCollection;
