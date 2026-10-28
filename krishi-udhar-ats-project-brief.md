# Krishi Udhar — project brief for Anythingssolution (ATS)

Use this file as the **only source of product truth** when adding Krishi Udhar to [anythingssolution.com](https://anythingssolution.com/). Write a portfolio / case-study page, not a second marketing site that copies krishiudhar.com word-for-word.

If a fact is not in this document, **do not invent it**.

---

## 1. What you are writing

| Item | Value |
|---|---|
| Page type | Company project / case study on the ATS website |
| Audience of that page | ATS visitors: clients, partners, hiring, and anyone asking “what has this company built?” |
| Product name | **Krishi Udhar** (Hindi: **कृषि उधार**) |
| Operator | **Anythingssolution (ATS)** — also written Any Things Solution |
| Live product | https://krishiudhar.com |
| Operator site | https://anythingssolution.com/ |
| Support email | krishiudhar@gmail.com |
| YouTube | https://www.youtube.com/@krishiudhar |
| Tutorial playlist | https://www.youtube.com/playlist?list=PLAkYSS2p35g0 |
| GitHub org | https://github.com/anythingssolution |
| Instagram | https://www.instagram.com/anythingssolution/ |

Do **not** publish a phone number, office address, support hours, ratings, user counts, revenue, or “always free” claims. Those are not approved.

---

## 2. One-sentence pitch

**Krishi Udhar is billing and account software for small fertiliser, seed and agri-input shops in India — so a shopkeeper can print a bill, keep each farmer’s credit (udhari) in one khata, and see stock, purchases and cash in the same place instead of a paper register.**

Slightly longer:

Village agri shops sell bags, packets and bottles every day. Farmers often pay only part of the bill. The shopkeeper used to keep that in a copy: today’s sale in one place, old dues in another, stock in their head. Krishi Udhar puts **bill + money received + remaining due + stock + dealer purchase** on one shop account, in Hindi, on a phone or computer, without asking the owner to be an accountant.

---

## 3. The problem it solves

### What the shop actually does

A typical **कृषि केंद्र / agri-input retailer** (initial focus: **Chhattisgarh**, usable anywhere in India):

1. A farmer comes for urea, seed, or crop-care goods.
2. Sometimes they pay in cash / UPI. Often they take goods **on credit (उधारी)**.
3. Later they return with some money, or return a bag, or promise a date after harvest.
4. The shop also buys from **dealers**, watches **expiry / batch**, and must know **who still owes how much** before closing at night.

### What went wrong with paper and generic billing apps

- **Two ledgers.** New bill in one copy, old village dues in another. The farmer’s true balance was never one number.
- **Generic GST billing software** assumes walk-in cash sales, SKUs, and an accountant. It does not start from “Ramesh already owes ₹3,000; today he takes ₹3,200 and pays ₹1,000.”
- **Stock and credit were separate.** Selling a bag did not reliably reduce stock; returning goods did not reliably reduce dues.
- **Reminders were guesswork.** Shopkeepers typed WhatsApp messages from memory and often quoted the wrong remaining amount.
- **Busy counter, Hindi, phone.** English dashboards, tiny buttons, and “complete GST suite” screens fail at a one-counter rural shop.

### What success looks like for the shopkeeper

Before locking the shutter they can answer, without flipping copies:

- आज कितना बिका?
- कितना पैसा मिला?
- किससे लेना बाकी है?
- कौन-सा माल कम / expiry के पास है?

That is the product job. It is **shop accounting**, not a loan app, not a collection agency, not crop-treatment advice, and not a GST filing service.

---

## 4. Who it is for (and who it is not)

**For**

- Small fertiliser, seed and agri-input / crop-care retailers
- One-counter shops; owner runs billing themselves
- Hindi-first users; computer skill is not required
- Shops that already run **udhari** with farmers and want that khata digital

**Not for (do not imply)**

- Farmers taking loans from the app
- Multi-branch chains, staff roles, barcode POS (not in current beta plan)
- CA / GST return filing, e-invoice IRP, e-way bill
- Automatic or bulk WhatsApp sending
- Medical / pesticide advice (“this spray for this crop”)

**Language honesty**

- Public website: Hindi, English, Hinglish
- **Shop app is currently Hindi** (Hinglish labels inside the app: Grahak, Vasooli, Kharid, Maal)
- Sample/demo shop also opens in Hindi, in a **separate tab**, so practice does not touch a real account

**Pricing honesty**

- Currently **free during beta**
- Future price is **not announced**
- Never write “forever free”, “no limits”, or a made-up price

---

## 5. Product map — what we built and why

Seven shop menus, plus public learning and an operator admin. Every module exists because a real counter action needed it — not because a SaaS checklist asked for it.

### 5.1 Register / login / dukaan profile

**What:** Shop name, owner, 10-digit mobile, address (state / district / city / PIN), GST type (Unregistered / Regular / Composition), GSTIN when needed, password. Each shop’s customers, bills and stock stay on **that shop’s account**.

**Why:** Rural shops are not “users in a CRM”. They are a **business**. Mixing two shops’ khaatas would destroy trust. GST type is captured so Regular shops can put tax on bills; Unregistered shops are not forced into a GST product.

### 5.2 Dashboard

**What:** Today’s sales, money received, bills made, total due, low stock; simple charts.

**Why:** Closing-time question. If they have to open five screens to know the day, they will go back to the copy.

### 5.3 Bill (Naya bill)

**What:** Choose an **existing** customer, add goods and qty, enter **money actually received** (cash / UPI / bank / credit), save, print, share bill on WhatsApp. New-bill due is shown **separately** from the customer’s earlier due. Walk-in is possible; draft stays in the browser until they press save. Idempotency keys stop double bills from a double tap.

**Why:** This is the moment the farmer is at the counter. The software must not make them create a new customer name every sale, and must not hide that ₹2,200 on *this* bill is not the same as ₹5,200 *total* khata.

**Why print + WhatsApp bill:** Many farmers want a paper parchi; many shops only have a phone.

### 5.4 Grahak (customer khata)

**What:** Add customer once (name, mobile, village, credit limit / days, WhatsApp opt-in). Search before creating (duplicate-name warning). Opening receivable = **old copy balance**, not a fake sale. Ledger of bills, payments, returns. Customer statement PDF. Edit with an audit trail.

**Why:** Udhari is the actual product, not an add-on. If “Ramesh of village X” is created twice, the shop will never know the true due. Opening balance exists so they can start digital **without retyping years of old bills as new sales**.

### 5.5 Paisa mila / receipts

**What:** Record money when it actually arrives, allocate against dues, reverse a wrong receipt with a reason.

**Why:** Partial payments are normal. A “promise to pay” must not reduce the balance. A wrong receipt must be reversible without deleting history.

### 5.6 Vasooli (collections)

**What:** Who to collect from first (ageing / village). Payment **promises** (date or crop-linked) — reminder only; balance changes only when payment is saved. Cash in/out/opening entries. Daily cash closing (counted cash vs system cash, reason if they differ).

**Why:** Village collection is a route, not an ageing report for CAs. Harvest calendars drive promises. Evening cash in the drawer must match the app or the owner will not trust it.

### 5.7 WhatsApp payment reminder (manual)

**What:** App prepares a message with current due. Shopkeeper checks number + customer permission, then **presses Send in their own WhatsApp**. Demo shop cannot message real farmers. Reminder is blocked if nothing is due or permission/number is missing. Preparing a message ≠ payment received.

**Why:** Automatic WhatsApp Business API was **deliberately not built**. It is expensive, easy to spam, and legally sensitive. The shopkeeper already has WhatsApp; they need the **correct amount**, not a bot.

### 5.8 Stock (Maal)

**What:** Products with category, unit (bag / kg / bottle / packet — units must not be mixed), sale/purchase rate, GST rate for Regular shops, lots with **batch + expiry**, low-stock, assign expiry to unlabelled stock, add a new packet, stock correction with reason, stock register.

**Why:** Agri retail is not “SKU count”. Urea in bags, seed in kg, crop-care in bottles. Expiry and batch matter. A sale must reduce sellable stock. A correction without a reason would hide theft or counting errors.

### 5.9 Kharid (dealer / supplier)

**What:** Supplier master, purchase (stock in + supplier due), pay the dealer, reverse a dealer payment, purchase return.

**Why:** The shop’s money is also **payable** to distributors. If only sales are digital, purchase and stock drift and the owner stops using the app.

### 5.10 Samaan wapas (goods return)

**What:** Return against the **original bill**, qty limited to what was sold. Condition: sellable vs hold/write-off. Return first reduces customer due; leftover becomes **customer credit**. Actual cash refund is a **separate** entry. Owner can reverse a wrong return/refund with preview + reason. Held stock is not sellable until they decide.

**Why:** Farmers return bags. If you only subtract udhari, stock and cash go wrong. If you delete the original bill, history dies. If refund and return are the same button, shops will think the app sent money to the bank (it does not).

### 5.11 Reports

**What:** Date-range sales, receipts, dues, stock value, print, CSV. Return/refund registers. Not advanced GST returns.

**Why:** Owner and (later) a helper need lists for the day/week. Filing GSTR is a different product; claiming it would be a lie.

### 5.12 Voice navigation (optional)

**What:** Hindi voice to open Naya Bill, Grahak, Stock, Reports, Dashboard, profile. Short listen window, read-back. Not a full voice accountant.

**Why:** Hands are often dirty or busy at the counter. Navigation help, not “create invoice by speaking amounts”.

### 5.13 Offline / weak network

**What:** Bill draft saved locally. Offline queue + retry. Sample shop uses session storage in another tab so it cannot overwrite the real token or draft. Idempotent writes for money/stock actions.

**Why:** Village internet drops. Double-taps on “Bill banayein” must not create two bills.

### 5.14 Trust, audit, corrections

**What:** Every shop isolated. Password not shared. Important reversals need a **reason**. Audit log of bill / payment / stock / customer actions. No silent delete of committed money movements.

**Why:** A digital copy that can vanish or be edited without a trail is less trustworthy than paper.

### 5.15 Public website and video manuals

**What:** Hindi / English / Hinglish landing and four task guides (billing, udhari, stock, returns) plus WhatsApp-reminder explainer. Seven short how-to videos (register, customer, dealer purchase, stock/expiry, new bill, paisa mila, vasooli promise). Sample shop. Help/data page with honest limits.

**Why:** The buyer is the shopkeeper, not a SaaS researcher. They need to **see the work**, try a dummy shop, then add their own dukaan. Videos are how-to (what to tap), not a data dump of demo names and amounts.

### 5.16 Admin (operator, not retailer)

**What:** ATS can log in to an admin workspace: list shops, plan/status, SaaS fee record, extension, support notes, enable/disable access, data export. No retailer should see this.

**Why:** Beta support and account control without SSHing into the database.

### 5.17 Loading / double-click (Sweep)

**What:** Gold ring around the KU mark on boot and on in-flight saves. Button disables with a Hindi busy label. No full-screen lock; other menus stay usable. Per-action in-flight, not one global spinner.

**Why:** Slow mobile networks. A second tap on opening balance, new stock lot, purchase return or payment must not double-write. A giant spinner would block navigation and feel like a crash.

---

## 6. Design principles (why the product feels this way)

1. **One customer, one khata.** Never teach “create customer on every bill”.
2. **This bill’s due ≠ total due.** Always teach the Ramesh example: ₹3,000 old + ₹3,200 today − ₹1,000 paid.
3. **Record what happened, don’t fake it.** Opening copy balance is not a sale. A promise is not a payment. A reminder is not money in. A return is not a refund.
4. **Hindi at the counter.** Public site can be three languages; the working app stays Hindi until the shop is fluent.
5. **Phone-first, fat taps, short labels.** Dashboard / Bill / Grahak / Vasooli / Stock / Kharid / Reports.
6. **Beta honesty.** Free now; not a forever promise. Not legal invoices by default; shopkeeper checks names and amounts before print.
7. **No dark growth claims.** Demo data is labelled sample. No fake testimonials.

Use **fertiliser, seed and agri-input / crop-care** on the English ATS page. Hindi product copy on krishiudhar.com may say खाद, बीज और कृषि दवा; on ATS English, avoid sounding like a medical shop.

---

## 7. What we intentionally did *not* build (yet)

State these as product choices, not as missing quality:

| Not in current beta | Why |
|---|---|
| WhatsApp Business API / scheduled / bulk send | Shopkeeper must send; consent and correct due first |
| Staff users, multi-branch | One owner, one shop |
| Barcode | Rural SKU mix is named goods, not retail barcodes |
| GSTR filing, e-invoice, e-way bill | Out of scope; would over-claim |
| Self-serve account delete / published retention SLA | Not declared; contact operator |
| Crop advisory | Not agronomy software |
| Lending / recovery guarantee | Khata is a record, not a loan book |

Plan caps (beta, for context — do not headline as marketing limits unless asked): 1 shop, 1 owner, 500 invoices/month, 500 products, 1000 customers. Paid UI is hidden.

---

## 8. Technology (enough for a case study, not a résumé dump)

| Layer | Choice | Why |
|---|---|---|
| Shop UI | React 19 + Vite; large working billing engine in a compatibility layer, screens moving to React | Ship a working Hindi shop app, migrate without a rewrite freeze |
| Public site | Localized static HTML/CSS + React landing shell | SEO and three languages without making shopkeepers wait on a SPA for guides |
| Real shops | Backend API + PostgreSQL (separate service; frontend talks to port 4100 in dev) | Durable ledgers, not only localStorage |
| Demo | `data/demo-seed.json` + session storage | Try without harming a real login |
| Money writes | Idempotency keys, per-action in-flight locks | Rural double-tap / flaky network |
| Plan flags | Shared `config/plans/beta.json` | Frontend and backend agree what beta includes |
| Discovery | Sitemap, video sitemap, llms.txt, IndexNow; crawler logging without customer PII | Public pages findable; shop data not used for marketing analytics |

Do not name unconfirmed hosting vendors, employee counts, or “AI-powered billing” — there is no generative AI creating invoices.

---

## 9. Suggested ATS project-page structure

Write in **English** (ATS site language) unless the ATS page is bilingual. Keep Krishi Udhar Hindi names in italics or quotes once, then use English.

1. **Eyebrow:** Product by Anythingssolution (ATS)
2. **Title:** Krishi Udhar — billing and credit accounts for agricultural shops
3. **Deck:** 2–3 sentences from §2
4. **Live:** krishiudhar.com · YouTube @krishiudhar · Free beta (not permanently free)
5. **The problem:** paper khata + generic billing vs rural udhari
6. **Who it’s for:** fertiliser / seed / agri-input retailers; Hindi; Chhattisgarh first
7. **What we built:** 6–8 feature tiles with the *why* from §5 (Bill, Khata, Vasooli, Stock, Purchase, Returns, Manual WhatsApp, Sample shop + videos)
8. **A concrete example:** Ramesh ₹3,000 old + ₹3,200 bill − ₹1,000 paid → ₹2,200 this bill, ₹5,200 total
9. **How we work as ATS:** Hindi-first UX, honest beta, no fake automation, operator admin for support
10. **Stack:** short
11. **CTA:** Visit krishiudhar.com · Contact ATS (use existing ATS contact patterns; do not invent a Krishi phone)

Optional quote style (only if ATS wants a founder line — do not fake a customer testimonial):

> We did not start from GST software. We started from the moment a farmer pays ₹1,000 on a ₹3,200 bill and already had money pending from last season.

---

## 10. Ready-to-adapt website copy

### Short card (homepage project grid)

**Krishi Udhar**  
Billing, farmer credit (udhari) and stock for small agricultural input shops. Hindi shop app, printed bills, collections, batches/expiry, dealer purchases and goods returns — built so a one-counter retailer can close the day knowing what sold, what cash came in, and who still owes. Currently free in beta at krishiudhar.com.

### Medium (about 120 words)

Krishi Udhar is Anythingssolution’s web product for fertiliser, seed and agri-input retailers. Village shops already sell on credit; the hard part is keeping each farmer’s running balance, today’s bill, and remaining stock in one place. Generic billing tools assume cash-and-carry. Krishi Udhar does not.

The shopkeeper registers a dukaan, adds customers once, and makes Hindi bills on a phone: goods, amount received, amount still due. Old notebook dues attach to the same customer instead of being typed as fake new sales. Stock falls on sale and returns to sellable stock only when returned goods are actually fit to sell. Collections, payment promises, daily cash closing, dealer purchases and a manual WhatsApp reminder (the owner presses Send) follow the same khata.

A sample shop and short Hindi video lessons sit on the public site so a retailer can practise before using real money. The beta is free; future pricing is not announced. It is shop accounting — not GST filing, not automatic messaging, not a loan product.

### Feature bullets (use 5–7)

- Hindi billing with print and optional WhatsApp bill share  
- Customer khata: old dues, new bills, payments, returns in one ledger  
- Collections list, payment promises, daily cash closing  
- Stock with units, batches, expiry and low-stock  
- Dealer purchase, supplier due, purchase return  
- Goods return against the original bill; refund recorded only if cash was actually returned  
- Manual WhatsApp due reminder with consent check  
- Sample shop + how-to videos (Hindi recordings; pages in Hindi / English / Hinglish)

### Meta description (ATS)

Anythingssolution built Krishi Udhar, Hindi billing and udhari software for fertiliser and seed shops — bills, farmer dues, stock, purchases and returns in one shop account.

---

## 11. Assets you may use

| Asset | Notes |
|---|---|
| https://krishiudhar.com | Canonical product |
| `/logo-public.webp`, `/icon-512.png`, `/icon.png` on the product site | KU mark; cream + deep green + gold |
| YouTube videos | Embed only the official @krishiudhar lessons; do not scrape random agri videos |
| ATS logo | https://anythingssolution.com/nav-logo.png |

Do not use live customer names, mobiles, or real shop ledgers in screenshots. Use the **sample shop** or the public landing illustrations.

Visual tone: cream paper (`#f4efe4`), shop green (`#1b5131` / `#227044`), wheat gold (`#e1a825`). Feels like a village parchi, not a neon fintech card.

---

## 12. Absolute do-not list for the generating LLM

- Do not invent testimonials, download counts, “10,000 shops”, awards, or App Store ranking (it is a **web app**).
- Do not say iOS/Android native app unless ATS later ships stores.
- Do not say the app files GST, generates IRN, or talks to NIC.
- Do not say WhatsApp messages go out automatically.
- Do not say ATS recovers money from farmers.
- Do not publish a phone number or address for Krishi Udhar.
- Do not promise permanent free service.
- Do not call it an “AI accountant”.
- Do not mix this product with unrelated ATS work as if it were one codebase.
- Credit: **Created by Anythingssolution (ATS)**.

---

## 13. One-line credits block (footer of the project page)

Krishi Udhar (कृषि उधार) is designed and operated by Anythingssolution (ATS). Shopkeepers use it at krishiudhar.com. For product help: krishiudhar@gmail.com. For company enquiries, use Anythingssolution’s existing contact channels.
