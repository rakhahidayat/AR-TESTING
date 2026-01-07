const https = require("https");
const fs = require("fs");
const path = require("path");

// Port untuk HTTPS server
const PORT = 8443;

// Path ke sertifikat (akan dibuat jika belum ada)
const KEY_PATH = path.join(__dirname, "localhost-key.pem");
const CERT_PATH = path.join(__dirname, "localhost.pem");

// Function untuk membuat self-signed certificate jika belum ada
function createSelfSignedCert() {
  const { execSync } = require("child_process");

  console.log("📝 Membuat self-signed certificate...");

  try {
    // Generate private key
    execSync(
      `openssl req -x509 -newkey rsa:2048 -keyout ${KEY_PATH} -out ${CERT_PATH} -days 365 -nodes -subj "/C=ID/ST=Jakarta/L=Jakarta/O=AR-TESTING/CN=localhost"`,
      { stdio: "inherit" }
    );
    console.log("✅ Certificate berhasil dibuat!");
    return true;
  } catch (error) {
    console.error("❌ Error membuat certificate:", error.message);
    console.log(
      "\n💡 Alternatif: Install mkcert untuk certificate yang terpercaya"
    );
    console.log("   brew install mkcert (Mac)");
    console.log("   mkcert -install");
    console.log("   mkcert localhost");
    return false;
  }
}

// Check if certificates exist
if (!fs.existsSync(KEY_PATH) || !fs.existsSync(CERT_PATH)) {
  console.log("⚠️  Certificate tidak ditemukan. Membuat certificate baru...");
  if (!createSelfSignedCert()) {
    console.error(
      "\n❌ Gagal membuat certificate. Silakan buat manual atau install mkcert."
    );
    process.exit(1);
  }
}

// Read certificate files
let key, cert;
try {
  key = fs.readFileSync(KEY_PATH);
  cert = fs.readFileSync(CERT_PATH);
} catch (error) {
  console.error("❌ Error membaca certificate:", error.message);
  process.exit(1);
}

// Create HTTPS server
const server = https.createServer({ key, cert }, (req, res) => {
  // Get file path
  let filePath = "." + req.url;
  if (filePath === "./") {
    filePath = "./index.html";
  }

  // Get file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".wav": "audio/wav",
    ".mp4": "video/mp4",
    ".woff": "application/font-woff",
    ".ttf": "application/font-ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".otf": "application/font-otf",
    ".wasm": "application/wasm",
    ".mind": "application/octet-stream",
    ".gltf": "model/gltf+json",
    ".bin": "application/octet-stream",
  };

  const contentType = mimeTypes[extname] || "application/octet-stream";

  // Read and serve file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 - File Not Found</h1>", "utf-8");
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`, "utf-8");
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(PORT, () => {
  console.log("\n🚀 HTTPS Server berjalan!");
  console.log(`📍 URL: https://localhost:${PORT}`);
  console.log(`📍 URL Mobile: https://192.168.110.8:${PORT}`);
  console.log("\n⚠️  Browser akan menampilkan peringatan keamanan.");
  console.log(
    "   Klik 'Advanced' -> 'Proceed to localhost' untuk melanjutkan."
  );
  console.log("\n💡 Untuk certificate yang terpercaya, gunakan mkcert:");
  console.log("   1. brew install mkcert");
  console.log("   2. mkcert -install");
  console.log("   3. mkcert localhost");
  console.log(
    "   4. Ganti localhost-key.pem dan localhost.pem dengan file yang dihasilkan\n"
  );
});
