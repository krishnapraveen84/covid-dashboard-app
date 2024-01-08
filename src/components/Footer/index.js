import './index.css'

export default function Footer() {
  return (
    <div className="footer-card">
      <h1 className="logo-name">
        COVID19<span className="india-name">INDIA</span>
      </h1>
      <p className="footer-para">
        we stand with everyone fighting on the front lines
      </p>
      <div className="social-media-card">
        <img
          className="social-icons"
          src="https://res.cloudinary.com/dnwwyvtjx/image/upload/v1704544817/hz3lxc2hrzuyckijzqwt.png"
        />
        <img
          className="social-icons"
          src="https://res.cloudinary.com/dnwwyvtjx/image/upload/v1704544873/q7kyvbnetvu9ueqp4ivk.png"
        />
        <img
          className="social-icons"
          src="https://res.cloudinary.com/dnwwyvtjx/image/upload/v1704544664/d7ifczvsda8pfl0swux6.png"
        />
      </div>
    </div>
  )
}
