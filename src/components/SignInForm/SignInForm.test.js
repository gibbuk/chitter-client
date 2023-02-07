import axios from 'axios';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import SignInForm from './SignInForm';

jest.mock("axios");
window.alert = jest.fn();

describe(`SignInForm tests`, () => {

    const mockSetLoginUser = jest.fn();

    beforeEach(() => {
        render(
            <MemoryRouter>
                <SignInForm setLoginUser={mockSetLoginUser} />);
            </MemoryRouter>
        );
    });

    describe(`render tests`, () => {


        test(`should render a text input with label "username"`, () => {
            const result = screen.getByLabelText(/username/i);
            expect(result).toBeInTheDocument();
        });

        test(`should render a password input with label "password"`, () => {
            const result = screen.getByLabelText(/password/i);
            expect(result).toBeInTheDocument();
        });

        test(`should render a submit button`, () => {
            const result = screen.getByRole('button', { name: /sign in/i });
            expect(result).toBeInTheDocument();
        });

    });

    describe(`Form manipulation tests`, () => {

        test(`should render the new value in the input when the username is updated`, () => {
            const username = `User`;
            const usernameInput = screen.getByLabelText(/username/i);

            expect(usernameInput).toHaveValue(``);

            userEvent.type(usernameInput, username);
            expect(usernameInput).toHaveValue(username);
        });

        test(`should render the new value in the input when the password is updated`, () => {
            const password = `password`;
            const passwordInput = screen.getByLabelText(/password/i);

            expect(passwordInput).toHaveValue(``);

            userEvent.type(passwordInput, password);
            expect(passwordInput).toHaveValue(password);
        });
    });

    describe(`Form submission tests`, () => {

        let user, mockResponse, mockFailedResponse;

        beforeEach(() => {
            user = {
                username: `user`,
                password: `password`
            };

            mockResponse = {
                data: {
                    message: 'Login success',
                    user: user
                }
            };

            mockFailedResponse = {
                data: {
                    message: "Failed"
                }
            };

        });

        test(`should make a post request to the /login route with the form contents`, async () => {
            axios.post.mockResolvedValueOnce(mockResponse);
            const usernameInput = screen.getByLabelText(/username/i);
            const passwordInput = screen.getByLabelText(/password/i);
            const submitBtn = screen.getByRole('button', { name: /sign in/i });

            act(() => userEvent.type(usernameInput, user.username));
            act(() => userEvent.type(passwordInput, user.password));
            await act(async () => userEvent.click(submitBtn));

            expect(axios.post).toHaveBeenCalledWith(`http://localhost:4000/login`, user)
        });

        test(`should call mock setLoginUser once with user on a successful post request`, async () => {

            axios.post.mockResolvedValueOnce(mockResponse);

            const usernameInput = screen.getByLabelText(/username/i);
            const passwordInput = screen.getByLabelText(/password/i);
            const submitBtn = screen.getByRole('button', { name: /sign in/i });

            act(() => userEvent.type(usernameInput, user.username));
            act(() => userEvent.type(passwordInput, user.password));

            await act(async () => userEvent.click(submitBtn));

            expect(mockSetLoginUser).toHaveBeenCalledWith(mockResponse.data.user);

        });

        test(`should call alert() with response message`, async () => {
            axios.post.mockResolvedValueOnce(mockResponse);
            const submitBtn = screen.getByRole('button', { name: /sign in/i });
            await act(async () => userEvent.click(submitBtn));
            expect(window.alert).toHaveBeenCalledWith(mockResponse.data.message);
        });

        test(`should not call setLoginUser if no user provided`, async () => {
            axios.post.mockResolvedValueOnce(mockFailedResponse);

            const usernameInput = screen.getByLabelText(/username/i);
            const passwordInput = screen.getByLabelText(/password/i);
            const submitBtn = screen.getByRole('button', { name: /sign in/i });

            act(() => userEvent.type(usernameInput, user.username));
            act(() => userEvent.type(passwordInput, user.password));

            await act(async () => userEvent.click(submitBtn));

            expect(mockSetLoginUser).toHaveBeenCalledTimes(0);
        });
    });

});