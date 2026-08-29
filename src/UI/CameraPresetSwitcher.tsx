import type { JSX, SVGProps } from "react";
import {
  CAMERA_PRESET_CONFIG,
  useApp,
  type CameraPresetName,
} from "../State/AppState";

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

function HeroIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 16L12 8L19 16" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function FrontIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect
        x="7"
        y="5"
        width="10"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function SideIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M7 8H14C15.8 8 17 9.2 17 11V13C17 14.8 15.8 16 14 16H7V8Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M17 11H19" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function TopIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <ellipse
        cx="12"
        cy="12"
        rx="7"
        ry="4.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M12 4V8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function BackIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect
        x="7"
        y="5"
        width="10"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M10 10L14 12L10 14" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

const CAMERA_PRESET_ICONS: Record<
  CameraPresetName,
  (props: IconProps) => JSX.Element
> = {
  Hero: HeroIcon,
  Front: FrontIcon,
  Side: SideIcon,
  Top: TopIcon,
  Back: BackIcon,
};

export function CameraPresetSwitcher() {
  const activePreset = useApp((state) => state.cameraPreset);
  const setCameraPreset = useApp((state) => state.setCameraPreset);

  const presetNames = Object.keys(CAMERA_PRESET_CONFIG) as CameraPresetName[];

  return (
    <div className="pointer-events-none fixed right-4 top-1/2 z-20 -translate-y-1/2 md:right-6">
      <div className="pointer-events-auto flex flex-col items-stretch gap-2 rounded-2xl border border-zinc-700/80 bg-zinc-900/80 p-2 backdrop-blur-sm">
        {presetNames.map((preset) => {
          const Icon = CAMERA_PRESET_ICONS[preset];
          const active = activePreset === preset;

          return (
            <button
              key={preset}
              type="button"
              onClick={() => setCameraPreset(preset)}
              aria-label={`Switch camera to ${preset} view`}
              aria-pressed={active}
              title={preset}
              className={`group flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                active
                  ? "border-zinc-100 bg-zinc-100 text-zinc-900"
                  : "border-zinc-600 bg-zinc-900 text-zinc-100 hover:border-zinc-300"
              }`}
            >
              <Icon className="h-5 w-5" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
