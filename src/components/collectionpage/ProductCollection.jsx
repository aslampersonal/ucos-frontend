import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";

import ProductCard from "../ProductCard/ProductCard";
import "./ProductCollection.css"


export default function ProductCollection() {

    const [selectedBrands, setSelectedBrands] = useState([]);
    const [brands, setBrands] = useState([]);
    const [filteredProductList, setFilteredProductList] = useState([]);

    const a = useLocation();
    let loc = "Collections";
    let searchResults = [];
    if(a.state !== null) {
        loc = a.state.title;
        if(loc === "Search") {
            searchResults = a.state.searchResults;
        }
    }

    useEffect(() => {
        const productData = localStorage.getItem("fullProducts");
        if (productData) {
            const productsArray = JSON.parse(productData);
            setBrands(Array.from(new Set(productsArray.map(product => product.brand))));
        }
    },[selectedBrands]);

    const handleBrandChange = (brand) => {
        setSelectedBrands((prevBrands) => {
            if (prevBrands.includes(brand)) {
                return prevBrands.filter((prevBrand) => prevBrand !== brand);
            } else {
                return [...prevBrands, brand];
            }
        });
    };

    return (
    <>
        <section className="section-pagetop bg" id="first-sec">
            <div className="container" id="head-sec-div">
                <h2 className="title-page">{loc}</h2>
                <nav>
                    <ol className="breadcrumb text-white">
                        <li className="breadcrumb-item"><NavLink to="/" className="link-dark link-underline-opacity-0">Home</NavLink></li>
                        <li className="breadcrumb-item"><NavLink to="/store" className="link-dark link-underline-opacity-0">Store</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">{loc}</li>
                    </ol>  
                </nav>
            </div> 
        </section>
        
        <section className="section-content padding-y">
            <div className="container">
                <div className="row">
                    <aside className="col-3">
                        <div className="card">
                            
                            <article className="filter-group">
                                <header className="card-header">
                                    <button data-toggle="collapse" type="button" data-target="#collapse_1" aria-expanded="false" aria-controls="#collapse_1" className="link-dark link-underline-opacity-0">
                                        {/* <MdKeyboardArrowDown className="pd-icons" /> */}
                                        <h6 className="title">Product Types</h6>
                                    </button>
                                </header>
                                <div className="filter-content collapse show" id="collapse_1">
                                    <div className="card-body">
                                        {/* <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search" />
                                            <button className="btn btn-light" id="search-btn" type="button"><BiSearchAlt className="pd-icons" /></button>
                                        </div> */}
                                        <ul className="list-menu">
                                            <li className="h-nav-li">
                                                <NavLink className="h-nav-a" to="/collections" state= {{title:"lips"}}>lips</NavLink>
                                            </li>
                                            <li className="h-nav-li">
                                                <NavLink className="h-nav-a" to="/collections" state= {{title:"hands & feet"}}>Hands & Feet</NavLink>
                                            </li>
                                            <li className="h-nav-li">
                                                <NavLink className="h-nav-a" to="/collections" state= {{title:"eyes"}}>eyes</NavLink>
                                            </li>
                                            <li className="h-nav-li">
                                                <NavLink className="h-nav-a" to="/collections" state= {{title:"skincare"}}>skin care</NavLink>
                                            </li>
                                            <li className="h-nav-li">
                                                <NavLink className="h-nav-a" to="/collections" state= {{title:"bodycare"}}>body care</NavLink>
                                            </li>
                                            <li className="h-nav-li">
                                                <NavLink className="h-nav-a" to="/collections" state= {{title:"haircare"}}>hair care</NavLink>
                                            </li>
                                        </ul>
                                    </div> 
                                </div>
                            </article>

                            <article className="filter-group">
                                <header className="card-header">
                                    <button href="#" data-toggle="collapse" data-target="#collapse_2" aria-expanded="true" className="link-dark link-underline-opacity-0">
                                        {/* <MdKeyboardArrowDown className="pd-icons" /> */}
                                        <h6 className="title">Filter by Brands</h6>
                                    </button>
                                </header>
                                <div className="filter-content collapse show" id="collapse_2">
                                    <div className="card-body">
                                    {brands.map((brand) => (
                                        <label key={brand} className="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                checked={selectedBrands.includes(brand)}
                                                onChange={() => handleBrandChange(brand)}
                                            />
                                            <div className="h-nav-a">{brand}</div>
                                        </label>
                                    ))}
                                    </div> 
                                </div>
                            </article>

                            {/* <article className="filter-group">
                                <header className="card-header">
                                    <button href="#" data-toggle="collapse" data-target="#collapse_3" aria-expanded="true" className="link-dark link-underline-opacity-0">
                                        <h6 className="title">Price range </h6>
                                    </button>
                                </header>
                                <div className="filter-content collapse show" id="collapse_3">
                                    <div className="card-body">
                                        <input type="range" className="custom-range" min="0" max="100" name="" />
                                        <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Min</label>
                                            <input className="form-control" placeholder="$0" type="number" />
                                        </div>
                                        <div className="form-group text-right col-md-6">
                                            <label>Max</label>
                                            <input className="form-control" placeholder="$1,0000" type="number" />
                                        </div>
                                        </div> 
                                        <button className="btn btn-block btn-primary">Apply</button>
                                    </div>
                                </div>
                            </article>  */}

                        </div> 
                    </aside> 
                        
                    {/* {
                        loc === "Search" ? <ProductCard searchResults={searchResults} selectedBrands={selectedBrands} loc={loc}/> : <ProductCard loc={loc}/>
                    } */}

                    {
                        loc === "Search" ? (
                            <ProductCard
                            searchResults={searchResults}
                            loc={loc}
                            selectedBrands={selectedBrands}
                            updateProductList={setFilteredProductList} // Pass the function to the ProductCard
                            />
                        ) : (
                            <ProductCard
                            loc={loc}
                            selectedBrands={selectedBrands}
                            updateProductList={setFilteredProductList} // Pass the function to the ProductCard
                            />
                        )
                    }
  
                </div>
            </div> 
        </section>
    </>
    );
  }
  