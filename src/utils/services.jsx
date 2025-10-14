import { 
  CircuitBoard, 
  Zap, 
  Droplets, 
  Cog, 
  Cable, 
  Wrench,
} from 'lucide-react';

const services = [
  {
    id: "cg-motors",
    title: "Motors",
    description:
      "High-performance electric motors designed for industrial applications with superior efficiency and reliability.",
    icon: CircuitBoard,
    features: [
      "Energy efficient designs",
      "Wide range of power ratings",
      "Robust construction",
      "Low maintenance requirements",
    ],
    applications: [
      "Manufacturing",
      "Process Industries",
      "Infrastructure",
      "Commercial Buildings",
    ],
    url: "/motors",
  },
  {
    id: "drives",
    title: "Drives",
    description:
      "Advanced variable frequency drives and motor control solutions for precise speed and torque control.",
    icon: Zap,
    features: [
      "Variable speed control",
      "Energy optimization",
      "Advanced protection",
      "Remote monitoring",
    ],
    applications: [
      "HVAC Systems",
      "Conveyor Belts",
      "Pumps & Fans",
      "Industrial Automation",
    ],
    url: "/drives",
  },
  {
    id: "pumps",
    title: "Pumps",
    description:
      "Comprehensive range of pumps including centrifugal, submersible, and specialty pumps for various applications.",
    icon: Droplets,
    features: [
      "Corrosion resistant materials",
      "High efficiency impellers",
      "Multiple configurations",
      "Easy maintenance design",
    ],
    applications: [
      "Water Supply",
      "Irrigation",
      "Industrial Processing",
      "Building Services",
    ],
    url: "/pumps",
  },
  {
    id: "gear-boxes",
    title: "Gear Boxes",
    description:
      "Premium quality gearboxes offering precise torque multiplication and speed reduction for various mechanical systems.",
    icon: Cog,
    features: [
      "High torque capacity",
      "Precision engineering",
      "Multiple ratios available",
      "Compact design",
    ],
    applications: ["Conveyors", "Mixers", "Crushers", "Material Handling"],
    url: "/gear-boxes",
  },
  {
    id: "cables",
    title: "Cables",
    description:
      "High-quality electrical cables and wiring solutions designed for safe and efficient power transmission.",
    icon: Cable,
    features: [
      "Fire retardant properties",
      "Multiple conductor options",
      "Weather resistant",
      "Industry standard compliance",
    ],
    applications: [
      "Power Distribution",
      "Control Systems",
      "Instrumentation",
      "Building Wiring",
    ],
    url: "/cables",
  },
  {
    id: "spares",
    title: "Spares",
    description:
      "Comprehensive inventory of genuine spare parts and components to ensure continuous operation of your equipment.",
    icon: Wrench,
    features: [
      "Genuine OEM parts",
      "Quick availability",
      "Quality assurance",
      "Technical support",
    ],
    applications: [
      "Preventive Maintenance",
      "Emergency Repairs",
      "Equipment Upgrades",
      "Performance Enhancement",
    ],
    url: "/spares",
  },
];

export { services };
