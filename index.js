const puppeteer = require("puppeteer-core");
let count = 1;
async function fire() {
  // Set the path to your browser executable (Chrome or Chromium)
  const browser = await puppeteer.launch({
    // executablePath:
    //   "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", // Replace this with the path to your Chrome or Chromium executable
    // userDataDir:
    //   "C:\\Users\\Miftachul\\AppData\\Local\\Microsoft\\Edge\\User Data",
    executablePath: "/usr/bin/chromium-browser",
    userDataDir: "/home/miftachul/.config/chromium",
    headless: true, // Set to true if you don't need to see the browser UI
  });

  const page = await browser.newPage();

  // Go to the URL
  await page.goto(
    "https://www.tokopedia.com/rewards/kupon/detail/KK01JUNB",
    {}
  );
  await processPage();
  async function processPage() {
    const buttonSelector = '[data-unify="Button"]';
    const button = await page.waitForSelector(buttonSelector);
    if (button) {
      const text = await button.$eval("span", (element) => element.innerText);
      if (text == "Klaim") {
        await button.click();
        console.log("clicked klaim");
        await page.screenshot({ path: `${count}.png` });
        count++;
      } else {
        console.log("reloading");
        page.reload();
        await processPage();
      }
    } else {
      console.log("button not found reloading");
      page.reload();
      await processPage();
    }
  }

  page.reload();
  await processPage();
}
fire();
