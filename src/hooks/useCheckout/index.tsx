import { api } from '@utils/apiRoute';
import { GET, POST, DELETE, PUT } from '@utils/fetch';
import { instance } from '@utils/_axios';
import { encode } from 'querystring';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const useCheckout = () => { 
    const processBilling = useMutation('process-billing', billing); 
  
    //mutation
    async function billing(data: any) {
        return await POST(api.processBilling, data)
    } 
    
    return { 
        processBilling: processBilling.mutateAsync, 
    };
};

export default useCheckout;
