import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Header/Product/Product';


const ProductDetail = () => {

    let {productKey} = useParams();
    const product= fakeData.find(pd => pd.key === productKey);
    console.log(product);
    return (
        <div>
            <h1>{productKey}Your product Details</h1>
            <Product showAddToCart = {false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;