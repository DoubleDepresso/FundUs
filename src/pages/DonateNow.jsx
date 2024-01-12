import { Link } from 'react-router-dom'

const DonateNow = () => {
    return (
        <main>
            <div className="pg-header">
                <div className="container">
                    <h1>Donate Here!</h1>
                </div>
            </div>
            <div className="container content">
                <p>Scan QR Code to Donate</p>

                <Link to="/" className="btn btn-primary">Go Back to Homepage</Link>
            </div>
        </main>
    )
}

export default DonateNow

// THIS QR Code is RMIT.EDU.COM Website not any Banking QR Code
// Not yet added container for the QR to display