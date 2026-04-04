/**
 * Simple GitHub-style Code Blocks with Line Numbers
 */
document.addEventListener("DOMContentLoaded", function () {
  // Process each code block
  document.querySelectorAll(".code-block-wrapper").forEach(function (wrapper) {
    const preElement = wrapper.querySelector("pre");
    if (!preElement) return;

    const codeElement = preElement.querySelector("code");
    if (!codeElement) return;

    // Get code content and remove whitespace-only lines at start/end
    const rawContent = codeElement.textContent.trim();

    // Store original content for copy functionality
    const originalContent = rawContent;

    // Split into lines
    const lines = rawContent.split("\n");

    // Create container for the code display
    const codeContainer = document.createElement("div");
    codeContainer.className = "code-container";

    // Create line numbers column
    const lineNumbersDiv = document.createElement("div");
    lineNumbersDiv.className = "line-numbers";

    // Create code lines column
    const codeLinesDiv = document.createElement("div");
    codeLinesDiv.className = "code-lines";

    // Process each line
    lines.forEach(function (line, i) {
      // Add line number
      const lineNumber = document.createElement("div");
      lineNumber.className = "line-number";
      lineNumber.textContent = (i + 1).toString();
      lineNumbersDiv.appendChild(lineNumber);

      // Process code line
      const codeLine = document.createElement("div");
      codeLine.className = "line-content";

      // Create highlighted HTML for this line
      const highlightedLine = highlightSyntax(line);
      codeLine.innerHTML = highlightedLine;

      codeLinesDiv.appendChild(codeLine);
    });

    // Replace the original code element with our enhanced version
    codeContainer.appendChild(lineNumbersDiv);
    codeContainer.appendChild(codeLinesDiv);

    // Clear and replace content
    codeElement.innerHTML = "";
    codeElement.appendChild(codeContainer);

    // Add copy button functionality
    if (wrapper.querySelector(".code-header")) {
      const copyButton = wrapper.querySelector(".copy-button");
      if (copyButton) {
        copyButton.addEventListener("click", function () {
          copyToClipboard(originalContent, copyButton);
        });
      }
    }
  });
});

/**
 * Safely highlight syntax for a line of code
 */
function highlightSyntax(line) {
  // If line is empty or just whitespace, return a non-breaking space
  if (!line || line.trim() === "") {
    return "&nbsp;";
  }

  // Escape HTML to prevent XSS and rendering issues
  let escapedLine = line
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  // Comments - handle first (must process before other syntax elements)
  if (escapedLine.includes("//")) {
    const commentIndex = escapedLine.indexOf("//");
    const beforeComment = escapedLine.substring(0, commentIndex);
    const comment = escapedLine.substring(commentIndex);

    // Process the part before the comment with other syntax highlighting
    return (
      highlightCodePart(beforeComment) +
      '<span class="comment">' +
      comment +
      "</span>"
    );
  } else {
    // No comment, apply normal highlighting
    return highlightCodePart(escapedLine);
  }
}

/**
 * Apply syntax highlighting to a part of code (excluding comments)
 */
function highlightCodePart(text) {
  if (!text) return "";

  // Define Java keywords
  const keywords = [
    "public",
    "private",
    "protected",
    "static",
    "final",
    "void",
    "class",
    "interface",
    "extends",
    "implements",
    "abstract",
    "new",
    "return",
    "if",
    "else",
    "for",
    "while",
    "do",
    "switch",
    "case",
    "break",
    "continue",
    "try",
    "catch",
    "finally",
    "throw",
    "throws",
    "import",
    "package",
    "enum",
    "null",
    "true",
    "false",
    "this",
    "super",
  ];

  // Create a temporary container to help with parsing
  const tempDiv = document.createElement("div");

  // Handle strings first
  let result = text.replace(/"([^"]*)"/g, '<span class="string">"$1"</span>');

  // Build a single regex for all keywords for better performance
  const keywordPattern = "\\b(" + keywords.join("|") + ")\\b";
  const keywordRegex = new RegExp(keywordPattern, "g");

  // Apply keyword highlighting
  result = result.replace(keywordRegex, '<span class="keyword">$1</span>');

  // Handle class names (uppercase first letter)
  result = result.replace(
    /\b([A-Z][a-zA-Z0-9_]*)\b/g,
    function (match, className) {
      // Check if it's already inside a span
      tempDiv.innerHTML = match;
      if (tempDiv.querySelector("span")) return match;
      return '<span class="class-name">' + className + "</span>";
    },
  );

  // Function calls
  result = result.replace(
    /\b([a-zA-Z][a-zA-Z0-9_]*)\s*\(/g,
    function (match, funcName) {
      // Skip if this is a keyword
      if (keywords.includes(funcName)) {
        return match;
      }

      // Check if already wrapped in a span
      tempDiv.innerHTML = funcName;
      if (tempDiv.querySelector("span")) return match;

      return '<span class="function">' + funcName + "</span>(";
    },
  );

  // Numbers
  result = result.replace(/\b(\d+)\b/g, function (match) {
    tempDiv.innerHTML = match;
    if (tempDiv.querySelector("span")) return match;
    return '<span class="number">' + match + "</span>";
  });

  return result;
}

/**
 * Copy text to clipboard with user feedback
 */
function copyToClipboard(text, button) {
  // Clean the text
  const cleanText = text.trim();

  navigator.clipboard.writeText(cleanText).then(
    function () {
      // Success feedback
      const originalText = button.innerHTML;
      button.innerHTML = '<i class="fas fa-check"></i> Copied!';
      button.classList.add("copy-success");

      // Restore original button text after 1.5 seconds
      setTimeout(function () {
        button.innerHTML = originalText;
        button.classList.remove("copy-success");
      }, 1500);
    },
    function () {
      // Error feedback
      const originalText = button.innerHTML;
      button.innerHTML = '<i class="fas fa-times"></i> Failed';
      button.classList.add("copy-error");

      // Restore original button text after 1.5 seconds
      setTimeout(function () {
        button.innerHTML = originalText;
        button.classList.remove("copy-error");
      }, 1500);

      // Fallback method for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = cleanText;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand("copy");
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.classList.add("copy-success");
      } catch (err) {
        console.error("Failed to copy: ", err);
      }

      document.body.removeChild(textarea);
    },
  );
}
