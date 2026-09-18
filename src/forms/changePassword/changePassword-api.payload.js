export function toChangePasswordPayload(values) {
  return {
    current_password: values.currentPassword,
    new_password: values.newPassword,
  };
}
