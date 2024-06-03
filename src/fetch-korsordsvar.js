import fs from "fs";
import { join } from "path";

import axios from "axios";

const DATA_PATH = "./data";
const PATH = `${DATA_PATH}/korsordsvar`;

const dateToString = (d) => d.toISOString().slice(0, 10);

async function fetch() {
  const dateToday = dateToString(new Date());
  let resHtml;

    const urlHtml = `https://www.korsordsvar.com/dagens`;
    resHtml = await axios.get(urlHtml);
    if (resHtml.status !== 200) {
      console.log(`Failed to fetch puzzle`);
      return;
    }
    const path = `${PATH}/${dateToday}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    fs.writeFileSync(join(path, "index.html"), resHtml.data, "utf-8");
}

await fetch();
