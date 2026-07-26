import cablesImage from "@Assets/images/cables.jpg";
import drivesImage from "@Assets/images/cg-drives.jpg";
import pumpAowImage from "@Assets/images/cg-aow-pump.jpg";
import pumpsImage from "@Assets/images/cg-dmb-pump.jpg";
import pumpDownImage from "@Assets/images/cg-down-pump.jpg";
import pumpMiniImage from "@Assets/images/cg-mini-pump.jpg";
import pumpStpImage from "@Assets/images/cg-stp-pump.jpg";
import pumpXmbImage from "@Assets/images/cg-xmb-pump.jpg";
import motor2Image from "@Assets/images/motor2.jpg";
import motor3Image from "@Assets/images/motor3.jpg";
import motorsImage from "@Assets/images/motor1.jpg";
import gearboxImage from "@Assets/images/premium-gearbox.jpg";
import sparesImage from "@Assets/images/spares.png";

export const serviceImages = {
  "cg-motors": motorsImage,
  drives: drivesImage,
  pumps: pumpsImage,
  "gear-boxes": gearboxImage,
  cables: cablesImage,
  spares: sparesImage,
};

export const serviceProductDetails = {
  "cg-motors": {
    title: "CG LT Motors Range",
    products: [
      {
        id: "i2-motors",
        series: "I2 Series",
        title: "I2 Energy Efficient Motors",
        highlight: "IE2 Premium Efficiency",
        meta: ["0.18 kW to 315 kW", "415V, 3 Phase, 50 Hz"],
        image: motor2Image,
        specs: ["Frame 80 to 355", "IP55", "Class F", "S1 Continuous"],
      },
      {
        id: "i3-motors",
        series: "I3 Series",
        title: "I3 Super Premium Efficient Motors",
        highlight: "IE3 Super Premium Efficiency",
        meta: ["0.75 kW to 315 kW", "415V, 3 Phase, 50 Hz"],
        image: motorsImage,
        specs: ["Frame 90 to 355", "IP55/IP56", "Class F", "Smart sensor ready"],
      },
      {
        id: "i4-motors",
        series: "I4 Series",
        title: "I4 Synchronous Reluctance Motors",
        highlight: "IE4 Super Premium Plus",
        meta: ["1.1 kW to 200 kW", "415V, 3 Phase, 50 Hz"],
        image: motor3Image,
        specs: ["Frame 90 to 315", "IP55/IP56", "Class F/H", "No rotor losses"],
      },
    ],
  },
  drives: {
    title: "Drive Range",
    products: [
      {
        id: "vfd-g1",
        series: "VFD-G1",
        title: "VFD-G1 General Purpose AC Drive",
        highlight: "High Efficiency Control",
        meta: ["0.75 kW to 22 kW", "200-240V / 380-480V"],
        image: drivesImage,
        specs: ["V/F, SVC", "Modbus-RTU", "IP20", "Auto-tuning"],
      },
    ],
  },
  pumps: {
    title: "CG Pump Range",
    products: [
      {
        id: "cgxmb-25",
        series: "CGXMB-25",
        title: "CG XMB-25 Centrifugal Pump",
        highlight: "Up to 85% Efficiency",
        meta: ["1 HP to 5 HP", "40 to 180 LPM", "15 to 55 Meters"],
        image: pumpXmbImage,
        specs: ["25mm suction", "25mm delivery", "6 Bar", "Close coupled"],
      },
      {
        id: "cgaow-20",
        series: "CGAOW-20",
        title: "CG AOW-20 Open Well Submersible Pump",
        highlight: "Up to 82% Efficiency",
        meta: ["0.5 HP to 2 HP", "25 to 120 LPM", "20 to 80 Meters"],
        image: pumpAowImage,
        specs: ["100mm diameter", "Single phase", "Class F", "Water filled"],
      },
      {
        id: "cgdmb-05",
        series: "CGDMB-0.5",
        title: "CG DMB-0.5 HP Domestic Monoblock Pump",
        highlight: "Up to 70% Efficiency",
        meta: ["0.5 HP", "25 to 60 LPM", "15 to 35 Meters"],
        image: pumpsImage,
        specs: ["25mm suction", "Single phase", "Self-priming", "Monoblock"],
      },
      {
        id: "cgdown-3",
        series: "CG DOWN-3",
        title: "CG Down-3 Submersible Borewell Pump",
        highlight: "Up to 88% Efficiency",
        meta: ["1 HP to 3 HP", "30 to 120 LPM", "50 to 200 Meters"],
        image: pumpDownImage,
        specs: ["75mm diameter", "Class F", "Water filled", "Borewell"],
      },
      {
        id: "cgstp-50",
        series: "CG STP-50",
        title: "CG STP-50 Sewage Treatment Pump",
        highlight: "Up to 85% Efficiency",
        meta: ["5 HP to 15 HP", "200 to 800 LPM", "10 to 40 Meters"],
        image: pumpStpImage,
        specs: ["50mm solids", "Three phase", "End suction", "Heavy duty"],
      },
      {
        id: "cgmini-05",
        series: "CG MINI-0.5",
        title: "CG Mini-0.5 HP Compact Pump",
        highlight: "Up to 65% Efficiency",
        meta: ["0.5 HP", "15 to 40 LPM", "8 to 25 Meters"],
        image: pumpMiniImage,
        specs: ["20mm suction", "Single phase", "Compact", "Low noise"],
      },
    ],
  },
  "gear-boxes": {
    title: "Gear Box Range",
    products: [
      {
        id: "helical-hg",
        series: "HG Helical",
        title: "HG Premium Helical Gearbox",
        highlight: "High-efficiency power transmission",
        meta: ["3:1 to 200:1", "Up to 12,000 Nm"],
        image: gearboxImage,
        specs: ["Foot / Flange", "Cast iron", "IP55 / IP56", "Long service life"],
      },
    ],
  },
  cables: {
    title: "Cable Range",
    products: [
      {
        id: "xlpe-power",
        series: "XLPE Power",
        title: "XLPE Insulated Power Cables",
        highlight: "Low and medium voltage power cables",
        meta: ["1.1kV to 33kV", "1.5 sq.mm to 630 sq.mm"],
        image: cablesImage,
        specs: ["IS 7098 / IEC 60502", "Al / Cu", "PVC / HDPE / FRLS", "Armoured optional"],
      },
    ],
  },
  spares: {
    title: "Spares Range",
    products: [
      {
        id: "motor-spares",
        series: "Motor Spares",
        title: "Industrial Motor Spares",
        highlight: "OEM-grade support for IE2 / IE3 / IE4 motors",
        meta: ["I2 / I3 / I4 compatibility", "Ex-stock / Lead-time"],
        image: sparesImage,
        specs: ["Bearings", "Cooling fans", "Terminal boxes", "Rotor & stator"],
      },
    ],
  },
};
