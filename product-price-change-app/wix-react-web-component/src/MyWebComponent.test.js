import { render, screen } from '@testing-library/react';
import MyWebComponent from './MyWebComponent';

test('renders learn react link', () => {
  render(<MyWebComponent wixconfig='{"instanceId":"5390686d-1002-4c8c-aa93-8ee4f6e042f0","viewMode":"Editor"}'/>);
  const linkElement = screen.getByText(/"viewMode":"Editor"/i);
  expect(linkElement).toBeInTheDocument();
});
