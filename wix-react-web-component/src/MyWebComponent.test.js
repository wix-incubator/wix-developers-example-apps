import { render, screen } from '@testing-library/react';
import MyWebComponent from './MyWebComponent';

test('renders learn react link', () => {
  render(<MyWebComponent wixconfig='{"instanceId":"5390686d-1002-4c8c-aa93-8ee4f6e042f0","viewMode":"Editor","data":{"form-id":"422222"}}'/>);
  const linkElement = screen.getByText(/"form-id":"422222"/i);
  expect(linkElement).toBeInTheDocument();
});
