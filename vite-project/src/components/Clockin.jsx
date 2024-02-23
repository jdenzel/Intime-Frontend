import { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { form_data } from "../redux/action";
import { setClockedIn } from "../redux/slice";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";

const clockinSchema = Yup.object().shape({
  location: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
});

function Clockin() {
  const csrfToken = Cookies.get("csrftoken");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clockedIn = useSelector((state) => state.clockedStatus.clockedIn);

  useEffect(() => {
    if (clockedIn) {
        navigate('/clockout/');
    }
}, [clockedIn, navigate]);

  const handleSubmit = (values, { setSubmitting }) => {
    const form = {
      employee: "",
      first_name: "",
      last_name: "",
      clock_in_time: "",
      ...values,
    };
    axios
      .post("https://dtesting.applikuapp.com/clockin/", form, {
        headers: {
          "X-CSRFToken": csrfToken,
        },
        withCredentials: true,
      })
      .then((response) => {
        dispatch(form_data(response.form));
        navigate('/clockout/')
        dispatch(setClockedIn());
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
      });

    return (
      <Formik
        initialValues={{ location: "", role: "" }}
        validationSchema={clockinSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <h3>Date: {date.toLocaleDateString()}</h3>
          <h3>Time: {date.toLocaleTimeString()}</h3>

          <h3>Location</h3>
          <Field type="text" name="location" />
          <ErrorMessage name="location" component="div" />

          <h3>Role</h3>
          <Field as="select" name="role">
            <option value="">Select a role</option>
            <option value="scoreboard">Scoreboard</option>
            <option value="paperscorer">Paper Scorer</option>
            <option value="camera">Camera Operator</option>
            <option value="onlinescorer">Online Scorer</option>
            <option value="gamechange">Game Changer</option>
            <option value="subtime">Sub timer</option>
          </Field>
          <ErrorMessage name="role" component="div" />

          <button type="submit" disabled={isSubmitting}>
            Clock In
          </button>
        </Form>
      </Formik>
    );
  };
}

export default Clockin;
