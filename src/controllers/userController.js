export const getUser = async (req, res) => {
  const { user } = res.locals;

  return res.send("ok");
};
