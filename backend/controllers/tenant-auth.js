const registerTenant = (req, res) => {
  try {
    const { name, email, password } = req.body;
  } catch (e) {
    console.error("Error while registering tenant.", e);
  }
};

const loginTenant = (req, res) => {
  try {
  } catch (e) {
    console.error("");
  }
};

export { registerTenant, loginTenant };
