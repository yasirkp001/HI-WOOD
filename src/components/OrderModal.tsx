"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, MapPin, Package, Truck, Layers, CheckCircle2 } from "lucide-react";
import { validatePhoneNumber } from "../utils/phoneValidation";
import InternationalPhoneInput from "./InternationalPhoneInput";
import { getUserDataFromCookies, saveUserDataToCookies } from "../utils/cookieUtils";

export type OrderServiceType = "mills" | "transportation" | "custom-furniture";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: OrderServiceType;
}

const SERVICE_META = {
  mills: {
    title: "Order Milled Timber",
    subtitle: "Fill in the details below and we'll confirm your order via WhatsApp.",
    emoji: "🪵",
    color: "from-amber-900/10 to-amber-700/5",
    accent: "#8B5A2B",
  },
  transportation: {
    title: "Book Transportation",
    subtitle: "Provide your shipment details and our team will contact you promptly.",
    emoji: "🚛",
    color: "from-neutral-900/10 to-neutral-700/5",
    accent: "#1a1a1a",
  },
  "custom-furniture": {
    title: "Place Furniture Order",
    subtitle: "Tell us your requirements and we'll craft it just for you.",
    emoji: "🪑",
    color: "from-green-900/10 to-green-700/5",
    accent: "#2d6a4f",
  },
};

