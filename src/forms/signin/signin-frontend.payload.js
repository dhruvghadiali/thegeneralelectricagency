import _ from "lodash";

const RESPONSE_FIELDS = {
  token: ["token", "access_token", "accessToken"],
  username: ["user.username", "username", "user_name"],
  email: ["user.email", "email"],
};

export function fromSignInResponse(response = {}) {
  return _.mapValues(RESPONSE_FIELDS, (paths) => {
    const key = _.find(paths, (path) => !_.isNil(_.get(response, path)));
    return _.isUndefined(key) ? null : _.get(response, key);
  });
}
