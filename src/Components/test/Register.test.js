import { render} from '@testing-library/react';
import { Register } from '../form/Register';
import { MemoryRouter } from 'react-router-dom';


const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));
test('Register', async() => {
  render(
  <MemoryRouter><Register/></MemoryRouter>);
});
