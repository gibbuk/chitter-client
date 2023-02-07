
import axios from 'axios';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import testData from './utils/testData';
const testPeep = testData.testPeep;
const testUser = testData.user;

import App from './App';

window.alert = jest.fn();

jest.mock("axios");

describe(`App component tests`, () => {

    let postLoginResponse, postPeepResponse;

    beforeEach(() => {
        postLoginResponse = {
            data: {
                message: "message",
                user: testUser
            }

        }

        postPeepResponse = {
            data: {
                message: "message",
                peep: testPeep
            }
        }
    })

    test(`should display the PeepForm component after a user has successfully logged in`, async () => {
        axios.post.mockResolvedValueOnce(postLoginResponse)
        await act(async () => render(<App />))

        const submitBtn = screen.getByRole('button', { name: /sign in/i });

        await act(async () => userEvent.click(submitBtn));
        expect(screen.getByText(/post a peep/i).toBeInTheDocument);


    });

    test(`should have removed the SignInFOrm component`, async () => {
        axios.post.mockResolvedValueOnce(postLoginResponse);
        await act(async () => render(<App />))
        const submitBtn = screen.getByRole('button', { name: /sign in/i });

        await act(async () => userEvent.click(submitBtn));

        expect(screen.queryByText(/Sign in to Peep/i)).not.toBeInTheDocument();

    });

    test(`should have made a GET request to /peeps`, async () => {
        axios.post.mockResolvedValueOnce(postLoginResponse);
        await act(async () => render(<App />))
        const submitBtn = screen.getByRole('button', { name: /sign in/i });
        await act(async () => userEvent.click(submitBtn));

        const peepBtn = screen.getByRole('button', { name: /peep/i });
        axios.post.mockResolvedValueOnce(postPeepResponse);
        await act(async () => userEvent.click(peepBtn));

        expect(axios.get).toHaveBeenCalledWith(`http://localhost:4000/peeps`);
    });

    test(`should remove PeepForm on sign out`, async () => {
        axios.post.mockResolvedValueOnce(postLoginResponse);
        await act(async () => render(<App />))
        const submitBtn = screen.getByRole('button', { name: /sign in/i });
        await act(async () => userEvent.click(submitBtn));

        const signOutBtn = screen.getByRole('button', { name: /sign out/i });
        await act(async () => userEvent.click(signOutBtn));

        expect(screen.queryByText(/post a peep/i)).not.toBeInTheDocument();
    });
});
