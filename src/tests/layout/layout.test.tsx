// import { render, screen } from '@testing-library/react';

// import styles from '@/components/root/_root.module.scss';
// import Layout from '@/layout/Layout';
// import '@testing-library/jest-dom';
// import ThemeWrapper from '@/layout/themeWrapper';

// jest.mock('next/head', () => ({
//   __esModule: true,
//   default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
// }));

// jest.mock('../../components/header/Header.tsx', () => () => <header>Header</header>);

// describe('Layout', () => {
//   it('renders children and Head component correctly', () => {
//     render(
//       <Layout>
//         <section>Child Component</section>
//       </Layout>,
//     );
//     expect(screen.getByText('Child Component')).toBeInTheDocument();
//     expect(screen.getByText('Header')).toBeInTheDocument();
//     expect(screen.getByText('Next App')).toBeInTheDocument();
//   });
// });

// describe('ThemeWrapper', () => {
//   it('renders children with correct className', () => {
//     render(
//       <ThemeWrapper>
//         <div>Child Component</div>
//       </ThemeWrapper>,
//     );
//     expect(screen.getByText('Child Component')).toBeInTheDocument();
//     const section = screen.getByText('Child Component').closest('section');
//     expect(section).toHaveClass(styles.themeWrapper);
//     expect(section).not.toHaveClass(styles.dark);
//   });
// });
