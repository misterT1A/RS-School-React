import { render, screen } from '@testing-library/react';

import Header from '@/components/header/Header';
import styles from '@/components/root/_root.module.scss';
import useClassThemeToggler from '@/hooks/useClassThemTogler';

jest.mock('../../hooks/useClassThemTogler.ts', () => jest.fn());

jest.mock('../../components/search-block/SearchBlock.tsx', () => () => <div>SearchBlock</div>);
jest.mock('../../components/theme-button/Theme-button.tsx', () => () => <div>ThemeTogler</div>);

describe('Header', () => {
  beforeEach(() => {
    (useClassThemeToggler as jest.Mock).mockImplementation(
      (defaultStyles, changestyles) => `${defaultStyles} ${changestyles}`,
    );
  });

  it('renders the Header component', () => {
    render(<Header />);

    expect(screen.getByRole('heading', { name: /planet search/i })).toBeInTheDocument();

    expect(screen.getByText('SearchBlock')).toBeInTheDocument();
    expect(screen.getByText('ThemeTogler')).toBeInTheDocument();
  });

  it('has the correct class names', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass(`${styles.header} ${styles.dark}`);

    const title = screen.getByRole('heading', { name: /planet search/i });
    expect(title).toHaveClass(`${styles.title} ${styles.dark}`);
  });

  it('renders control block with correct classes', () => {
    render(<Header />);

    const controlBlock = screen.getByText('SearchBlock').parentElement;
    expect(controlBlock).toHaveClass(styles.controlBlock);
  });
});
