import React,{useState,useEffect} from 'react';
import Base from "./Base";
import "../styles.css";
import Card from './Card';
import { getProducts } from './helper/coreapicalls';


export default function Home() {
    
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                setError(data.error);
            }
            else {
                setProducts(data);
            }
        })
    }

useEffect(() => {
    loadAllProducts();
}, [])

    return (
        <Base title="CENTIXO" description="Welcome to the CENTIXO t-shirt store"> 
            <div className="row">
                <h1 className="text-white">All of t-shirts</h1>
                <div className="row">
                    {products.map((product, index) => {
                        return (
                            <div key={index} className="col-4 mb-4">
                                <Card product={ product}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>
    )
}
