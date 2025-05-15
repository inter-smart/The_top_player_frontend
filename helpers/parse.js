import { parse } from "node-html-parser";
const htmlParser = (htmlData) => {
  // Parse the HTML string
  const doc = parse(htmlData);

  // Initialize an empty array to store the formatted data
  const formattedData = [];

  // Iterate over paragraphs and ordered lists
  let currentKey = "";
  doc.querySelectorAll("p, ol").forEach((element) => {
    if (element.tagName === "P") {
      currentKey = element.textContent.trim();
    } else if (element.tagName === "OL") {
      const listItems = Array.from(element.querySelectorAll("li")).map((li) =>
        li.textContent.trim()
      );
      // Push an object with title and values into the formattedData array
      formattedData.push({ title: currentKey, values: listItems });
    }
  });


  return formattedData;
};

export default htmlParser;
