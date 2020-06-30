export function TransformPhone(phone: string) {
  const regex = new RegExp(/\D/g);
  return phone.replace(regex, '');
}