// ─── Mills Form ────────────────────────────────────────────────────────────────
function MillsOrderForm({ onSubmit }: { onSubmit: (msg: string) => void }) {
  const [form, setForm] = useState({
    name: "", phone: "", species: "Teak", length: "", width: "", thickness: "", qty: "", drying: "Kiln-Dried (KD)",
  });
  const [phoneError, setPhoneError] = useState('');

  // Prefill details from cookies if accepted.
  // Deferred to a task so the update lands after hydration instead of cascading a sync re-render.
  useEffect(() => {
    const timer = setTimeout(() => {
      const data = getUserDataFromCookies();
      if (!data.name && !data.phone) return;
      setForm(f => ({
        ...f,
        name: data.name || f.name,
        phone: data.phone || f.phone
      }));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handle = (k: string, v: string) => {
    let val = v;
    if (k === 'phone') {
      val = val.replace(/[^0-9\s+\-()]/g, '');
      const validation = validatePhoneNumber(val);
      if (val) {
        setPhoneError(validation.error || '');
      } else {
        setPhoneError('');
      }
    }
    setForm(f => ({ ...f, [k]: val }));
  };

  const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Advanced Name Validation
    if (form.name.trim().length < 3) {
      alert("Name must be at least 3 characters long.");
      return;
    }
    const nameRegex = /^[a-zA-Z\s.]+$/;
    if (!nameRegex.test(form.name)) {
      alert("Name must contain only alphabetic characters, spaces or periods.");
      return;
    }

    // Advanced Numerical Checks
    if (Number(form.length) <= 0 || Number(form.width) <= 0 || Number(form.thickness) <= 0 || Number(form.qty) <= 0) {
      alert("Dimensions (length, width, thickness) and quantity must be positive numbers greater than zero.");
      return;
    }

    const validation = validatePhoneNumber(form.phone);
    if (!validation.isValid) {
      setPhoneError(validation.error || 'Please enter a valid phone number.');
      return;
    }

    // Save details to cookies if consent allowed
    saveUserDataToCookies(form.name, form.phone);

    const msg =
      `🌲 *HI WOOD – MILLS ORDER* 🌲\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Name:* ${form.name}\n` +
      `📞 *Phone:* ${validation.cleanedNumber}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `🪵 *Wood Species:* ${form.species}\n` +
      `📏 *Dimensions:* ${form.length} ft (L) × ${form.width} ft (W) × ${form.thickness} mm (T)\n` +
      `📦 *Quantity:* ${form.qty} pieces\n` +
      `🔥 *Drying Method:* ${form.drying}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `_Sent via hiwood.com_`;
    onSubmit(msg);
  };

  const inputCls = "w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-3.5 text-sm text-neutral-900 focus:outline-none focus:border-primary transition-colors placeholder:text-neutral-400";
  const labelCls = "block text-[10px] font-black uppercase tracking-widest text-primary mb-1.5";

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Full Name</label>
          <div className="relative">
            <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input required className={`${inputCls} pl-9`} placeholder="Your name" value={form.name} onChange={e => handle("name", e.target.value)} />
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <label className={labelCls}>Phone</label>
          <InternationalPhoneInput 
            value={form.phone}
            onChange={(fullNumber) => handle("phone", fullNumber)}
            phoneError={phoneError}
            setPhoneError={setPhoneError}
            inputStyleClass="pl-2 focus:border-none focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Wood Species</label>
        <select required className={inputCls} value={form.species} onChange={e => handle("species", e.target.value)}>
          <option>Teak</option>
          <option>Rosewood</option>
          <option>Mahogany</option>
          <option>Oak</option>
          <option>Jackwood</option>
          <option>Other</option>
        </select>
      </div>

      <div className="grid grid-cols-1 min-[400px]:grid-cols-3 gap-3">
        <div>
          <label className={labelCls}>Length (ft)</label>
          <input required type="number" min="1" className={inputCls} placeholder="e.g. 8" value={form.length} onChange={e => handle("length", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Width (ft)</label>
          <input required type="number" min="1" className={inputCls} placeholder="e.g. 2" value={form.width} onChange={e => handle("width", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Thickness (mm)</label>
          <input required type="number" min="1" className={inputCls} placeholder="e.g. 25" value={form.thickness} onChange={e => handle("thickness", e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Quantity (Pieces)</label>
          <div className="relative">
            <Layers size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input required type="number" min="1" className={`${inputCls} pl-9`} placeholder="e.g. 50" value={form.qty} onChange={e => handle("qty", e.target.value)} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Drying Method</label>
          <select className={inputCls} value={form.drying} onChange={e => handle("drying", e.target.value)}>
            <option>Kiln-Dried (KD)</option>
            <option>Air-Dried</option>
            <option>No Preference</option>
          </select>
        </div>
      </div>

      <button type="submit" className="w-full bg-primary hover:brightness-110 text-white font-black py-4 rounded-2xl uppercase tracking-widest text-[11px] transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-2">
        <span>📲</span> Confirm Order on WhatsApp
      </button>
    </form>
  );
}

// ─── Transportation Form ───────────────────────────────────────────────────────
function TransportOrderForm({ onSubmit }: { onSubmit: (msg: string) => void }) {
  const [form, setForm] = useState({
    name: "", phone: "", pickup: "", drop: "", loadType: "Timber Logs", weight: "", date: "",
  });
  const [phoneError, setPhoneError] = useState('');

  // Prefill details from cookies if accepted.
  // Deferred to a task so the update lands after hydration instead of cascading a sync re-render.
  useEffect(() => {
    const timer = setTimeout(() => {
      const data = getUserDataFromCookies();
      if (!data.name && !data.phone) return;
      setForm(f => ({
        ...f,
        name: data.name || f.name,
        phone: data.phone || f.phone
      }));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handle = (k: string, v: string) => {
    let val = v;
    if (k === 'phone') {
      val = val.replace(/[^0-9\s+\-()]/g, '');
      const validation = validatePhoneNumber(val);
      if (val) {
        setPhoneError(validation.error || '');
      } else {
        setPhoneError('');
      }
    }
    setForm(f => ({ ...f, [k]: val }));
  };

  const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Advanced Name Validation
    if (form.name.trim().length < 3) {
      alert("Name must be at least 3 characters long.");
      return;
    }
    const nameRegex = /^[a-zA-Z\s.]+$/;
    if (!nameRegex.test(form.name)) {
      alert("Name must contain only alphabetic characters, spaces or periods.");
      return;
    }

    // Advanced Numerical Checks
    if (Number(form.weight) <= 0) {
      alert("Estimated weight must be a positive number greater than zero.");
      return;
    }

    const validation = validatePhoneNumber(form.phone);
    if (!validation.isValid) {
      setPhoneError(validation.error || 'Please enter a valid phone number.');
      return;
    }

    // Save details to cookies if consent allowed
    saveUserDataToCookies(form.name, form.phone);

    const msg =
      `🚛 *HI WOOD – TRANSPORT ORDER* 🚛\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Name:* ${form.name}\n` +
      `📞 *Phone:* ${validation.cleanedNumber}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📍 *Pickup:* ${form.pickup}\n` +
      `📦 *Drop:* ${form.drop}\n` +
      `🪵 *Load Type:* ${form.loadType}\n` +
      `⚖️ *Estimated Weight:* ${form.weight} Tons\n` +
      (form.date ? `📅 *Preferred Date:* ${form.date}\n` : "") +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `_Sent via hiwood.com_`;
    onSubmit(msg);
  };

  const inputCls = "w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-3.5 text-sm text-neutral-900 focus:outline-none focus:border-primary transition-colors placeholder:text-neutral-400";
  const labelCls = "block text-[10px] font-black uppercase tracking-widest text-primary mb-1.5";

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Full Name</label>
          <div className="relative">
            <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input required className={`${inputCls} pl-9`} placeholder="Your name" value={form.name} onChange={e => handle("name", e.target.value)} />
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <label className={labelCls}>Phone</label>
          <InternationalPhoneInput 
            value={form.phone}
            onChange={(fullNumber) => handle("phone", fullNumber)}
            phoneError={phoneError}
            setPhoneError={setPhoneError}
            inputStyleClass="pl-2 focus:border-none focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Pickup Location</label>
        <div className="relative">
          <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input required className={`${inputCls} pl-9`} placeholder="e.g. Palazhi, Kozhikode" value={form.pickup} onChange={e => handle("pickup", e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Drop Location</label>
        <div className="relative">
          <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input required className={`${inputCls} pl-9`} placeholder="e.g. Kochi, Ernakulam" value={form.drop} onChange={e => handle("drop", e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Load Type</label>
          <div className="relative">
            <Package size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <select className={`${inputCls} pl-9`} value={form.loadType} onChange={e => handle("loadType", e.target.value)}>
              <option>Timber Logs</option>
              <option>Milled Boards</option>
              <option>Furniture</option>
              <option>Mixed Load</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div>
          <label className={labelCls}>Weight (Tons)</label>
          <div className="relative">
            <Truck size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input required type="number" min="1" className={`${inputCls} pl-9`} placeholder="e.g. 25" value={form.weight} onChange={e => handle("weight", e.target.value)} />
          </div>
        </div>
      </div>

      <div>
        <label className={labelCls}>Preferred Date (Optional)</label>
        <input type="date" className={inputCls} value={form.date} onChange={e => handle("date", e.target.value)} />
      </div>

      <button type="submit" className="w-full bg-neutral-900 hover:bg-primary text-white font-black py-4 rounded-2xl uppercase tracking-widest text-[11px] transition-all shadow-lg flex items-center justify-center gap-2 mt-2">
        <span>📲</span> Confirm Booking on WhatsApp
      </button>
    </form>
  );
}

// ─── Custom Furniture Form ─────────────────────────────────────────────────────
function FurnitureOrderForm({ onSubmit }: { onSubmit: (msg: string) => void }) {
  const [form, setForm] = useState({
    name: "", phone: "", type: "Dining Table", wood: "Teak", length: "", width: "", details: "",
  });
  const [phoneError, setPhoneError] = useState('');

  // Prefill details from cookies if accepted.
  // Deferred to a task so the update lands after hydration instead of cascading a sync re-render.
  useEffect(() => {
    const timer = setTimeout(() => {
      const data = getUserDataFromCookies();
      if (!data.name && !data.phone) return;
      setForm(f => ({
        ...f,
        name: data.name || f.name,
        phone: data.phone || f.phone
      }));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handle = (k: string, v: string) => {
    let val = v;
    if (k === 'phone') {
      val = val.replace(/[^0-9\s+\-()]/g, '');
      const validation = validatePhoneNumber(val);
      if (val) {
        setPhoneError(validation.error || '');
      } else {
        setPhoneError('');
      }
    }
    setForm(f => ({ ...f, [k]: val }));
  };

  const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Advanced Name Validation
    if (form.name.trim().length < 3) {
      alert("Name must be at least 3 characters long.");
      return;
    }
    const nameRegex = /^[a-zA-Z\s.]+$/;
    if (!nameRegex.test(form.name)) {
      alert("Name must contain only alphabetic characters, spaces or periods.");
      return;
    }

    // Advanced Numerical Checks
    if (form.length && Number(form.length) <= 0) {
      alert("Length must be a positive number greater than zero.");
      return;
    }
    if (form.width && Number(form.width) <= 0) {
      alert("Width must be a positive number greater than zero.");
      return;
    }

    const validation = validatePhoneNumber(form.phone);
    if (!validation.isValid) {
      setPhoneError(validation.error || 'Please enter a valid phone number.');
      return;
    }

    // Save details to cookies if consent allowed
    saveUserDataToCookies(form.name, form.phone);

    const msg =
      `🪑 *HI WOOD – CUSTOM FURNITURE ORDER* 🪑\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Name:* ${form.name}\n` +
      `📞 *Phone:* ${validation.cleanedNumber}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `🛋️ *Furniture Type:* ${form.type}\n` +
      `🪵 *Preferred Wood:* ${form.wood}\n` +
      `📏 *Size:* ${form.length} ft × ${form.width} ft\n` +
      (form.details ? `📝 *Additional Details:* ${form.details}\n` : "") +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `_Sent via hiwood.com_`;
    onSubmit(msg);
  };

  const inputCls = "w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-3.5 text-sm text-neutral-900 focus:outline-none focus:border-primary transition-colors placeholder:text-neutral-400";
  const labelCls = "block text-[10px] font-black uppercase tracking-widest text-primary mb-1.5";

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Full Name</label>
          <div className="relative">
            <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input required className={`${inputCls} pl-9`} placeholder="Your name" value={form.name} onChange={e => handle("name", e.target.value)} />
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <label className={labelCls}>Phone</label>
          <InternationalPhoneInput 
            value={form.phone}
            onChange={(fullNumber) => handle("phone", fullNumber)}
            phoneError={phoneError}
            setPhoneError={setPhoneError}
            inputStyleClass="pl-2 focus:border-none focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Furniture Type</label>
          <select required className={inputCls} value={form.type} onChange={e => handle("type", e.target.value)}>
            <option>Dining Table</option>
            <option>Bed Frame</option>
            <option>Wardrobe</option>
            <option>Sofa Set</option>
            <option>TV Unit</option>
            <option>Study Desk</option>
            <option>Shoe Rack</option>
            <option>Kitchen Cabinet</option>
            <option>Other / Custom</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Preferred Wood</label>
          <select className={inputCls} value={form.wood} onChange={e => handle("wood", e.target.value)}>
            <option>Teak</option>
            <option>Indian Rosewood</option>
            <option>Mahogany</option>
            <option>Jackwood</option>
            <option>No Preference</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Length (ft)</label>
          <input type="number" min="1" className={inputCls} placeholder="e.g. 6" value={form.length} onChange={e => handle("length", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Width (ft)</label>
          <input type="number" min="1" className={inputCls} placeholder="e.g. 3" value={form.width} onChange={e => handle("width", e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Additional Details (Optional)</label>
        <textarea
          rows={3}
          className={`${inputCls} resize-none`}
          placeholder="Describe finish, design, colour preference, etc."
          value={form.details}
          onChange={e => handle("details", e.target.value)}
        />
      </div>

      <button type="submit" className="w-full bg-primary hover:brightness-110 text-white font-black py-4 rounded-2xl uppercase tracking-widest text-[11px] transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-2">
        <span>📲</span> Place Order on WhatsApp
      </button>
    </form>
  );
}

// ─── Main Modal ────────────────────────────────────────────────────────────────
export default function OrderModal({ isOpen, onClose, serviceType }: OrderModalProps) {
  const meta = SERVICE_META[serviceType];
  const [submitted, setSubmitted] = useState(false);
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918086687342";
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setSubmitted(false);
    }
  }

  // Lock body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = (msg: string) => {
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", duration: 0.45 }}
            className="relative bg-white rounded-[32px] w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Header gradient strip */}
            <div className={`bg-gradient-to-br ${meta.color} rounded-t-[32px] px-5 sm:px-8 pt-8 pb-6 border-b border-neutral-100`}>
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 transition-colors"
              >
                <X size={16} />
              </button>
              <span className="text-3xl mb-3 block">{meta.emoji}</span>
              <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900">{meta.title}</h2>
              <p className="text-xs text-neutral-500 mt-1">{meta.subtitle}</p>
            </div>

            <div className="px-5 sm:px-8 py-6">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-primary" size={36} />
                  </div>
                  <h3 className="text-xl font-black uppercase text-neutral-900 mb-3">Order Sent!</h3>
                  <p className="text-neutral-500 text-sm mb-8">Your order has been sent to WhatsApp. Our team will confirm within 24 hours.</p>
                  <button
                    onClick={onClose}
                    className="px-8 py-3 bg-neutral-900 text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <>
                  {serviceType === "mills" && <MillsOrderForm onSubmit={handleSubmit} />}
                  {serviceType === "transportation" && <TransportOrderForm onSubmit={handleSubmit} />}
                  {serviceType === "custom-furniture" && <FurnitureOrderForm onSubmit={handleSubmit} />}
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
