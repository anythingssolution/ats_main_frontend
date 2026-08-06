import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, Layers, CheckCircle2, ArrowRight, Compass, ShieldCheck, Users } from 'lucide-react';
import { OfficeSpace } from '../types';

interface OfficeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockOffices: OfficeSpace[] = [
  {
    id: 'off-1',
    floor: 28,
    name: 'Penthouse Executive Suite 2801',
    areaSqM: 850,
    capacityPeople: 110,
    status: 'available',
    pricePerSqM: 65,
    facing: 'North-West Panoramic Bay View',
    features: ['Private Sky Terrace', 'Smart Climate HVAC', 'Triple Glazed Acoustic Glass', 'Direct VIP Elevator'],
  },
  {
    id: 'off-2',
    floor: 24,
    name: 'Sky Garden Office 2402',
    areaSqM: 520,
    capacityPeople: 65,
    status: 'available',
    pricePerSqM: 58,
    facing: 'South City Center Park View',
    features: ['Double-Height Atrium Access', 'LEED Platinum Certified', 'Custom Floor Layout Options'],
  },
  {
    id: 'off-3',
    floor: 18,
    name: 'Innovation Hub 1804',
    areaSqM: 340,
    capacityPeople: 40,
    status: 'available',
    pricePerSqM: 52,
    facing: 'East Plaza River View',
    features: ['High-Density Fiber Optics', '24/7 Security Entry', 'Dedicated Server Room'],
  },
  {
    id: 'off-4',
    floor: 12,
    name: 'Corporate Workspace 1201',
    areaSqM: 1120,
    capacityPeople: 160,
    status: 'reserved',
    pricePerSqM: 48,
    facing: '360° Perimeter Glazing',
    features: ['Full Floor Occupancy', 'Private Reception Lounge', '4 Executive Boardrooms'],
  },
  {
    id: 'off-5',
    floor: 8,
    name: 'Atrium Level 0803',
    areaSqM: 280,
    capacityPeople: 30,
    status: 'available',
    pricePerSqM: 45,
    facing: 'Inner Courtyard Garden',
    features: ['Acoustic Sound Insulation', 'Direct Mall Access', 'Shared Conference Facility'],
  },
];

