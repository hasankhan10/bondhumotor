"use client";

import { useState, useRef } from "react";
import { Download, Plus, Trash2 } from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

interface InvoiceItem {
  id: string;
  description: string;
  qty: number;
  price: number;
}

export default function BillingPage() {
  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  
  // Customer Details
  const [customerName, setCustomerName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [village, setVillage] = useState("");
  const [ps, setPs] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [mobile1, setMobile1] = useState("");
  const [mobile2, setMobile2] = useState("");

  // Vehicle Details
  const [batteryNo, setBatteryNo] = useState("");
  const [chassisNo, setChassisNo] = useState("");
  const [controllerNo, setControllerNo] = useState("");
  const [chargerNo, setChargerNo] = useState("");
  const [motorNo, setMotorNo] = useState("");

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", description: "", qty: 1, price: 0 },
  ]);

  const billRef = useRef<HTMLDivElement>(null);

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), description: "", qty: 1, price: 0 },
    ]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const totalAmount = items.reduce((sum, item) => sum + item.qty * item.price, 0);


  const handleDownloadPDF = async () => {
    if (!billRef.current) return;
    try {
      const imgData = await toPng(billRef.current, {
        quality: 1.0,
        pixelRatio: 3, 
        backgroundColor: "#ffffff",
        width: 794,
        // No hardcoded height here to allow full content capture
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfPageHeight = pdf.internal.pageSize.getHeight();
      
      const img = new Image();
      img.src = imgData;
      await new Promise((resolve) => (img.onload = resolve));
      
      let pdfHeight = (img.height * pdfWidth) / img.width;
      
      // If content overflows A4 height, we scale it down to fit on one page
      // but only if it's within a reasonable threshold (say 10% overflow)
      // otherwise we just let it take its natural height.
      if (pdfHeight > pdfPageHeight) {
        // Option A: Scale down (better for 1-page memos)
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfPageHeight, undefined, 'FAST');
      } else {
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      }
      
      pdf.save(`Invoice_${invoiceNo || "Draft"}.pdf`);
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Failed to generate PDF. Please try printing instead.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      {/* LEFT: Data Entry Form */}
      <div className="lg:w-1/2 space-y-8 bg-[#0D1117] p-6 lg:p-8 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-y-auto max-h-[85vh] custom-scrollbar hide-on-print">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black font-heading text-white">
              Billing
            </h1>
            <p className="text-gray-400 mt-1 text-sm">
              Generate premium cash memos
            </p>
          </div>
          <div className="flex items-center gap-3">

            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-3 bg-brand-blue text-white font-bold text-sm rounded-xl hover:bg-brand-blue/80 transition-all shadow-glow-blue/20"
              title="Download as PDF"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>

        {/* Form Sections */}
        <div className="space-y-6">
          {/* General & Dates */}
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Invoice No."
              value={invoiceNo}
              onChange={setInvoiceNo}
              placeholder="e.g. BM-0001"
            />
            <Field
              label="Date"
              value={date}
              onChange={setDate}
              type="date"
            />
          </div>

          {/* Customer Details */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-4">
            <h3 className="text-white font-bold text-sm border-b border-white/10 pb-2">
              Customer Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Customer Name"
                value={customerName}
                onChange={setCustomerName}
              />
              <Field
                label="Father's Name"
                value={fatherName}
                onChange={setFatherName}
              />
              <Field label="Village" value={village} onChange={setVillage} />
              <Field label="Police Station (PS)" value={ps} onChange={setPs} />
              <Field label="Aadhar No." value={aadhar} onChange={setAadhar} />
              <Field label="Mobile 1" value={mobile1} onChange={setMobile1} />
              <Field label="Mobile 2" value={mobile2} onChange={setMobile2} />
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-4">
            <h3 className="text-white font-bold text-sm border-b border-white/10 pb-2">
              Vehicle Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Battery No."
                value={batteryNo}
                onChange={setBatteryNo}
              />
              <Field
                label="Chassis No."
                value={chassisNo}
                onChange={setChassisNo}
              />
              <Field
                label="Controller No."
                value={controllerNo}
                onChange={setControllerNo}
              />
              <Field
                label="Charger No."
                value={chargerNo}
                onChange={setChargerNo}
              />
              <Field label="Motor No." value={motorNo} onChange={setMotorNo} />
            </div>
          </div>

          {/* Line Items */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="text-white font-bold text-sm">Line Items</h3>
              <button
                onClick={addItem}
                className="text-brand-blue hover:text-brand-blue/80 text-xs font-bold flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Item
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={item.id} className="flex gap-3 items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, "description", e.target.value)
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div className="w-20">
                    <input
                      type="number"
                      placeholder="Qty"
                      value={item.qty || ""}
                      onChange={(e) =>
                        updateItem(item.id, "qty", Number(e.target.value))
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div className="w-28">
                    <input
                      type="number"
                      placeholder="Price"
                      value={item.price || ""}
                      onChange={(e) =>
                        updateItem(item.id, "price", Number(e.target.value))
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-brand-blue"
                    />
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-500 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors mt-0.5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 font-bold text-lg text-brand-green">
              Total: ₹{totalAmount.toLocaleString("en-IN")}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Live A4 Preview */}
      <div className="lg:w-1/2 flex items-start justify-center overflow-auto custom-scrollbar p-0 lg:p-4 bg-gray-900/50 rounded-[2.5rem] print-area-container">
        {/* A4 Wrapper - Scaled for screen, exact for print */}
        <div className="print-wrapper bg-white shadow-2xl origin-top relative">
          {/* 
            A4 Dimensions: 210mm x 297mm 
            We use a fixed aspect ratio wrapper with internal absolute positioning 
            to ensure pixel-perfect conversion to PDF and Print.
            Using strict pixel dimensions for the container: 794px x 1123px (A4 at 96 DPI)
          */}
          <div className="w-[794px] min-h-[1123px] bg-white text-black p-8 flex flex-col font-sans relative box-border mx-auto border border-gray-200" ref={billRef}>
            
            {/* Background Logo Watermark (Optional, if they have a logo, it looks premium) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <span className="text-[150px] font-black tracking-widest rotate-[-45deg] text-black">BONDHU</span>
            </div>

            {/* Header Box */}
            <div className="border-[3px] border-black p-4 mb-4 relative">
              <div 
                className="absolute -top-[14px] left-1/2 -translate-x-1/2 px-4 py-1 text-sm font-bold border border-black z-10 w-max"
                style={{ backgroundColor: "#A5F3FC" }} // cyan-200
              >
                ক্যাশমেমো
              </div>
              <div className="flex justify-between items-start pt-2">
                <div className="font-bold">নং: {invoiceNo || "............."}</div>
                {/* Brand Name */}
              </div>
              
              <div className="text-center mt-2 space-y-1">
                <h1 className="text-4xl font-extrabold tracking-tight text-black" style={{ fontFamily: "serif" }}>
                  বন্ধু মটরস্ এন্ড ইলেকট্রিক
                </h1>
                <h2 className="text-xl font-bold mt-2">পরিচালনায় - মিরাজ লস্কর</h2>
                <h3 className="text-lg font-bold">প্রোঃ এস. বি. লস্কর</h3>
                <p className="text-sm font-semibold mt-2">
                  শিবনগর মোড় <span className="mx-2">★</span> জুমাই লস্কর রোড <span className="mx-2">★</span> ঢোলাহাট <span className="mx-2">★</span> দঃ ২৪ পরগনা
                </p>
              </div>
            </div>

            {/* Vehicle Details Box - Keeping simple layout matching image */}
            <div className="border border-black p-3 mb-2 text-sm leading-relaxed grid grid-cols-2 gap-x-6 gap-y-2">
               <div>ব্যাটারী নং - <span className="font-mono">{batteryNo || "...................................."}</span></div>
               <div>চেসিস নম্বর - <span className="font-mono">{chassisNo || "...................................."}</span></div>
               <div>কন্ট্রোলার নম্বর - <span className="font-mono">{controllerNo || "...................................."}</span></div>
               <div>চার্জার নম্বর - <span className="font-mono">{chargerNo || "...................................."}</span></div>
               <div className="col-span-2 flex justify-between">
                 <span>শোরুম নং 6297944059</span>
                 <span>মটর নম্বর - <span className="font-mono">{motorNo || "........................"}</span></span>
                 <span>তারিখ - <span className="font-mono">{date ? new Date(date).toLocaleDateString("en-IN") : ".................."}</span></span>
               </div>
            </div>

            {/* Customer Details Box */}
            <div className="border border-black p-2 mb-2 text-sm leading-relaxed space-y-1">
              <div className="grid grid-cols-[1fr_1fr] gap-4">
                <div>নাম - <span className="font-mono font-bold">{customerName || "..........................................."}</span></div>
                <div>বাবার নাম - <span className="font-mono">{fatherName || "..........................................."}</span></div>
              </div>
              <div className="grid grid-cols-[1fr_1fr_1fr] gap-4">
                <div>গ্রাম - <span className="font-mono">{village || "......................."}</span></div>
                <div>থানা - <span className="font-mono">{ps || "......................."}</span></div>
                <div>আধার নং - <span className="font-mono">{aadhar || "...................."}</span></div>
              </div>
              <div className="grid grid-cols-[1fr_1fr] gap-4">
                <div>মোবাইল নং - <span className="font-mono">{mobile1 || "..........................................."}</span></div>
                <div>মোবাইল নং - <span className="font-mono">{mobile2 || "..........................................."}</span></div>
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 flex flex-col border-[2px] border-black">
              {/* Table Header */}
              <div className="grid grid-cols-[1fr_100px_150px] border-b-[2px] border-black text-center text-lg font-bold">
                <div className="border-r-[2px] border-black p-2">বিবরণ</div>
                <div className="border-r-[2px] border-black p-2">পরিমান</div>
                <div className="p-2">টাকা</div>
              </div>
              
              {/* Table Body (Expands to fill) */}
              <div className="flex-1 flex grid grid-cols-[1fr_100px_150px] relative min-h-[300px]">
                {/* Vertical Separators */}
                <div className="absolute inset-y-0 left-0 right-[250px] border-r-[2px] border-black pointer-events-none" />
                <div className="absolute inset-y-0 right-[150px] w-0 border-r-[2px] border-black pointer-events-none" />
                
                {/* Items */}
                <div className="col-span-3">
                  {items.map((item, idx) => (
                    item.description || item.price > 0 ? (
                      <div key={idx} className="grid grid-cols-[1fr_100px_150px] text-sm">
                        <div className="px-4 py-2 font-mono whitespace-pre-wrap">{item.description}</div>
                        <div className="px-4 py-2 text-center font-mono">{item.qty || ""}</div>
                        <div className="px-4 py-2 text-right font-mono pr-8">{item.price ? item.price.toLocaleString("en-IN") : ""}</div>
                      </div>
                    ) : null
                  ))}
                </div>
              </div>

              {/* Table Footer / Total */}
              <div className="grid grid-cols-[1fr_150px] border-t-[2px] border-black items-center">
                <div className="p-4 text-center text-sm font-bold border-r-[2px] border-black flex items-center justify-center">
                  ক্ষতিগ্রস্ত স্কুটার ক্লেম করা যাবে না
                </div>
                <div className="border-l-[2px] border-black flex h-full">
                   <div 
                    className="w-full h-full flex items-center justify-between px-4 font-bold text-lg border-t border-b border-l"
                    style={{ backgroundColor: "#A5F3FC", borderColor: "#67E8F9" }} // cyan-200, cyan-300
                   >
                     <span>মোট -</span>
                     <span>{totalAmount > 0 ? totalAmount.toLocaleString('en-IN') : ""}</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Signatures */}
            <div className="mt-4 border border-black p-6 grid grid-cols-2 relative mb-2">
              <div className="font-bold relative">
                 ক্রেতার স্বাক্ষর -
              </div>
              <div className="font-bold text-right relative">
                 বিক্রেতার স্বাক্ষর -
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Class added temporarily during PDF generation to ensure full size */}
        <style dangerouslySetInnerHTML={{__html: `
        .print-pdf-mode {
           transform: scale(1) !important;
           position: fixed;
           top: 0;
           left: 0;
           z-index: -1000;
        }
      `}} />
    </div>
  );
}

/* Reusable Field Component */
function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-gray-400 mb-1 block">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-brand-blue transition-colors font-mono"
      />
    </div>
  );
}
