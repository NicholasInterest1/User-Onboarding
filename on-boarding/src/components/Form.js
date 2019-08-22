import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const PatsRoster = ({ errors, touched, values, status }) => {
  const [patriots, setPatriots] = useState([]);
  useEffect(() => {
    if (status) {
      setPatriots([...patriots, status]);
    }
  }, [status]);

  return (
    <div className="patriots-form">
      <h1>Patriots Roster</h1>
      <Form>
        <Field type="text" name="playername" placeholder="Player Name" />
        {touched.playername && errors.playername && (
          <p className="error">{errors.playername}</p>
        )}

        <Field type="text" name="Jersey Number" placeholder="Jersey Number" />
        {touched.JerseyNumber && errors.JerseyNumber && <p className="error">{errors.JerseyNumber}</p>}

        <Field component="select" className="value-select" name="name">
          <option>Please Choose an Option</option>
          <option value="qb">Quarterback</option>
          <option value="rb">Running Back</option>
          <option value="wr">Wide Receiver</option>
          <option value="te">Tight End</option>
          <option value="cb">Corner Back</option>
          <option value="fs">Free Safety</option>
          <option value="ss">Strong Safety</option>
        </Field>

        <label className="checkbox-container">
          terms of Service
          <Field
            type="checkbox"
            name="terms of Service"
            checked={values.termsofservice}
          />
          <span className="checkmark" />
        </label>

        <Field
          component="textarea"
          type="text"
          name="playerNotes"
          placeholder="PlayerNotes"
        />
        {touched.playerNotes && errors.playerNotes && (
          <p className="error">{errors.playerNotes}</p>
        )}

        <button type="submit">Submit!</button>
      </Form>

      {patriots.map(patriots => (
        <ul key={patriots.id}>
          <li>Player Name: {patriots.playername}</li>
          <li>Jersey Number: {patriots.JerseyNumber}</li>
          <li>name: {patriots.name}</li>
        </ul>
      ))}
    </div>
  );
};

const FormikPatsRoster = withFormik({
  mapPropsToValues({ playername, JerseyNumber, playerNotes, name, termsofservice }) {
    return {
      termsofservice: termsofservice || false,
      name: name || "",
      playername: playername || "",
      JerseyNumber: JerseyNumber || "{number}",
      playerNotes: playerNotes || ""
    };
  },

  validationSchema: Yup.object().shape({
    playername: Yup.string().required("You shall not pass, without this field!!"),
    jerseynumber: Yup.string(),
    playerNotes: Yup.string()
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }
})(PatsRoster);

export default FormikPatsRoster;