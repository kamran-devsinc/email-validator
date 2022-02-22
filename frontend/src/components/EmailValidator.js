import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { toast } from 'react-toastify';
import { getAllVerifiedEmails, getVerifiedEmail } from 'apis/email';

const EmailValidator = () => {
  const [verifiedEmails, setVerifiedEmail] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);

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
    setSubmitting(true);

    getVerifiedEmail(values.firstName, values.lastName, values.url)
      .then((res) => {
        if (res.data) return setVerifiedEmail([res.data, ...verifiedEmails]);

        toast.warning('No email combination found');
      })
      .catch((err) => {
        toast.error('failed to submit');
        setErrors(err.response.data.errors);
      })
      .finally(() => setSubmitting(false));
  };

  const renderVerifiedEmails = () => (
    verifiedEmails.map((data, index) => (
      <li data-testid='validCombination' key={index}>{data.verifiedEmail} ({data.name})</li>
    ))
  )

  const renderFormErrors = () => (
    errors.map((err) => (
      <div className='text-danger' key={Object.keys(err)}>{Object.keys(err)}: {Object.values(err)}</div>
    ))
  );

  return (
    <div data-testid='emailValidator'>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <div className='col'>
            <form onSubmit={handleSubmit}>
              <h2>Email validator</h2>

              <div className='col'>
              <div className='row'><label>First Name</label></div>
                <Field data-testid='firstName' name='firstName' component='input' placeholder='First Name' required />
              </div>

              <div className='col'>
                <div className='row'><label>Last Name</label></div>
                <Field data-testid='lastName' name='lastName' component='input' placeholder='Last Name' required />
              </div>

              <div className='col'>
                <div className='row'><label>URL</label></div>
                <Field data-testid='url' name='url' component='input' placeholder='url' required />
              </div>

              {renderFormErrors()}

              <div className='col mt-2'>
                <div className='d-flex align-center'>
                  <button className='btn btn-success' type='submit' data-testid='submit'>
                    Submit
                  </button>

                  { isSubmitting ? (
                    <div data-testid='loading' className="spinner-border text-primary ms-2" role="status" />
                    ) : null
                  }
                </div>
              </div>
            </form>

            <h2>Results</h2>

            <ul>
              {renderVerifiedEmails()}
            </ul>
          </div>
        )}
      />
    </div>
  )
};

export default EmailValidator;
