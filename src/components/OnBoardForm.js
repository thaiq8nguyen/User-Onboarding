import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import { Message } from "semantic-ui-react";
import axios from "axios";

const onBoardForm = ({ addUser, values, errors, touched, status }) => {
  //const [user, setUser] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (status) {
      addUser(status);
    }
  }, [addUser, status]);
  return (
    <div>
      <Form className="ui form">
        <div className="field">
          <Field name="name" type="text" placeholder="Name" />

          {touched.name && errors.name && (
            <Message content={errors.name} error visible></Message>
          )}
        </div>
        <div className="field">
          <Field name="email" type="text" placeholder="Email" />
          {touched.email && errors.email && (
            <Message content={errors.email} error visible></Message>
          )}
        </div>
        <div className="field">
          <Field name="password" type="password" placeholder="Password" />
          {touched.password && errors.password && (
            <Message content={errors.password} error visible></Message>
          )}
        </div>
        <div className="field">
          <div className="ui checkbox">
            <Field name="tos" type="checkbox" checked={values.tos} />
            <label>I agree to the Terms and Conditions</label>
            {touched.tos && errors.tos && (
              <Message content={errors.tos} error visible></Message>
            )}
          </div>
        </div>
        <button className="ui button" type="submit">
          Submit
        </button>
      </Form>
    </div>
  );
};

const FormikOnboardForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be 3 characters or longer")
      .required("Your name is required"),
    email: Yup.string()
      .email("Email is not valid")
      .required("Your email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters or longer ")
      .required("A password is required"),
    tos: Yup.bool().oneOf([true], "Please agree to our Term of Services")
  }),

  handleSubmit: (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    console.log("Req: ", values);

    axios
      .post("https://reqres.in/api/users", values)
      .then(response => {
        console.log("Res: ", response.data);
        setStatus(response.data);
      })
      .catch(errors => {
        console.log(errors.response);
      });
  }
})(onBoardForm);

export default FormikOnboardForm;
