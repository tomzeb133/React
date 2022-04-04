import React from 'react';
//import ReactDOM from 'react-dom/client';
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';
import TestElements from './TestElements';


afterEach(cleanup);

//const root = ReactDOM.createRoot(document.getElementById("App"));

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();

});

it('should take a snapshot', () => {
  const { asFragment } = render(<App />)
  expect(asFragment(<App />)).toMatchSnapshot()
});


it('should equal to 0', () => {
  const { getByTestId } = render(<TestElements />);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  expect(getByTestId('counter')).toHaveTextContent(0)
});

