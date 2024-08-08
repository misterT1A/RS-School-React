import type { RenderResult } from '@testing-library/react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ThemeTogler from '@/components/theme-button/Theme-button';

import { ThemeProvider } from '../../context';

describe('ThemeTogler', () => {
  const renderWithThemeProvider = (): RenderResult =>
    render(
      <ThemeProvider>
        <ThemeTogler />
      </ThemeProvider>,
    );
  it('should render the button', () => {
    renderWithThemeProvider();
    expect(screen.getByRole('button', { name: 'button' })).toBeInTheDocument();
  });

  it('should have light theme class by default', () => {
    renderWithThemeProvider();
    const knob = screen.getByRole('button', { name: 'button' }).firstChild;
    expect(knob).toHaveClass('knob light');
  });

  it('should toggle to dark theme when clicked', () => {
    renderWithThemeProvider();
    const button = screen.getByRole('button', { name: 'button' });
    fireEvent.click(button);
    const knob = button.firstChild;
    expect(knob).toHaveClass('knob dark');
  });

  it('should toggle back to light theme when clicked again', () => {
    renderWithThemeProvider();
    const button = screen.getByRole('button', { name: 'button' });
    fireEvent.click(button);
    fireEvent.click(button);
    const knob = button.firstChild;
    expect(knob).toHaveClass('knob light');
  });
});