export const OfficeSelectorModal: React.FC<OfficeSelectorModalProps> = ({ isOpen, onClose }) => {
  const [selectedOffice, setSelectedOffice] = useState<OfficeSpace>(mockOffices[0]);
  const [activeTab, setActiveTab] = useState<'available' | 'all'>('available');
  const [booked, setBooked] = useState(false);

  const filtered = mockOffices.filter((o) => (activeTab === 'available' ? o.status === 'available' : true));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/50">
              <div>
                <span className="text-[10px] font-mono-custom uppercase tracking-[0.25em] text-neutral-400">
                  CLASS [A] PREMIUM BUSINESS CENTER
                </span>
                <h2 className="text-2xl md:text-3xl font-syne font-bold tracking-tight text-neutral-900 dark:text-white mt-1">
                  OFFICE SELECTION & FLOOR PLANS
                </h2>
              </div>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Office List */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab('available')}
                      className={`text-xs font-mono-custom uppercase tracking-wider px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                        activeTab === 'available'
                          ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                          : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                      }`}
                    >
                      Available ({mockOffices.filter((o) => o.status === 'available').length})
                    </button>
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`text-xs font-mono-custom uppercase tracking-wider px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                        activeTab === 'all'
                          ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                          : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                      }`}
                    >
                      All Spaces ({mockOffices.length})
                    </button>
                  </div>
                </div>

                <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2">
                  {filtered.map((office) => {
                    const isSelected = selectedOffice.id === office.id;
                    return (
                      <div
                        key={office.id}
                        onClick={() => {
                          setSelectedOffice(office);
                          setBooked(false);
                        }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-black dark:border-white bg-neutral-50 dark:bg-neutral-800/60 shadow-md scale-[1.01]'
                            : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-mono-custom uppercase text-neutral-400 tracking-wider">
                              FLOOR {office.floor}
                            </span>
                            <h3 className="font-syne font-bold text-neutral-900 dark:text-white text-base">
                              {office.name}
                            </h3>
                          </div>
                          <span
                            className={`text-[9px] font-mono-custom font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                              office.status === 'available'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                            }`}
                          >
                            {office.status}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-xs font-mono-custom text-neutral-600 dark:text-neutral-400">
                          <span>{office.areaSqM} m²</span>
                          <span>Up to {office.capacityPeople} people</span>
                          <span className="font-bold text-neutral-900 dark:text-white">${office.pricePerSqM}/m² / mo</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Selected Office Spec Details */}
              <div className="lg:col-span-7 bg-neutral-50 dark:bg-neutral-800/40 rounded-2xl p-6 border border-neutral-200/80 dark:border-neutral-800 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Title & Badge */}
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono-custom text-neutral-400 uppercase tracking-widest">
                      <Layers className="w-4 h-4" />
                      <span>LEVEL {selectedOffice.floor} ARCHITECTURAL SPECIFICATION</span>
                    </div>
                    <h3 className="text-2xl font-syne font-bold text-neutral-900 dark:text-white mt-1">
                      {selectedOffice.name}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono-custom mt-1 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" />
                      <span>{selectedOffice.facing}</span>
                    </p>
                  </div>

                  {/* Floor Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3.5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/60 dark:border-neutral-800">
                      <span className="text-[10px] font-mono-custom uppercase text-neutral-400">TOTAL AREA</span>
                      <p className="text-lg font-syne font-bold text-neutral-900 dark:text-white mt-0.5">
                        {selectedOffice.areaSqM} <span className="text-xs font-normal">m²</span>
                      </p>
                    </div>

                    <div className="p-3.5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/60 dark:border-neutral-800">
                      <span className="text-[10px] font-mono-custom uppercase text-neutral-400">CAPACITY</span>
                      <p className="text-lg font-syne font-bold text-neutral-900 dark:text-white mt-0.5">
                        {selectedOffice.capacityPeople} <span className="text-xs font-normal">desks</span>
                      </p>
                    </div>

                    <div className="p-3.5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/60 dark:border-neutral-800">
                      <span className="text-[10px] font-mono-custom uppercase text-neutral-400">ESTIMATED RATE</span>
                      <p className="text-lg font-syne font-bold text-neutral-900 dark:text-white mt-0.5">
                        ${selectedOffice.pricePerSqM} <span className="text-xs font-normal">/m²</span>
                      </p>
                    </div>
                  </div>

                  {/* Features List */}
                  <div>
                    <h4 className="text-xs font-mono-custom uppercase tracking-wider text-neutral-400 mb-3">
                      INCLUDED ARCHITECTURAL AMENITIES
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedOffice.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-black dark:text-white flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Blueprint Diagram Representation */}
                  <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 flex flex-col items-center justify-center text-center space-y-2 py-8">
                    <Building2 className="w-8 h-8 text-neutral-300 dark:text-neutral-600" />
                    <span className="text-xs font-mono-custom uppercase tracking-widest text-neutral-500">
                      3D PARAMETRIC FLOOR BLUEPRINT PREVIEW
                    </span>
                    <span className="text-[11px] text-neutral-400 max-w-sm">
                      Full CAD floor plan and BIM 3D models available upon scheduling an architectural walk-through.
                    </span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono-custom text-neutral-400 uppercase">MONTHLY LEASE</span>
                    <p className="text-xl font-syne font-bold text-neutral-900 dark:text-white">
                      ${(selectedOffice.areaSqM * selectedOffice.pricePerSqM).toLocaleString()}{' '}
                      <span className="text-xs font-normal text-neutral-400">/ mo</span>
                    </p>
                  </div>

                  {booked ? (
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2 bg-emerald-600 text-white text-xs font-mono-custom uppercase font-bold px-6 py-3 rounded-full"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>TOUR REQUEST SENT</span>
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => setBooked(true)}
                      className="flex items-center gap-2 bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black text-xs font-mono-custom uppercase font-bold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>SCHEDULE A PRIVATE TOUR</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
