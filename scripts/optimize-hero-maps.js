const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const projectRoot = path.resolve(__dirname, '..');

const assets = [
  {
    input: path.join(projectRoot, 'public', 'hero', 'locations', 'map-light.png'),
    output: path.join(projectRoot, 'public', 'hero', 'locations', 'map-light.webp'),
  },
  {
    input: path.join(projectRoot, 'public', 'hero', 'locations', 'map-dark.png'),
    output: path.join(projectRoot, 'public', 'hero', 'locations', 'map-dark.webp'),
  },
];

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function optimizeAsset(asset) {
  const sourceMeta = await sharp(asset.input).metadata();

  await sharp(asset.input)
    .webp({
      quality: 78,
      effort: 4,
    })
    .toFile(asset.output);

  const [inputStats, outputStats] = await Promise.all([fs.stat(asset.input), fs.stat(asset.output)]);

  return {
    ...asset,
    width: sourceMeta.width,
    height: sourceMeta.height,
    inputBytes: inputStats.size,
    outputBytes: outputStats.size,
  };
}

async function run() {
  const results = await Promise.all(assets.map((asset) => optimizeAsset(asset)));

  for (const result of results) {
    const reduction = (((result.inputBytes - result.outputBytes) / result.inputBytes) * 100).toFixed(1);
    console.log(
      [
        `Converted: ${path.basename(result.input)} -> ${path.basename(result.output)}`,
        `Size: ${formatBytes(result.inputBytes)} -> ${formatBytes(result.outputBytes)} (${reduction}% smaller)`,
        `Dimensions: ${result.width}x${result.height}`,
      ].join('\n'),
    );
    console.log('');
  }
}

run().catch((error) => {
  console.error('Failed to optimize hero maps.');
  console.error(error);
  process.exitCode = 1;
});
