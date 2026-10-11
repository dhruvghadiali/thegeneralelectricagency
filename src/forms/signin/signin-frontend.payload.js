import _ from "lodash";

const RESPONSE_FIELDS = {
  token: ["token", "access_token", "accessToken"],
  username: ["user.username", "username", "user_name"],
  email: ["user.email", "email"],
  firstName: [
    "user.first_name",
    "user.firstName",
    "user.employee.first_name",
    "user.employee_details.first_name",
    "user.profile.first_name",
    "employee.first_name",
    "employee_details.first_name",
    "employeeDetails.firstName",
    "first_name",
    "firstName",
  ],
  lastName: [
    "user.last_name",
    "user.lastName",
    "user.employee.last_name",
    "user.employee_details.last_name",
    "user.profile.last_name",
    "employee.last_name",
    "employee_details.last_name",
    "employeeDetails.lastName",
    "last_name",
    "lastName",
  ],
  phone: [
    "user.phone_number",
    "user.mobile_number",
    "user.mobileNumber",
    "user.mobile",
    "user.phone",
    "user.contact_number",
    "user.employee.phone_number",
    "user.employee.mobile_number",
    "user.employee_details.phone_number",
    "user.employee_details.mobile_number",
    "user.profile.phone_number",
    "employee.phone_number",
    "employee.mobile_number",
    "employee_details.phone_number",
    "employee_details.mobile_number",
    "employeeDetails.phoneNumber",
    "employeeDetails.mobileNumber",
    "phone_number",
    "phoneNumber",
    "phone",
    "contact_number",
    "contactNumber",
    "mobile",
    "mobile_number",
    "mobileNumber",
    "mobile_no",
    "mobileNo",
    "phone_no",
    "phoneNo",
  ],
};

export function fromSignInResponse(response = {}) {
  return _.mapValues(RESPONSE_FIELDS, (paths) => {
    const key = _.find(paths, (path) => !_.isNil(_.get(response, path)));
    return _.isUndefined(key) ? null : _.get(response, key);
  });
}
