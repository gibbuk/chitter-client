import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe(`Header tests`, () => {
    test(`should match the snapshot`, () => {
        const rendered = render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        )

        expect(rendered).toMatchSnapshot();
    });
});