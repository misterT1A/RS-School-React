import type { ReactElement } from 'react';
import { Provider } from 'react-redux';

import { ThemeProvider } from '../../context';
import store from '../../store/store';

const Wrapper = ({ children }: { children: ReactElement }): ReactElement => (
  <Provider store={store}>
    <ThemeProvider>{children}</ThemeProvider>
  </Provider>
);

export default Wrapper;
