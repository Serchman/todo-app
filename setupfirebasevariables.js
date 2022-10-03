const fs = require("fs");

const envPath = "src/environments";
const devEnv = "environment.ts";
const prodEnv = "environment.prod.ts";

const firebaseConfig = `${process.env.FIREBASECONFIG}`;

fs.access(envPath, fs.constants.F_OK, (noParam) => {
  if (noParam) {
    fs.mkdirSync(envPath, { recursive: true }, (err) => {
      if (err) throw err;
    });
  }

  try {
    fs.writeFileSync(`${envPath}/${devEnv}`, firebaseConfig);
    fs.writeFileSync(`${envPath}/${prodEnv}`, firebaseConfig);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
