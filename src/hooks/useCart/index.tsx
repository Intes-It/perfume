import { api } from '@utils/apiRoute';
import { GET, POST, DELETE } from '@utils/fetch';
import { instance } from '@utils/_axios';
import { encode } from 'querystring';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const useCart = () => {
    const queryClient = useQueryClient();
    const cart = useQuery("get-cart", getCart);
    const addProductToCart = useMutation('add-product', addProduct);
    const removeProductToCart = useMutation('remove-product', removeProduct);

    //fetch data
    async function getCart() {
        return await GET(api.getCart);
    }

    //mutation
    async function addProduct(data: any) {
        return await POST(api.addProduct, data)
    }

    async function removeProduct(data: any) {
        return await DELETE(api.addProduct, data)
    }
    
    return {
        cart: cart.data,
        addProductToCart: addProductToCart.mutateAsync,
        removeProductToCart: removeProductToCart.mutateAsync
    };
};

export default useCart;
