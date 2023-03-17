import React from "react";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Login from "../pages/Login";
import App from "../App";

describe('Testando página inicial', () => {
  test('Testando input de Nome e Email', () => {
    renderWithRouterAndRedux(<Login />)

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByRole('button', {
      name: /play/i
    });
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(btnPlay).toBeDisabled();

    userEvent.type(inputName, 'teste');
    userEvent.type(inputEmail, 'teste@teste.com');
    expect(btnPlay).not.toBeDisabled();
  })
  test('Testando botão de Play', async () => {
    renderWithRouterAndRedux(<App />)

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputName, 'teste');
    userEvent.type(inputEmail, 'teste@teste.com');

    await userEvent.click(btnPlay);

    await waitForElementToBeRemoved(btnPlay);
    screen.logTestingPlaygroundURL();
  })
  test('Testando botão de Settings', () => {
    renderWithRouterAndRedux(<App />)

    const btnSettings = screen.getByRole('button', { name: /settings/i });
    userEvent.click(btnSettings);
    const textSettings = screen.getByTestId('settings-title');
    expect(textSettings).toBeInTheDocument();
  })
})