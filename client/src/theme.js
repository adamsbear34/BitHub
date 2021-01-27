import { createMuiTheme }  from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
      primary: {
          main: "#212121",
          light: "#484848",
          dark: "#000000"
      },
      secondary: {
          main: "#ff616f",
          light: "#ff949d",
          dark: "#c62a44"
      }
    },
  })



export default theme;