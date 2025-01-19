class Validator {
    validateField(value, rules) {
      const errors = [];
  
      for (const rule of rules) {
        if (rule === 'required' && !value) {
          errors.push('This field is required.');
        } else if (Array.isArray(rule) && rule[0] === 'minLength') {
          const [_, minLength] = rule;
          if (value.length < minLength) {
            errors.push(`Minimum length is ${minLength}.`);
          }
        } else if (rule === 'email') {
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          if (!emailRegex.test(value)) {
            errors.push('Invalid email format.');
          }
        }
        // Add more rules as needed
      }
  
      return errors.length ? errors : null;
    }
  
    validateForm(data, rules) {
      const errors = {};
  
      for (const field in rules) {
        const fieldErrors = this.validateField(data[field], rules[field]);
        if (fieldErrors) {
          errors[field] = fieldErrors;
        }
      }
  
      return Object.keys(errors).length ? errors : null;
    }
  }
  
  module.exports = Validator;
  