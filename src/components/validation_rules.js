// validate field existence
// return null if valid, return error message if invalid
export function validateExistence(str) {
  if (!str.trim()) {
    return 'required'
  } else {
    return null;
  }
}

// validate email format
// return null if valid, return error message if invalid
export function validateEmailFormat(str) {
  // format regular expression
  var regex = /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i;
  if (!regex.test(str)) {
    return 'invalid email format';
  } else {
    return null;
  }
}

//  validate at least one upper-case letter
//  return null if valid, return error message if invalid
export function validateUpperCaseLetter(str) {
  var regex = /^(?=.*[A-Z]).+$/i;
  if(!regex.test(str)) {
    return 'should contain at least one upper-case letter';
  } else {
    return null;
  }
}

//  validate at least one lower-case letter
//  return null if valid, return error message if invalid
export function validateLowerCaseLetter(str) {
  var regex = /^(?=.*[a-z]).+$/i;
  if(!regex.test(str)) {
    return 'should contain at least one lower-case letter';
  } else {
    return null;
  }
}

// validate string minimum length
// return null if valid, return error message if invalid
export function validateMinLength(str, min) {
  if (str.length < min) {
    return 'minimum length is ' + min;
  } else {
    return 
  }
}

// validate string maximum length
// return null if valid, return error message if invalid
export function validateMaxLength(str, max) {
  if (str.length > max) {
    return 'maximum length is ' + max;
  } else {
    return null;
  }
}
