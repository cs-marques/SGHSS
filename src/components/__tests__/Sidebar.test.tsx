import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../Sidebar';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Sidebar Component', () => {
  it('renders the sidebar with menu items', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    
    // Check if main menu items are rendered
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Consultas')).toBeInTheDocument();
    expect(screen.getByText('Agendar Consulta')).toBeInTheDocument();
    expect(screen.getByText('Histórico')).toBeInTheDocument();
    expect(screen.getByText('Teleconsulta')).toBeInTheDocument();
    expect(screen.getByText('Notificações')).toBeInTheDocument();
  });

  it('handles navigation when menu items are clicked', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    
    // Click on Consultas
    fireEvent.click(screen.getByText('Consultas'));
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/patient/consultas');
  });

  it('handles logout correctly', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    
    // Click on logout
    fireEvent.click(screen.getByText('Sair'));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
}); 