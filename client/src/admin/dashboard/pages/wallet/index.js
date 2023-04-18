
const WalletPage = () => {
    return (
        <>
            <div className="category-container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="wallet-dashboard">
                            <div className="wallet-container">
                                <div className="row">

                                    <div className="col-md-4">
                                        <div className="wallet-box">
                                            <div className="wallet-icon">
                                                <i class="fa-solid fa-money-bill-trend-up"></i>
                                            </div>
                                            <div className="wallet-balance">
                                                <p className="title">Confirmed Balance </p>
                                                <p className="balance">&#8358; 21,900,000</p>
                                               
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="wallet-box">
                                            <div className="wallet-icon">
                                                <i class="fa-solid fa-money-bill-transfer"></i>
                                            </div>
                                            <div className="wallet-balance">
                                                <p className="title">Not Confirmed Balance </p>
                                                <p className="balance">&#8358; 900,000</p>
                                                
                                            </div>

                                        </div>
                                    </div>


                                    <div className="col-md-4">
                                        <div className="wallet-box">
                                            <div className="wallet-icon">
                                                <i class="fa-solid fa-money-bill-wave"></i>
                                            </div>
                                            <div className="wallet-balance">
                                                <p className="title">Inavlid Balance </p>
                                                <p className="balance">&#8358; 10,000</p>
                                               
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="account-wallet">
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="account-box">
                                            <div className="account-box-one">
                                                <p className="name">Account Name:</p>
                                                <p className="name">Account Number:</p>
                                                <p className="name">Bank Name:</p>
                                            </div>

                                            <div className="account-box-one">
                                                <p className="name-two">Lagbalu Joseph</p>
                                                <p className="name-two">3099275203</p>
                                                <p className="name-two">First Bank of Nigeria</p>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-md-5">
                                        <div className="account-box">
                                            <div className="account-box-one">
                                                <p className="name">Account Name:</p>
                                                <p className="name">Account Number:</p>
                                                <p className="name">Bank Name:</p>
                                            </div>

                                            <div className="account-box-one">
                                                <p className="name-two">Lagbalu Joseph</p>
                                                <p className="name-two">3099275203</p>
                                                <p className="name-two">First Bank of Nigeria</p>
                                            </div>
                                        </div>
                                    </div>


                                    
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WalletPage;