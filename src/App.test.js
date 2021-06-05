import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import {replaceCamelWithSpaces} from './App';

test('button has correct initial color', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' })
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' })
  fireEvent.click(colorButton)

  expect(colorButton).toHaveStyle({backgroundColor : 'MidnightBlue'})
  expect(colorButton.textContent).toBe('Change to Medium Violet Red')
});

test('Checkbox disabled button on first click and enabled on second', () => {
  render(<App />)
  
  const button = screen.getByRole('button')
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  
  fireEvent.click(checkbox)
  expect(button).toBeDisabled()
  
  fireEvent.click(checkbox)
  expect(button).toBeEnabled()
})

test('Disabled button has gray background and reverts to MediumVioletRed', () => {
  render(<App />)
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'})
  const colorButton = screen.getByRole('button', {name: 'Change to Midnight Blue'})
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle('background-color: gray')

  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle('background-color: MediumVioletRed')
})

test('Clicked disabled button has gray background and changes to MidnightBlue', () => {
  render(<App />)
  const checkbox = screen.getByRole('checkbox', {name:  'Disable button'})
  const colorButton = screen.getByRole('button', {name: 'Change to Midnight Blue'})
  fireEvent.click(colorButton)
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle('background-color: gray')
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle('background-color: MidnightBlue')
})

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red')
  })
  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue')
  })
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')
  })
})