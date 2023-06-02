import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';
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
        target: 'http://34.163.185.96',
        // In addition, you can use the `pathRewrite` option provided by `next-http-proxy-middleware`
        pathRewrite: [ 
            {
                patternStr: '^/api/payment',
                replaceStr: 'payment', 
            },
        ],
     
    });
};