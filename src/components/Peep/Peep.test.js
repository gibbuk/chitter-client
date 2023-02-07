import { render, screen } from '@testing-library/react';

import Peep from './Peep';

import testData from '../../utils/testData.js';
const peeps = testData.peeps

describe(`Peep component tests`, () => {

    let peep;

    beforeEach(() => {
        peep = peeps[0];
        render(<Peep peep={peep} />);

    });

    afterEach(() => {
        peep = null;
    });

    test('should contain the username on the screen', () => {
        const usernameRegEx = new RegExp(peep.username, `i`);
        expect(screen.getByText(usernameRegEx)).toBeInTheDocument();
    });

    test(`should contain the peep content on the screen`, () => {
        expect(screen.getByText(peep.content)).toBeInTheDocument();
    });

    test(`should contain the date and time on the screen`, () => {
        const date = new Date(peep.dateCreated);
        const dateRegEx = new RegExp(date.toUTCString(), `i`);
        const result = screen.getByText(dateRegEx);
        expect(result).toBeInTheDocument();
    });

    test(`should render the users real name to the screen`, () => {
        const realNameRegEx = new RegExp(peep.realName, `i`);
        expect(screen.getByText(realNameRegEx)).toBeInTheDocument();

    });

});