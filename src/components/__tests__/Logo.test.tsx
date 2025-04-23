import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Logo from '../Logo';

describe('Logo Component', () => {
  it('renders the logo with correct text', () => {
    render(<Logo />);
    expect(screen.getByText('Vida')).toBeInTheDocument();
    expect(screen.getByText('Plus')).toBeInTheDocument();
  });

  it('renders the logo with correct styling', () => {
    render(<Logo />);
    const logoContainer = screen.getByText('Vida').parentElement;
    expect(logoContainer).toHaveClass('text-xl', 'font-bold');
  });

  it('renders white variant correctly', () => {
    render(<Logo variant="white" />);
    const logoText = screen.getByText('VidaPlus');
    expect(logoText).toHaveClass('text-white');
  });
}); 