import { render } from '@testing-library/react';
import Footer from './Footer';

describe(`Footer tests`, () => {
    test(`should match the snapshot`, () => {
        expect(render(<Footer />)).toMatchSnapshot();
    })
})