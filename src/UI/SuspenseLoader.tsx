import { Html } from "@react-three/drei";

export function SuspenseLoader() {
  return (
    <Html fullscreen>
      <div className="flex h-full w-full items-center justify-center">
        <div className="rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-zinc-700">
          Loading model...
        </div>
      </div>
    </Html>
  );
}
