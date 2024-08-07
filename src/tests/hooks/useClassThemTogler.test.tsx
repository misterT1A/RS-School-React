// import { render } from '@testing-library/react';
// import '@testing-library/jest-dom';

// import { ThemeContext, ThemeEnum } from '../../context';
// import useClassThemeToggler from '../../hooks/useClassThemTogler';

// const TestComponent: React.FC<{ defaultStyles: string; changestyles: string }> = ({ defaultStyles, changestyles }) => {
//   const className = useClassThemeToggler(defaultStyles, changestyles);
//   return <div data-testid="test-element" className={className} />;
// };

// describe('useClassThemeToggler', () => {
//   it('should apply default styles and changestyles when theme is dark', () => {
//     const defaultStyles = 'default';
//     const changestyles = 'dark';

//     const { getByTestId } = render(
//       <ThemeContext.Provider value={{ theme: ThemeEnum.Dark, setTheme: jest.fn() }}>
//         <TestComponent defaultStyles={defaultStyles} changestyles={changestyles} />
//       </ThemeContext.Provider>,
//     );

//     const element = getByTestId('test-element');
//     expect(element).toHaveClass(`${defaultStyles} ${changestyles}`);
//   });

//   it('should apply only default styles when theme is light', () => {
//     const defaultStyles = 'default';
//     const changestyles = 'dark';

//     const { getByTestId } = render(
//       <ThemeContext.Provider value={{ theme: ThemeEnum.Light, setTheme: jest.fn() }}>
//         <TestComponent defaultStyles={defaultStyles} changestyles={changestyles} />
//       </ThemeContext.Provider>,
//     );

//     const element = getByTestId('test-element');
//     expect(element).toHaveClass(defaultStyles);
//   });
// });
