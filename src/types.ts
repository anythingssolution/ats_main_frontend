export interface OfficeSpace {
  id: string;
  floor: number;
  name: string;
  areaSqM: number;
  capacityPeople: number;
  status: 'available' | 'reserved' | 'occupied';
  pricePerSqM: number;
  facing: string;
  features: string[];
}

export interface ArchitecturalHighlight {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  position3D: [number, number, number]; // relative position hint
}

export type ThemeMode = 'classic-white' | 'architectural-monochrome' | 'dusk-gold' | 'cyber-dark';

export interface RibbonConfig {
  speed: number;
  slabCount: number;
  twistFactor: number;
  radius: number;
  theme: ThemeMode;
  autoRotate: boolean;
  wireframe: boolean;
}
