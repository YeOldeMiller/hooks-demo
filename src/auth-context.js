import { createContext } from 'react';

const AuthContext = createContext({ status: false, login: () => {}});
export const { Provider } = AuthContext;

export default AuthContext;