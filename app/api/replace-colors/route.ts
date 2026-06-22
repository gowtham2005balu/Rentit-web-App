import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

function walk(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.next')) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.module.css')) {
      results.push(file);
    }
  });
  return results;
}

export async function GET() {
  try {
    const files = walk(process.cwd());
    const updated: string[] = [];

    files.forEach(f => {
      let content = fs.readFileSync(f, 'utf8');
      let lines = content.split('\n');
      let insideButton = false;
      let changed = false;

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // check if entering a block
        if (line.includes('{')) {
          const lower = line.toLowerCase();
          if (lower.includes('btn') || lower.includes('button') || lower.includes('submit')) {
            insideButton = true;
          }
        }
        
        if (insideButton) {
          const lowerLine = line.toLowerCase();
          if (lowerLine.includes('#f59e0b')) {
            lines[i] = line.replace(/#f59e0b/ig, '#2F4253');
            changed = true;
          }
          if (lowerLine.includes('#d97706')) {
            lines[i] = line.replace(/#d97706/ig, '#1a2630');
            changed = true;
          }
          if (lowerLine.includes('#ff7b00')) {
            lines[i] = line.replace(/#ff7b00/ig, '#2F4253');
            changed = true;
          }
          if (lowerLine.includes('#e66a00')) {
            lines[i] = line.replace(/#e66a00/ig, '#1a2630');
            changed = true;
          }
        }
        
        // check if exiting a block
        if (line.includes('}')) {
          insideButton = false;
        }
      }

      if (changed) {
        fs.writeFileSync(f, lines.join('\n'));
        updated.push(f);
      }
    });

    return NextResponse.json({ success: true, updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
