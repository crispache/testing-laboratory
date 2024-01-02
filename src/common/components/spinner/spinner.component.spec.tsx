import React from 'react';
import { render, screen } from '@testing-library/react';
import { SpinnerComponent } from './spinner.component';
import * as PromiseTracker from 'react-promise-tracker';

jest.mock('react-promise-tracker');

describe('SpinnerComponent specs', () => {
  it('should render Spinner when track a promise', () => {
    // Arrange
    // Spy
    const promiseTrackerSpy = jest
      .spyOn(PromiseTracker, 'usePromiseTracker')
      .mockImplementation(() => ({
        promiseInProgress: true,
      }));

    // Act
    render(<SpinnerComponent />);
    const spinnerElement = screen.getByTestId('spinner-test');

    // Assert
    expect(spinnerElement).toBeInTheDocument();
  });

  it('should not render Spinner when not track a promise', () => {
    // Arrange
    // Spy
    const promiseTrackerSpy = jest
      .spyOn(PromiseTracker, 'usePromiseTracker')
      .mockImplementation(() => ({
        promiseInProgress: false,
      }));

    // Act
    render(<SpinnerComponent />);
    const spinnerElement = screen.queryByTestId('spinner-test');

    // Assert
    expect(spinnerElement).not.toBeInTheDocument();
  });
});
