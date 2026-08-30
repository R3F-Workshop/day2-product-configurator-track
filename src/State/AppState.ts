import { create } from "zustand";

export interface ColorConfig {
  hex: string;
  price: number;
  label: string;
}

export const BODY_COLOR_CONFIG = [
  {
    label: "Metallic Silver",
    hex: "#C0C0C0",
    price: 299,
  },
  {
    label: "Jet Black",
    hex: "#444444",
    price: 249,
  },
  {
    label: "Pearl White",
    hex: "#FFFFFF",
    price: 349,
  },
  {
    label: "Rose Gold",
    hex: "#B76E79",
    price: 399,
  },
  {
    label: "Yellow Gold",
    hex: "#FFD700",
    price: 449,
  },
];

export interface AppState {
  bodyColor: ColorConfig;
  setBodyColor: (index: number) => void;
}

export const useApp = create<AppState>(() => ({
  bodyColor: BODY_COLOR_CONFIG[0],
  setBodyColor: (index: number) => {
    useApp.setState({
      bodyColor: BODY_COLOR_CONFIG[index],
    });
  },
}));
