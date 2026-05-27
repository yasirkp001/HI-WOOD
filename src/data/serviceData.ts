import React from 'react';
import { Shield, Settings, Droplets, Clock, Truck, MapPin } from 'lucide-react';

export interface ServiceFeature {
  icon: React.ElementType;
  title: string;
  desc: string;
}

export interface ServiceSpec {
  label: string;
  value: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  desc: string;
}

export interface Vehicle {
  name: string;
  capacity: string;
  type: string;
  image: string;
  description: string;
  icon: React.ElementType;
  hideTires?: boolean;
}

export interface ServiceItem {
  title: string;
  subtitle: string;
  heroImage: string;
  detailImage?: string;
  heroImagePosition?: string;
  detailImagePosition?: string;
  heroVideo?: string;
  description: string;
  features: ServiceFeature[];
  specs?: ServiceSpec[];
  workflow?: WorkflowStep[];
  vehicles?: Vehicle[];
  hideTires?: boolean;
}

export interface ServiceData {
  [key: string]: ServiceItem;
}

export const serviceData: ServiceData = {
  'mills': {
    title: 'MILLS',
    subtitle: 'The Science of High-Precision Milling',
    heroImage: '/images/mills hero section.JPG',
    detailImage: '/assets/IMG_6667.JPG',
    heroImagePosition: 'object-[55%_center]',
    detailImagePosition: 'object-[55%_center]',
    description: 'Precision industrial milling at the heart of HI WOOD. We transform sustainably sourced raw logs into architecturally-perfect timber with millimeter accuracy and expert seasoning for lasting quality.',
    features: [
      { icon: Shield, title: 'Premium Sourcing', desc: 'Hand-picked Teak, Rosewood, and Mahogany from certified sources.' },
      { icon: Settings, title: 'Precision Band Saws', desc: 'Vertical and horizontal cutting for perfect thickness and grain alignment.' },
      { icon: Droplets, title: 'Advanced Seasoning', desc: 'Kiln-drying to 10-12% moisture to prevent future warping or cracking.' },
      { icon: Clock, title: 'Decades of Expertise', desc: 'Master sawyers who understand the soul of every wood species.' }
    ],
    specs: [
      { label: 'Log Capacity', value: '1000+ Tons / Month' },
      { label: 'Precision Level', value: '+/- 0.5mm' },
      { label: 'Wood Species', value: 'Teak, Rosewood, Mahogany, Oak' },
      { label: 'Drying Method', value: 'Kiln-Dried (KD) & Air-Dried' }
    ],
    workflow: [
      { step: "01", title: "LOG SELECTION", desc: "We hand-pick premium timber from government depots and certified sustainable forests, focusing on grain density and age." },
      { step: "02", title: "PRECISION SAWING", desc: "Using advanced horizontal and vertical band saws, we process logs into boards with millimeter precision to minimize wastage." },
      { step: "03", title: "KILN DRYING", desc: "Every board undergoes a scientific seasoning process in our kilns to achieve 10-12% moisture, ensuring lifetime stability." },
      { step: "04", title: "QUALITY GRADING", desc: "Final inspection for grain beauty, structural strength, and surface finish before being dispatched to our clients." }
    ]
  },
  'transportation': {
    title: 'TRANSPORTATION',
    subtitle: 'Logistics & Transportation',
    heroImage: '/images/IMG_0145.JPG',
    heroVideo: '/assets/IMG_6053.MP4',
    description: 'Specialized logistics for delicate timber and heavy beams. We ensure your materials arrive in pristine condition.',
    features: [
      { icon: Truck, title: 'Heavy Duty Fleet', desc: 'Specialized BharatBenz and Volvo carriers for massive log transportation.' },
      { icon: Shield, title: 'Cargo Insurance', desc: 'Full transit protection for your high-value timber from forest to factory.' },
      { icon: MapPin, title: 'Real-time Tracking', desc: 'Live GPS monitoring and route optimization for every shipment.' },
      { icon: Clock, title: 'Express Delivery', desc: 'Reliable scheduling and timely arrivals for time-sensitive projects.' }
    ],
    workflow: [
      { step: "01", title: "SITE ASSESSMENT", desc: "Our logistics team evaluates the forest or site terrain to select the optimal vehicle for loading." },
      { step: "02", title: "SECURE LOADING", desc: "Using advanced loaders and crane trucks, logs are secured with industrial-grade multi-point fastening." },
      { step: "03", title: "SAFE TRANSIT", desc: "Our experienced heavy-duty drivers navigate optimized routes while maintaining constant communication." },
      { step: "04", title: "PRECISION UNLOADING", desc: "Safe delivery and organized unloading at your factory, sawmill, or construction site." }
    ],
    vehicles: [
      {
        name: 'BharatBenz Timber Carrier',
        capacity: '35 Tons',
        type: 'Heavy Duty',
        image: '/assets/hiwood_bharatbenz_mud.jpg',
        description: 'Primary carrier for large logs and heavy timber beams.',
        icon: Truck
      },
      {
        name: 'XCMG Crawler Log Loader',
        capacity: '15 Tons',
        type: 'Log Grabber',
        image: '/assets/xcmg_excavator.jpg',
        description: 'Heavy duty crawler excavator with a 360° log grab attachment.',
        icon: Settings,
        hideTires: true
      },
      {
        name: 'ACE 14XW Mobile Crane',
        capacity: '14 Tons',
        type: 'Mobile Crane',
        image: '/assets/ace_crane.jpg',
        description: 'High-performance mobile hydraulic crane for heavy timber slabbing and loading.',
        icon: Settings
      }
    ]
  }
};
