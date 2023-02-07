import { render, screen } from '@testing-library/react';

import AllPeeps from './AllPeeps';

import testData from '../../utils/testData.js'
const peeps = testData.peeps;


jest.mock("../Peep/Peep", () => () => {
    return <mock-peep data-testid="Peep" />
})

describe(`AllPeeps component tests`, () => {

    test('should render the same number of Peeps elements as in the array of peeps', () => {
        render(<AllPeeps peeps={peeps} />);
        const result = screen.getAllByTestId("Peep");
        expect(result.length).toBe(peeps.length);
    });


})