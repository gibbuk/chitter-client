import axios from "axios";
import { act, render, screen, waitFor } from "@testing-library/react";

import { peeps } from "./utils/mockPeeps.json";

import App from "./App";

jest.mock("axios");

jest.mock(`./components/AllPeeps/AllPeeps`, () => () => {
  return <mock-allpeeps data-testid="AllPeeps" />;
});
jest.mock(`./components/Header/Header`, () => () => {
  return <mock-header data-testid="Header" />;
});
jest.mock(`./components/Footer/Footer`, () => () => {
  return <mock-footer data-testid="Footer" />;
});
jest.mock(`./components/SignInForm/SignInForm`, () => () => {
  return <mock-signinform data-testid="SignInForm" />;
});
jest.mock(`./components/Loading/Loading`, () => () => {
  return <mock-loading data-testid="Loading" />;
});
jest.mock(`./components/Error/Error`, () => () => {
  return <mock-error data-testid="Error" />;
});

describe(`App component tests`, () => {
  describe(`synchronous tests`, () => {
    test(`It should render the Header component`, async () => {
      axios.get.mockResolvedValueOnce();
      await act(async () => render(<App />));
      const headerElement = screen.getByTestId("Header");
      expect(headerElement).toBeInTheDocument();
    });

    test(`It should render the Footer component`, async () => {
      axios.get.mockResolvedValueOnce();
      await act(async () => render(<App />));
      const footerElement = screen.getByTestId(`Footer`);
      expect(footerElement).toBeInTheDocument();
    });

    test(`It should render the SignInForm component`, async () => {
      axios.get.mockResolvedValueOnce();
      await act(async () => render(<App />));
      const signInFormElement = screen.getByTestId(`SignInForm`);
      expect(signInFormElement).toBeInTheDocument();
    });
  });

  describe(`async tests`, () => {
    test(`Should render the Loading component whilst waiting for data`, async () => {
      axios.get.mockResolvedValueOnce(new Error());
      await act(async () => render(<App />));
      await waitFor(() =>
        expect(screen.getByTestId("Loading")).toBeInTheDocument()
      );
    });

    test(`It should render the AllPeeps component when data received`, async () => {
      axios.get.mockResolvedValueOnce({ data: peeps });
      await act(async () => render(<App />));
      await waitFor(() =>
        expect(screen.getByTestId("AllPeeps")).toBeInTheDocument()
      );
    });

    test.skip(`It should render the error component if it receives an error`, async () => {
      const message = "There was an error";
      axios.get.mockResolvedValueOnce(new Error(message));
      await act(async () => render(<App />));
      await waitFor(() =>
        expect(screen.getByTestId("Error")).toBeInTheDocument()
      );
    });
  });
});
