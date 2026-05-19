import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#081437',
    },
    secondary: {
      main: '#334155',
    },
    text: {
      primary: '#191c1e',
      secondary: '#45464e',
    },
    divider: '#cbd5e1',
    background: {
      paper: '#ffffff',
      default: '#f3f3f3',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: 'var(--font-fira-sans)',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },

    MuiOutlinedInput: {
      defaultProps:{
        size: 'medium'
      },
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#191c1e',

          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#606a77',
          },

          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#081437',
          },

          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#081437',
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#64748b',
          backgroundColor: '#FFFFFF',

          '&.Mui-focused': {
            color: '#081437',
            backgroundColor: '#FFFFFF'
          },
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root:{
          cursor: 'pointer'
        },
        head:{
          cursor: 'auto'
        }
      }
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#191c1e',
          borderColor: '#e2e8f0',
        },
        head: {
          fontWeight: 'bold'
        }
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});