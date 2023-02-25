import "./component.css";

const SubscribeForm = () => {
    return (
        <>
            <div className="subscribe-container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="subscribe-title">
                            <h4> Subscribe to our Newsletter</h4>
                            <p> Receive an exclusive discount code when you subscribe.</p>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="subscribe-form">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Your Email" />
                                <button className="btn btn-secondary">Subscribe</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    );
}
export default SubscribeForm;