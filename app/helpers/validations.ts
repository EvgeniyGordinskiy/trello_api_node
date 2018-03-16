export default function emailValidation(email: string) {
  let re = /\S+@\S+\.\S+/;
  let trimmedEmail = email.trim();
  if (!re.test(trimmedEmail) || trimmedEmail.length === 0) {
    return false;
  }
  return true;
}
