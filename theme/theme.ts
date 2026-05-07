import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#081437',
    },
    secondary: {
      main: '#334155',
    },
  },

  shape: {
    borderRadius: 10,
  },

  typography: {
    fontFamily: 'Roboto, sans-serif',
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          padding: '1rem',
          boxShadow: 'none',
          border: '1px solid #e5e7eb',
        },
      },
    },
  },
});