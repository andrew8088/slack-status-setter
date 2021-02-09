const axios = require("axios");
const FormData = require("form-data");

module.exports = async (req, res) => {
  const { query } = req;
  const { state, code } = query;

  if (state !== "andrews-slack-status-setter") {
    console.error("state did not match, aborting");
    res.json({
      success: false,
      payload: null,
      error: "request appears frauduelent",
    });
    return;
  }
  console.log("state matched, continuing");

  const formData = new FormData();
  formData.append("code", code);
  formData.append("client_id", process.env.SLACK_STATUS_SETTER_CLIENT_ID);
  formData.append(
    "client_secret",
    process.env.SLACK_STATUS_SETTER_CLIENT_SECRET
  );

  try {
    console.log("POSTing to slack api (oauth.v2.access)");
    const payload = await axios.post(
      "https://slack.com/api/oauth.v2.access",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );
    console.log("successful response!");
    res.json({ success: true, payload: payload.data });
  } catch (err) {
    console.error(err);
    res.json({ success: false, payload: null, error: err });
  }
};
