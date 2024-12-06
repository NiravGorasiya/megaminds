import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { register } from '../../redux/slice/AuthSlice';

// Yup validation schema for Signup form
const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
});

const Signup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (values: { name: string; email: string; password: string; phone: string }) => {    
    dispatch(register(values)); 
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="col-md-6">
        <Formik
          initialValues={{ name: '', email: '', password: '', phone: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  className="form-control"
                  placeholder="Enter phone number"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>



              <button type="submit" className="btn btn-primary w-100">
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;