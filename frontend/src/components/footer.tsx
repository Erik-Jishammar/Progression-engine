import "../styles/footer.css";
export function Footer() {
    return (
        <footer className="footer">
            <p className="footer-text"></p>
            {new Date().getFullYear()} Progression Engine
        </footer>
    )
}