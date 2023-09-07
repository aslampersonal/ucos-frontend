import React, { useEffect } from 'react';
import './homemain.css';

function HomeMain () {
    
    useEffect(() => {
        var counter = 1;
        const bannerInterval = setInterval(() => {
            document.getElementById('bnr-changer' + counter).checked = true;
            counter++;
            if(counter > 4) {
            counter = 1;
            }
        }, 5000);

        return () => {
            clearInterval(bannerInterval);
        }

    }, []);
    
    return (
        <>
            <section id="mbanner-section">
                <div className="mbanner-div">
                    <div className="mbanner-div1">
                        {/* banner slider button */}
                        <input type="radio" name="radio-btn" id="bnr-changer1" />
                        <input type="radio" name="radio-btn" id="bnr-changer2" />
                        <input type="radio" name="radio-btn" id="bnr-changer3" />
                        <input type="radio" name="radio-btn" id="bnr-changer4" />
                        {/* banner images */}
                        <div className="mySlides first">
                            <img src="/src/assets/images/main-banner1.jpg" className="b-img" alt='' />
                        </div>
                        <div className="mySlides">
                            <img src="/src/assets/images/main-banner2.jpg" className="b-img" alt='' />
                        </div>
                        <div className="mySlides">
                            <img src="/src/assets/images/main-banner3.jpg" className="b-img" alt='' />
                        </div>
                        <div className="mySlides">
                            <img src="/src/assets/images/main-banner4.jpg" className="b-img" alt='' />
                        </div>
                        {/* automatic navigation */}
                        <div className="navigation-auto">
                            <div className="auto-btn1" />
                            <div className="auto-btn2" />
                            <div className="auto-btn3" />
                            <div className="auto-btn4" />
                        </div>
                        {/* manual navigation */}
                        <div className="navigation-manual">
                            <label htmlFor="bnr-changer1" className="manual-btn" />
                            <label htmlFor="bnr-changer2" className="manual-btn" />
                            <label htmlFor="bnr-changer3" className="manual-btn" />
                            <label htmlFor="bnr-changer4" className="manual-btn" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="section2">
                <div id="s2-main-div">
                    <h1 id="s2-h2">
                        Powerful. . . Independent. . . Embrace your elegance and become the most
                        exquisite you.
                    </h1>
                </div>
            </section>

            <section id="category-section">
                <div id="cat-makeup-div">
                    <div id="cat-makeup-div-div">
                        <h2 id="cat-makeup-h2">makeup products</h2>
                        <a href="./product.html" className="btn btn-light" id="cat-makeup-btn">
                        SHOP NOW
                        </a>
                    </div>
                </div>
                <div id="cat-skin-div">
                    <div id="cat-skin-div-div">
                        <h2 id="cat-skin-h2">skincare products</h2>
                        <a className="btn btn-dark" id="cat-skin-btn" href="./product.html">
                        SHOP NOW
                        </a>
                    </div>
                </div>
            </section>
            <section id="scroll-banner-section">
                <div id="scroll-banner-div">
                    <div id="sb-h-div">
                        <h2
                        style={{
                            color: "#6d9962",
                            fontWeight: 400,
                            letterSpacing: 5,
                            fontSize: 45,
                            fontFamily: '"Nova Flat"'
                        }}
                        >
                        #UCOS
                        </h2>
                    </div>
                    <div id="sb-b-div">
                        <div className="container sb-img-div">
                            <img className="sb-img" src="/src/assets/images/facecare-lady.png" alt='' />
                        </div>
                        <div className="container sb-img-div">
                            <img className="sb-img" src="/src/assets/images/men-bearedcare.jpg" alt='' />
                        </div>
                        <div className="container sb-img-div">
                            <img className="sb-img" src="/src/assets/images/girlface-lipstick.jpg" alt='' />
                        </div>
                        <div className="container sb-img-div">
                            <img className="sb-img" src="/src/assets/images/men-skincare1.jpg" alt='' />
                        </div>
                        <div className="container sb-img-div">
                            <img className="sb-img" src="/src/assets/images/eyeshadow-girl1.jpg" alt='' />
                        </div>
                    </div>
                </div>
            </section>

            <section id="banner3-section">
                <div id="banner3-div">
                    <div id="b3-leftb">
                        <img id="b3-left-img" src="/src/assets/images/eyeshadow-girl1.jpg" alt='' />
                    </div>
                    <div id="b3-center">
                        <h2 id="b3-center-h2">BEAUTIFUL. GLAMOROUS. RADIANT.</h2>
                        <a className="btn btn-light" id="b3-center-btn" href="./product.html">
                        SHOP EYE SHADOWS
                        </a>
                    </div>
                    <div id="b3-rightb">
                        <img id="b3-right-img" src="/src/assets/images/girl-face-skincare.jpg" alt='' />
                    </div>
                </div>
            </section>

            <section id="product-bnr2-sec">
                <div id="prod-bnr2-div">
                    <div className="prod-div">
                        <img src="/src/assets/images/girlface-lipstick.jpg" className="prod-img" alt='' />
                        <p className="prod-img-text">NEW</p>
                    </div>
                    <div className="prod-div">
                        <img src="/src/assets/images/girl-face-skincare.jpg" className="prod-img" alt='' />
                        <p className="prod-img-text">NEW</p>
                    </div>
                    <div className="prod-div">
                        <img src="/src/assets/images/men-skincare1.jpg" className="prod-img" alt='' />
                        <p className="prod-img-text">NEW</p>
                    </div>
                    <div className="prod-div">
                        <img src="/src/assets/images/eyeshadow-girl1.jpg" className="prod-img" alt='' />
                        <p className="prod-img-text">NEW</p>
                    </div>
                    <div className="prod-div">
                        <img src="/src/assets/images/men-bearedcare.jpg" className="prod-img" alt='' />
                        <p className="prod-img-text">NEW</p>
                    </div>
                </div>
                <div id="prod-bnr2-btn-div">
                    <a id="prod-bnr2-btn" className="btn btn-dark" href="./product.html">
                        SHOP ALL
                    </a>
                </div>
            </section>
        </>

    );
}

export default React.memo(HomeMain);