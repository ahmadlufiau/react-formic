import './App.css';
// import YoutubeForm from './components/YoutubeForm';
// import FormikContainer from './components/FormikContainer'
import LoginForm from './components/LoginForm'
// import RegistrationForm from './components/RegistrationForm'
import EnrollmentForm from './components/EnrollmentForm'
import { theme, ThemeProvider } from '@chakra-ui/react'
import ChakraInput from './components/ChakraInput';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      {/* <YoutubeForm /> */}
      {/* <FormikContainer /> */}
      {/* <RegistrationForm /> */}
      {/* <EnrollmentForm /> */}
      {/* <ChakraInput /> */}
      <LoginForm  />
    </div>
    </ThemeProvider>
  );
}

export default App;