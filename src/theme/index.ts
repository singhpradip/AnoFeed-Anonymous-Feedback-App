import { createTheme, type ThemeOptions } from '@mui/material/styles';
import { 
  primary, 
  secondary, 
  text, 
  error, 
  info, 
  warning, 
  success, 
  background, 
  grey,
  action,
  common,
  divider
} from '../assets/colors';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: primary.main,
      dark: primary.dark,
      light: primary.light,
      contrastText: primary.contrastText,
    },
    secondary: {
      main: secondary.main,
      dark: secondary.dark,
      light: secondary.light,
      contrastText: secondary.contrastText,
    },
    error: {
      main: error.main,
      light: error.light,
      dark: error.dark,
      contrastText: error.contrastText,
    },
    warning: {
      main: warning.main,
      light: warning.light,
      dark: warning.dark,
      contrastText: warning.contrastText,
    },
    info: {
      main: info.main,
      light: info.light,
      dark: info.dark,
      contrastText: info.contrastText,
    },
    success: {
      main: success.main,
      light: success.light,
      dark: success.dark,
      contrastText: success.contrastText,
    },
    text: {
      primary: text.primary,
      secondary: text.secondary,
      disabled: text.disabled,
    },
    background: {
      default: background.default,
      paper: background.paper,
    },
    grey: {
      50: grey.g50,
      100: grey.g100,
      200: grey.g200,
      300: grey.g300,
      400: grey.g400,
      500: grey.g500,
      600: grey.g600,
      700: grey.g700,
      800: grey.g800,
      900: grey.g900,
      A100: grey.A100,
      A200: grey.A200,
      A400: grey.A400,
      A700: grey.A700,
    },
    action: {
      active: action.active,
      hover: action.hover,
      selected: action.selected,
      disabled: action.disabled,
      disabledBackground: action.disabledBackground,
      focus: action.focus,
    },
    common: {
      black: common.black,
      white: common.white,
    },
    divider: divider,
  },
  // typography: {
  //   fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  //   h1: {
  //     fontWeight: 700,
  //     fontSize: '2.5rem',
  //     lineHeight: 1.2,
  //   },
  //   h2: {
  //     fontWeight: 700,
  //     fontSize: '2rem',
  //     lineHeight: 1.3,
  //   },
  //   h3: {
  //     fontWeight: 600,
  //     fontSize: '1.75rem',
  //     lineHeight: 1.3,
  //   },
  //   h4: {
  //     fontWeight: 600,
  //     fontSize: '1.5rem',
  //     lineHeight: 1.4,
  //   },
  //   h5: {
  //     fontWeight: 600,
  //     fontSize: '1.25rem',
  //     lineHeight: 1.4,
  //   },
  //   h6: {
  //     fontWeight: 600,
  //     fontSize: '1.125rem',
  //     lineHeight: 1.4,
  //   },
  //   body1: {
  //     fontSize: '1rem',
  //     lineHeight: 1.5,
  //   },
  //   body2: {
  //     fontSize: '0.875rem',
  //     lineHeight: 1.5,
  //   },
  //   button: {
  //     fontWeight: 600,
  //     textTransform: 'none',
  //   },
  // },
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         textTransform: 'none',
  //         fontWeight: 600,
  //         borderRadius: 8,
  //         padding: '10px 24px',
  //         minHeight: 44,
  //         boxShadow: 'none',
  //         '&:hover': {
  //           boxShadow: '0 2px 8px rgba(20, 54, 102, 0.15)',
  //         },
  //       },
  //       outlined: {
  //         borderWidth: 2,
  //         '&:hover': {
  //           borderWidth: 2,
  //         },
  //       },
  //     },
  //   },
  //   MuiTextField: {
  //     styleOverrides: {
  //       root: {
  //         '& .MuiOutlinedInput-root': {
  //           borderRadius: 8,
  //           backgroundColor: '#FFFFFF',
  //           '& fieldset': {
  //             borderWidth: 1,
  //           },
  //           '&.Mui-focused fieldset': {
  //             borderWidth: 2,
  //           },
  //         },
  //         '& .MuiInputBase-input': {
  //           padding: '12px 14px',
  //         },
  //         '& .MuiFormHelperText-root': {
  //           marginLeft: 0,
  //           marginTop: 8,
  //         },
  //       },
  //     },
  //   },
  //   MuiCard: {
  //     styleOverrides: {
  //       root: {
  //         borderRadius: 12,
  //         boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
  //         border: '1px solid rgba(224, 224, 224, 1)',
  //         '&:hover': {
  //           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  //           transform: 'translateY(-1px)',
  //         },
  //         transition: 'all 0.2s ease-in-out',
  //       },
  //     },
  //   },
  //   MuiChip: {
  //     styleOverrides: {
  //       root: {
  //         borderRadius: 16,
  //         fontWeight: 500,
  //       },
  //     },
  //   },
  //   MuiPaper: {
  //     styleOverrides: {
  //       root: {
  //         borderRadius: 8,
  //       },
  //       elevation1: {
  //         boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  //       },
  //     },
  //   },
  // },
  // shape: {
  //   borderRadius: 8,
  // },
  // spacing: 8,
};

export const theme = createTheme(themeOptions); 