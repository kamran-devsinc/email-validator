import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { toast } from 'react-toastify';
import { getAllVerifiedEmails, getVerifiedEmail } from 'apis/email';

const EmailValidator = () => {
  const [verifiedEmails, setVerifiedEmail] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    getAllVerifiedEmails()
      .then((res) => { setVerifiedEmail(res.data) })
      .catch((err) => { console.error(err) })
  }, []);

  useEffect(() => {
    let id = 0;

    if (!errors.length) return;

    id = setTimeout(setTimeout(() => setErrors([]), 5000));

    return (() => clearTimeout(id));
  }, [errors]);

  const onSubmit = async (values) => {
    getVerifiedEmail(values.firstName, values.lastName, values.url)
      .then((res) => {
        if (res.data) return setVerifiedEmail([res.data, ...verifiedEmails]);

        toast.warning('No email combination found');
      })
      .catch((err) => {
        toast.error('failed to submit');
        setErrors(err.response.data.errors);
      })
  };

  const renderVerifiedEmails = () => (
    verifiedEmails.map((data, index) => (
      <p key={index}>{data.verifiedEmail} ({data.name})</p>
    ))
  )

  const renderFormErrors = () => (
    errors.map((err) => (
      <div className='text-danger' key={Object.keys(err)}>{Object.keys(err)}: {Object.values(err)}</div>
    ))
  );

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <div className='col'>
            <form onSubmit={handleSubmit}>
              <h2>Email validator</h2>

              <div className='col'>
              <div className='row'><label>First Name</label></div>
                <Field name="firstName" component="input" placeholder="First Name" required />
              </div>

              <div className='col'>
                <div className='row'><label>Last Name</label></div>
                <Field name="lastName" component="input" placeholder="Last Name" required />
              </div>

              <div className='col'>
                <div className='row'><label>URL</label></div>
                <Field name="url" component="input" placeholder="url" required />
              </div>

              {renderFormErrors()}

              <div className='col mt-2'>
                <button className='btn btn-success' type='submit'>
                  Submit
                </button>
              </div>
            </form>

            <h2>Results</h2>

            {renderVerifiedEmails()}
          </div>
        )}
      />
    </div>
  )
};

export default EmailValidator;
