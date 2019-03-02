'use strict';

const User = use('App/Models/User');
const { validate } = use('Validator');

class UserController {
  // Get user by id with auth
  async self({ auth }) {
    try {
      const data = await auth.getUser();
      if (data) {
        return User.query()
          .where('id', data.id)
          .fetch();
      }
    } catch (error) {
      return error;
    }
  }

  // Request login/signup user
  async signin({ request, auth, response }) {
    const rules = {
      email: 'required',
      password: 'required'
    };

    const messages = {
      'email.required': 'Email is required',
      'password.required': 'Password is required'
    };

    const validation = await validate(request.all(), rules, messages);

    if (validation.fails()) {
      return response
        .status(400)
        .json({ message: validation._errorMessages[0].message });
    }

    const { email, password } = request.post();

    try {
      const validate = await auth.attempt(email, password);

      return {
        message: 'Login Success',
        token: validate.token
      };
    } catch (error) {
      return { error: 'User not found' };
    }
  }

  // Request user register / signin
  async signup({ request, response, auth }) {
    const rules = {
      username: 'required',
      email: 'required|email|unique:users',
      password: 'required'
    };

    const messages = {
      'username.required': 'Username is required',
      'email.required': 'Email is required',
      'email.email': 'Email not valid',
      'email.unique': 'Email already register',
      'password.required': 'Password is required'
    };

    const validation = await validate(request.all(), rules, messages);

    if (validation.fails()) {
      return response
        .status(400)
        .json({ message: validation._errorMessages[0].message });
    }

    try {
      return auth.generate(await User.create(request.all()));
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserController;
