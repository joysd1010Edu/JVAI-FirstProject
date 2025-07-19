import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

// Find the pdfjs-dist package from react-pdf dependencies
let pdfjsDistPath;
try {
  // Try to find pdfjs-dist from react-pdf dependencies first
  const reactPdfPath = path.dirname(require.resolve('react-pdf/package.json'));
  const reactPdfNodeModules = path.join(reactPdfPath, 'node_modules', 'pdfjs-dist');
  
  if (fs.existsSync(reactPdfNodeModules)) {
    pdfjsDistPath = reactPdfNodeModules;
    console.log('📦 Using pdfjs-dist from react-pdf dependencies');
  } else {
    // Fallback to main node_modules
    pdfjsDistPath = path.dirname(require.resolve('pdfjs-dist/package.json'));
    console.log('📦 Using pdfjs-dist from main dependencies');
  }
} catch (error) {
  console.error('❌ Could not find pdfjs-dist package:', error);
  process.exit(1);
}

// Copy worker file
const pdfWorkerPath = path.join(pdfjsDistPath, 'build', 'pdf.worker.min.mjs');
const publicWorkerPath = path.join(__dirname, 'public', 'pdf.worker.min.mjs');

// Copy cmaps directory
const cMapsPath = path.join(pdfjsDistPath, 'cmaps');
const publicCMapsPath = path.join(__dirname, 'public', 'cmaps');

// Copy standard fonts
const standardFontsPath = path.join(pdfjsDistPath, 'standard_fonts');
const publicStandardFontsPath = path.join(__dirname, 'public', 'standard_fonts');

try {
  // Copy worker
  fs.copyFileSync(pdfWorkerPath, publicWorkerPath);
  console.log('✅ PDF worker copied successfully');

  // Copy cmaps
  fs.cpSync(cMapsPath, publicCMapsPath, { recursive: true, force: true });
  console.log('✅ CMaps copied successfully');

  // Copy standard fonts
  fs.cpSync(standardFontsPath, publicStandardFontsPath, { recursive: true, force: true });
  console.log('✅ Standard fonts copied successfully');

  console.log('🎉 All PDF.js assets copied to public directory!');
} catch (error) {
  console.error('❌ Failed to copy PDF assets:', error);
}
