#!/usr/bin/env node
/**
 * promptfoo eval pre-processor
 * file:// 参照されたプロンプトファイルを事前に読み込み、インライン展開した一時設定ファイルを生成する
 *
 * Usage: node scripts/prepare-eval.js <config-file>
 * Output: <config-file>-resolved.yaml（元のパス + -resolved サフィックス）
 */

import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const configFile = process.argv[2];
if (!configFile) {
  console.error("Usage: node scripts/prepare-eval.js <config-file>");
  process.exit(1);
}

const configDir = path.dirname(path.resolve(configFile));
const config = yaml.load(fs.readFileSync(configFile, "utf8"));

function resolvePrompt(prompt) {
  if (typeof prompt !== "string" || !prompt.startsWith("file://")) return prompt;

  const filePath = path.resolve(configDir, prompt.slice(7));
  const ext = path.extname(filePath);

  if (ext === ".txt" || ext === ".md") {
    return fs.readFileSync(filePath, "utf8").trim();
  }
  if (ext === ".yaml" || ext === ".json" || ext === ".yml") {
    return yaml.load(fs.readFileSync(filePath, "utf8"));
  }
  throw new Error(`Unsupported file type: ${filePath}`);
}

function resolveAllPrompts(node) {
  if (!node || typeof node !== "object") return node;

  if (Array.isArray(node)) {
    return node.map(resolveAllPrompts);
  }

  const resolved = {};
  for (const [key, value] of Object.entries(node)) {
    if (key === "prompts" && Array.isArray(value)) {
      resolved[key] = value.map(resolvePrompt);
    } else if (typeof value === "object" && value !== null) {
      resolved[key] = resolveAllPrompts(value);
    } else {
      resolved[key] = value;
    }
  }
  return resolved;
}

const resolvedConfig = resolveAllPrompts(config);
const outputFile = configFile.replace(/\.ya?ml$/, "-resolved.yaml");

fs.writeFileSync(outputFile, yaml.dump(resolvedConfig, { lineWidth: -1 }));
console.log(`Resolved: ${configFile} → ${outputFile}`);
