import { api } from '@utils/apiRoute';
import { GET, POST, DELETE, PUT } from '@utils/fetch';
import { instance } from '@utils/_axios';
import { encode, ParsedUrlQuery } from 'querystring';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const useCheckout = () => {
    const queryClient = useQueryClient();
    const processBilling = useMutation('process-billing', billing);
    const processShipping = useMutation('process-shipping', shipping);
    // const processYourOrder = useQuery('process-your-order', yourOrder);

    //mutation
    async function billing(data: any) {
        return await POST(api.processBilling, data)
    }
    async function shipping(data: any) {
        return await POST(api.processShipping, data)
    }
    async function processYourOrder(query: ParsedUrlQuery) {
        return await queryClient.fetchQuery("process-your-order", () => GET(`${api.processYourOrder}?${encode(query)}`));
    }

    return {
        processBilling: processBilling.mutateAsync,
        processShipping: processShipping.mutateAsync,
        processYourOrder: processYourOrder
    };
};

export default useCheckout;
