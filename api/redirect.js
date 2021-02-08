module.exports = async (req, res) => {
  const { body, query } = req;
  console.log(query);
  console.log(body);

  res.json({ test: true });
};
