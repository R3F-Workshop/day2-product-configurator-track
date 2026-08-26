import { Html } from "@react-three/drei";

export function SuspenseLoader() {
  return (
    <Html fullscreen>
      <div className="flex h-full w-full items-center justify-center bg-zinc-950/35 backdrop-blur-[1px]">
        <div className="rounded-full border border-zinc-700/80 bg-zinc-950/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-zinc-100">
          Loading model...
        </div>
      </div>
    </Html>
  );
}
