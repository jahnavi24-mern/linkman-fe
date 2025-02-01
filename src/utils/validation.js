export const validateName = (name) => {
    return name.length >= 6 || "Name must be at least 6 characters long.";
  };
  
  export const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile) || "Mobile number must be exactly 10 digits.";
  };
  
  export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password) || "Password must be at least 8 characters, with a special character and a number.";
  };
  
  export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) || "Please enter a valid email.";
  };
  