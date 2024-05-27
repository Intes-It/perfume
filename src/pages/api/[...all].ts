import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";
// import cors from 'cors';

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  return httpProxyMiddleware(req, res, {
    // You can use the `http-proxy` option
    target: "http://171.244.64.245:8010",
    // In addition, you can use the `pathRewrite` option provided by `next-http-proxy-middleware`

    followRedirects: true,
  });
};
