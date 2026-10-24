const fs = require('fs');
const path = 'C:/Users/Acer/.gemini/antigravity-ide/brain/ea0840ee-32ee-4fea-95c4-5468dbd732cb/.system_generated/logs/transcript.jsonl';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

for (const l of lines) {
  if (l.includes('"step_index":509')) {
    const obj = JSON.parse(l);
    console.log(JSON.stringify(obj.tool_calls, null, 2));
    break;
  }
}
