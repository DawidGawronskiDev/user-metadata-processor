const createUser = (payload) => {
  const { umeta_id, user_id, meta_key, meta_value } = payload;

  const createdUser = {
    umeta_id,
    user_id,
    meta_keys: {
      [meta_key]: meta_value,
    },
  };

  return createdUser;
};

module.exports = createUser;
