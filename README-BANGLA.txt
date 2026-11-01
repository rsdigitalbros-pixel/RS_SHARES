RS DIGITAL MARKETING — PROFESSIONAL WEBSITE PACKAGE
===================================================

এই ZIP-এ আছে:
- Home, About, Services, Portfolio, Pricing, Blog, Contact আলাদা page
- Responsive dark premium design
- Scroll reveal animation এবং mobile navigation
- WhatsApp floating button
- FormSubmit contact form
- Admin preview page (নিরাপদ backend admin নয়)

প্রথমে কী করবে:
1. ZIP extract করো।
2. assets/js/config.js ফাইলটি Notepad বা VS Code-এ খোলো।
3. whatsapp: "8801XXXXXXXXX" এর জায়গায় নিজের business WhatsApp নম্বর দাও। Country code সহ, + বা space ছাড়া। যেমন Bangladesh হলে 8801XXXXXXXXX format।
4. email ঠিক আছে কি না দেখো। পরিবর্তন করতে চাইলে email value বদলাও।
5. Contact form-এ FormSubmit receiver হিসেবে angrajgaming51@gmail.com দেওয়া আছে।
6. প্রথম test submission-এর পর FormSubmit ওই inbox-এ activation email পাঠাতে পারে। Inbox/Spam দেখে activate করো।
7. Local test করতে index.html browser-এ খোলো।

GITHUB PAGES-এ FREE PUBLISH:
1. GitHub-এ নতুন repository তৈরি করো।
2. যদি root URL https://angrajgaming51-dotcom.github.io/ চাও, repository name অবশ্যই:
   angrajgaming51-dotcom.github.io
   (তোমার GitHub username আলাদা হলে নিজের username ব্যবহার করবে)
3. Extract করা folder-এর ভেতরের সব file/folder repository-র root-এ upload করো। ZIP ফাইল নিজে upload করলেই site publish হবে না।
4. Repository → Settings → Pages।
5. Deploy from a branch নির্বাচন করো; Branch: main; Folder: /(root); Save।
6. কিছুক্ষণ পর GitHub Pages URL খুলে পরীক্ষা করো।

CUSTOM .COM DOMAIN:
ডোমেইন কেনার পর GitHub repo → Settings → Pages → Custom domain-এ rsdigitalmarket.com বসাও।
Registrar DNS-এ GitHub Pages-এর বর্তমান official docs দেখে A records এবং www CNAME সেট করো।
GitHub Docs: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
DNS update হতে সময় লাগতে পারে। Verify হলে Enforce HTTPS চালু করো।

IMPORTANT — ADMIN DASHBOARD:
admin.html শুধুই local/demo preview। এতে secure login, database, server-side permissions বা live site editing নেই।
এটি public repository-তে publish করলে যে কেউ পেজটি খুলতে পারবে। Real customer data, passwords বা private enquiries এখানে রাখবে না।
বাস্তব secure admin dashboard-এর জন্য Firebase/Supabase-এর মতো backend, authentication, database rules এবং server-side validation দরকার।

IMPORTANT — CONTACT FORM:
FormSubmit third-party service। প্রথমবার email activation লাগতে পারে। Test email পাঠিয়ে activation complete করো।
Contact form production-এ চালুর আগে নিজের email address এবং service settings যাচাই করো।

PORTFOLIO/BLOG:
এখানে concept/sample content আছে। নিজের বাস্তব কাজ, অনুমতি পাওয়া ছবি, সত্য তথ্য এবং নিজের লেখা article দিয়ে বদলে নাও। Fake client logos, testimonials বা ফলাফল যোগ কোরো না।

FONT:
Google Fonts ব্যবহার করা হয়েছে; internet connection না থাকলে fallback font দেখাবে।


LOGIN SYSTEM — FIREBASE EMAIL VERIFICATION + GOOGLE
====================================================
এই আপডেটে শুধু login feature যোগ হয়েছে। আগের page design/content এবং অন্য feature অপরিবর্তিত রাখা হয়েছে।

গুরুত্বপূর্ণ: ZIP-এ Firebase config placeholder আছে। তোমার নিজের Firebase project-এর Web App config না বসালে login কাজ করবে না। Firebase project-এর config secret নয়; কিন্তু Service Account private key কখনো website code-এ বসাবে না।

১) https://console.firebase.google.com/ এ গিয়ে Firebase project তৈরি করো (বা আগের project ব্যবহার করো)।
২) Project settings (gear icon) → General → Your apps → Web app (</>) → Register app।
৩) Firebase যে firebaseConfig object দেখাবে, তার apiKey, authDomain, projectId এবং appId কপি করো।
৪) এই ZIP-এর assets/js/firebase-config.js খুলে PASTE_YOUR... placeholder-গুলোর জায়গায় নিজের মান বসাও। Quotes রেখে দেবে।
৫) Firebase Console → Build → Authentication → Get started।
৬) Sign-in method থেকে Email/Password enable করো। Google enable করে Support email নির্বাচন করে Save করো।
৭) Authentication → Settings → Authorized domains-এ তোমার GitHub Pages host যোগ করো। উদাহরণ: angrajgaming51-dotcom.github.io (শুধু hostname, https:// নয়)। নিজের প্রকৃত GitHub Pages hostname ব্যবহার করবে।
৮) ZIP extract করে সব file/folder GitHub repository root-এ upload/commit করো। আগের website files replace করার আগে backup রাখো।
৯) GitHub Pages URL থেকে login.html খোলো এবং Google ও Email registration test করো।

ব্যবহার:
- Visitor/customer Create Account করে email/password দেবে।
- Firebase verification link ইমেইলে যাবে। Verify করার পর Sign In করতে পারবে।
- Google sign-in Firebase popup ব্যবহার করে।
- Forgot password email reset link পাঠায়।

নিরাপত্তা ও সীমাবদ্ধতা:
- এই আপডেট Firebase Authentication যোগ করে; এটি customer database বা admin role/dashboard permission তৈরি করে না।
- Firebase Web config browser-এ দেখা যায়—এটি স্বাভাবিক। নিরাপত্তা Firebase Console rules ও provider settings দিয়ে করতে হয়।
- ভবিষ্যতে private customer data/booking/order সংরক্ষণ করলে Firestore/Storage Security Rules-এ authenticated এবং প্রয়োজনীয় authorization বাধ্যতামূলক করো।
- GitHub Pages static hosting; secret/private server key কখনো HTML/JS-এ রাখবে না।
- Email verification email spam folder-এও যেতে পারে।
