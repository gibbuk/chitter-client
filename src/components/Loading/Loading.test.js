import { render, screen } from '@testing-library/react';
import Loading from './Loading';


describe(`Loading component tests`, () => {

    test('should render "Loading..." to the screen for a screen-reader', () => {
        render(<Loading />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
});