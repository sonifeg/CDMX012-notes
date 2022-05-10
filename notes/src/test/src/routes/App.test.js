import { render, screen } from '@testing-library/react';
import LoginView from '../../../routes/LoginView';

test('renders learn react link', () => {
  render(<LoginView />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
