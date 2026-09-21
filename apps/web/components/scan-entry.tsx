"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function ScanEntry() {
  const router = useRouter();
  const [value, setValue] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = value.trim();

    if (!target) {
      return;
    }

    router.push(`/xray?target=${encodeURIComponent(target)}`);
  }

  return (
    <form className="scan-entry" onSubmit={submit}>
      <div className="scan-input-wrap">
        <span className="scan-orbit" aria-hidden="true" />
        <input
          aria-label="Website URL or GitHub repository"
          autoCapitalize="none"
          autoComplete="off"
          onChange={(event) => setValue(event.target.value)}
          placeholder="https://yourproject.com or github.com/user/repo"
          spellCheck={false}
          value={value}
        />
      </div>
      <button type="submit">Run X-Ray</button>
    </form>
  );
}
