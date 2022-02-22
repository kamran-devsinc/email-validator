import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import EmailValidator from '../EmailValidator';
import  axios  from 'axios';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect'

jest.mock('axios');

const mockGetApiResult = [
  {
    "_id": "620bca63c428e9a4cb9b89a0",
    "name": "Muhammad  Naeem",
    "verifiedEmail": "Naeem@devsinc.com",
    "createdAt": "2022-02-15T15:44:35.533Z",
    "updatedAt": "2022-02-15T15:44:35.533Z",
    "__v": 0
  },
  {
    "_id": "620bcb29c428e9a4cb9b89a3",
    "name": "Ben Pratt",
    "verifiedEmail": "Ben@8returns.com",
    "createdAt": "2022-02-15T15:47:53.262Z",
    "updatedAt": "2022-02-15T15:47:53.262Z",
    "__v": 0
  },
];


describe('EmailValidator',() => {
  afterEach(cleanup);

  it('it does not adds a new valid combination', async () => {
    axios.get.mockResolvedValue({ data: mockGetApiResult });

    axios.post.mockResolvedValue({ data: null });

    let wrapper;

    await act(async () => {
      wrapper = render(<EmailValidator />);
    });

    const listItems = await wrapper.getAllByTestId('validCombination');

    const firstName = wrapper.getByTestId('firstName');
    fireEvent.change(firstName, {target: {value: 'Kami'}});

    const lastName = wrapper.getByTestId('lastName');
    fireEvent.change(lastName, {target: {value: 'arsho'}});

    const url = wrapper.getByTestId('firstName');
    fireEvent.change(url, {target: {value: 'devsinc.com'}});

    fireEvent.click(wrapper.getByTestId('submit'));

    const loader = wrapper.getByTestId('loading');

    await waitFor(() => expect(loader).toBeInTheDocument());

    await waitFor(() => expect(loader).not.toBeInTheDocument());

    const updatedlistItems = wrapper.getAllByTestId('validCombination');

    expect(updatedlistItems).toHaveLength(listItems.length);
  });

  it('add new valid combination', async () => {
    const mockPostApiResult = {
      "_id": "620bca63c428e9a4cb9b89a0",
      "name": "Kami arsho",
      "verifiedEmail": "Kami@devsinc.com",
      "createdAt": "2022-02-15T15:44:35.533Z",
      "updatedAt": "2022-02-15T15:44:35.533Z",
      "__v": 0
    };

    axios.get.mockResolvedValue({ data: mockGetApiResult });

    axios.post.mockResolvedValue({ data: mockPostApiResult });

    let wrapper;

    await act(async () => {
      wrapper = render(<EmailValidator />);
    });

    const listItems = await wrapper.getAllByTestId('validCombination');

    const firstName = wrapper.getByTestId('firstName');
    fireEvent.change(firstName, {target: {value: 'Kami'}});

    const lastName = wrapper.getByTestId('lastName');
    fireEvent.change(lastName, {target: {value: 'arsho'}});

    const url = wrapper.getByTestId('firstName');
    fireEvent.change(url, {target: {value: 'devsinc.com'}});

    fireEvent.click(wrapper.getByTestId('submit'));

    const loader = wrapper.getByTestId('loading');

    await waitFor(() => expect(loader).toBeInTheDocument());

    await waitFor(() => expect(loader).not.toBeInTheDocument());

    const updatedlistItems = wrapper.getAllByTestId('validCombination')

    expect(updatedlistItems).toHaveLength(listItems.length+1);
  });
})
