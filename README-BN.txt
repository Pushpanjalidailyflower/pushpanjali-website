PUSHPANJALI WEBSITE — CLOUDFLARE PAGES VERSION

এই ফোল্ডারটি Cloudflare Pages-এর জন্য প্রস্তুত করা হয়েছে। Netlify Functions/Blobs বাদ দিয়ে Cloudflare Pages Functions + Workers KV ব্যবহার করা হয়েছে।

ফাইল:
- index.html : Customer Website
- admin.html : Password-protected Product Editor (URL-এর শেষে /admin)
- functions/api/products.js : Customer product API
- functions/api/admin.js : Admin login/save API
- app.js, admin.js, styles.css : Website scripts/design

গুরুত্বপূর্ণ: শুধু Dashboard-এর Drag and drop upload করলে Functions চলবে না। GitHub repository connect করে Pages deploy করতে হবে।

প্রকাশ করার আগে প্রয়োজনীয় সেটআপ:
1) GitHub-এ একটি নতুন repository তৈরি করে এই ফোল্ডারের ভেতরের সব ফাইল upload করুন (ZIP ফাইলটি নয়; ZIP extract করে ভেতরের ফাইলগুলি)।
2) Cloudflare Dashboard > Workers & Pages > Create application > Pages > Import an existing Git repository দিয়ে repository connect করুন। Framework preset: None; Build command ফাঁকা; Build output directory: / (root) বা . দিন।
3) Pages project তৈরি হলে Settings > Bindings > Add > KV namespace binding-এ যান। Variable name দিন PUSHPANJALI_KV। আগে Workers & Pages > KV থেকে একটি namespace তৈরি করে সেটি নির্বাচন করুন। তারপর নতুন deployment করুন।
4) Settings > Variables and Secrets-এ ADMIN_PASSWORD এবং SESSION_SECRET নামে Secret যোগ করুন। ADMIN_PASSWORD হবে আপনার গোপন Admin password। SESSION_SECRET হবে অন্তত 32 অক্ষরের আলাদা, অনুমান করা কঠিন গোপন বাক্য। এগুলো কাউকে দেবেন না। তারপর নতুন deployment করুন।
5) Customer site: মূল Pages URL। Product Editor: মূল URL-এর শেষে /admin

প্রাথমিক পণ্য ১২টি:
Belpata (6pc) ₹12; Kucho Phool ₹39; Aam Pata ₹5; Akanda Mala ₹15; Chati Mala ₹19; Orange Gandha Mala ₹45; Yellow Gandha Mala ₹59; Normal Joba Mala ₹15; Joba Mala (108) ₹149; Pink Lotus ₹29; Pan Pata (5pcs) ₹15; Rajanigandha Mala ₹250.

ব্যবসার নিয়ম:
- Minimum order ₹79 (পণ্যের মোট দাম)
- ৫ কিমির মধ্যে ডেলিভারি ফ্রি; ৫ কিমির বাইরে ₹30
- Emergency delivery (১ ঘণ্টার মধ্যে অনুরোধ) অতিরিক্ত ₹50
- Regular delivery window: রাত ৮টা–১১টা
- Order receiving window: রাত ১০টা থেকে পরের দিন সন্ধ্যা ৬টা (ওয়েবসাইটে তথ্য হিসেবে দেখানো হয়েছে; বর্তমানে সময়ের বাইরে checkout স্বয়ংক্রিয়ভাবে বন্ধ করে না)
- WhatsApp order number: +91 9875557909

সীমাবদ্ধতা/সতর্কতা:
- ৫ কিমির দূরত্ব গ্রাহক নিজে নির্বাচন করেন; স্বয়ংক্রিয় GPS distance calculation নেই।
- Emergency order WhatsApp-এ যাবে; আপনি availability নিশ্চিত করবেন।
- Product images প্রথমে খালি; /admin থেকে ছবি upload করে Save changes করতে হবে।
- ছবিগুলি KV-তে product data-র সঙ্গে রাখা হয়; খুব বড় ছবি আপলোড করবেন না।
- Cloudflare-এর Free plan-এর সীমা আছে; সীমা অতিক্রম করলে খরচ হতে পারে। Paid upgrade/পেমেন্টের আগে অনুমতি ছাড়া এগোবেন না।
