function parseTitle(text) {
    const result = [];
    let lastIndex = 0;
    let key = 0;
    // This regex matches either '/n' for a line break or '/s...\\s' for span-wrapped text.
    // It captures the content inside the span in group 1.
    const regex = /\/n|\/s(.*?)\\s/g;
    let match;
  
    while ((match = regex.exec(text)) !== null) {
      // Append any text before the token
      if (match.index > lastIndex) {
        result.push(text.substring(lastIndex, match.index));
      }
      // Check which token was matched
      if (match[0] === '/n') {
        result.push(<br key={key++} />);
      } else if (match[1] !== undefined) {
        // Wrap the captured text with a span
        result.push(<span key={key++}>{match[1]}</span>);
      }
      lastIndex = regex.lastIndex;
    }
    // Append any remaining text after the last token
    if (lastIndex < text.length) {
      result.push(text.substring(lastIndex));
    }
    return result;
  }


  export default parseTitle;