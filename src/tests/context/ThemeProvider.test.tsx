// import { fireEvent, render, screen } from '@testing-library/react';
// import type { ReactNode } from 'react';
// import { useContext } from 'react';
// import '@testing-library/jest-dom';

// import { ThemeContext, ThemeEnum, ThemeProvider } from '../../context';

// const TestComponent = (): ReactNode => {
//   const { theme, setTheme } = useContext(ThemeContext);

//   return (
//     <div>
//       <span>Current theme: {theme}</span>
//       <button type="button" onClick={() => setTheme(ThemeEnum.Dark)}>
//         Set Dark Theme
//       </button>
//     </div>
//   );
// };

// describe('ThemeProvider', () => {
//   it('provides the default theme value', () => {
//     render(
//       <ThemeProvider>
//         <TestComponent />
//       </ThemeProvider>,
//     );

//     expect(screen.getByText(/Current theme:\s*Light/i)).toBeInTheDocument();
//   });

//   it('updates the theme value when setTheme is called', () => {
//     render(
//       <ThemeProvider>
//         <TestComponent />
//       </ThemeProvider>,
//     );

//     fireEvent.click(screen.getByText('Set Dark Theme'));

//     expect(screen.getByText(/Current theme:\s*Dark/i)).toBeInTheDocument();
//   });
// });
