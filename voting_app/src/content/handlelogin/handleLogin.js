import generateOTP from "./genOTP";

const handleLogin = async (info) => {
    await startFlow(info);   
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const startFlow = async (info) => {
  let retry = 0;
  const maxRetry = 20;

  while (retry < maxRetry) {
    const done = await navigate(info);

    if (done) break;

    retry++;
    await sleep(2000);
  }

  console.log("End flow");
};

const navigate = async (info) => {
  const url = window.location.href;
  if (url.startsWith("https://vote.theamas.com/")) {
    return true;
  }

  try {
    if (url.includes("signin/identifier")) {
      await inputEmail(info.email);

    } else if (url.includes("challenge/pwd")) {
      await inputPassword(info.password);

    } else if (url.includes("challenge/totp")) {
      await inputOTP(info.code);

    } else {
      console.log("Unknown step: retry after 2s");
    }

  } catch (err) {
    console.log("Error:", err);
  }
  return false;
};


const inputEmail = async (mail) => {
    const input = await findElementWithRetry('#identifierId');
    if (input) {
        input.value = mail;
    }
    const submit = await findElementWithRetry('#identifierNext');
    if (submit) {
        submit.click();
    }
}

const inputPassword = async (password) => {
    const input = await findElementWithRetry('input[name="Passwd"]');
    if (input) {
        input.value = password;
    }
    const submit = await findElementWithRetry('#passwordNext');
    if (submit) {
        submit.click();
    }
}

const inputOTP = async (code) => {
    console.log("Generating OTP...");
    const otp = await generateOTP(code);
    console.log("OTP:", otp);
    const input = await findElementWithRetry('#totpPin');
    if (input) {
        input.value = otp;
    }
    const submit = await findElementWithRetry('#totpNext');
    if (submit) {
        submit.click();
    }

}



async function findElementWithRetry(selector, retries = 10, interval = 1000) {
  for (let i = 0; i < retries; i++) {
    const element = document.querySelector(selector);
    
    if (element) {
      console.log(`✅ Đã tìm thấy ${selector} sau ${i + 1} lần thử.`);
      return element;
    }

    console.log(`🔄 Lần thử ${i + 1}: Không tìm thấy ${selector}, đang thử lại...`);
    
    // Đợi một khoảng thời gian trước khi thử lại
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  
  console.error(`Đã thử ${retries} lần nhưng vẫn không tìm thấy: ${selector}`);
  return null;
}

export default handleLogin;