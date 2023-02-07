import axios from 'axios';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import testData from '../../utils/testData';
const testUser = testData.user;

import SignUpForm from './SignUpForm';
import { MemoryRouter } from 'react-router-dom';

jest.mock("axios");
window.alert = jest.fn();

describe(`SignUpForm tests`, () => {

    beforeEach(() => {
        render(
            <MemoryRouter>
                <SignUpForm />
            </MemoryRouter>
        )
    });

    describe(`Render tests`, () => {


        test(`should render a username input`, () => {
            const result = screen.getByLabelText(/username/i);
            expect(result).toBeInTheDocument();
        });

        test(`should render a 'name' input`, () => {
            const result = screen.getByLabelText("Name:");
            expect(result).toBeInTheDocument();
        });

        test(`should render an 'email' input`, () => {
            const result = screen.getByLabelText("Email:");
            expect(result).toBeInTheDocument();
        });

        test(`should render a password input`, () => {
            const result = screen.getByLabelText(/password/i);
            expect(result).toBeInTheDocument();
        });

        test(`should render a submit button`, () => {
            const result = screen.getByRole('button', { name: /sign me up/i });
            expect(result).toBeInTheDocument();
        });
    });

    describe(`From manipulation tests`, () => {

        test(`should render the new value in the input when the username is updated`, () => {
            const usernameInput = screen.getByLabelText(/username/i);

            expect(usernameInput).toHaveValue(``);

            userEvent.type(usernameInput, testUser.username);
            expect(usernameInput).toHaveValue(testUser.username);
        });

        test(`should render the new value in the input when the name is updated`, () => {
            const nameInput = screen.getByLabelText("Name:");

            expect(nameInput).toHaveValue(``);

            userEvent.type(nameInput, testUser.name);
            expect(nameInput).toHaveValue(testUser.name);
        });

        test(`should render the new value in the email when the name is updated`, () => {
            const emailInput = screen.getByLabelText("Email:");

            expect(emailInput).toHaveValue(``);

            userEvent.type(emailInput, testUser.email);
            expect(emailInput).toHaveValue(testUser.email);
        });

        test(`should render the new value in the input when the password is updated`, () => {
            const passwordInput = screen.getByLabelText(/password/i);

            expect(passwordInput).toHaveValue(``);

            userEvent.type(passwordInput, testUser.password);
            expect(passwordInput).toHaveValue(testUser.password);
        });

    });

    describe(`Form submission tests`, () => {

        beforeEach(async () => {
            axios.post.mockResolvedValueOnce({ data: { message: "message" } });
            const usernameInput = screen.getByLabelText(/username/i);
            const nameInput = screen.getByLabelText("Name:");
            const emailInput = screen.getByLabelText("Email:");
            const passwordInput = screen.getByLabelText(/password/i);
            const submitBtn = screen.getByRole('button', { name: /sign me up/i });

            userEvent.type(usernameInput, testUser.username);
            userEvent.type(nameInput, testUser.name);
            userEvent.type(emailInput, testUser.email);
            userEvent.type(passwordInput, testUser.password);

            await act(async () => userEvent.click(submitBtn));
        });

        test(`should make a post request to the register route with the form contents`, async () => {

            expect(axios.post).toHaveBeenCalledWith(`http://localhost:4000/register`, { newUser: testUser });

        });

        test(`should call alert() with response message`, async () => {
            expect(window.alert).toHaveBeenCalledWith("message");
        });
    });

});


