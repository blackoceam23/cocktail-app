import { execSync } from "node:child_process";

function run(command) {
  return execSync(command, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

function safeRun(command) {
  try {
    return run(command);
  } catch {
    return "";
  }
}

function hasGit() {
  return safeRun("git rev-parse --is-inside-work-tree") === "true";
}

function getDiffRange() {
  const baseRef = process.env.GITHUB_BASE_REF;
  if (baseRef) {
    const remoteBase = `origin/${baseRef}`;
    const mergeBase = safeRun(`git merge-base HEAD ${remoteBase}`);
    if (mergeBase) {
      return `${mergeBase}..HEAD`;
    }
  }

  const hasParent = safeRun("git rev-parse --verify HEAD~1");
  if (hasParent) {
    return "HEAD~1..HEAD";
  }

  return "";
}

function listChangedFiles(range) {
  const output = safeRun(`git diff --name-only ${range}`);
  return output ? output.split("\n").filter(Boolean) : [];
}

const markdownPattern = /\.md$/i;
const highSignalPatterns = [
  /^package\.json$/,
  /^package-lock\.json$/,
  /^pnpm-lock\.yaml$/,
  /^yarn\.lock$/,
  /^vite\.config\./,
  /^src\/App\.(js|jsx|ts|tsx)$/,
  /^src\/components\//,
  /^src\/data\//,
  /^src\/lib\//,
  /^index\.html$/,
  /^netlify\.toml$/,
  /^\.github\/workflows\//,
];

if (!hasGit()) {
  console.log("docs:check skipped (not a git repository).");
  process.exit(0);
}

const diffRange = getDiffRange();
if (!diffRange) {
  console.log("docs:check skipped (no comparable commit range yet).");
  process.exit(0);
}

const changedFiles = listChangedFiles(diffRange);
if (!changedFiles.length) {
  console.log(`docs:check passed (no changed files in ${diffRange}).`);
  process.exit(0);
}

const hasHighSignalChanges = changedFiles.some((file) =>
  highSignalPatterns.some((pattern) => pattern.test(file)),
);
const hasMarkdownChanges = changedFiles.some((file) => markdownPattern.test(file));

if (hasHighSignalChanges && !hasMarkdownChanges) {
  console.error("docs:check failed.");
  console.error("High-signal code/config changes were detected without markdown updates.");
  console.error("Changed files:");
  changedFiles.forEach((file) => console.error(`- ${file}`));
  console.error(
    "Add or update docs (for example README.md or docs/*.md), or include a PR note explaining why docs are unchanged.",
  );
  process.exit(1);
}

console.log("docs:check passed.");
