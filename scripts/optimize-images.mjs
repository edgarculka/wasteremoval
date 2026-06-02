import path from "node:path";
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const targets = [
  {
    input: "source-images/rubbish-removal.png",
    output: "public/images/rubbish-removal.webp",
    width: 1200,
  },
  {
    input: "source-images/truck.png",
    output: "public/images/truck.webp",
    width: 1200,
  },
  {
    input: "source-images/waste-removal-service-worker.png",
    output: "public/images/waste-removal-service-worker.webp",
    width: 1200,
  },
  {
    input: "source-images/london.png",
    output: "public/images/london.webp",
    width: 1200,
  },
  {
    input: "source-images/services/end-of-tenancy-rubbish-removal-no-people.png",
    output: "public/images/services/end-of-tenancy-rubbish-removal.webp",
    width: 1200,
  },
  {
    input: "source-images/services/house-clearance-no-people.png",
    output: "public/images/services/house-clearance.webp",
    width: 1200,
  },
  {
    input: "source-images/services/garden-waste-removal-no-people.png",
    output: "public/images/services/garden-waste-removal.webp",
    width: 1200,
  },
];

for (const target of targets) {
  await mkdir(path.dirname(target.output), { recursive: true });

  const parsedOutput = path.parse(target.output);
  const widths = [640, 960, target.width];

  for (const width of widths) {
    const output =
      width === target.width
        ? target.output
        : path.join(parsedOutput.dir, `${parsedOutput.name}-${width}${parsedOutput.ext}`);

    const info = await sharp(target.input)
      .rotate()
      .resize({
        width,
        withoutEnlargement: true,
      })
      .webp({
        quality: 78,
        effort: 6,
      })
      .toFile(output);

    console.log(
      `${output}: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB`,
    );
  }
}
