import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { PlayerDetailsModel } from '../../../models/internal/models/playerDetails.model';

function PlayerGuestAnonymousDetailsForm(
  { submit, playerDetails }:
  { submit: any, playerDetails: PlayerDetailsModel},
) {
  const formik: FormikProps<PlayerDetailsModel> = useFormik<PlayerDetailsModel>({
    initialValues: playerDetails,
    validationSchema: Yup.object({
      userId: Yup.string().nullable(),
      name: Yup.string(),
      deckName: Yup.string(),
    }),
    onSubmit: async (values) => {
      await submit(values);
    },
  });

  useEffect(() => {
    formik.setValues(playerDetails);
  }, [playerDetails]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <p className="app_font_l">Configura tu perfil sin vincular un usuario</p>
      <div className="form-floating">
        <label htmlFor="name">
          <p className="app_font_m app_font_noMargin">Player name</p>
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
          <p className="app_font_m app_font_noMargin">Deck name</p>

          <input
            className="form-control"
            id="deckName"
            aria-label="deckName"
            name="deckName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.deckName}
          />
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

  );
}

export default PlayerGuestAnonymousDetailsForm;
