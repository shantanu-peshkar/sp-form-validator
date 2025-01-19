const Validator = require('../src/validator');
const validator = new Validator();

describe('Validator', () => {
  it('should return an error for required fields', () => {
    const data = { name: '' };
    const rules = { name: ['required'] };

    const errors = validator.validateForm(data, rules);

    expect(errors).toHaveProperty('name');
    expect(errors.name).toContain('This field is required.');
  });

  it('should return an error for minimum length', () => {
    const data = { password: '123' };
    const rules = { password: ['required', ['minLength', 6]] };

    const errors = validator.validateForm(data, rules);

    expect(errors).toHaveProperty('password');
    expect(errors.password).toContain('Minimum length is 6.');
  });

  it('should return null for valid data', () => {
    const data = { name: 'John', password: 'password123' };
    const rules = { name: ['required'], password: ['required', ['minLength', 6]] };

    const errors = validator.validateForm(data, rules);

    expect(errors).toBeNull();
  });

  it('should return an error for invalid email format', () => {
    const data = { email: 'invalid-email.com' };
    const rules = { email: ['required', 'email'] };

    const errors = validator.validateForm(data, rules);

    expect(errors).toHaveProperty('email');
    expect(errors.email).toContain('Invalid email format.');
  });

  it('should return null for valid email format', () => {
    const data = { email: 'test@example.com' };
    const rules = { email: ['required', 'email'] };

    const errors = validator.validateForm(data, rules);

    expect(errors).toBeNull();
  });
});
