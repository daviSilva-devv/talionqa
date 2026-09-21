import { scanUrl } from "./scan-url";
import { TargetValidationError } from "./target";

const target = process.argv[2];

if (!target) {
  console.error("Usage: pnpm scan -- https://example.com");
  process.exitCode = 1;
} else {
  try {
    const result = await scanUrl(target);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    if (error instanceof TargetValidationError) {
      console.error(`Target rejected: ${error.message}`);
      process.exitCode = 2;
    } else {
      console.error(error);
      process.exitCode = 1;
    }
  }
}
