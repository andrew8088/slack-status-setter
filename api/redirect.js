const axios = require("axios");
const FormData = require("form-data");

module.exports = async (req, res) => {
  const { query } = req;
  const { state, code } = query;

  if (state !== "andrews-slack-status-setter") {
    res.json({
      success: false,
      payload: null,
      error: "request appears frauduelent",
    });
    return;
  }

  const formData = new FormData();
  formData.append("code", code);
  formData.append("client_id", process.env.SLACK_STATUS_SETTER_CLIENT_ID);
  formData.append(
    "client_secret",
    process.env.SLACK_STATUS_SETTER_CLIENT_SECRET
  );

  try {
    const res = await axios.post("http://localhost:3000/upload", formData, {
      headers: formData.getHeaders(),
    });
    res.json({ success: true, payload: res });
  } catch (err) {
    res.json({ success: false, payload: null, error: err });
  }
};
