const sortUsers = (users) => {
  const sortedUsers = users.sort((a, b) => b - a);

  return sortedUsers;
};

module.exports = sortUsers;
