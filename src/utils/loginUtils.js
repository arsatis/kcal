export function padUserDetails(name, password) {
  const re = /\S+@\S+\.\S\S+/;
  if (!re.test(name)) {
    name += '@kcal.kcal';
  }
  if (password.length < 6) {
    password += '@kcal';
  }
  return [name, password];
}
