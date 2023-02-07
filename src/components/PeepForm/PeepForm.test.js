import axios from "axios";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PeepForm from "./PeepForm";

import testData from "../../utils/testData";
const testPeep = testData.testPeep;
const testUser = testData.user;

jest.mock("axios");
const getPeeps = jest.fn();
const signOut = jest.fn((e) => e.preventDefault());
window.alert = jest.fn();

describe(`PeepForm component tests`, () => {
  beforeEach(() => {
    render(<PeepForm user={testUser} getPeeps={getPeeps} signOut={signOut} />);
  });

  describe(`render tests`, () => {
    test(`should render a textarea input`, () => {
      const result = screen.getByRole(`textbox`);
      expect(result).toBeInTheDocument();
    });

    test(`should render a "Peep!" button`, () => {
      const result = screen.getByRole("button", { name: /peep/i });
      expect(result).toBeInTheDocument();
    });

    test(`should render a "Sign out" button`, () => {
      const result = screen.getByRole("button", { name: /sign out/i });
      expect(result).toBeInTheDocument();
    });
  });

  describe(`form manipulation tests`, () => {
    test("should render the new value in the <textarea> when the peep content is updated", () => {
      const peepTextarea = screen.getByRole("textbox");

      expect(peepTextarea).toHaveValue(``);

      userEvent.type(peepTextarea, testPeep.content);
      expect(peepTextarea).toHaveValue(testPeep.content);
    });
  });

  describe(`Peep Form submission tests`, () => {
    test("should send a post request to localhost:4000/peeps with the user and peep", async () => {
      axios.post.mockResolvedValue({
        data: { message: "success", peep: testPeep },
      });

      const peepTextarea = screen.getByRole("textbox");
      const submitBtn = screen.getByRole("button", { name: /peep/i });

      userEvent.type(peepTextarea, testPeep.content);
      await act(async () => userEvent.click(submitBtn));

      const mockCalls = axios.post.mock.calls[0];

      expect(mockCalls[0]).toBe(`http://localhost:4000/peeps`);
      expect(mockCalls[1].user).toEqual(testUser);
      expect(mockCalls[1].peep.content).toBe(testPeep.content);
      expect(mockCalls[1].peep.username).toBe(testUser.username);
      expect(mockCalls[1].peep.realName).toBe(testUser.name);
      expect(mockCalls[1].peep.dateCreated).toBeTruthy();
    });

    test(`should call getPeeps once on receiving a succesful response for adding to the db`, async () => {
      axios.post.mockResolvedValue({
        data: { message: "success", peep: testPeep },
      });

      const peepTextarea = screen.getByRole("textbox");
      const submitBtn = screen.getByRole("button", { name: /peep/i });

      userEvent.type(peepTextarea, testPeep.content);
      await act(async () => userEvent.click(submitBtn));

      expect(getPeeps).toHaveBeenCalled();
    });

    test(`should not have called getPeeps on receiving a failure response for adding to the db`, async () => {
      axios.post.mockResolvedValue({ data: { message: "failure" } });
      const peepTextarea = screen.getByRole("textbox");
      const submitBtn = screen.getByRole("button", { name: /peep/i });

      userEvent.type(peepTextarea, testPeep.content);
      await act(async () => userEvent.click(submitBtn));

      expect(getPeeps).toHaveBeenCalledTimes(0);
    });

    test(`should call alert() with error message contents if POST request rejected/fails`, async () => {
      axios.post.mockRejectedValue({ message: "message" });
      const peepTextarea = screen.getByRole("textbox");
      const submitBtn = screen.getByRole("button", { name: /peep/i });

      await act(async () => userEvent.click(submitBtn));
      expect(window.alert).toHaveBeenCalledWith("message");
    });
  });

  describe(`Sign out form submission tests`, () => {
    test(`should call the signOut function supplied to it once`, async () => {
      const signOutBtn = screen.getByRole("button", { name: /sign out/i });

      await act(async () => userEvent.click(signOutBtn));

      expect(signOut).toHaveBeenCalledTimes(1);
    });
  });
});
