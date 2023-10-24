export function breakParagraphWithEllipsis(
  text,
  maxLineLength = 45,
  maxLines = 2
) {
  const lines = [];
  let remainingText = text;

  for (let i = 0; i < maxLines; i++) {
    if (remainingText.length <= maxLineLength) {
      lines.push(remainingText);
      break;
    }

    const line = remainingText.slice(0, maxLineLength);

    // Check if there is a space at the end of the line to avoid breaking words
    const lastSpaceIndex = line.lastIndexOf(" ");
    if (lastSpaceIndex > 0) {
      lines.push(line.slice(0, lastSpaceIndex));
      remainingText = remainingText.slice(lastSpaceIndex + 1);
    } else {
      lines.push(line);
      remainingText = remainingText.slice(maxLineLength);
    }
  }

  if (remainingText.length > 0) {
    lines[maxLines - 1] += " ..."; // Add ellipsis to the last line
  }

  return lines.join("\n");
}

//   const longText = "This is a long paragraph that needs to be split into multiple lines to avoid breaking words. It should be broken into lines of 150 characters each and an ellipsis should be added at the end.";

//   const result = breakParagraphWithEllipsis(longText, 150, 3);
//   console.log(result);
