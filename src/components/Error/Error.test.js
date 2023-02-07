import { render, screen } from '@testing-library/react';
import Error from './Error';


describe('Error component tests', () => {

    test('should render the error message provided', () => {
        const message = "There was an error"
        render(<Error message={message} />);
        expect(screen.getByText(message)).toBeInTheDocument();
    });
});