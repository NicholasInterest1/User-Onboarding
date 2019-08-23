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
      <Form>
        <Field type="text" name="name" placeholder="Player Name" />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}

        <Field type="text" name="email" placeholder="email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}

        <Field type="password" name="password" placeholder="password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}

        <Field component="select" className="value-select" name="choose">
          <option>Please Choose an Option</option>
          <option value="QB">Quarterback</option>
          <option value="RB">Running Back</option>
          <option value="WR">Wide Receiver</option>
          <option value="TE">Tight End</option>
          <option value="CB">Corner Back</option>
          <option value="FS">Free Safety</option>
          <option value="SS">Strong Safety</option>
        </Field>

        <label className="checkbox-container">
          Terms of Service
          <Field type="checkbox" name="tos" checked={values.tos} />
          <span className="checkmark" />
        </label>

        <Field
          component="textarea"
          type="text"
          name="playerNotes"
          placeholder="playerNotes"
        />
        {touched.playerNotes && errors.playerNotes && (
          <p className="error">{errors.playerNotes}</p>
        )}

        <button type="submit">Submit!</button>
      </Form>
      <div className="complete-form">
        {patriots.map(patriot => (
          <ul key={patriot.id}>
              <div className="p-class">
            <p>Player Name: {patriot.name}</p>
            <p>Email: {patriot.email}</p>
            <p>Password: {patriot.password}</p>
            <p>Position: {patriot.choose}</p>
            <p>Player Notes: {patriot.playerNotes}</p>
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
};

const FormikPatsRoster = withFormik({
  mapPropsToValues({ name, email, playerNotes, tos, password }) {
    return {
      tos: tos || false,
      name: name || "",
      password: password || "",
      email: email || "",
      playerNotes: playerNotes || ""
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("You shall not pass, without this field!!"),
    email: Yup.string(),
    playerNotes: Yup.string(),
    password: Yup.string()
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
