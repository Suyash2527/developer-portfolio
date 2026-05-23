const fs = require("fs");
const path = require("path");

const colors = [
  { hex: "#0f0f0f", bg: "var(--ink)", text: "var(--ink)", border: "var(--border-color)" },
  { hex: "#f5f0e8", bg: "var(--bg)", text: "var(--bg)", border: "var(--bg)" },
  { hex: "#dd4433", bg: "var(--red)", text: "var(--red)", border: "var(--red)" },
  { hex: "#888888", bg: "var(--muted)", text: "var(--muted)", border: "var(--muted)" },
  { hex: "#f0d43a", bg: "var(--yellow)", text: "var(--yellow)", border: "var(--yellow)" }
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith(".tsx")) {
      let content = fs.readFileSync(fullPath, "utf8");
      let originalContent = content;
      
      for (const color of colors) {
        // e.g. text-[#0f0f0f] -> text-[var(--ink)]
        content = content.replace(new RegExp(`text-\\[${color.hex}\\]`, "g"), `text-[${color.text}]`);
        // bg-[#0f0f0f] -> bg-[var(--ink)]
        content = content.replace(new RegExp(`bg-\\[${color.hex}\\]`, "g"), `bg-[${color.bg}]`);
        // border-[#0f0f0f] -> border-[var(--border-color)]
        content = content.replace(new RegExp(`border-\\[${color.hex}\\]`, "g"), `border-[${color.border}]`);
        
        // Also cover hover states and opacity modifiers if needed, but in tailwind they are hover:bg-[#...], so the regex bg-\[...\] handles it because it matches the class suffix!
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, "utf8");
        console.log("Updated", fullPath);
      }
    }
  }
}

processDir(path.join(__dirname, "src"));
console.log("Done.");
