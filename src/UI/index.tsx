import { BODY_COLOR_CONFIG, useApp } from "../State/AppState";
import { Logo } from "./Logo";

export function UI() {
  const bodyColor = useApp((state) => state.bodyColor);
  const setBodyColor = useApp((state) => state.setBodyColor);

  return (
    <div className="ui-disable-pointer-events-except-inputs">
      {/* <CameraPresetSwitcher /> */}

      <div className="pointer-events-none fixed inset-x-0 top-0 z-10">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
          <div className="flex w-fit items-center gap-3 rounded-2xl px-4 py-3">
            <Logo color="#18181b" className="h-8 w-8 md:h-10 md:w-10" />
            <div className="flex flex-col">
              <p className="text-xl font-medium text-zinc-900 md:text-base">
                Poimandres
              </p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500 md:text-[11px]">
                ThreeJS Conf 2026
              </p>
              <p className="mt-1 max-w-[34rem] text-[10px] leading-snug text-zinc-500 md:text-[11px]">
                Poimandres Workshop Day 2 (September 9th 2026)
                <br />
                Product Configurator track by{" "}
                <a
                  href="https://farazzshaikh.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-700 underline decoration-zinc-400 underline-offset-2 hover:text-zinc-900"
                >
                  Faraz Shaikh
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10">
        <div className="w-full bg-transparent">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 rounded-2xl px-4 py-5 sm:py-6 md:flex-row md:items-center md:justify-between md:px-6 md:py-8">
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-800 md:text-base">
                Apple Watch Ultra
              </p>

              <div className="mb-4 flex w-full items-center gap-3">
                <p className="shrink-0 text-[10px] uppercase tracking-[0.16em] text-zinc-500 sm:text-xs">
                  Body Finish
                </p>
                <p className="truncate text-left text-sm font-medium text-zinc-900">
                  {bodyColor.label}
                </p>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {BODY_COLOR_CONFIG.map((color, i) => {
                  const active = bodyColor.hex === color.hex;

                  return (
                    <button
                      key={color.hex}
                      type="button"
                      onClick={() => setBodyColor(i)}
                      className={`shrink-0 rounded-full border p-1 transition ${
                        active ? "bg-white" : "bg-white hover:bg-zinc-100"
                      }`}
                      title={color.label}
                      aria-label={`Select ${color.label}`}
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
                <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500 sm:text-xs">
                  Price
                </p>
                <p className="text-2xl font-semibold text-zinc-900">
                  ${bodyColor.price}
                </p>
              </div>

              <div className="flex w-full gap-2 sm:w-auto">
                <button
                  type="button"
                  className="flex-1 rounded-xl bg-zinc-900 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 sm:flex-none sm:px-4"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-xl bg-white px-3 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 sm:flex-none sm:px-4"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
