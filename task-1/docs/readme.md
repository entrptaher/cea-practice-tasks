Rules:

1. raw.txt তে প্রতিটা লাইণে একটা করে json ডাটা আছে।
0. সবগুলো ডাটা proposed-format.js ফাইলের কনটেন্ট অনুসারে হবে।
0. JSON ডাটা prettified হবে।
0. আলাদা করে প্রতিটা লাইন তিনটা করে {title}.json ফাইলে সেভ হবে। 
0. একই নামের দুইটা ফাইল থাকলে নামের শেষে 1-2-3 এমন থাকবে।
0. ফাইল ও ফোল্ডারের নাম kebab-case হবে।
0. json ডাটা সব camelCase হবে।
0. title এর পরিবর্তে _id দেয়ার অপশন থাকবে।
0. কোড পুরোপুরি কমেন্টেড হবে। ডুপ্লিকেট কোড ৫% এর কম থাকতে হবে। 
0. mocha/chai বা যে কোন টেস্টিং ফ্রেমওয়ার্ক দিয়ে দিয়ে টেস্টেড হতে হবে। 
0. Async হতে হবে। প্রতিটার প্রগ্রেস আলাদা করে দেখাবে।

sample‍‍:

`title: State of the ÐApps — 888 Projects Built on Ethereum` হলে ফাইল হবে,

 - output
    - instance
        - state-of-the-ð-apps-888-projects-built-on-ethereum.json
    - content
        - state-of-the-ð-apps-888-projects-built-on-ethereum.json
    - deeplink-status
        - state-of-the-ð-apps-888-projects-built-on-ethereum.json
