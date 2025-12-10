import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Index from './Index';

// Initialize i18next for tests
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        "main_heading": "Transform every customer into your best promoter",
        "try_free_30_days": "Try Free for 30 Days",
        "view_demo": "View Demo"
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

describe('Index Page', () => {
  it('renders the main heading and hero section', () => {
    render(
      <Router>
        <I18nextProvider i18n={i18n}>
          <Index />
        </I18nextProvider>
      </Router>
    );
    expect(screen.getByText('Transform every customer into your best promoter')).toBeInTheDocument();
    expect(screen.getByText('Try Free for 30 Days')).toBeInTheDocument();
  });
});
