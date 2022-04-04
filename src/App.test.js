import React from 'react';
import { render, screen, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import App from './App';
import TestElements from './TestElements';
import TestEvents from "./TestEvents";
import TestAsync from "./TestAsync";
import {createStore} from "redux";
import {reducer} from "../store/reducer";
import Provider from "react-redux/lib/components/Provider";
import TestRedux from "./TestRedux";
import CounterProvider, {Counter, CounterContext} from "./TextContext";
import {createMemoryHistory} from "history";
import TestRouter from "./TestRouter";
import {Router} from "react-router-dom";

/*
import axiosMock from 'axios';
import TestAxios from './TestAxios';
*/


afterEach(cleanup);

// Functionality 1 : Checking if Sth is present in the source code

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();

});

// Functionality 2 : Creating Test Snapshot

it('should take a snapshot', () => {
  const { asFragment } = render(<App />)
  expect(asFragment(<App />)).toMatchSnapshot()
});

// Functionality 3 : Testing DOM elements

it('should equal to 0', () => {
  const { getByTestId } = render(<TestElements />);

  expect(screen.getByTestId('counter')).toHaveTextContent(0)
});

it('should be enabled', () => {
  const { getByTestId } = render(<TestElements />);
  expect(screen.getByTestId('button-up')).not.toHaveAttribute('disabled')
});

it('should be disabled', () => {
  const { getByTestId } = render(<TestElements />);
  expect(screen.getByTestId('button-down')).toBeDisabled()
});



// Functionality 4 : Testing events

it('increments counter', () => {
  const { getByTestId } = render(<TestEvents />);

  fireEvent.click(screen.getByTestId('button-up'))

  expect(screen.getByTestId('counter')).toHaveTextContent('1')
});

it('decrements counter', () => {
  const { getByTestId } = render(<TestEvents />);
  fireEvent.click(screen.getByTestId('button-down'))
  expect(screen.getByTestId('counter')).toHaveTextContent('-1')
});


// Functionality 5 : Testing asynchronous actions


it('increments counter after 0.5s', async () => {
  const { getByTestId, getByText, findByText } = render(<TestAsync />);
  fireEvent.click(screen.getByTestId('button-up'))
  const counter = await screen.findByText('1')

  expect(counter).toHaveTextContent('1')
});



// Functionality 6 : Testing React Redux

const renderWithRedux = (
    component,
    { initialState, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}

afterEach(cleanup);

it('checks initial state is equal to 0', () => {
  const { getByTestId } = renderWithRedux(<TestRedux />)
  expect(screen.getByTestId('counter')).toHaveTextContent('0')
})


// Functionality 7 : Testing React Context

const renderWithContext = (
    component) => {
  return {
    ...render(
        <CounterProvider value={CounterContext}>
          {component}
        </CounterProvider>)
  }
}

afterEach(cleanup);

it('checks if initial state is equal to 0', () => {
  const { getByTestId } = renderWithContext(<Counter />)
  expect(screen.getByTestId('counter')).toHaveTextContent('0')
})
/*
// Functionality 8 : Testing React Router

const renderWithRouter = (component) => {
  const history = createMemoryHistory()
  return {
    ...render (
        <Router history={history}>
          {component}
        </Router>
    )
  }
}

it('should render the home page', () => {

  const { container, getByTestId } = renderWithRouter(<TestRouter />)
  const navbar = screen.getByTestId('navbar')
  const link = screen.getByTestId('home-link')

  expect(container.innerHTML).toMatch('Home page')
  expect(navbar).toContainElement(link)
})

// Functionality 9 : Testing HTTP Request

jest.mock('axios')

it('should display a loading text', () => {

  const { getByTestId } = render(<TestAxios />)
  // eslint-disable-next-line testing-library/prefer-screen-queries
  expect(getByTestId('loading')).toHaveTextContent('Loading...')
})

it('should load and display the data', async () => {
  const url = '/greeting'
  const { getByTestId, findByTestId } = render(<TestAxios url={url} />)

  axiosMock.get.mockResolvedValueOnce({
    data: { greeting: 'hello there' },
  })
  // eslint-disable-next-line testing-library/prefer-screen-queries
  fireEvent.click(getByTestId('fetch-data'))
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const greetingData = await findByTestId('show-data')

  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith(url)
  expect(greetingData).toHaveTextContent('hello there')
})
*/
