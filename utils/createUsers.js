const createUser = require("./createUser");

const createUsers = (lines) => {
  const users = lines.reduce((acc, cur) => {
    const existingUser = acc.find((user) => user.user_id === cur.user_id);
    const existingUserIndex = acc.indexOf(existingUser);

    if (!existingUser) {
      acc.push(createUser(cur));
    } else {
      acc[existingUserIndex].meta_keys[cur.meta_key] = cur.meta_value;
    }

    return acc;
  }, []);

  return users;
};

module.exports = createUsers;
