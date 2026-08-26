import { create } from "zustand";

export interface ColorConfig {
  hex: string;
  price: number;
}

export const BODY_COLOR_CONFIG = {
  "Metallic Silver": {
    hex: "#C0C0C0",
    price: 299,
  },
  "Jet Black": {
    hex: "#444444",
    price: 249,
  },
  "Pearl White": {
    hex: "#FFFFFF",
    price: 349,
  },
  "Rose Gold": {
    hex: "#B76E79",
    price: 399,
  },
  "Yellow Gold": {
    hex: "#FFD700",
    price: 449,
  },
};

export type BodyColorName = keyof typeof BODY_COLOR_CONFIG;
export type BodyColor = (typeof BODY_COLOR_CONFIG)[BodyColorName];

export const CAMERA_PRESET_CONFIG = {
  Hero: { label: "Hero" },
  Front: { label: "Front" },
  Side: { label: "Side" },
  Top: { label: "Top" },
  Back: { label: "Back" },
} as const;

export type CameraPresetName = keyof typeof CAMERA_PRESET_CONFIG;

export interface AppState {
  bodyColorName: BodyColorName;
  bodyColor: BodyColor;
  cameraPreset: CameraPresetName;
  setBodyColor: (colorName: BodyColorName) => void;
  setCameraPreset: (preset: CameraPresetName) => void;
}

export const useApp = create<AppState>(() => ({
  bodyColorName: "Jet Black",
  bodyColor: BODY_COLOR_CONFIG["Metallic Silver"],
  cameraPreset: "Hero",
  setBodyColor: (colorName: BodyColorName) => {
    useApp.setState({
      bodyColorName: colorName,
      bodyColor: BODY_COLOR_CONFIG[colorName],
    });
  },
  setCameraPreset: (preset: CameraPresetName) => {
    useApp.setState({ cameraPreset: preset });
  },
}));
