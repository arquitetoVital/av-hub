import { createTheme } from '@mui/material/styles';

export const getMuiTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main:
        mode === 'dark'
          ? '#081437'
          : '#081437',
    },
    secondary: {
      main:
        mode === 'dark'
          ? '#334155'
          : '#334155',
    },
    background: {
      default:
        mode === 'dark'
          ? '#f3f3f3'
          : '#f3f3f3',

      paper:
        mode === 'dark'
          ? '#101424'
          : '#ffffff',
    },

    text: {
      primary:
        mode === 'dark'
          ? 'var(--foreground)'
          : 'var(--foreground)',

      secondary:
        mode === 'dark'
          ? '#45464e'
          : '#45464e',
    },

    divider:
      mode === 'dark'
        ? '#45464e'
        : '#45464e',
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

          border:
            mode === 'dark'
              ? '1px solid #334155'
              : '1px solid #e5e7eb',

          backgroundColor:
            mode === 'dark'
              ? '#101424'
              : '#ffffff',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color:
            mode === 'dark'
              ? '#191c1e'
              : '#191c1e',

          '& fieldset': {
            borderColor:
              mode === 'dark'
                ? '#334155'
                : '#cbd5e1',
          },

          '&:hover fieldset': {
            borderColor:
              mode === 'dark'
                ? '#475569'
                : '#94a3b8',
          },

          '&.Mui-focused fieldset': {
            borderColor: '#081437',
            borderWidth: '1px',
          },
        },
        input: {
          color:
            mode === 'dark'
              ? '#191c1e'
              : '#191c1e',
        },
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color:
            mode === 'dark'
              ? 'var(--primary)'
              : 'var(--primary)',
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color:
            mode === 'dark'
              ? 'var(--primary)'
              : 'var(--primary)',
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: '#191c1e',

          '& .MuiOutlinedInput-notchedOutline': {
            borderColor:
              mode === 'dark'
                ? 'var(--tertiary)'
                : '#cbd5e1',
          },

          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor:
              mode === 'dark'
                ? 'var(--primary)'
                : '#94a3b8',
          },

          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#081437',
            borderWidth: '1px',
          },
        },

        input: {
          color: '#191c1e',
        },
      },
    },
  },
});