import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourcePath = join(root, "public", "images", "waste-logo-icon.svg");
const publicPath = join(root, "public");

const brandForeground = "#06351f";
const brandPrimary = "#d7f55d";

const sourceSvg = (await readFile(sourcePath, "utf8")).replace(
  /fill="black"/g,
  `fill="${brandForeground}"`,
);

await mkdir(publicPath, { recursive: true });

const writePng = async (name, size, options = {}) => {
  const outputPath = join(publicPath, name);
  await mkdir(dirname(outputPath), { recursive: true });

  if (options.background) {
    const iconSize = Math.round(size * (options.scale ?? 0.78));
    const offset = Math.round((size - iconSize) / 2);

    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: options.background,
      },
    })
      .composite([
        {
          input: await sharp(Buffer.from(sourceSvg))
            .resize(iconSize, iconSize)
            .png()
            .toBuffer(),
          left: offset,
          top: offset,
        },
      ])
      .png()
      .toFile(outputPath);

    return readFile(outputPath);
  }

  await sharp(Buffer.from(sourceSvg)).resize(size, size).png().toFile(outputPath);
  return readFile(outputPath);
};

const makeIco = (images) => {
  const headerSize = 6;
  const directorySize = 16 * images.length;
  let offset = headerSize + directorySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  const directories = images.map(({ size, buffer }) => {
    const directory = Buffer.alloc(16);
    directory.writeUInt8(size >= 256 ? 0 : size, 0);
    directory.writeUInt8(size >= 256 ? 0 : size, 1);
    directory.writeUInt8(0, 2);
    directory.writeUInt8(0, 3);
    directory.writeUInt16LE(1, 4);
    directory.writeUInt16LE(32, 6);
    directory.writeUInt32LE(buffer.length, 8);
    directory.writeUInt32LE(offset, 12);
    offset += buffer.length;
    return directory;
  });

  return Buffer.concat([header, ...directories, ...images.map(({ buffer }) => buffer)]);
};

await writeFile(join(publicPath, "favicon.svg"), sourceSvg);

const favicon16 = await writePng("favicon-16x16.png", 16);
const favicon32 = await writePng("favicon-32x32.png", 32);
const favicon48 = await writePng("favicon-48x48.png", 48);

await writePng("apple-touch-icon.png", 180, { background: brandPrimary });
await writePng("icon-192x192.png", 192, { background: brandPrimary });
await writePng("icon-512x512.png", 512, { background: brandPrimary });
await writePng("maskable-icon-512x512.png", 512, {
  background: brandPrimary,
  scale: 0.66,
});

await writeFile(
  join(publicPath, "favicon.ico"),
  makeIco([
    { size: 16, buffer: favicon16 },
    { size: 32, buffer: favicon32 },
    { size: 48, buffer: favicon48 },
  ]),
);

console.log("Generated favicon.svg, favicon.ico, PNG favicons and app icons.");
