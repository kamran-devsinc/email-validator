import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { toast } from 'react-toastify';
import { getAllVerifiedEmails, getVerifiedEmail } from 'apis/email';

const EmailValidator = () => {
  const [verifiedEmails, setVerifiedEmail] = useState([]);

  useEffect(() => {
    getAllVerifiedEmails()
      .then((res) => { setVerifiedEmail(res.data) })
      .catch((err) => { console.error(err) })
  }, []);

  const onSubmit = async (values) => {
    getVerifiedEmail(values.firstName, values.lastName, values.url)
      .then((res) => {
        if (res.data) return setVerifiedEmail([res.data, ...verifiedEmails]);

        toast.warning('No email combination found');
      })
      .catch((err) => { toast.error(err || 'Something went wrong') })
  };

  const renderVerifiedEmails = () => (
    verifiedEmails.map((data, index) => (
      <p key={index}>{data.verifiedEmail} ({data.name})</p>
    ))
  )

  return (
    <div className="d-flex">
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

              <div className='col mt-2'>
                <button className='btn btn-success' type="submit">
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
