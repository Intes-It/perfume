import httpProxy from "http-proxy";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

const proxy = httpProxy.createProxyServer({
  target: "http://171.244.64.245:8010", // Replace with your API's URL
  changeOrigin: true, // Optional: Preserve host headers (adjust based on needs)
  followRedirects: true, // Add this option to follow redirects
});

proxy.on("proxyReq", (proxyReq, req, res) => {
  console.log("Proxying request:", req.url);
});

proxy.on("proxyRes", (proxyRes, req, res) => {
  console.log("Received response:", proxyRes.statusCode, req.url);
});

proxy.on("error", (err, req, res) => {
  console.error("Proxy error:", err);
  res.writeHead(500, {
    "Content-Type": "text/plain",
  });
  res.end("Something went wrong.");
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  proxy.web(req, res);
}
