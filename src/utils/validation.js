/**
 * Basic form validation utility functions
 */

// Validate email format
export const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Validate phone number (10 digits)
export const isValidPhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(phone);
};

// Validate password strength (min 6 characters)
export const isValidPassword = (password) => {
    return password.length >= 6;
};

// Check required fields
export const checkRequired = (fields) => {
    return fields.every(field => field && field.trim() !== '');
};
