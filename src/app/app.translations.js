angular.module('app').config([
  '$translateProvider',
  function ($translateProvider) {

    $translateProvider.translations('es', {
      DAYS_OF_WEEK: {
        SUNDAY: 'Domingo',
        MONDAY: 'Lunes',
        TUESDAY: 'Martes',
        WEDNESDAY: 'Miércoles',
        THURSDAY: 'Jueves',
        FRIDAY: 'Viernes',
        SATURDAY: 'Sabado'
      },
      HELLO_WBOOKS: '¡Bienvenido a Wbooks!',
      SIGN_UP: 'Registrarse',
      BACK_HOME: 'Volver',
      SUBMIT: 'Enviar',
      USER: {
        NAME: 'Nombre',
        SURNAME: 'Apeliido',
        USERNAME: 'Nombre de usuario',
        MAIL: 'Correo electronico',
        PASSWORD: 'Contraseña',
        CONFIRM_PASSWORD: 'Confirmacion de contraseña',
        BLANK_NAME: 'El nombre no puede quedar en blanco.',
        BLANK_SURNAME: 'El apellido no puede quedar en blanco.',
        BLANK_USERNAME: 'El nombre de usuario no puede quedar en blanco.',
        BLANK_PASSWORD: 'La contraseña no puede quedar en blanco.',
        INVALID_MAIL: 'El correo electronico es invalido.'
      }
    })
    .translations('en', {
      DAYS_OF_WEEK: {
        SUNDAY: 'Sunday',
        MONDAY: 'Monday',
        TUESDAY: 'Tuesday',
        WEDNESDAY: 'Wednesday',
        THURSDAY: 'Thursday',
        FRIDAY: 'Friday',
        SATURDAY: 'Saturday'
      },
      HELLO_WBOOKS: 'Welcome to Wbooks!',
      SIGN_UP: 'Sign up',
      BACK_HOME: 'Back to home',
      SUBMIT: 'Submit',
      USER: {
        NAME: 'First name',
        SURNAME: 'Last name',
        USERNAME: 'User name',
        MAIL: 'Email',
        PASSWORD: 'Password',
        CONFIRM_PASSWORD: 'Confirm password',
        BLANK_NAME: 'The first name can\'t be blank.',
        BLANK_SURNAME: 'The last name can\'t be blank.',
        BLANK_USERNAME: 'The user name can\'t be blank.',
        BLANK_PASSWORD: 'The password can\'t be blank.',
        INVALID_MAIL: 'The email is invalid.'
      }
    });
    $translateProvider.preferredLanguage('es');
    $translateProvider.useSanitizeValueStrategy(null);
  }
]);
