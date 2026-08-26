import {
  BODY_COLOR_CONFIG,
  useApp,
  type BodyColorName,
} from "../Shared/AppState";
import { Logo } from "./Logo";

export function UI() {
  const bodyColorName = useApp((state) => state.bodyColorName);
  const bodyColor = useApp((state) => state.bodyColor);
  const setBodyColor = useApp((state) => state.setBodyColor);

  const colorNames = Object.keys(BODY_COLOR_CONFIG) as BodyColorName[];

  return (
    <>
      {/* <CameraPresetSwitcher /> */}

      <div className="pointer-events-none fixed inset-x-0 top-0 z-10">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
          <div className="pointer-events-auto flex w-fit items-center gap-3">
            <Logo color="#f4f4f5" className="h-8 w-8 md:h-10 md:w-10" />
            <div className="flex flex-col">
              <p className="text-xl font-medium text-zinc-100 md:text-base">
                Poimandres
              </p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-400 md:text-[11px]">
                ThreeJS Conf 2026
              </p>
              <p className="mt-1 max-w-[34rem] text-[10px] leading-snug text-zinc-400 md:text-[11px]">
                Poimandres Workshop Day 2 (September 9th 2026)
                <br />
                Product Configurator track by{" "}
                <a
                  href="https://farazzshaikh.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-200 underline decoration-zinc-500 underline-offset-2 hover:text-zinc-100"
                >
                  Faraz Shaikh
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10">
        <div className="pointer-events-auto w-full bg-transparent">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-5 sm:py-6 md:flex-row md:items-center md:justify-between md:px-6 md:py-8">
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-200 md:text-base">
                Apple Watch Ultra
              </p>

              <div className="mb-4 flex w-full items-center gap-3">
                <p className="shrink-0 text-[10px] uppercase tracking-[0.16em] text-zinc-400 sm:text-xs">
                  Body Finish
                </p>
                <p className="truncate text-left text-sm font-medium text-zinc-100">
                  {bodyColorName}
                </p>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {colorNames.map((name) => {
                  const color = BODY_COLOR_CONFIG[name];
                  const active = bodyColorName === name;

                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setBodyColor(name)}
                      className={`shrink-0 rounded-full border p-1 transition ${
                        active
                          ? "border-zinc-100 bg-zinc-100"
                          : "border-zinc-600 bg-zinc-900 hover:border-zinc-300"
                      }`}
                      title={name}
                      aria-label={`Select ${name}`}
                      aria-pressed={active}
                    >
                      <span
                        className="block h-7 w-7 rounded-full sm:h-8 sm:w-8"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:w-auto md:justify-end">
              <div className="pr-0 text-left sm:pr-2 sm:text-right">
                <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-400 sm:text-xs">
                  Price
                </p>
                <p className="text-2xl font-semibold text-zinc-50">
                  ${bodyColor.price}
                </p>
              </div>

              <div className="flex w-full gap-2 sm:w-auto">
                <button
                  type="button"
                  className="flex-1 rounded-xl border border-zinc-500 bg-zinc-900 px-3 py-2.5 text-sm font-medium text-zinc-100 transition hover:border-zinc-300 sm:flex-none sm:px-4"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-xl border border-zinc-100 bg-zinc-100 px-3 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-300 sm:flex-none sm:px-4"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
