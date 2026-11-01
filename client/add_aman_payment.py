with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace renderPricingModal
start_marker = "  // Pricing Modal Render Helper\n  function renderPricingModal() {"
end_marker = "  // 2. Main Live Collaborative Interview Room"

new_pricing_modal = """  // Pricing Modal Render Helper with Aman Gajbhiye's Live UPI QR & Payment Details
  function renderPricingModal() {
    const amount = selectedPlan.includes('29') ? '29' : '99';
    const upiLink = `upi://pay?pa=9730949538@axl&pn=Aman%20Gajbhiye&am=${amount}&cu=INR&tn=PeerPrep%20${encodeURIComponent(selectedPlan)}`;

    return (
      <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 sm:p-6 text-slate-200 my-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">PeerPrep Student Pro Pass</h3>
                <p className="text-[11px] text-slate-400">Direct instant UPI payment to creator</p>
              </div>
            </div>
            <button onClick={() => setIsPricingOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Plan Options */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <div
              onClick={() => setSelectedPlan('₹29 Company Drive Pass')}
              className={`p-3 rounded-xl border cursor-pointer transition ${
                selectedPlan === '₹29 Company Drive Pass'
                  ? 'bg-indigo-600/20 border-indigo-500 shadow-md ring-1 ring-indigo-500/50'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-[10px] text-indigo-400 font-semibold mb-0.5">Company Drive Pass</div>
              <div className="text-xl font-black text-white">₹29 <span className="text-[10px] text-slate-500 font-normal">/ 7 Days</span></div>
              <div className="text-[10px] text-slate-400 mt-1">Trilogy & Top Tech PYQs + 3-Level Hints</div>
            </div>

            <div
              onClick={() => setSelectedPlan('₹99 All-Access Pass')}
              className={`p-3 rounded-xl border cursor-pointer transition ${
                selectedPlan === '₹99 All-Access Pass'
                  ? 'bg-amber-500/20 border-amber-500 shadow-md ring-1 ring-amber-500/50'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-[10px] text-amber-400 font-semibold mb-0.5">Placement Season Pass</div>
              <div className="text-xl font-black text-white">₹99 <span className="text-[10px] text-slate-500 font-normal">/ 30 Days</span></div>
              <div className="text-[10px] text-slate-400 mt-1">All 470 Companies + Rubric Scorecards</div>
            </div>
          </div>

          {/* Aman Gajbhiye's Live UPI & QR Code Card */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-3.5">
            {/* Payee Info Box */}
            <div className="flex items-center justify-between bg-slate-900/90 rounded-lg p-2.5 border border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-sm font-bold text-indigo-300">
                  AG
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    Aman Gajbhiye
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/30">Verified Payee</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">Bank of Maharashtra • 6729</div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-500 block uppercase">Pay Amount</span>
                <span className="text-base font-extrabold text-emerald-400 font-mono">₹{amount}</span>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="text-center space-y-2">
              <div className="relative inline-block bg-white p-2.5 rounded-2xl shadow-xl shadow-indigo-500/10 border-2 border-indigo-500/30">
                <img
                  src="/qr_code.png"
                  alt="Aman Gajbhiye PhonePe UPI QR"
                  className="w-44 h-44 object-contain rounded-lg"
                />
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-300 font-mono bg-slate-900/80 py-1.5 px-3 rounded-lg border border-slate-800 max-w-xs mx-auto">
                <span className="text-slate-400">UPI ID:</span>
                <strong className="text-indigo-300 select-all">9730949538@axl</strong>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText('9730949538@axl');
                    confetti({ particleCount: 30, spread: 50 });
                  }}
                  className="ml-1 text-[10px] text-indigo-400 hover:text-indigo-200 underline cursor-pointer"
                >
                  Copy
                </button>
              </div>

              <p className="text-[10px] text-slate-400">
                Scan with any app: <strong>PhonePe • Google Pay • Paytm • BHIM • Cred</strong>
              </p>
            </div>

            {/* Mobile Instant Deep Link & Action Buttons */}
            <div className="space-y-2 pt-1">
              <a
                href={upiLink}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Pay ₹{amount} via UPI App (PhonePe / GPay)</span>
              </a>

              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={isProcessingPayment}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying UPI Payment...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>I Have Paid ₹{amount} → Instant Pro Activation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

"""

start_pos = content.find(start_marker)
end_pos = content.find(end_marker)

if start_pos != -1 and end_pos != -1:
    content = content[:start_pos] + new_pricing_modal + content[end_pos:]
    with open('src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print('Aman payment details and QR code added to App.jsx successfully!')
else:
    print('Error: Could not locate markers in App.jsx')
