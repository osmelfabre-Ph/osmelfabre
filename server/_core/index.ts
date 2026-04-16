import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { registerStripeWebhook } from "../stripeWebhook";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // MUST register Stripe webhook BEFORE express.json() to preserve raw body for signature verification
  registerStripeWebhook(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Legacy URL redirects — preserve existing external links
  // /workshop-di-ritratto-maschile.html is the canonical URL — no redirect needed
  app.get("/workshop-di-ritratto-maschile", (_req, res) => {
    res.redirect(301, "/workshop-di-ritratto-maschile.html");
  });
  // Also redirect old paths to canonical URL
  app.get("/formazione/workshop-ritratto-maschile", (_req, res) => {
    res.redirect(301, "/workshop-di-ritratto-maschile.html");
  });
  app.get("/workshop-ritratto-maschile", (_req, res) => {
    res.redirect(301, "/workshop-di-ritratto-maschile.html");
  });

  // Sitemap XML per Google Search Console
  app.get("/sitemap.xml", (_req, res) => {
    const baseUrl = "https://www.osmelfabre.it";
    const now = new Date().toISOString().split("T")[0];
    const pages = [
      { url: "/", priority: "1.0", changefreq: "weekly" },
      { url: "/chi-sono", priority: "0.8", changefreq: "monthly" },
      { url: "/il-metodo", priority: "0.8", changefreq: "monthly" },
      { url: "/servizi", priority: "0.9", changefreq: "monthly" },
      { url: "/galleria", priority: "0.7", changefreq: "weekly" },
      { url: "/formazione", priority: "0.8", changefreq: "monthly" },
      { url: "/workshop-di-ritratto-maschile.html", priority: "0.9", changefreq: "monthly" },
      { url: "/risorse", priority: "0.8", changefreq: "weekly" },
      { url: "/contatti", priority: "0.7", changefreq: "monthly" },
    ];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${baseUrl}${p.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n")}
</urlset>`;
    res.header("Content-Type", "application/xml");
    res.send(xml);
  });

  // robots.txt
  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain");
    res.send(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nSitemap: https://www.osmelfabre.it/sitemap.xml`);
  });

  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
